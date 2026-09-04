#!/usr/bin/env node
/**
 * Пост-обработка статического экспорта.
 *
 * Две вещи, которые Next.js не делает сам, а без них сборка ломается
 * на реальном хостинге.
 */

import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const OUT = join(ROOT, 'out');

const GREEN = '[32m';
const YELLOW = '[33m';
const RESET = '[0m';

if (!existsSync(OUT)) {
  console.warn(`${YELLOW}finalize-export: каталога out/ нет — пропускаем${RESET}`);
  process.exit(0);
}

/* ─── 1. OG-изображение по адресу с расширением ───────────────────────────
   Файловое соглашение Next.js кладёт картинку в out/opengraph-image —
   без расширения. На Vercel это работает, потому что платформа знает
   Content-Type маршрута. Обычный статический хостинг (GitHub Pages, nginx,
   S3) определяет тип по расширению и отдаёт такой файл как
   application/octet-stream — краулеры соцсетей его отбрасывают, и превью
   ссылки не появляется. Метаданные ссылаются на копию (см. lib/seo.ts).   */

const ogSource = join(OUT, 'opengraph-image');
const ogTarget = join(OUT, 'og', 'enzidex-og.png');

if (existsSync(ogSource)) {
  mkdirSync(dirname(ogTarget), { recursive: true });
  copyFileSync(ogSource, ogTarget);
  console.log(`${GREEN}✓${RESET} og/enzidex-og.png`);
} else {
  console.warn(`${YELLOW}finalize-export: out/opengraph-image не найден${RESET}`);
}

/* ─── 2. .nojekyll ────────────────────────────────────────────────────────
   GitHub Pages по умолчанию прогоняет содержимое через Jekyll, а тот
   игнорирует каталоги, начинающиеся с подчёркивания. Весь сборочный вывод
   Next лежит в _next/, поэтому без этого файла сайт открывается без единого
   стиля и скрипта. Ошибка выглядит как «всё сломалось», а лечится пустым
   файлом — кладём его всегда, другим хостингам он не мешает.             */

writeFileSync(join(OUT, '.nojekyll'), '');
console.log(`${GREEN}✓${RESET} .nojekyll`);
