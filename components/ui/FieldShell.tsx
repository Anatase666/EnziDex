import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

export type FieldShellProps = {
  id: string;
  label: string;
  /** Пояснение под полем — например, «одно из двух». */
  hint?: ReactNode;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
};

/** Идентификаторы описаний поля — их же перечисляет aria-describedby. */
export function describedBy(id: string, hint?: ReactNode, error?: string): string | undefined {
  const ids = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean);
  return ids.length > 0 ? ids.join(' ') : undefined;
}

/**
 * Обвязка поля формы: подпись, подсказка, сообщение об ошибке (ТЗ FR-G3).
 *
 * Подпись — настоящий <label for>, а не текст рядом: по нему работает
 * увеличенная зона нажатия и озвучивание поля скринридером.
 * Ошибка получает role="alert", поэтому объявляется сразу при появлении,
 * и связывается с полем через aria-describedby (ТЗ 8.2).
 */
export function FieldShell({
  id,
  label,
  hint,
  error,
  required,
  children,
  className,
}: FieldShellProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {required && (
          <>
            <span aria-hidden="true" className="ml-0.5 text-danger">
              *
            </span>
            <span className="sr-only"> (обязательное поле)</span>
          </>
        )}
      </label>

      {children}

      {/* Подсказка не прячется при ошибке: у поля сообщения это счётчик
          символов, и убирать его ровно в тот момент, когда лимит превышен,
          было бы издевательством. */}
      {hint && (
        <p id={`${id}-hint`} className="text-sm text-ink-muted">
          {hint}
        </p>
      )}

      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

/** Общие классы поля ввода — чтобы input, textarea и select выглядели одинаково. */
export function controlClasses(hasError: boolean, extra?: string): string {
  return cn(
    'w-full min-h-11 rounded-lg border bg-surface px-4 py-2.5 text-base text-ink',
    'placeholder:text-ink-muted/70 transition-colors',
    'focus:border-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2',
    'disabled:cursor-not-allowed disabled:bg-sunken disabled:text-ink-muted',
    hasError ? 'border-danger' : 'border-hairline-strong hover:border-ink-muted',
    extra,
  );
}
