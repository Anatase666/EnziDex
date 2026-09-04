'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useId, useRef, useState } from 'react';
import type { FormEvent } from 'react';

import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { CheckIcon, SpinnerIcon } from '@/components/icons';
import { contacts, leadTopics, responseTime } from '@/content/site';
import { isFilled } from '@/content/types';
import { cn } from '@/lib/cn';
import { failureMessage, submitLead } from '@/lib/submitLead';
import {
  MESSAGE_MAX_LENGTH,
  emptyLeadForm,
  fieldsFor,
  formatPhone,
  hasErrors,
  looksLikeSpam,
  validateField,
  validateForm,
} from '@/lib/validation';
import type { LeadFormErrors, LeadFormValues, LeadFormVariant } from '@/lib/validation';

type Status = 'idle' | 'submitting' | 'success' | 'error';

type LeadFormProps = {
  variant?: LeadFormVariant;
  className?: string;
};

/**
 * Форма заявки (ТЗ FR-G3) — один компонент на все места, где она нужна.
 *
 * Состояния: idle → submitting → success | error. В submitting кнопка
 * заблокирована, что вместе с проверкой статуса в обработчике закрывает
 * и двойной клик, и повторную отправку.
 *
 * Валидация срабатывает на blur и перед отправкой. До первого blur поле
 * не подсвечивается красным: ругаться на человека за то, что он ещё не
 * закончил печатать, — плохая идея.
 */
