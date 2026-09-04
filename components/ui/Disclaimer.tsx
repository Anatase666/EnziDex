import type { ReactNode } from 'react';

import { RichText } from './RichText';
import { InfoIcon } from '@/components/icons';
import { cn } from '@/lib/cn';

type DisclaimerProps = {
  title?: string;
  /** Текст с ограниченной разметкой либо готовая разметка. */
  children: string | ReactNode;
  /**
   * `note` — нейтральная оговорка о статусе данных.
   * `gap`  — недостающие сведения, которые предоставляет заказчик.
   */
  tone?: 'note' | 'gap';
  className?: string;
};

const TONE: Record<NonNullable<DisclaimerProps['tone']>, string> = {
  note: 'bg-accent-soft/70 border-accent/25 text-ink',
  gap: 'bg-sunken border-hairline-strong text-ink',
};

/**
 * Блок с оговоркой (ТЗ FR-G4).
 *
 * Визуально отличим, но намеренно не тревожен: это не сообщение об ошибке.
 * Красный цвет и предупреждающие иконки здесь были бы неуместны — речь о
 * добросовестном уточнении статуса данных (BC-3), а не об опасности.
 */
export function Disclaimer({ title, children, tone = 'note', className }: DisclaimerProps) {
  return (
    <aside
      className={cn(
        'flex gap-4 rounded-xl border px-5 py-5 md:px-6',
        TONE[tone],
        className,
      )}
    >
      <InfoIcon className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />

      <div className="min-w-0">
        {title && <p className="mb-1.5 font-semibold text-ink">{title}</p>}
        {typeof children === 'string' ? (
          <RichText className="text-ink-muted [&>*:first-child]:mt-0">{children}</RichText>
        ) : (
          <div className="text-ink-muted">{children}</div>
        )}
      </div>
    </aside>
  );
}
