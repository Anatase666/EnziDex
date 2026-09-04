import type { ElementType, ReactNode } from 'react';

import { cn } from '@/lib/cn';

type CardProps = {
  children: ReactNode;
  /**
   * `outline` — белая плоскость с границей, без тени. Основной вариант.
   * `raised`  — с тенью. Только там, где элемент действительно поднят
   *             над потоком: карточка продукта, форма.
   * `sunken`  — утопленная плоскость для второстепенных сведений.
   */
  tone?: 'outline' | 'raised' | 'sunken';
  padding?: 'sm' | 'md' | 'lg';
  as?: ElementType;
  className?: string;
};

const TONE: Record<NonNullable<CardProps['tone']>, string> = {
  outline: 'bg-surface border border-hairline',
  raised: 'bg-surface border border-hairline shadow-card',
  sunken: 'bg-sunken',
};

const PADDING: Record<NonNullable<CardProps['padding']>, string> = {
  sm: 'p-5',
  md: 'p-6 md:p-7',
  lg: 'p-7 md:p-9',
};

/**
 * Плоскость с фоном (ТЗ FR-G4).
 *
 * Осознанно не используется как обёртка по умолчанию: ТЗ 7.4 запрещает
 * превращать весь контент в одинаковые карточки с одинаковым радиусом и
 * одинаковой тенью. Тень здесь — исключение (tone="raised"), а не норма.
 */
export function Card({
  children,
  tone = 'outline',
  padding = 'md',
  as: Tag = 'div',
  className,
}: CardProps) {
  return (
    <Tag className={cn('rounded-xl', TONE[tone], PADDING[padding], className)}>
      {children}
    </Tag>
  );
}
