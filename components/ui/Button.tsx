import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'quiet';
type Size = 'md' | 'lg';

const BASE =
  // min-h-11 = 44px: минимальный размер зоны нажатия по ТЗ 9.
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg font-medium ' +
  'transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-55';

const VARIANT: Record<Variant, string> = {
  // Тёмная кнопка — единственный сильный контраст в интерфейсе (ТЗ 7.1).
  primary: 'bg-ink text-ink-inverse hover:bg-ink/90 active:bg-ink',
  secondary:
    'border border-hairline-strong bg-surface text-ink hover:border-ink',
  quiet: 'text-accent-ink hover:bg-accent-soft hover:text-accent-hover',
};

const SIZE: Record<Size, string> = {
  md: 'px-4 py-2.5 text-base',
  lg: 'px-6 py-3.5 text-lg',
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Растянуть на всю ширину контейнера — обычно нужно на мобильном. */
  block?: boolean;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>;

type ButtonAsLink = CommonProps & {
  href: string;
  /** Внешняя ссылка открывается в новой вкладке (ТЗ 9). */
  external?: boolean;
  /** Побочное действие при переходе — например, закрыть мобильное меню. */
  onClick?: () => void;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function classesFor(props: CommonProps): string {
  return cn(
    BASE,
    VARIANT[props.variant ?? 'primary'],
    SIZE[props.size ?? 'md'],
    props.block && 'w-full',
    props.className,
  );
}

/**
 * Кнопка и ссылка-кнопка (ТЗ FR-G4).
 *
 * Стрелки «→» в подписи не добавляются намеренно — ТЗ 7.4 прямо называет
 * этот приём шаблонным. Направление действия должно быть понятно из глагола.
 */
export function Button(props: ButtonProps) {
  const classes = classesFor(props);

  if ('href' in props) {
    if (props.external) {
      return (
        <a
          href={props.href}
          className={classes}
          onClick={props.onClick}
          target="_blank"
          rel="noopener noreferrer"
        >
          {props.children}
        </a>
      );
    }

    return (
      <Link href={props.href} className={classes} onClick={props.onClick}>
        {props.children}
      </Link>
    );
  }

  // variant / size / className / block уже учтены в classesFor и на <button>
  // не переносятся: они не являются валидными HTML-атрибутами.
  const { children, variant, size, className, block, ...rest } = props;

  return (
    <button type="button" {...rest} className={classes}>
      {children}
    </button>
  );
}
