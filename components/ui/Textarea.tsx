import type { TextareaHTMLAttributes } from 'react';

import { FieldShell, controlClasses, describedBy } from './FieldShell';

type TextareaProps = {
  id: string;
  label: string;
  error?: string;
  /** Максимальная длина; при указании выводится счётчик (ТЗ FR-G3). */
  maxLength?: number;
  value: string;
  className?: string;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id' | 'className' | 'value'>;

/**
 * Многострочное поле со счётчиком символов (ТЗ FR-G3).
 *
 * Счётчик обновляется через aria-live="polite": пользователь скринридера
 * узнаёт о приближении к лимиту, но объявление не перебивает набор текста.
 * Жёсткого maxLength на элементе нет намеренно — браузер молча обрезает
 * вставленный текст, и человек теряет часть сообщения, не поняв почему.
 * Ограничение проверяется валидацией и объясняется словами.
 */
export function Textarea({
  id,
  label,
  error,
  maxLength,
  value,
  className,
  required,
  rows = 5,
  ...props
}: TextareaProps) {
  const isOverLimit = maxLength !== undefined && value.length > maxLength;

  const hint =
    maxLength !== undefined ? (
      <span aria-live="polite" className={isOverLimit ? 'text-danger' : undefined}>
        {value.length} из {maxLength} символов
      </span>
    ) : undefined;

  return (
    <FieldShell
      id={id}
      label={label}
      hint={hint}
      error={error}
      required={required}
      className={className}
    >
      <textarea
        id={id}
        rows={rows}
        value={value}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={controlClasses(Boolean(error), 'resize-y min-h-32')}
        {...props}
      />
    </FieldShell>
  );
}
