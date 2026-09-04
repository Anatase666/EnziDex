import { leadTopics } from '@/content/site';
import { normalizePhone } from './validation';
import type { LeadFormValues } from './validation';

/**
 * Единая точка отправки заявок (ТЗ FR-G3).
 *
 * Сайт статический, серверных обработчиков нет, поэтому заявка уходит во
 * внешний сервис. Какой именно — решает переменная окружения, а не код
 * компонента: смена транспорта затрагивает только этот файл.
 *
 * ⚠️ Юридическое замечание к выбору транспорта. Вариант A из ТЗ (Formspree)
 * разворачивается быстрее всех, но его серверы находятся за пределами РФ.
 * Для оператора-резидента это трансграничная передача персональных данных
 * со всеми вытекающими требованиями 152-ФЗ, включая локализацию баз.
 * Вариант B (собственная serverless-функция, пересылающая заявку в Telegram)
 * этой проблемы лишён при размещении функции в подходящей юрисдикции.
 * Подробнее — docs/CONTENT-GAPS.md, раздел «Требует решения заказчика».
 */

export type LeadPayload = LeadFormValues & {
  /** Откуда отправлена заявка — помогает понять, какая страница работает. */
  sourcePath: string;
  /** Вариант формы: компактная с главной или полная со страницы контактов. */
  variant: 'compact' | 'full';
};

export type LeadFailureReason = 'network' | 'server' | 'config' | 'rejected';

export type LeadResult =
  | { ok: true }
  | { ok: false; reason: LeadFailureReason; message: string };

type Transport = 'formspree' | 'webhook' | 'console';

const REQUEST_TIMEOUT_MS = 15_000;

function resolveTransport(): Transport {
  const raw = (process.env.NEXT_PUBLIC_LEAD_TRANSPORT ?? 'console').trim().toLowerCase();
  if (raw === 'formspree' || raw === 'webhook' || raw === 'console') return raw;
  return 'console';
}

/** Человекочитаемая тема обращения вместо служебного кода. */
function topicLabel(value: string): string {
  return leadTopics.find((topic) => topic.value === value)?.label ?? value;
}

/**
 * Приводит значения формы к плоскому виду для отправки.
 * Honeypot-поле сюда не попадает: до транспорта дело доходит только после
 * антиспам-проверки, и передавать служебное поле дальше незачем.
 */
function toRequestBody(payload: LeadPayload): Record<string, string> {
  const body: Record<string, string> = {
    name: payload.name.trim(),
    source: payload.sourcePath,
    form: payload.variant === 'compact' ? 'Компактная форма' : 'Полная форма',
  };

  const phone = normalizePhone(payload.phone);
  if (phone) body.phone = phone;

  const email = payload.email.trim();
  if (email) body.email = email;

  if (payload.topic) body.topic = topicLabel(payload.topic);

  const message = payload.message.trim();
  if (message) body.message = message;

  // Тема письма в почтовом уведомлении Formspree.
  body._subject = `Заявка с сайта ЭнзиДекс — ${body.topic ?? 'без темы'}`;

  return body;
}

async function postJson(url: string, body: Record<string, string>): Promise<LeadResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    if (response.ok) return { ok: true };

    // 4xx почти всегда означает ошибку настройки: не тот endpoint,
    // не подтверждённый адрес, исчерпанный лимит тарифа.
    if (response.status >= 400 && response.status < 500) {
      return {
        ok: false,
        reason: 'config',
        message: `Сервис приёма заявок ответил кодом ${response.status}.`,
      };
    }

    return {
      ok: false,
      reason: 'server',
      message: `Сервис приёма заявок временно недоступен (код ${response.status}).`,
    };
  } catch (error) {
    const aborted = error instanceof DOMException && error.name === 'AbortError';
    return {
      ok: false,
      reason: 'network',
      message: aborted
        ? 'Сервис не ответил за отведённое время.'
        : 'Не удалось связаться с сервисом приёма заявок.',
    };
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Отправляет заявку выбранным транспортом.
 * Исключения наружу не выбрасываются: вызывающий компонент всегда получает
 * результат и по нему решает, что показать пользователю.
 */
export async function submitLead(payload: LeadPayload): Promise<LeadResult> {
  const transport = resolveTransport();
  const body = toRequestBody(payload);

  switch (transport) {
    case 'formspree': {
      const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT?.trim();
      if (!endpoint) {
        return {
          ok: false,
          reason: 'config',
          message: 'Адрес сервиса приёма заявок не задан.',
        };
      }
      return postJson(endpoint, body);
    }

    case 'webhook': {
      const endpoint = process.env.NEXT_PUBLIC_LEAD_WEBHOOK_URL?.trim();
      if (!endpoint) {
        return {
          ok: false,
          reason: 'config',
          message: 'Адрес обработчика заявок не задан.',
        };
      }
      return postJson(endpoint, body);
    }

    case 'console': {
      // Режим разработки: заявка никуда не уходит. Отдельный транспорт нужен,
      // чтобы форму можно было проверять целиком, не расходуя лимит сервиса
      // и не засоряя почту получателя тестовыми обращениями.
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.info('[submitLead] транспорт не настроен, заявка не отправлена:', body);
      }
      return {
        ok: false,
        reason: 'config',
        message: 'Приём заявок ещё не подключён.',
      };
    }
  }
}

/**
 * Текст, который видит пользователь при неудаче. Требование ТЗ:
 * не «Ошибка», а объяснение и запасной путь. Адрес почты подставляется
 * вызывающим кодом — он знает, заполнен ли контакт в content/site.ts.
 */
export function failureMessage(result: Extract<LeadResult, { ok: false }>, fallbackEmail?: string): string {
  const suffix = fallbackEmail
    ? ` Напишите нам на ${fallbackEmail} — ответим в тот же день.`
    : ' Попробуйте отправить заявку ещё раз через несколько минут.';

  switch (result.reason) {
    case 'network':
      return `Не удалось отправить заявку: похоже, пропала связь.${suffix}`;
    case 'server':
      return `Не удалось отправить заявку: сервис приёма обращений временно недоступен.${suffix}`;
    case 'config':
      return `Не удалось отправить заявку: приём обращений на сайте ещё настраивается.${suffix}`;
    case 'rejected':
      return `Заявка не принята.${suffix}`;
  }
}
