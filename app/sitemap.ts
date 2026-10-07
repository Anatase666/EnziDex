import type { MetadataRoute } from 'next';

import { pageSeo } from '@/content/seo';
import { absoluteUrl } from '@/lib/seo';

/**
 * Карта сайта
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
