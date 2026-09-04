import type { InputHTMLAttributes, ReactNode } from 'react';

import { FieldShell, controlClasses, describedBy } from './FieldShell';

type InputProps = {
  id: string;
  label: string;
  hint?: ReactNode;
  error?: string;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'className'>;

/**
 * Текстовое поле (ТЗ FR-G3).
 *
 * type и inputMode задаются вызывающим кодом: у телефона это type="tel"
 * и inputMode="tel", у почты — type="email" и inputMode="email".
 * Критерий приёмки ТЗ 9 требует, чтобы на мобильном открывалась клавиатура
 * нужного типа, а это определяется именно этой парой атрибутов.
 */
export function Input({ id, label, hint, error, className, required, ...props }: InputProps) {
  return (
    <FieldShell
      id={id}
      label={label}
      hint={hint}
      error={error}
      required={required}
      className={className}
    >
      <input
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={controlClasses(Boolean(error))}
        {...props}
      />
    </FieldShell>
  );
}
