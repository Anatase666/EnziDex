/**
 * Разбор ограниченной разметки в контенте.
 *
 * Поддерживается ровно то, что нужно текстам сайта, и ничего сверх:
 *   абзац      — пустая строка между блоками
 *   список     — строки, начинающиеся с «- »
 *   **жирный**
 *   *курсив*   — для латинских биноменов: *S. mutans*
 *   [текст](/адрес)
 *
 * Произвольного HTML в контенте нет намеренно: строки из content/*.ts
 * попадают в JSX как текст, а не через dangerouslySetInnerHTML, поэтому
 * инъекция разметки через контент технически невозможна.
 */

/** Как незаполненное место выглядит для читателя. */
export const PENDING_LABEL = 'Требует корректировки';

export type InlineToken =
  | { type: 'text'; value: string }
  | { type: 'bold'; value: string }
  | { type: 'italic'; value: string }
  | { type: 'link'; value: string; href: string }
  /** Маркер TODO_CONTENT, попавший в середину фразы. */
  | { type: 'pending' };

export type Block =
  | { type: 'paragraph'; tokens: InlineToken[] }
  | { type: 'list'; items: InlineToken[][] };

// Порядок альтернатив важен: **жирный** должен проверяться до *курсива*,
// иначе двойная звёздочка разберётся как пустой курсив.
// TODO_CONTENT распознаётся здесь же: маркер часто стоит в середине фразы
// («режим применения: TODO_CONTENT»), и подменять его простым поиском по
// строке значило бы потерять возможность оформить пометку отдельно.
const INLINE_RE =
  /\*\*([^*]+)\*\*|\*([^*\n]+)\*|\[([^\]]+)\]\(([^)]+)\)|(TODO_CONTENT)/g;

export function parseInline(text: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(INLINE_RE)) {
    const index = match.index;
    if (index > lastIndex) {
      tokens.push({ type: 'text', value: text.slice(lastIndex, index) });
    }

    const [full, bold, italic, linkText, linkHref, pending] = match;

    if (bold !== undefined) {
      tokens.push({ type: 'bold', value: bold });
    } else if (italic !== undefined) {
      tokens.push({ type: 'italic', value: italic });
    } else if (linkText !== undefined && linkHref !== undefined) {
      tokens.push({ type: 'link', value: linkText, href: linkHref });
    } else if (pending !== undefined) {
      tokens.push({ type: 'pending' });
    }

    lastIndex = index + full.length;
  }

  if (lastIndex < text.length) {
    tokens.push({ type: 'text', value: text.slice(lastIndex) });
  }

  return tokens;
}

export function parseBlocks(text: string): Block[] {
  return text
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter((chunk) => chunk !== '')
    .map<Block>((chunk) => {
      const lines = chunk.split('\n').map((line) => line.trim());
      const isList = lines.every((line) => line.startsWith('- '));

      if (isList) {
        return {
          type: 'list',
          items: lines.map((line) => parseInline(line.slice(2).trim())),
        };
      }

      return { type: 'paragraph', tokens: parseInline(lines.join(' ')) };
    });
}

/**
 * Текст без разметки — для JSON-LD, атрибутов title и метаописаний.
 * Структурированные данные должны содержать то же, что видит пользователь,
 * но без служебных символов разметки.
 */
export function toPlainText(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*\n]+)\*/g, '$1')
    .replace(/TODO_CONTENT/g, PENDING_LABEL)
    .replace(/^-\s+/gm, '')
    .replace(/\s*\n\s*/g, ' ')
    .trim();
}
