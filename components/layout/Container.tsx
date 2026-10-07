import type { ElementType, ReactNode } from 'react';

import { cn } from '@/lib/cn';

type ContainerProps = {
  children: ReactNode;
  /** `default` — 1200px, `measure` — ширина комфортной строки для текста. */
  width?: 'default' | 'measure';
  as?: ElementType;
  className?: string;
};

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
