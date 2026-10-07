import Link from 'next/link';

import { Container } from './Container';
import { Logo } from './Logo';
import { Value } from '@/components/ui/Value';
import {
  contacts,
  footer,
  footerDisclaimer,
  mainNav,
  requisiteLabels,
  requisites,
  supporters,
} from '@/content/site';
import { isFilled } from '@/content/types';
import { assetPath } from '@/lib/seo';

/**
 * Подвал (ТЗ FR-G2).
 */
/** В подвале по просьбе заказчика только ИНН. */
const REQUISITE_KEYS = ['inn'] as const;

export function Footer() {
  const year = new Date().getFullYear();
  const visibleContacts = contacts.filter((channel) => isFilled(channel.value));

  return (
    <footer className="mt-auto border-t border-hairline bg-surface">
      <Container>
        {/* Один компактный ряд: бренд, разделы, изготовитель. Реквизитов
            всего два, поэтому отдельная полоса под ними не нужна — они стоят
            третьей колонкой рядом с навигацией. */}
        <div className="grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* Бренд */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Logo withDescriptor={false} />
            <p className="mt-3 max-w-xs text-sm text-ink-muted">{footer.brandNote}</p>

            {/* Логотипы поддержки — под описанием компании, одной строкой
                одинаковой высоты: так они читаются как подпись бренда,
                а не как рекламный блок. */}
            <div className="mt-6">
              <p className="text-xs text-ink-muted">{supporters.heading}</p>
              <ul className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-3">
                {supporters.logos.map((logo) => (
                  <li key={logo.src}>
                    {/* eslint-disable-next-line @next/next/no-img-element -- статический экспорт */}
                    <img
                      src={assetPath(logo.src)}
                      alt={logo.alt}
                      width={logo.width}
                      height={logo.height}
                      loading="lazy"
                      decoding="async"
                      className="block h-12 w-auto"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Навигация */}
          <nav aria-label="Разделы сайта" className="lg:col-span-3">
            <h2 className="text-sm font-semibold text-ink">{footer.navHeading}</h2>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2">
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

          {/* Изготовитель. Наименование стоит сразу под заголовком:
              отдельная подпись с тем же словом читалась бы как повтор. */}
          <div className="lg:col-span-5">
            <h2 className="text-sm font-semibold text-ink">{footer.requisitesHeading}</h2>
            <p className="mt-3 text-sm text-ink">{requisites.shortName}</p>
            <dl className="mt-2 flex flex-col gap-1 text-sm">
              {REQUISITE_KEYS.map((key) => (
                <div key={key} className="flex flex-wrap gap-x-2">
                  <dt className="text-ink-muted">{requisiteLabels[key]}:</dt>
                  <dd className="text-ink">
                    <Value value={requisites[key] ?? ''} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Контакты — только если есть что показать */}
          {visibleContacts.length > 0 && (
            <div className="lg:col-span-3">
              <h2 className="text-sm font-semibold text-ink">{footer.contactsHeading}</h2>
              <ul className="mt-3 flex flex-col gap-2">
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
        </div>

        <p className="border-t border-hairline py-5 text-xs text-ink-muted">
          © {year} {requisites.shortName}. {footerDisclaimer}
        </p>
      </Container>
    </footer>
  );
}
