import { ImageResponse } from 'next/og';

/**
 * OG-изображение 1200×630 (ТЗ 8.3).
 *
 * Генерируется на этапе сборки и кладётся в out/ как обычный PNG —
 * статическому экспорту это не мешает, рантайм не нужен.
 *
 * Шрифт подгружается явно: встроенная гарнитура Satori покрывает кириллицу
 * не во всех начертаниях, а превью с прямоугольниками вместо букв — худшая
 * из возможных визиток ссылки. Берём тот же Onest, что и на сайте.
 */

/** Обязательно при output: 'export' — картинка печётся один раз при сборке. */
export const dynamic = 'force-static';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt =
  'ЭнзиДекс — гель с ферментом декстраназой для ухода за полостью рта, 10 мл';

/**
 * Satori читает ttf и otf, но не woff2 и не eot.
 *
 * Формат отдачи Google Fonts зависит от User-Agent: современному браузеру
 * достаётся woff2, Internet Explorer — eot, и оба варианта здесь бесполезны.
 * Старый эндпоинт css (v1) без заголовка User-Agent отдаёт честный ttf —
 * им и пользуемся. Заодно это полная гарнитура, а не подмножество, поэтому
 * кириллица в ней точно есть.
 */
async function loadOnest(weight: 400 | 600): Promise<ArrayBuffer | null> {
  try {
    const cssResponse = await fetch(
      `https://fonts.googleapis.com/css?family=Onest:${weight}`,
    );
    if (!cssResponse.ok) return null;

    const css = await cssResponse.text();
    const match = css.match(/url\((https:\/\/[^)]+\.ttf)\)/);
    const url = match?.[1];
    if (!url) return null;

    const fontResponse = await fetch(url);
    if (!fontResponse.ok) return null;

    return await fontResponse.arrayBuffer();
  } catch {
    // Сборка не должна падать из-за недоступности шрифтового CDN:
    // без него Satori возьмёт запасную гарнитуру.
    return null;
  }
}

export default async function OpengraphImage() {
  const [regular, semibold] = await Promise.all([loadOnest(400), loadOnest(600)]);

  const fonts = [
    ...(regular ? [{ name: 'Onest', data: regular, weight: 400 as const, style: 'normal' as const }] : []),
    ...(semibold ? [{ name: 'Onest', data: semibold, weight: 600 as const, style: 'normal' as const }] : []),
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#EEF3F2',
          fontFamily: 'Onest',
          padding: '72px 80px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="60" height="60" viewBox="0 0 32 32" fill="none">
            <circle cx="10.4" cy="19.4" r="4.1" stroke="#1E7F72" strokeWidth="2.4" />
            <circle cx="19.6" cy="10.2" r="4.1" stroke="#1E7F72" strokeWidth="2.4" />
            <path d="M13.6 16.3 L 16.4 13.4" stroke="#1E7F72" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M23.2 15.6 L 25.2 17.8" stroke="#1E7F72" strokeWidth="2.4" strokeLinecap="round" opacity="0.45" />
            <path d="M24.6 22.6 L 22.4 24.6" stroke="#1E7F72" strokeWidth="2.4" strokeLinecap="round" opacity="0.45" />
          </svg>

          <span style={{ fontSize: 40, fontWeight: 600, color: '#10202A' }}>ЭнзиДекс</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontSize: 68,
              fontWeight: 600,
              color: '#10202A',
              lineHeight: 1.12,
              letterSpacing: '-0.025em',
              maxWidth: 900,
            }}
          >
            Гель с ферментом, который расщепляет каркас зубного налёта
          </span>

          <span style={{ fontSize: 30, color: '#5A6B72', marginTop: 28 }}>
            Декстраназа · 10 мл · без фтора и абразивных частиц
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', width: 120, height: 5, backgroundColor: '#1E7F72' }} />
        </div>
      </div>
    ),
    { ...size, ...(fonts.length > 0 ? { fonts } : {}) },
  );
}
