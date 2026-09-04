import { leadTopics } from '@/content/site';

/**
 * Валидация формы заявки (ТЗ FR-G3).
 *
 * Функции чистые и не знают ни про React, ни про DOM: их можно вызывать
 * и на blur отдельного поля, и целиком перед отправкой, и в тестах.
 *
 * Тексты ошибок конкретные и подсказывают действие. «Ошибка» и «Неверный
 * формат» пользователю не помогают — он и так видит, что что-то не так.
 */

export type LeadFormValues = {
  name: string;
  phone: string;
  email: string;
  topic: string;
  message: string;
  consent: boolean;
  /** Honeypot: скрытое поле, которое человек не заполняет. */
  company: string;
};

export type LeadFormErrors = Partial<Record<keyof LeadFormValues | 'form', string>>;

export const MESSAGE_MAX_LENGTH = 1000;
export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 60;

/** Минимальное время заполнения формы, мс (ТЗ FR-G3, антиспам). */
export const MIN_FILL_TIME_MS = 3000;

export const emptyLeadForm: LeadFormValues = {
  name: '',
  phone: '',
  email: '',
  topic: '',
  message: '',
  consent: false,
  company: '',
};

/* ─── Телефон ──────────────────────────────────────────────────────────── */

/**
 * Приводит ввод к маске +7 (___) ___-__-__ для российских номеров и
 * оставляет свободный формат +<цифры> для зарубежных (ТЗ FR-G3).
 *
 * Жёсткая маска на все случаи ломает ввод иностранных номеров — у них
 * другая длина и другая группировка, поэтому маска включается только когда
 * номер действительно похож на российский.
 */
export function formatPhone(raw: string): string {
  const trimmed = raw.trim();
  if (trimmed === '' || trimmed === '+') return trimmed;

  const digits = trimmed.replace(/\D/g, '');
  if (digits === '') return '';

  const looksRussian =
    (digits.startsWith('7') || digits.startsWith('8')) && digits.length <= 11;

  if (!looksRussian) {
    // Зарубежный номер: только «+» и цифры, длина по E.164.
    return `+${digits.slice(0, 15)}`;
  }

  const body = (digits.startsWith('8') ? `7${digits.slice(1)}` : digits).slice(0, 11);
  const rest = body.slice(1);

  let out = '+7';
  if (rest.length > 0) out += ` (${rest.slice(0, 3)}`;
  if (rest.length >= 3) out += ')';
  if (rest.length > 3) out += ` ${rest.slice(3, 6)}`;
  if (rest.length > 6) out += `-${rest.slice(6, 8)}`;
  if (rest.length > 8) out += `-${rest.slice(8, 10)}`;
  return out;
}

/** Цифровая часть номера — то, что уходит получателю заявки. */
export function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.startsWith('8') && digits.length === 11) return `+7${digits.slice(1)}`;
  return digits === '' ? '' : `+${digits}`;
}

function isValidPhone(raw: string): boolean {
  const digits = raw.replace(/\D/g, '');
  if (digits.startsWith('7') || digits.startsWith('8')) return digits.length === 11;
  // E.164: от 8 до 15 цифр — покрывает международные номера.
  return digits.length >= 8 && digits.length <= 15;
}

/* ─── Email ────────────────────────────────────────────────────────────── */

/**
 * Практичная проверка адреса. Полная RFC 5322-совместимая регулярка
 * длиной в несколько сотен символов на форме обратной связи отклоняет
 * больше живых адресов, чем ловит опечаток, поэтому её здесь нет.
 */
const EMAIL_RE = /^[^\s@,;]+@[^\s@.,;]+(\.[^\s@.,;]+)+$/u;

function isValidEmail(raw: string): boolean {
  const value = raw.trim();
  return value.length <= 254 && EMAIL_RE.test(value);
}

/* ─── Пофайловая валидация ─────────────────────────────────────────────── */

