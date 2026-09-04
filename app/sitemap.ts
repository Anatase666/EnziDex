import type { MetadataRoute } from 'next';

import { pageSeo } from '@/content/seo';
import { absoluteUrl } from '@/lib/seo';

/**
 * Карта сайта (ТЗ 8.3).
 *
 * Собирается из того же источника, что и метаданные страниц: добавить
 * страницу и забыть про sitemap теперь невозможно. Служебная 404 исключена.
 *
 * priority намеренно не выставляется вручную: поисковые системы этот
 * параметр давно игнорируют, а расставленные «на глаз» веса только создают
 * видимость управления индексацией.
 */
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return Object.values(pageSeo)
    .filter((page) => page.path !== '/404')
    .map((page) => ({
      url: absoluteUrl(page.path),
      lastModified,
      changeFrequency: page.path === '/' ? 'monthly' : 'yearly',
    }));
}
