import type { InputHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/cn';

type CheckboxProps = {
  id: string;
  /** Подпись может содержать ссылку — поэтому это ReactNode, а не строка. */
  children: ReactNode;
  error?: string;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'className' | 'type' | 'children'>;

/**
 * Чекбокс согласия на обработку персональных данных (ТЗ FR-G3, BC-6).
 *
 * Нативный input с собственным оформлением через accent-color, а не
 * подменённый div с role="checkbox": состояние, клавиатура, чтение
 * скринридером и поведение внутри формы достаются готовыми.
 *
 * Зона нажатия расширена на весь текст подписи — на мобильном попасть
 * в квадрат 16×16 пальцем практически невозможно.
 */
export function Checkbox({ id, children, error, className, ...props }: CheckboxProps) {
  const errorId = `${id}-error`;

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div className="flex items-start gap-3">
        <input
          id={id}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            'mt-0.5 size-5 shrink-0 cursor-pointer rounded-sm border accent-accent',
            error ? 'border-danger' : 'border-hairline-strong',
          )}
          {...props}
        />

        <label htmlFor={id} className="cursor-pointer text-sm leading-relaxed text-ink-muted">
          {children}
        </label>
      </div>

      {error && (
        <p id={errorId} role="alert" className="text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
