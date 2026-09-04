import type { ElementType, ReactNode } from 'react';

import { cn } from '@/lib/cn';

type ContainerProps = {
  children: ReactNode;
  /** `default` — 1200px, `measure` — ширина комфортной строки для текста. */
  width?: 'default' | 'measure';
  as?: ElementType;
  className?: string;
};

/**
 * Горизонтальные рамки макета (ТЗ 7.5): максимум 1200px, боковые поля
 * 24px на мобильном и 40px от 1024px. Ни один блок не задаёт эти значения
 * сам — иначе они разъезжаются между секциями.
 */
export function Container({
  children,
  width = 'default',
  as: Tag = 'div',
  className,
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        'mx-auto w-full px-gutter lg:px-gutter-lg',
        width === 'default' ? 'max-w-page' : 'max-w-measure',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
