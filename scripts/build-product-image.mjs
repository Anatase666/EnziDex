#!/usr/bin/env node
/**
 * Подготовка изображения упаковки для сайта.
 *
 *   npm run images                       — из docs/reference/product-render.webp
 *   npm run images -- путь/к/файлу.webp  — из другого файла
 *
 * Источник — рендер упаковки на прозрачном фоне. Скрипт:
 *
 *   1. доводит продукт до полной непрозрачности — в исходнике у пачки и тубы
 *      альфа 251–254 вместо 255, и сквозь них на 1 % просвечивал бы фон;
 *   2. обрезает пустые поля по видимому содержимому и добавляет равные отступы;
 *   3. рисует контактные тени под каждым предметом по линии его основания —
 *      без тени вырезанный предмет выглядит наклеенным на страницу;
 *   4. сохраняет несколько ширин в WebP с альфа-каналом (ТЗ 8.1) и пишет
 *      lib/product-image.generated.ts с размерами для атрибутов width/height,
 *      чтобы браузер зарезервировал место заранее и вёрстка не прыгала.
 *
 * Чтобы заменить изображение, достаточно положить новый файл на место
 * источника и выполнить скрипт — компоненты подхватят результат сами.
 *
 * sharp здесь не отдельная зависимость: он приходит вместе с Next.js.
 */

import { mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SOURCE = process.argv[2] ?? join(ROOT, 'docs/reference/product-render.webp');
const OUT_DIR = join(ROOT, 'public/images/product');
const MANIFEST = join(ROOT, 'lib/product-image.generated.ts');

/** Ширины, которые попадут в srcset. Больше исходной не генерируются. */
const WIDTHS = [400, 640, 960, 1280];

/** Альфа, начиная с которой пиксель считается телом предмета. */
const SOLID_ALPHA = 200;
/** Альфа, начиная с которой пиксель считается видимым при обрезке. */
const VISIBLE_ALPHA = 8;
/** Почти непрозрачное доводится до полностью непрозрачного. */
const OPAQUE_FROM = 248;

const { data, info } = await sharp(SOURCE)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const W = info.width;
const H = info.height;
const alphaAt = (x, y) => data[(y * W + x) * 4 + 3];

/* ─── 1. Полная непрозрачность тела предмета ──────────────────────────── */

let lifted = 0;
for (let i = 3; i < data.length; i += 4) {
  if (data[i] >= OPAQUE_FROM && data[i] < 255) {
    data[i] = 255;
    lifted++;
  }
}

/* ─── 2. Границы видимого содержимого ─────────────────────────────────── */

let minX = W;
let minY = H;
let maxX = -1;
let maxY = -1;
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    if (alphaAt(x, y) > VISIBLE_ALPHA) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}
if (maxX < 0) throw new Error('В изображении нет видимого содержимого');

/* ─── 3. Предметы и линия их основания ────────────────────────────────── */

// Нижняя граница тела предмета в каждом столбце.
const baseY = new Array(W).fill(-1);
for (let x = minX; x <= maxX; x++) {
  for (let y = maxY; y >= minY; y--) {
    if (alphaAt(x, y) >= SOLID_ALPHA) {
      baseY[x] = y;
      break;
    }
  }
}

// Предметы — непрерывные по горизонтали участки, разделённые пустотой.
const objects = [];
let start = -1;
for (let x = minX; x <= maxX + 1; x++) {
  const solid = x <= maxX && baseY[x] >= 0;
  if (solid && start < 0) start = x;
  if (!solid && start >= 0) {
    if (x - start > 40) objects.push({ x0: start, x1: x - 1 });
    start = -1;
  }
}

// Опорная часть: столбцы, чьё основание в нижних 6 % высоты предмета.
// По ним строится тень — она ложится туда, где предмет касается поверхности.
for (const object of objects) {
  let top = H;
  let bottom = 0;
  for (let x = object.x0; x <= object.x1; x++) {
    bottom = Math.max(bottom, baseY[x]);
    for (let y = minY; y <= baseY[x]; y++) {
      if (alphaAt(x, y) >= SOLID_ALPHA) {
        top = Math.min(top, y);
        break;
      }
    }
  }
  const height = bottom - top;
  object.top = top;
  object.bottom = bottom;
  object.contact = [];
  for (let x = object.x0; x <= object.x1; x += 4) {
    if (baseY[x] >= bottom - height * 0.06) object.contact.push([x, baseY[x]]);
  }
}

/* ─── 4. Холст: равные поля и место под тень ──────────────────────────── */

const contentH = maxY - minY;
const pad = Math.round(contentH * 0.05);
const shadowRoom = Math.round(contentH * 0.05);

