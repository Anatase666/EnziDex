import type { SelectHTMLAttributes } from 'react';

import { FieldShell, controlClasses, describedBy } from './FieldShell';

type Option = { value: string; label: string };

type SelectProps = {
  id: string;
  label: string;
  error?: string;
  options: readonly Option[];
  /** Текст пункта-заглушки, пока выбор не сделан. */
  placeholder?: string;
  className?: string;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id' | 'className'>;

/**
 * Список выбора (ТЗ FR-G3).
 *
 * Нативный <select>, а не собственный выпадающий список: на мобильном он
 * открывает системный селектор, который удобнее любой самодельной реализации,
 * и бесплатно приносит клавиатурную навигацию и работу со скринридером.
 */
export function Select({
  id,
  label,
  error,
  options,
  placeholder = 'Выберите вариант',
  className,
  required,
  ...props
}: SelectProps) {
  return (
    <FieldShell id={id} label={label} error={error} required={required} className={className}>
      <div className="relative">
        <select
          id={id}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, undefined, error)}
          className={controlClasses(Boolean(error), 'appearance-none pr-11')}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Собственная стрелка: appearance-none убирает системную. */}
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
          className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-ink-muted"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9.5 6 6 6-6" />
        </svg>
      </div>
    </FieldShell>
  );
}
