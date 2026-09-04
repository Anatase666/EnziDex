import { cn } from '@/lib/cn';

/**
 * Визуал главной страницы (ТЗ FR-H1).
 *
 * ⚠️ Здесь должна стоять фотография или рендер продукта — их заказчик пока
 * не предоставил (docs/CONTENT-GAPS.md). Рисовать правдоподобную «упаковку»
 * было бы хуже, чем не рисовать ничего: посетитель принял бы вымышленную
 * тубу за настоящую. Поэтому в hero стоит схема механизма — она честна,
 * содержательна и объясняет продукт лучше, чем его внешний вид.
 *
 * Изображение декоративно по отношению к тексту рядом, но не пусто по смыслу,
 * поэтому у него есть role="img" и подпись, а не alt="".
 */
export function ChainIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 420"
      role="img"
      aria-labelledby="chain-illustration-title chain-illustration-desc"
      className={cn('h-auto w-full', className)}
    >
      <title id="chain-illustration-title">
        Схема действия декстраназы на полисахаридную цепь
      </title>
      <desc id="chain-illustration-desc">
        Цепь из звеньев полисахарида, приклеенная к поверхности эмали. В середине
        цепи связь разорвана ферментом, обозначенным кольцом; два отделившихся
        фрагмента отходят в сторону.
      </desc>

      <defs>
        <linearGradient id="enamel-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-hairline)" />
          <stop offset="100%" stopColor="var(--color-sunken)" />
        </linearGradient>
      </defs>

      {/* Мягкое пятно глубины */}
      <circle cx="360" cy="140" r="132" fill="var(--color-accent-soft)" opacity="0.55" />

      {/* Поверхность эмали */}
      <path
        d="M0 344 Q 130 322 260 330 T 520 340 L520 420 L0 420 Z"
        fill="url(#enamel-gradient)"
      />
      <path
        d="M0 344 Q 130 322 260 330 T 520 340"
        fill="none"
        stroke="var(--color-hairline-strong)"
        strokeWidth="2"
      />

      {/* Точки крепления цепи к поверхности */}
      <g stroke="var(--color-ink)" strokeWidth="2.5" strokeLinecap="round" opacity="0.3">
        <path d="M74 268 L 68 330" />
        <path d="M446 236 L 452 338" />
      </g>

      {/* Левый фрагмент цепи */}
      <g
        fill="var(--color-surface)"
        stroke="var(--color-ink)"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <path d="M74 268 L 126 246" />
        <path d="M126 246 L 178 254" />
        <path d="M178 254 L 226 232" />
        <circle cx="74" cy="268" r="17" />
        <circle cx="126" cy="246" r="17" />
        <circle cx="178" cy="254" r="17" />
        <circle cx="226" cy="232" r="17" />
      </g>

      {/* Правый фрагмент цепи */}
      <g
        fill="var(--color-surface)"
        stroke="var(--color-ink)"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <path d="M300 216 L 348 238" />
        <path d="M348 238 L 398 214" />
        <path d="M398 214 L 446 236" />
        <circle cx="300" cy="216" r="17" />
        <circle cx="348" cy="238" r="17" />
        <circle cx="398" cy="214" r="17" />
        <circle cx="446" cy="236" r="17" />
      </g>

      {/* Разорванная связь: пунктир на месте бывшего соединения */}
      <path
        d="M245 227 L 281 221"
        stroke="var(--color-accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="1 9"
        opacity="0.9"
      />

      {/* Фермент: кольцо вокруг точки разрыва */}
      <circle
        cx="263"
        cy="224"
        r="52"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="2.5"
        strokeDasharray="118 26"
        strokeLinecap="round"
        opacity="0.85"
      />
      <circle cx="263" cy="224" r="52" fill="var(--color-accent)" opacity="0.07" />

      {/* Отделившиеся короткие фрагменты */}
      <g
        fill="var(--color-surface)"
        stroke="var(--color-accent)"
        strokeWidth="2.2"
        opacity="0.75"
      >
        <circle cx="214" cy="122" r="11" />
        <circle cx="246" cy="106" r="11" />
        <path d="M225 117 L 236 111" strokeLinecap="round" />

        <circle cx="330" cy="126" r="11" />
        <circle cx="358" cy="146" r="11" />
        <path d="M339 132 L 349 140" strokeLinecap="round" />
      </g>
    </svg>
  );
}
