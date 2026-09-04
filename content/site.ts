import { TODO_CONTENT } from './types';
import type { ContactChannel, LeadTopic, NavItem, Requisites } from './types';

/** Название, дескриптор, общие тексты бренда. */
export const site = {
  name: 'ЭнзиДекс',
  nameLatin: 'EnziDex',
  /** Короткий дескриптор рядом с логотипом (ТЗ FR-G1). */
  descriptor: 'ферментный уход за полостью рта',
  /** Одна фраза о продукте — для футера и метаданных. */
  tagline:
    'Гель с ферментом декстраназой для ухода за полостью рта. 10 мл, без фтора.',
} as const;

/** Основная навигация в шапке (ТЗ 2.2). */
export const mainNav: readonly NavItem[] = [
  { label: 'Продукт', href: '/product', hint: 'Состав, свойства, применение' },
  { label: 'Научная база', href: '/science', hint: 'Механизм действия и источники' },
  { label: 'Вопросы', href: '/faq', hint: 'Безопасность и частые вопросы' },
  { label: 'Контакты', href: '/contacts', hint: 'Связь и заявки' },
];

/** Юридические ссылки — только в футере (ТЗ 2.2). */
export const legalNav: readonly NavItem[] = [
  { label: 'Юридические данные', href: '/legal' },
  { label: 'Политика конфиденциальности', href: '/privacy' },
];

/**
 * Реквизиты (ТЗ FR-L1).
 * Из ТЗ 1.1 достоверно известны организационно-правовая форма, название и
 * регион. Всё остальное — данные из ЕГРЮЛ, которые нельзя восстановить.
 */
export const requisites: Requisites = {
  legalName: `Общество с ограниченной ответственностью «ЭНЗИДЕКС»`,
  shortName: 'ООО «ЭНЗИДЕКС»',
  inn: TODO_CONTENT,
  ogrn: TODO_CONTENT,
  kpp: TODO_CONTENT,
  legalAddress: `Пермский край, ${TODO_CONTENT}`,
  actualAddress: TODO_CONTENT,
};

/** Прямые контакты (ТЗ FR-C2). */
export const contacts: readonly ContactChannel[] = [
  {
    kind: 'email',
    label: 'Почта',
    value: TODO_CONTENT,
    note: 'Общие вопросы и заявки',
  },
  {
    kind: 'phone',
    label: 'Телефон',
    value: TODO_CONTENT,
    note: 'Часы работы уточняются',
  },
  {
    kind: 'messenger',
    label: 'Мессенджер',
    value: TODO_CONTENT,
    note: 'Telegram / WhatsApp',
  },
];

/** Отдельный адрес для партнёрств и поставок (ТЗ FR-C4). */
export const partnershipContact: ContactChannel = {
  kind: 'email',
  label: 'Сотрудничество и поставки',
  value: TODO_CONTENT,
  note: 'Клиники, дистрибьюторы, партнёрские запросы',
};

/** Срок ответа на заявку (ТЗ FR-C5). Показывается в форме и после отправки. */
export const responseTime = {
  short: `в течение ${TODO_CONTENT}`,
  full: `Мы отвечаем на заявки ${TODO_CONTENT} в рабочие дни.`,
};

/** Варианты в поле «Тип обращения» формы заявки (ТЗ FR-G3). */
export const leadTopics: readonly LeadTopic[] = [
  { value: 'customer', label: 'Я покупатель' },
  { value: 'clinic', label: 'Я представитель клиники' },
  { value: 'partnership', label: 'Партнёрство и поставки' },
  { value: 'other', label: 'Другое' },
];

/**
 * Дисклеймер в футере (ТЗ FR-G2).
 * Формулировка зависит от регуляторного статуса, который заказчик ещё не
 * подтвердил, — поэтому статус подставляется, а не придумывается.
 */
export const footerDisclaimer = `«ЭнзиДекс» — ${TODO_CONTENT} (регуляторный статус). Информация на сайте носит справочный характер и не заменяет консультацию стоматолога.`;

/** Тексты футера. */
export const footer = {
  brandNote:
    'Разработка и производство ферментных средств для ухода за полостью рта.',
  navHeading: 'Разделы',
  contactsHeading: 'Контакты',
  legalHeading: 'Документы',
};
