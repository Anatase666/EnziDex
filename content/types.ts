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

/**
 * Категория «partnership» убрана вместе с разделом о поставках:
 * сайт информационный и обращений не принимает.
 */
export type FaqCategory = 'product' | 'safety' | 'usage';

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

/* ─── SEO ──────────────────────────────────────────────────────────────── */

export type PageSeo = {
  title: string;
  description: string;
  /** Путь без домена: '/', '/product'. */
  path: string;
};