const left = Math.max(0, minX - pad);
const top = Math.max(0, minY - pad);
const right = Math.min(W - 1, maxX + pad);
const cropW = right - left + 1;
const cropH = maxY + pad - top + 1;
const canvasW = cropW;
const canvasH = cropH + shadowRoom;

const product = await sharp(data, { raw: { width: W, height: H, channels: 4 } })
  .extract({ left, top, width: cropW, height: Math.min(cropH, H - top) })
  .png()
  .toBuffer();

// Тень: плотная полоса вдоль опорной линии и широкая рассеянная под ней.
// Толщина считается от высоты всей композиции, а не от ширины предмета:
// иначе у тубы с узким колпачком тень выходит вдвое тоньше, чем у пачки,
// хотя свет на обоих предметах один и тот же.
const toCanvas = ([x, y]) => [x - left, y - top];
const shadowSvg = objects
  .filter((object) => object.contact.length > 1)
  .map((object) => {
    const points = object.contact.map(toCanvas);
    const width = points.at(-1)[0] - points[0][0];
    const lift = contentH * 0.004;
    const path = points.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y + lift}`).join(' ');
    const cx = (points[0][0] + points.at(-1)[0]) / 2;
    const cy = object.bottom - top + contentH * 0.01;
    return `
      <ellipse cx="${cx}" cy="${cy}" rx="${width * 0.6}" ry="${contentH * 0.024}"
        fill="#171a45" opacity="0.17" filter="url(#wide)"/>
      <path d="${path}" stroke="#171a45" stroke-width="${contentH * 0.013}"
        stroke-linecap="round" stroke-linejoin="round" fill="none"
        opacity="0.42" filter="url(#tight)"/>`;
  })
  .join('');

const blurTight = Math.max(3, Math.round(contentH * 0.006));
const blurWide = Math.max(10, Math.round(contentH * 0.022));

const shadow = Buffer.from(`
  <svg xmlns="http://www.w3.org/2000/svg" width="${canvasW}" height="${canvasH}">
    <defs>
      <filter id="tight" x="-20%" y="-200%" width="140%" height="500%">
        <feGaussianBlur stdDeviation="${blurTight}"/>
      </filter>
      <filter id="wide" x="-30%" y="-300%" width="160%" height="700%">
        <feGaussianBlur stdDeviation="${blurWide}"/>
      </filter>
    </defs>
    ${shadowSvg}
  </svg>`);

const composed = await sharp({
  create: { width: canvasW, height: canvasH, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
})
  .composite([
    { input: shadow, left: 0, top: 0 },
    { input: product, left: 0, top: 0 },
  ])
  .png()
  .toBuffer();

/* ─── 5. Экспорт ──────────────────────────────────────────────────────── */

mkdirSync(OUT_DIR, { recursive: true });
for (const file of readdirSync(OUT_DIR)) rmSync(join(OUT_DIR, file));

// Промежуточный размер, близкий к исходному, не нужен: выигрыша в весе
// он не даёт, а браузер всё равно выберет ближайший по плотности экрана.
const widths = [...new Set([...WIDTHS.filter((w) => w <= canvasW * 0.8), canvasW])];
const sources = [];

for (const width of widths) {
  const height = Math.round((canvasH * width) / canvasW);
  const name = `package-${width}.webp`;
  const info = await sharp(composed)
    .resize({ width, kernel: 'lanczos3' })
    .webp({ quality: 86, alphaQuality: 100, effort: 6, smartSubsample: true })
    .toFile(join(OUT_DIR, name));
  sources.push({ src: `/images/product/${name}`, width, height, bytes: info.size });
}

const manifest = `/**
 * Сгенерировано scripts/build-product-image.mjs — не править вручную.
 * Источник: ${relative(ROOT, SOURCE).replace(/\\/g, '/')}
 */

export const productImage = {
  width: ${canvasW},
  height: ${canvasH},
  sources: [
${sources.map((s) => `    { src: '${s.src}', width: ${s.width} },`).join('\n')}
  ],
} as const;
`;
writeFileSync(MANIFEST, manifest);

/* ─── Отчёт ───────────────────────────────────────────────────────────── */

console.log(`источник     ${W}×${H}`);
console.log(`непрозрачность доведена у ${lifted.toLocaleString('ru-RU')} пикселей`);
console.log(`предметов    ${objects.length}`);
console.log(`холст        ${canvasW}×${canvasH}`);
for (const s of sources) {
  console.log(`  ${s.src.padEnd(36)} ${String(s.width).padStart(5)}×${s.height}  ${(s.bytes / 1024).toFixed(0)} КБ`);
}
console.log(`манифест     ${relative(ROOT, MANIFEST).replace(/\\/g, '/')}`);
