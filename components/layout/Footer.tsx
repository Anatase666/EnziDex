import Link from 'next/link';

import { Container } from './Container';
import { Logo } from './Logo';
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
 * Год подставляется на этапе сборки: сайт статический, и это ровно тот
 * случай, когда вычислять дату в браузере не нужно — достаточно
 * пересобрать сайт, что и так происходит при любой правке контента.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-hairline bg-surface">
      <Container>
        <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Бренд */}
          <div className="lg:col-span-4">
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

          {/* Контакты */}
          <div className="lg:col-span-3">
            <h2 className="text-sm font-semibold text-ink">{footer.contactsHeading}</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {contacts.map((channel) => (
                <li key={channel.kind} className="text-sm">
                  <span className="block text-ink-muted">{channel.label}</span>
                  <ContactValue channel={channel} />
                </li>
              ))}
            </ul>
          </div>

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
            ИНН <Value value={requisites.inn} pending="уточняется" />
            {' · '}
            ОГРН <Value value={requisites.ogrn} pending="уточняется" />
          </p>

          <p className="mt-3 max-w-3xl text-sm text-ink-muted">{footerDisclaimer}</p>
        </div>
      </Container>
    </footer>
  );
}

function ContactValue({ channel }: { channel: (typeof contacts)[number] }) {
  if (!isFilled(channel.value)) {
    return <Value value={channel.value} className="text-sm" />;
  }

  const href =
    channel.href ??
    (channel.kind === 'email'
      ? `mailto:${channel.value}`
      : channel.kind === 'phone'
        ? `tel:${channel.value.replace(/[^\d+]/g, '')}`
        : undefined);

  if (!href) return <span className="text-ink">{channel.value}</span>;

  return (
    <a href={href} className="text-ink transition-colors hover:text-accent-ink">
      {channel.value}
    </a>
  );
}
