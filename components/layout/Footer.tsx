import Link from 'next/link';

import { Container } from './Container';
import { Logo } from './Logo';
import { RichText } from '@/components/ui/RichText';
import { Value } from '@/components/ui/Value';
import {
  contacts,
  footer,
  footerDisclaimer,
  legalNav,
  mainNav,
  requisites,
  site,
} from '@/content/site';
import { isFilled } from '@/content/types';

/**
 * Подвал (ТЗ FR-G2).
 *
 * Колонка контактов выводится только если заполнен хотя бы один канал.
 * Пока данных нет, она не показывается вовсе — это заодно совпадает с
 * решением убрать с сайта раздел контактов: показывать столбец из трёх
 * строк-заглушек было бы хуже, чем не показывать ничего.
 *
 * Год подставляется на этапе сборки: сайт статический, и это ровно тот
 * случай, когда вычислять дату в браузере не нужно — достаточно
 * пересобрать сайт, что и так происходит при любой правке контента.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const visibleContacts = contacts.filter((channel) => isFilled(channel.value));

  return (
    <footer className="mt-auto border-t border-hairline bg-surface">
      <Container>
        <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Бренд */}
          <div className="lg:col-span-5">
            <Logo withDescriptor={false} />
            <p className="mt-4 max-w-xs text-sm text-ink-muted">{footer.brandNote}</p>
            <p className="mt-3 max-w-xs text-sm text-ink-muted">{site.tagline}</p>
          </div>

          {/* Навигация */}
          <nav aria-label="Разделы сайта" className="lg:col-span-3">
            <h2 className="text-sm font-semibold text-ink">{footer.navHeading}</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink-muted transition-colors hover:text-accent-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Контакты — только если есть что показать */}
          {visibleContacts.length > 0 && (
            <div className="lg:col-span-2">
              <h2 className="text-sm font-semibold text-ink">{footer.contactsHeading}</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {visibleContacts.map((channel) => (
                  <li key={channel.kind} className="text-sm">
                    <span className="block text-ink-muted">{channel.label}</span>
                    <a
                      href={
                        channel.href ??
                        (channel.kind === 'email'
                          ? `mailto:${channel.value}`
                          : `tel:${channel.value.replace(/[^\d+]/g, '')}`)
                      }
                      className="text-ink transition-colors hover:text-accent-ink"
                    >
                      {channel.value}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Документы */}
          <nav aria-label="Юридические документы" className="lg:col-span-2">
            <h2 className="text-sm font-semibold text-ink">{footer.legalHeading}</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink-muted transition-colors hover:text-accent-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Нижняя строка */}
        <div className="border-t border-hairline py-8">
          <p className="text-sm text-ink-muted">
            © {year} {requisites.shortName}
            {' · '}
            ИНН <Value value={requisites.inn} />
            {' · '}
            ОГРН <Value value={requisites.ogrn} />
          </p>

          {/* Через RichText, а не как обычный текст: в дисклеймере есть
              незаполненное место, и оно должно выглядеть пометкой, а не
              служебным маркером. */}
          <RichText measure={false} className="mt-3 max-w-3xl text-sm text-ink-muted">
            {footerDisclaimer}
          </RichText>
        </div>
      </Container>
    </footer>
  );
}
