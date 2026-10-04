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
 * Отдельной страницы «Юридические данные» нет: реквизиты изготовителя
 * выводятся в нижней части подвала, как это принято на сайтах, — то есть
 * внизу каждой страницы, включая главную. Незаполненные поля видны как
 * «Требует корректировки».
 *
 * Год подставляется на этапе сборки: сайт статический, и это ровно тот
 * случай, когда вычислять дату в браузере не нужно — достаточно
 * пересобрать сайт, что и так происходит при любой правке контента.
 */
const REQUISITE_KEYS = ['inn', 'ogrn', 'kpp', 'legalAddress', 'actualAddress'] as const;

export function Footer() {
  const year = new Date().getFullYear();
  const visibleContacts = contacts.filter((channel) => isFilled(channel.value));

  return (
    <footer className="mt-auto border-t border-hairline bg-surface">
      <Container>
        <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Бренд */}
          <div className="lg:col-span-6">
            <Logo withDescriptor={false} />
            <p className="mt-4 max-w-xs text-sm text-ink-muted">{footer.brandNote}</p>
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
            <div className="lg:col-span-3">
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
        </div>

        {/* Реквизиты изготовителя, копирайт, дисклеймер */}
        <div className="border-t border-hairline py-8">
          {/* Полное наименование стоит сразу под заголовком «Изготовитель»:
              отдельная подпись с тем же словом читалась бы как повтор. */}
          <h2 className="text-sm font-semibold text-ink">{footer.requisitesHeading}</h2>
          <p className="mt-2 text-sm text-ink">{requisites.legalName}</p>

          <dl className="mt-4 grid gap-x-8 gap-y-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
            {REQUISITE_KEYS.map((key) => (
              <div key={key}>
                <dt className="text-ink-muted">{requisiteLabels[key]}</dt>
                <dd className="mt-0.5 text-ink">
                  <Value value={requisites[key] ?? ''} />
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 max-w-3xl border-t border-hairline pt-6 text-sm text-ink-muted">
            © {year} {requisites.shortName}. {footerDisclaimer}
          </p>
        </div>
      </Container>
    </footer>
  );
}
