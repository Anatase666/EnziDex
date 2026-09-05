import type { Metadata, Viewport } from 'next';
import { Onest } from 'next/font/google';

import './globals.css';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { JsonLd } from '@/components/ui/JsonLd';
import { siteMeta } from '@/content/seo';
import { buildMetadata, organizationJsonLd } from '@/lib/seo';

/**
 * Гарнитура (ТЗ 7.3). Выбран Onest, а не Inter «по инерции»: Onest
 * спроектирован кириллицей вперёд, поэтому кириллические знаки в нём
 * нативные, а не адаптированные из латиницы во всех начертаниях — ровно то,
 * что требует критерий приёмки «кириллица корректна во всех начертаниях».
 * Переменный шрифт: весь диапазон 300–700 стоит одного файла.
 *
 * next/font скачивает файлы на этапе сборки и раздаёт их со своего домена —
 * запроса к Google Fonts в рантайме нет (ТЗ 6.1). display: swap плюс
 * предзагрузка дают отрисовку без скачка вёрстки.
 */
const onest = Onest({
  // Только те подмножества, которые действительно нужны сайту на русском.
  // Предзагружаются ровно эти два файла, остальные начертания и алфавиты
  // в загрузку страницы не попадают.
  subsets: ['cyrillic', 'latin'],
  // Список weight не указан намеренно: Onest — переменный шрифт, и весь
  // диапазон насыщенности приходит одним файлом на подмножество.
  // Перечисление весов здесь ничего не сэкономило бы, а создавало бы
  // впечатление, что за каждый из них платят отдельной загрузкой.
  display: 'swap',
  variable: '--font-onest',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMeta.url),
  ...buildMetadata('home'),
  title: {
    default: siteMeta.defaultTitle,
    template: siteMeta.titleTemplate,
  },
  applicationName: siteMeta.name,
  authors: [{ name: 'ООО «ЭНЗИДЕКС»' }],
  creator: 'ООО «ЭНЗИДЕКС»',
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // Цвет строки состояния в мобильных браузерах — фон страницы,
  // чтобы шапка не выглядела приклеенной к чужой полосе.
  themeColor: '#f1eff9',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={onest.variable}>
      <body className="flex min-h-dvh flex-col">
        {/* Обход навигации для клавиатуры и скринридеров (ТЗ 8.2). */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2.5 focus:text-ink-inverse"
        >
          Перейти к содержанию
        </a>

        <Header />

        <main id="main" className="flex-1">
          {children}
        </main>

        <Footer />

        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