export function validateField(
  field: keyof LeadFormValues,
  values: LeadFormValues,
): string | undefined {
  switch (field) {
    case 'name': {
      const value = values.name.trim();
      if (value === '') return 'Укажите, как к вам обращаться';
      if (value.length < NAME_MIN_LENGTH) return 'Имя должно быть не короче двух символов';
      if (value.length > NAME_MAX_LENGTH)
        return `Имя должно быть не длиннее ${NAME_MAX_LENGTH} символов`;
      return undefined;
    }

    /**
     * Правило «телефон или почта» закреплено за одним полем — телефоном.
     * Если повесить его на оба, при пустой форме два соседних поля покажут
     * одинаковый текст, и пользователь решит, что обязательны оба.
     */
    case 'phone': {
      const value = values.phone.trim();
      if (value === '') {
        return values.email.trim() === ''
          ? 'Оставьте телефон или почту — иначе мы не сможем ответить'
          : undefined;
      }
      if (!isValidPhone(value))
        return 'Проверьте номер: российский вводится как +7 (999) 123-45-67';
      return undefined;
    }

    /** Почта проверяется только на формат: её отсутствие — не ошибка. */
    case 'email': {
      const value = values.email.trim();
      if (value === '') return undefined;
      if (!isValidEmail(value)) return 'Адрес выглядит неполным — проверьте, есть ли @ и домен';
      return undefined;
    }

    case 'topic': {
      if (values.topic === '') return 'Выберите тему обращения';
      if (!leadTopics.some((topic) => topic.value === values.topic))
        return 'Выберите тему из списка';
      return undefined;
    }

    case 'message': {
      if (values.message.length > MESSAGE_MAX_LENGTH)
        return `Сообщение длиннее ${MESSAGE_MAX_LENGTH} символов — сократите или напишите нам письмом`;
      return undefined;
    }

    case 'consent': {
      if (!values.consent)
        return 'Без согласия на обработку данных мы не вправе принять обращение';
      return undefined;
    }

    case 'company':
      return undefined;
  }
}

/** Набор полей формы в зависимости от её варианта (ТЗ FR-H8 против FR-C1). */
export type LeadFormVariant = 'compact' | 'full';

const FIELDS_BY_VARIANT: Record<LeadFormVariant, readonly (keyof LeadFormValues)[]> = {
  // Компактная форма на главной: имя, телефон, согласие (ТЗ FR-H8).
  // Поля почты в ней нет, поэтому телефон становится единственным каналом
  // связи — проверка «телефон или почта» превращается в «телефон обязателен»
  // сама собой, без отдельной ветки в правилах.
  compact: ['name', 'phone', 'consent'],
  full: ['name', 'phone', 'email', 'topic', 'message', 'consent'],
};

export function fieldsFor(variant: LeadFormVariant): readonly (keyof LeadFormValues)[] {
  return FIELDS_BY_VARIANT[variant];
}

export function validateForm(
  values: LeadFormValues,
  variant: LeadFormVariant = 'full',
): LeadFormErrors {
  const errors: LeadFormErrors = {};
  for (const field of FIELDS_BY_VARIANT[variant]) {
    const error = validateField(field, values);
    if (error) errors[field] = error;
  }
  return errors;
}

/**
 * Ключ со значением undefined не считается ошибкой: снятые ошибки остаются
 * в объекте состояния как undefined, и проверка по Object.keys посчитала бы
 * форму невалидной навсегда.
 */
export function hasErrors(errors: LeadFormErrors): boolean {
  return Object.values(errors).some((error) => Boolean(error));
}

/* ─── Антиспам ─────────────────────────────────────────────────────────── */

/**
 * Форма отклоняется молча, если сработал honeypot или её «заполнили»
 * быстрее человека. Молча — сознательно: подробное сообщение об отказе
 * помогает боту подстроиться, а живому пользователю оно не адресовано.
 */
export function looksLikeSpam(values: LeadFormValues, startedAt: number): boolean {
  if (values.company.trim() !== '') return true;
  return Date.now() - startedAt < MIN_FILL_TIME_MS;
}
