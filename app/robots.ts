import type { MetadataRoute } from 'next';

import { absoluteUrl } from '@/lib/seo';

/**
 * robots.txt (ТЗ 8.3).
 *
 * Закрывать нечего: на статическом сайте нет ни личных кабинетов, ни
 * служебных разделов, ни параметров сортировки. Поэтому правило одно —
 * разрешить всё и указать адрес карты сайта.
 */
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${absoluteUrl('/').replace(/\/$/, '')}/sitemap.xml`,
    host: absoluteUrl('/').replace(/\/$/, ''),
  };
}
