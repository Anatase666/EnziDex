import type { NextConfig } from 'next';

/**
 * Подкаталог публикации (ТЗ 6.2). Для GitHub Pages это «/имя-репозитория»,
 * для собственного домена и для локальной разработки — пустая строка.
 * Держим значение в env, чтобы одна и та же сборка работала везде без правок кода.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? '';

const nextConfig: NextConfig = {
  // Статический экспорт: на выходе — папка out/ с готовым HTML (ТЗ 6.2).
  output: 'export',

  // trailingSlash даёт /product/index.html вместо /product.html —
  // это единственный вариант, который одинаково работает на GitHub Pages,
  // nginx и любом статическом хостинге без правил переписывания URL.
  trailingSlash: true,

  ...(basePath ? { basePath, assetPrefix: basePath } : {}),

  images: {
    // Оптимизатор Next требует сервер, которого при экспорте нет.
    // Изображения готовятся заранее в WebP/AVIF нужных размеров (ТЗ 6.2, 8.1).
    unoptimized: true,
  },

  reactStrictMode: true,

  // Заголовки безопасности (ТЗ 8.5) при статическом экспорте задаются на стороне
  // хостинга, а не здесь: см. docs/DEPLOY.md — там готовые конфиги для nginx,
  // Netlify, Vercel и Cloudflare Pages.
};

export default nextConfig;
