'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef } from 'react';

import { CloseIcon } from '@/components/icons';
import { Logo } from './Logo';
import { mainNav } from '@/content/site';
import { cn } from '@/lib/cn';
import { isActivePath } from '@/lib/paths';

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  pathname: string | null;
};

/**
 * Мобильное меню во весь экран
 */
export function MobileMenu({ isOpen, onClose, pathname }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  /** Элемент, с которого меню открыли, — чтобы вернуть на него фокус. */
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((element) => element.offsetParent !== null);

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;

    // Блокировка скролла body с компенсацией ширины скроллбара —
    // без неё вёрстка дёргается в момент открытия на десктопных браузерах.
    const { body } = document;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;

    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    document.addEventListener('keydown', handleKeyDown);
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
      document.removeEventListener('keydown', handleKeyDown);
      window.clearTimeout(focusTimer);
      previouslyFocused.current?.focus();
    };
  }, [isOpen, handleKeyDown]);

  // Ранний выход только после хуков: порядок вызова хуков должен быть
  // одинаковым при каждом рендере. Атрибут hidden здесь не годится —
  // UA-правило [hidden]{display:none} слабее классов Tailwind и проигрывает
  // display:flex, из-за чего «скрытая» панель осталась бы на экране.
  if (!isOpen) return null;

  return (
    <div
      id="mobile-menu"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Меню навигации"
      onMouseDown={(event) => {
        // Нажатие мимо содержимого панели закрывает меню.
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-page lg:hidden"
    >
      <div className="flex h-header shrink-0 items-center justify-between px-gutter">
        <Link href="/" onClick={onClose} aria-label="ЭнзиДекс, на главную">
          <Logo withDescriptor={false} />
        </Link>

        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Закрыть меню"
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-lg text-ink transition-colors hover:bg-sunken"
        >
          <CloseIcon className="size-6" aria-hidden="true" />
        </button>
      </div>

      <nav aria-label="Основная навигация" className="px-gutter pt-4 pb-8">
        <ul className="divide-y divide-hairline border-y border-hairline">
          {mainNav.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex flex-col gap-1 py-4',
                    active ? 'text-accent-ink' : 'text-ink',
                  )}
                >
                  <span className="text-xl font-medium">{item.label}</span>
                  {item.hint && (
                    <span className="text-sm text-ink-muted">{item.hint}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
