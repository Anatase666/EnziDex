import type { Metadata, Viewport } from 'next';
import { Onest } from 'next/font/google';

import './globals.css';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { JsonLd } from '@/components/ui/JsonLd';
import { siteMeta } from '@/content/seo';
import { buildMetadata, organizationJsonLd } from '@/lib/seo';


const onest = Onest({
  subsets: ['cyrillic', 'latin'],
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
  themeColor: '#f1eff9',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={onest.variable}>
      <body className="flex min-h-dvh flex-col">
        {/* Обход навигации для клавиатуры и скринридеров */}
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
