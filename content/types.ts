/**
 * Схема контента (ТЗ 5).
 *
 * Все тексты сайта живут в content/*.ts и типизированы здесь. Смысл в том,
 * чтобы заказчик правил формулировки, не открывая JSX, а сборка ловила
 * пропущенные поля раньше браузера.
 */

/**
 * Маркер незаполненного места. Ставится вместо выдуманного факта —
 * состава, режима применения, реквизитов, результатов испытаний.
 * Каждое вхождение продублировано строкой в docs/CONTENT-GAPS.md,
 * а scripts/check-content.mjs собирает их список при сборке.
 */
export const TODO_CONTENT = 'TODO_CONTENT';

/** Строка, которая может быть ещё не заполнена заказчиком. */
export type Fillable = string;

/** Заполнено ли поле реальными данными. */
export function isFilled(value: string | undefined | null): value is string {
  return typeof value === 'string' && value.length > 0 && !value.includes(TODO_CONTENT);
}

/** Все элементы списка заполнены (пустой список считается незаполненным). */
export function hasFilledItems<T>(items: readonly T[] | undefined): items is readonly T[] {
  return Array.isArray(items) && items.length > 0;
}

/* ─── Навигация ────────────────────────────────────────────────────────── */

export type NavItem = {
  label: string;
  href: string;
  /** Краткое пояснение для футера и мобильного меню. */
  hint?: string;
};

/* ─── Состав ───────────────────────────────────────────────────────────── */

export type Ingredient = {
  /** Название по INCI, как на упаковке. */
  inci: string;
  /** Название по-русски. */
  name: string;
  /** Технологическая роль: «загуститель», «консервант», «действующий компонент». */
  role: string;
  /** Что этот компонент делает в продукте, человеческим языком. */
  description: string;
  /** Действующий компонент выделяется в таблице состава. */
  isActive?: boolean;
};

/* ─── Преимущества ─────────────────────────────────────────────────────── */

export type IconName =
  | 'enzyme'
  | 'shield'
  | 'drop'
  | 'layers'
  | 'flask'
  | 'clock'
  | 'document'
  | 'balance';

export type Benefit = {
  id: string;
  title: string;
  description: string;
  icon?: IconName;
  /** Развёрнутое объяснение для /product — там нужен не лозунг, а разбор. */
  detail?: string;
};

/* ─── Применение ───────────────────────────────────────────────────────── */

export type UsageStep = {
  /** Короткое название шага. */
  title: string;
  /** Что именно делать. */
  description: string;
  /** Длительность или количество, если заданы производителем. */
  meta?: string;
};

/* ─── FAQ ──────────────────────────────────────────────────────────────── */

export type FaqCategory = 'product' | 'safety' | 'usage' | 'partnership';

export type FaqItem = {
  id: string;
  category: FaqCategory;
  question: string;
  /**
   * Ответ. Допускается ограниченная разметка: абзацы разделяются пустой
   * строкой, **жирный** — двойными звёздочками, [текст](url) — ссылка.
   * Разбор в components/ui/RichText.tsx, произвольный HTML не поддерживается.
   */
  answer: string;
};

/* ─── Научная база ─────────────────────────────────────────────────────── */

export type LabTest = {
  title: string;
  method: string;
  result: string;
  /** in vitro / in vivo — обязательная пометка по BC-3. */
  conditions: 'in vitro' | 'in vivo';
  date: string;
  /** Кто проводил испытание. */
  performedBy?: string;
  sourceUrl?: string;
};

export type Reference = {
  /** Авторы в формате «Фамилия И. О., Фамилия И. О.». */
  authors: string;
  year: string;
  title: string;
  /** Журнал или издание. */
  source: string;
  doi?: string;
  url?: string;
  /** Зачем эта работа здесь — одной строкой. */
  relevance: string;
};

export type DocumentLink = {
  title: string;
  description?: string;
  href: string;
  /** Формат и размер указываются рядом со ссылкой (ТЗ FR-S6). */
  format: 'PDF' | 'DOCX' | 'XLSX';
  size: string;
};

/* ─── Реквизиты и контакты ─────────────────────────────────────────────── */

export type Requisites = {
  legalName: string;
  shortName: string;
  inn: Fillable;
  ogrn: Fillable;
  kpp?: Fillable;
  legalAddress: Fillable;
  actualAddress: Fillable;
};

export type ContactChannel = {
  kind: 'email' | 'phone' | 'messenger' | 'address';
  label: string;
  value: Fillable;
  /** Готовая ссылка: mailto:, tel:, https://t.me/… */
  href?: string;
  note?: string;
};

/* ─── Форма заявки ─────────────────────────────────────────────────────── */

export type LeadTopic = {
  value: string;
  label: string;
};

/* ─── SEO ──────────────────────────────────────────────────────────────── */

export type PageSeo = {
  title: string;
  description: string;
  /** Путь без домена: '/', '/product'. */
  path: string;
};
