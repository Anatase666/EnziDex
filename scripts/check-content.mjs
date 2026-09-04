#!/usr/bin/env node
/**
 * Контроль пробелов в контенте (ТЗ 5).
 *
 * Проходит по content/ и ищет маркер TODO_CONTENT. По умолчанию печатает
 * предупреждение со списком мест и не мешает сборке — это рабочий режим,
 * пока заказчик собирает данные.
 *
 * С CONTENT_STRICT=1 падает с ненулевым кодом. Этот режим включается перед
 * сдачей: критерий приёмки ТЗ 9 требует «ни одного TODO_CONTENT в собранной
 * версии», и проверять это глазами по двадцати файлам — плохая идея.
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const CONTENT_DIR = join(ROOT, 'content');
const MARKER = 'TODO_CONTENT';
const STRICT = process.env.CONTENT_STRICT === '1';

/** @param {string} dir @returns {string[]} */
function collectFiles(dir) {
  /** @type {string[]} */
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...collectFiles(full));
    } else if (/\.(ts|tsx)$/.test(entry)) {
      files.push(full);
    }
  }
  return files;
}

/** @type {{ file: string, line: number, text: string }[]} */
const hits = [];

for (const file of collectFiles(CONTENT_DIR)) {
  // types.ts описывает сам маркер и служебные функции вокруг него —
  // это определение механизма, а не пробел в контенте.
  if (/[\\/]types\.ts$/.test(file)) continue;

  const lines = readFileSync(file, 'utf8').split(/\r?\n/);
  lines.forEach((text, index) => {
    if (!text.includes(MARKER)) return;
    // Импорт маркера и строки комментариев пробелами не считаются.
    if (/^\s*import\b/.test(text)) return;
    if (/^\s*(\/\/|\*|\/\*)/.test(text)) return;

    hits.push({
      file: relative(ROOT, file).replace(/\\/g, '/'),
      line: index + 1,
      text: text.trim().slice(0, 96),
    });
  });
}

const GREY = '[90m';
const YELLOW = '[33m';
const RED = '[31m';
const GREEN = '[32m';
const RESET = '[0m';

if (hits.length === 0) {
  console.log(`${GREEN}✓ content: пробелов нет, TODO_CONTENT не найдено${RESET}`);
  process.exit(0);
}

const colour = STRICT ? RED : YELLOW;
const label = STRICT ? 'ОШИБКА' : 'предупреждение';

console.log('');
console.log(
  `${colour}${label}: в контенте ${hits.length} незаполненных мест (TODO_CONTENT)${RESET}`,
);
console.log(`${GREY}данные для них перечислены в docs/CONTENT-GAPS.md${RESET}`);
console.log('');

let currentFile = '';
for (const hit of hits) {
  if (hit.file !== currentFile) {
    currentFile = hit.file;
    console.log(`  ${currentFile}`);
  }
  console.log(`    ${GREY}${String(hit.line).padStart(4)}${RESET}  ${hit.text}`);
}
console.log('');

if (STRICT) {
  console.log(
    `${RED}Сборка остановлена: режим CONTENT_STRICT не допускает пробелов в контенте.${RESET}`,
  );
  process.exit(1);
}
