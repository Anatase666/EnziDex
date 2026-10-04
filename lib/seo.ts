import type { Metadata } from 'next';

import { faqItems } from '@/content/faq';
import { ingredients, productCard } from '@/content/product';
import { requisites, site } from '@/content/site';
import { pageSeo, siteMeta } from '@/content/seo';
import { TODO_CONTENT, isFilled } from '@/content/types';
import { toPlainText } from './richText';

/**
 * Метаданные и структурированные данные (ТЗ 8.3).
 *
 * Один генератор на все страницы: так уникальность title/description
 * обеспечивается данными из content/seo.ts, а не дисциплиной автора.
 */

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? '';

/** Абсолютный URL с учётом подкаталога публикации. */
export function absoluteUrl(path: string): string {
  const clean = path === '/' ? '' : path.replace(/\/$/, '');
  return `${siteMeta.url.replace(/\/$/, '')}${BASE_PATH}${clean}/`;
}

/** Путь к статическому файлу с учётом basePath. */
export function assetPath(path: string): string {
  return `${BASE_PATH}${path}`;
}

type PageKey = keyof typeof pageSeo;

export function buildMetadata(page: PageKey): Metadata {
  const meta = pageSeo[page];
  const canonical = absoluteUrl(meta.path);

  // Картинку рисует app/opengraph-image.tsx, но ссылаемся мы не на адрес
  // файлового соглашения (/opengraph-image — без расширения), а на копию
  // с расширением, которую раскладывает scripts/finalize-og.mjs. Иначе
  // статический хостинг отдаёт её как application/octet-stream, и краулеры
  // соцсетей превью не строят.
  const ogImage = `${siteMeta.url.replace(/\/$/, '')}${assetPath(siteMeta.ogImage)}`;

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical },
    openGraph: {
      type: 'website',
      locale: siteMeta.locale,
      url: canonical,
      siteName: siteMeta.name,
      title: meta.title,
      description: meta.description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: siteMeta.ogImageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [ogImage],
    },
    robots:
      page === 'notFound'
        ? { index: false, follow: true }
        : { index: true, follow: true },
  };
}

/* ─── JSON-LD ──────────────────────────────────────────────────────────── */

/**
 * Организация — в layout, то есть на каждой странице (ТЗ 8.3).
 * Незаполненные реквизиты в разметку не попадают: пустое поле лучше поля
 * со строкой TODO_CONTENT, которую увидит поисковый робот.
 */
export function organizationJsonLd() {
  const address: Record<string, string> = { '@type': 'PostalAddress', addressCountry: 'RU' };
  if (isFilled(requisites.legalAddress)) address.streetAddress = requisites.legalAddress;

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: requisites.shortName,
    legalName: requisites.legalName,
    description: site.tagline,
    url: absoluteUrl('/'),
    address,
  };

  if (isFilled(requisites.inn)) data.taxID = requisites.inn;
  if (isFilled(requisites.ogrn)) data.identifier = requisites.ogrn;

  return data;
}

/** Продукт — на /product (ТЗ 8.3). */
export function productJsonLd() {
  const activeIngredient = ingredients.find((item) => item.isActive);

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: productCard.title,
    description: pageSeo.product.description,
    category: 'Средства гигиены полости рта',
    url: absoluteUrl('/product'),
    brand: { '@type': 'Brand', name: site.name },
    manufacturer: { '@type': 'Organization', name: requisites.shortName },
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Объём', value: '10 мл' },
      { '@type': 'PropertyValue', name: 'Форма выпуска', value: 'Гель' },
      { '@type': 'PropertyValue', name: 'Фториды', value: 'Не содержит' },
      { '@type': 'PropertyValue', name: 'Абразивные частицы', value: 'Не содержит' },
      { '@type': 'PropertyValue', name: 'Пероксиды', value: 'Не содержит' },
      ...(activeIngredient
        ? [
            {
              '@type': 'PropertyValue',
              name: 'Действующий компонент',
              value: activeIngredient.name,
            },
          ]
        : []),
    ],
  };

  // offers не публикуется: цены и канала продаж пока нет, а разметка
  // с выдуманным предложением — прямой путь к санкциям поисковика.
  return data;
}

/**
 * FAQPage — на /faq (ТЗ FR-F3).
 *
 * В разметку попадают только вопросы с фактическим ответом. Вопрос, ответ
 * на который ещё не получен от заказчика, из структурированных данных
 * исключается: сниппет с текстом TODO_CONTENT в выдаче хуже отсутствия
 * сниппета, и это прямое нарушение рекомендаций Google по качеству разметки.
 */
export function faqJsonLd() {
  const answered = faqItems.filter((item) => !item.answer.includes(TODO_CONTENT));

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: answered.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: toPlainText(item.answer) },
    })),
  };
}

/** Хлебные крошки для внутренних страниц. */
export function breadcrumbJsonLd(page: Exclude<PageKey, 'home' | 'notFound'>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Главная',
        item: absoluteUrl('/'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: pageSeo[page].title,
        item: absoluteUrl(pageSeo[page].path),
      },
    ],
  };
}
