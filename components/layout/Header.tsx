'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Container } from './Container';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { Button } from '@/components/ui/Button';
import { MenuIcon } from '@/components/icons';
import { mainNav } from '@/content/site';
import { cn } from '@/lib/cn';
import { isActivePath, normalizePath } from '@/lib/paths';

/** Порог появления фона у шапки, px (ТЗ FR-G1). */
const SCROLL_THRESHOLD = 80;

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /** На странице контактов вести на неё же незачем (ТЗ FR-G1). */
  const showCta = normalizePath(pathname) !== '/contacts';

  useEffect(() => {
    // Чтение scrollY внутри rAF: обработчик скролла не должен вызывать
    // пересчёт стилей на каждое событие.
    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
        ticking = false;
      });
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /** Переход по ссылке не размонтирует шапку — меню закрываем вручную. */
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 transition-colors duration-200',
          isScrolled
            ? 'border-b border-hairline bg-page/85 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <Container>
          <div className="flex h-header items-center justify-between gap-6">
            <Link
              href="/"
              aria-label="ЭнзиДекс, на главную"
              className="shrink-0 text-ink"
            >
              <Logo />
            </Link>

            <nav aria-label="Основная навигация" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {mainNav.map((item) => {
                  const active = isActivePath(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'inline-flex min-h-11 items-center rounded-lg px-3 text-base transition-colors',
                          active
                            ? 'font-medium text-accent-ink'
                            : 'text-ink-muted hover:text-ink',
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              {/* Скрытие вынесено на обёртку, а не на саму кнопку: у Button
                  в базовых классах уже есть inline-flex, и второй утилитой
                  display на том же элементе управлять нельзя — какая из двух
                  победит, решает порядок правил в собранном CSS, а не порядок
                  слов в className. */}
              {showCta && (
                <div className="hidden lg:block">
                  <Button href="/contacts">Оставить заявку</Button>
                </div>
              )}

              <button
                type="button"
                onClick={() => setIsMenuOpen(true)}
                aria-label="Открыть меню"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                className="-mr-2 inline-flex size-11 items-center justify-center rounded-lg text-ink transition-colors hover:bg-sunken lg:hidden"
              >
                <MenuIcon className="size-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        pathname={pathname}
        showCta={showCta}
      />
    </>
  );
}