export function LeadForm({ variant = 'full', className }: LeadFormProps) {
  const pathname = usePathname();
  const baseId = useId();
  const fieldId = (name: string) => `${baseId}-${name}`;

  const [values, setValues] = useState<LeadFormValues>(emptyLeadForm);
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof LeadFormValues, boolean>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [formMessage, setFormMessage] = useState('');

  /** Время появления формы — часть антиспам-проверки (ТЗ FR-G3). */
  const startedAt = useRef(Date.now());

  const fields = fieldsFor(variant);
  const isFullForm = variant === 'full';

  const fallbackEmail = contacts.find(
    (channel) => channel.kind === 'email' && isFilled(channel.value),
  )?.value;

  function update<K extends keyof LeadFormValues>(field: K, value: LeadFormValues[K]) {
    const next = { ...values, [field]: value };
    setValues(next);

    // Пересчитываются все поля, которые пользователь уже трогал, а не только
    // изменённое: правило «телефон или почта» связывает два поля, и ошибка
    // на телефоне обязана исчезнуть, как только заполнена почта.
    // Нетронутые поля не проверяются — ругаться на человека за то,
    // что он ещё не дошёл до поля, незачем.
    setErrors((current) => {
      const updated: LeadFormErrors = { ...current };
      for (const key of fields) {
        if (touched[key]) updated[key] = validateField(key, next);
      }
      return updated;
    });
  }

  function handleBlur(field: keyof LeadFormValues) {
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors((current) => ({ ...current, [field]: validateField(field, values) }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'submitting') return;

    const nextErrors = validateForm(values, variant);
    setErrors(nextErrors);
    setTouched(Object.fromEntries(fields.map((field) => [field, true])));

    if (hasErrors(nextErrors)) {
      // Фокус на первое поле с ошибкой: иначе на длинной форме
      // пользователь не понимает, почему отправка не сработала.
      const firstInvalid = fields.find((field) => nextErrors[field]);
      if (firstInvalid) document.getElementById(fieldId(firstInvalid))?.focus();
      return;
    }

    if (looksLikeSpam(values, startedAt.current)) {
      // Молча имитируем успех: подробный отказ помогает боту подстроиться.
      setStatus('success');
      return;
    }

    setStatus('submitting');
    setFormMessage('');

    const result = await submitLead({
      ...values,
      sourcePath: pathname ?? '/',
      variant,
    });

    if (result.ok) {
      setStatus('success');
      return;
    }

    setStatus('error');
    setFormMessage(failureMessage(result, fallbackEmail));
  }

  if (status === 'success') {
    return <SuccessState className={className} />;
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={cn('flex flex-col gap-5', className)}>
      <Input
        id={fieldId('name')}
        name="name"
        label="Как к вам обращаться"
        required
        autoComplete="name"
        value={values.name}
        onChange={(event) => update('name', event.target.value)}
        onBlur={() => handleBlur('name')}
        error={errors.name}
        placeholder="Имя"
      />

      <Input
        id={fieldId('phone')}
        name="phone"
        label="Телефон"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        value={values.phone}
        onChange={(event) => update('phone', formatPhone(event.target.value))}
        onBlur={() => handleBlur('phone')}
        error={errors.phone}
        placeholder="+7 (___) ___-__-__"
        hint={isFullForm ? 'Достаточно телефона или почты' : undefined}
      />

      {isFullForm && (
        <Input
          id={fieldId('email')}
          name="email"
          label="Электронная почта"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={values.email}
          onChange={(event) => update('email', event.target.value)}
          onBlur={() => handleBlur('email')}
          error={errors.email}
          placeholder="name@example.com"
        />
      )}

      {isFullForm && (
        <Select
          id={fieldId('topic')}
          name="topic"
          label="Тема обращения"
          required
          options={leadTopics}
          value={values.topic}
          onChange={(event) => update('topic', event.target.value)}
          onBlur={() => handleBlur('topic')}
          error={errors.topic}
        />
      )}

      {isFullForm && (
        <Textarea
          id={fieldId('message')}
          name="message"
          label="Сообщение"
          maxLength={MESSAGE_MAX_LENGTH}
          value={values.message}
          onChange={(event) => update('message', event.target.value)}
          onBlur={() => handleBlur('message')}
          error={errors.message}
          placeholder="Что вас интересует?"
        />
      )}

      <Honeypot
        id={fieldId('company')}
        value={values.company}
        onChange={(value) => update('company', value)}
      />

      <Checkbox
        id={fieldId('consent')}
        name="consent"
        checked={values.consent}
        onChange={(event) => update('consent', event.target.checked)}
        onBlur={() => handleBlur('consent')}
        error={errors.consent}
      >
        Я согласен на обработку персональных данных в соответствии с{' '}
        <Link href="/privacy" className="link">
          политикой конфиденциальности
        </Link>
      </Checkbox>

      {status === 'error' && formMessage && (
        <p role="alert" className="rounded-lg bg-danger-soft px-4 py-3 text-sm text-danger">
          {formMessage}
        </p>
      )}

      <div className="flex flex-col gap-3">
        <Button type="submit" size="lg" disabled={status === 'submitting'} block>
          {status === 'submitting' ? (
            <>
              <SpinnerIcon className="size-5" aria-hidden="true" />
              Отправляем
            </>
          ) : (
            'Отправить заявку'
          )}
        </Button>

        <p className="text-sm text-ink-muted">{responseTime.full}</p>
      </div>
    </form>
  );
}

/**
 * Honeypot (ТЗ FR-G3).
 *
 * Скрыт и от глаза, и от скринридера: aria-hidden убирает его из дерева
 * доступности, tabIndex={-1} — из порядка обхода. Прятать через display:none
 * нельзя, часть ботов такие поля игнорирует. Название «company» выбрано
 * правдоподобным — автозаполнителю есть что предложить, а живой человек
 * поля не увидит.
 */
function Honeypot({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor={id}>Организация</label>
      <input
        id={id}
        name="company"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

function SuccessState({ className }: { className?: string }) {
  return (
    <div
      role="status"
      className={cn(
        'flex flex-col items-start gap-4 rounded-xl border border-accent/25 bg-accent-soft/70 p-7',
        className,
      )}
    >
      <span className="inline-flex size-11 items-center justify-center rounded-full bg-accent text-ink-inverse">
        <CheckIcon className="size-6" aria-hidden="true" />
      </span>

      <div>
        <p className="text-xl font-semibold text-ink">Заявка отправлена</p>
        <p className="mt-2 text-ink-muted">
          Спасибо. {responseTime.full} Если вопрос срочный, напишите или позвоните напрямую —
          контакты есть в подвале сайта.
        </p>
      </div>
    </div>
  );
}
