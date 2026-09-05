import { cn } from '@/lib/cn';

/**
 * Объёмная визуализация упаковки: картонная пачка и туба.
 *
 * Построена по фотографии продукта и развёртке, предоставленным заказчиком.
 * Векторная, а не растровая: масштабируется без потери качества, весит
 * единицы килобайт, не даёт скачка вёрстки и одинаково выглядит на любой
 * плотности экрана.
 *
 * Что делает её похожей на студийный снимок, а не на схему:
 *
 *   • лёгкая двухточечная перспектива — дальнее ребро пачки короче ближнего,
 *     поэтому коробка не выглядит аксонометрической «плиткой»;
 *   • материал собран послойно: базовый градиент, облачная текстура картона,
 *     затемнение у рёбер вместо плоской заливки и узкий блик по фаске;
 *   • контактная тень разложена на две — плотную под самим предметом и
 *     широкую рассеянную, как от софтбокса;
 *   • у тубы честная цилиндрическая развёртка яркости с одним резким бликом
 *     и подтенением по обоим краям, плюс плечо и рифлёный колпачок.
 *
 * Цвета взяты с развёртки: фиалковый #6830E0 и индиго #1030A0 на почти белом
 * картоне. Теперь это и палитра сайта, так что упаковка и интерфейс читаются
 * как один продукт.
 *
 * Мелкий текст на гранях передан полосами нужной плотности, а не выдуманными
 * словами: реальные надписи на предоставленных материалах неразличимы, а
 * сочинять текст на упаковке продукта в области здоровья нельзя.
 */

type PackageRenderProps = {
  className?: string;
  /** `full` — пачка и туба, `box` — только пачка. */
  variant?: 'full' | 'box';
};

export function PackageRender({ className, variant = 'full' }: PackageRenderProps) {
  return (
    <svg
      viewBox="0 0 620 660"
      role="img"
      aria-labelledby="package-title package-desc"
      className={cn('h-auto w-full', className)}
    >
      <title id="package-title">Упаковка геля «ЭнзиДекс»</title>
      <desc id="package-desc">
        {variant === 'full'
          ? 'Светлая картонная пачка с фиалковым логотипом «ЭнзиДекс» и ромбовидной эмблемой, рядом стоит белая туба геля объёмом 10 мл.'
          : 'Светлая картонная пачка с фиалковым логотипом «ЭнзиДекс» и ромбовидной эмблемой.'}
      </desc>

      <defs>
        {/* Облачная текстура картона — как на оригинальной упаковке. */}
        <filter id="pkg-marble" x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.011"
            numOctaves="4"
            seed="17"
            result="noise"
          />
          <feColorMatrix in="noise" type="saturate" values="0" result="grey" />
          <feComponentTransfer in="grey" result="soft">
            <feFuncA type="linear" slope="0.55" intercept="0" />
          </feComponentTransfer>
          <feComposite in="soft" in2="SourceGraphic" operator="in" />
        </filter>

        {/* Размытие для рассеянной тени. */}
        <filter id="pkg-blur" x="-40%" y="-120%" width="180%" height="340%">
          <feGaussianBlur stdDeviation="13" />
        </filter>
        <filter id="pkg-blur-tight" x="-40%" y="-160%" width="180%" height="420%">
          <feGaussianBlur stdDeviation="5" />
        </filter>

        {/* Лицевая грань: свет падает слева сверху. */}
        <linearGradient id="pkg-front" x1="0" y1="0" x2="1" y2="0.16">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="38%" stopColor="#faf9fe" />
          <stop offset="82%" stopColor="#efecfa" />
          <stop offset="100%" stopColor="#e4dff5" />
        </linearGradient>

        {/* Боковая грань в полутени. */}
        <linearGradient id="pkg-side" x1="0" y1="0" x2="1" y2="0.1">
          <stop offset="0%" stopColor="#d5cfec" />
          <stop offset="55%" stopColor="#c9c2e5" />
          <stop offset="100%" stopColor="#bcb3dd" />
        </linearGradient>

        {/* Верхняя грань ловит больше света. */}
        <linearGradient id="pkg-top" x1="0.1" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#f6f4fd" />
          <stop offset="100%" stopColor="#e8e4f6" />
        </linearGradient>

        {/* Затемнение у нижнего ребра — контактная зона. */}
        <linearGradient id="pkg-ao" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#2a2352" stopOpacity="0.16" />
          <stop offset="22%" stopColor="#2a2352" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#2a2352" stopOpacity="0" />
        </linearGradient>

        {/* Туба: развёртка яркости цилиндра с одним резким бликом. */}
        <linearGradient id="tube-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#bfb8d6" />
          <stop offset="9%" stopColor="#ddd8ee" />
          <stop offset="22%" stopColor="#f7f5fd" />
          <stop offset="31%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#f9f7fe" />
          <stop offset="66%" stopColor="#ebe7f7" />
          <stop offset="88%" stopColor="#d2cbe8" />
          <stop offset="100%" stopColor="#bab2d6" />
        </linearGradient>

        <linearGradient id="tube-cap" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#b0a7cd" />
          <stop offset="26%" stopColor="#e6e2f3" />
          <stop offset="46%" stopColor="#f4f2fb" />
          <stop offset="72%" stopColor="#ddd7ee" />
          <stop offset="100%" stopColor="#a89ec8" />
        </linearGradient>

        <linearGradient id="tube-crimp" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#cdc6e4" />
          <stop offset="30%" stopColor="#f2f0fa" />
          <stop offset="70%" stopColor="#e6e1f4" />
          <stop offset="100%" stopColor="#c4bce0" />
        </linearGradient>

        {/* Мягкое пятно света за композицией. */}
        <radialGradient id="pkg-glow" cx="0.5" cy="0.44" r="0.58">
          <stop offset="0%" stopColor="#6830e0" stopOpacity="0.10" />
          <stop offset="55%" stopColor="#6830e0" stopOpacity="0.035" />
          <stop offset="100%" stopColor="#6830e0" stopOpacity="0" />
        </radialGradient>

        {/* Отражение предмета в плоскости под ним. */}
        <linearGradient id="pkg-reflect" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.30" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Свет за композицией */}
      <ellipse cx="310" cy="300" rx="300" ry="290" fill="url(#pkg-glow)" />

      {/* ─── Тени ────────────────────────────────────────────────────────
          Две тени вместо одной: широкая рассеянная задаёт объём сцены,
          плотная под самим основанием прижимает предмет к плоскости.
          Без второй предмет всегда выглядит парящим.                     */}
      <g filter="url(#pkg-blur)">
        <ellipse cx="300" cy="586" rx="212" ry="26" fill="#2a2352" opacity="0.17" />
      </g>
      <g filter="url(#pkg-blur-tight)">
        <ellipse cx="192" cy="580" rx="92" ry="10" fill="#231d47" opacity="0.30" />
        {variant === 'full' && (
          <ellipse cx="437" cy="583" rx="46" ry="8" fill="#231d47" opacity="0.28" />
        )}
      </g>

      {variant === 'full' && <Tube />}
      <Box />
    </svg>
  );
}

/**
 * Картонная пачка.
 *
 * Дальнее вертикальное ребро (y 116…542) короче ближнего (y 140…574) —
 * это и создаёт ощущение перспективы вместо аксонометрии.
 */
function Box() {
  return (
    <g>
      {/* Отражение в плоскости */}
      <g opacity="0.5">
        <path d="M105 574 L255 574 L255 620 L105 620 Z" fill="url(#pkg-reflect)" />
      </g>

      {/* Верхняя грань */}
      <path
        d="M105 140 L255 140 L325 116 L175 116 Z"
        fill="url(#pkg-top)"
        stroke="#cfc8e6"
        strokeWidth="0.9"
      />

      {/* Боковая грань */}
      <path
        d="M255 140 L325 116 L325 542 L255 574 Z"
        fill="url(#pkg-side)"
        stroke="#b9b0d9"
        strokeWidth="0.9"
      />
      <path
        d="M255 140 L325 116 L325 542 L255 574 Z"
        fill="#6a5cb0"
        opacity="0.13"
        filter="url(#pkg-marble)"
      />

      {/* Лицевая грань */}
      <path
        d="M105 140 L255 140 L255 574 L105 574 Z"
        fill="url(#pkg-front)"
        stroke="#cfc8e6"
        strokeWidth="0.9"
      />
      <path
        d="M105 140 L255 140 L255 574 L105 574 Z"
        fill="#8272c2"
        opacity="0.14"
        filter="url(#pkg-marble)"
      />
      {/* Подтенение у основания */}
      <path d="M105 440 L255 440 L255 574 L105 574 Z" fill="url(#pkg-ao)" />

      {/* Блик по левой фаске и светлая кромка сверху */}
      <path d="M105 140 L112 140 L112 574 L105 574 Z" fill="#ffffff" opacity="0.7" />
      <path d="M105 140 L255 140 L255 145 L105 145 Z" fill="#ffffff" opacity="0.55" />

      <BoxPrint />
    </g>
  );
}

/** Печать на лицевой и боковой гранях. */
function BoxPrint() {
  return (
    <g>
      <text
        x="123"
        y="200"
        fill="#5722c6"
        fontSize="27"
        fontWeight="700"
        letterSpacing="-0.4"
      >
        ЭнзиДекс
      </text>

      {/* Дескриптор — полосами, а не выдуманным текстом. */}
      <g fill="#1030a0" opacity="0.45">
        <rect x="123" y="217" width="104" height="3.6" rx="1.8" />
        <rect x="123" y="226" width="116" height="3.6" rx="1.8" />
        <rect x="123" y="235" width="78" height="3.6" rx="1.8" />
      </g>

      <rect x="123" y="254" width="46" height="2.6" rx="1.3" fill="#6830e0" />

      {/* Плашка действующего компонента — есть на развёртке. */}
      <g transform="translate(123 278)">
        <circle cx="11" cy="11" r="11" fill="#6830e0" />
        <path
          d="M6.4 11 L 9.4 14 L 15.6 7.8"
          stroke="#ffffff"
          strokeWidth="1.9"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text x="29" y="15" fill="#1030a0" fontSize="12.5" fontWeight="600">
          Декстраназа
        </text>
      </g>

      <g fill="#1030a0" opacity="0.32">
        <rect x="123" y="316" width="112" height="3.2" rx="1.6" />
        <rect x="123" y="324" width="96" height="3.2" rx="1.6" />
        <rect x="123" y="332" width="108" height="3.2" rx="1.6" />
      </g>

      {/* Ромбовидная эмблема */}
      <g transform="translate(180 420)" stroke="#1a2f8c" fill="none">
        <path d="M0 -42 L31 0 L0 42 L-31 0 Z" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M0 -31 L23 0 L0 31 L-23 0 Z" strokeWidth="0.8" opacity="0.5" />
        <g strokeWidth="0.8" opacity="0.7">
          <path d="M0 -20 L0 20" />
          <path d="M-14 -7 L14 -7" />
          <path d="M-14 7 L14 7" />
          <path d="M-10 -14 L10 14" />
          <path d="M10 -14 L-10 14" />
        </g>
        <circle cx="0" cy="0" r="4" fill="#6830e0" stroke="none" />
      </g>

      <text x="123" y="546" fill="#1a2f8c" fontSize="13.5" fontWeight="600">
        10 мл
      </text>

      {/* Боковая грань: наклон совпадает с рёбрами коробки. */}
      <g fill="#1030a0" opacity="0.3">
        <rect x="268" y="196" width="30" height="3" rx="1.5" transform="rotate(-19 268 196)" />
        <rect x="268" y="210" width="38" height="3" rx="1.5" transform="rotate(-19 268 210)" />
        <rect x="268" y="224" width="26" height="3" rx="1.5" transform="rotate(-19 268 224)" />
      </g>
      <g transform="translate(280 300) rotate(-19)" opacity="0.55">
        <circle cx="0" cy="0" r="9" fill="none" stroke="#6830e0" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="3" fill="#6830e0" />
      </g>
    </g>
  );
}

/** Туба: стоит на колпачке, корпус сужается книзу — как на фотографии. */
function Tube() {
  return (
    <g>
      <g opacity="0.45">
        <path d="M404 574 L470 574 L470 616 L404 616 Z" fill="url(#pkg-reflect)" />
      </g>

      {/* Корпус */}
      <path
        d="M389 300
           C389 293 394 289 401 289
           L473 289
           C480 289 485 293 485 300
           L474 528
           C474 535 469 539 462 539
           L412 539
           C405 539 400 535 400 528
           Z"
        fill="url(#tube-body)"
        stroke="#b6aed4"
        strokeWidth="0.9"
      />

      {/* Резкий блик — то, что читается как глянец */}
      <path
        d="M414 296 C411 296 410 299 410 302 L404 526 C404 530 406 532 409 532 L414 532 L421 296 Z"
        fill="#ffffff"
        opacity="0.72"
      />

      {/* Запаянный шов сверху */}
      <rect
        x="386"
        y="279"
        width="102"
        height="14"
        rx="7"
        fill="url(#tube-crimp)"
        stroke="#bab2d8"
        strokeWidth="0.9"
      />
      <g stroke="#b7aed6" strokeWidth="0.9" opacity="0.75">
        {[396, 407, 418, 429, 440, 451, 462, 473].map((x) => (
          <path key={x} d={`M${x} 282 L${x} 290`} />
        ))}
      </g>

      {/* Плечо и колпачок */}
      <path
        d="M400 528 L474 528 L468 556 C468 560 465 562 461 562 L413 562 C409 562 406 560 406 556 Z"
        fill="url(#tube-cap)"
        stroke="#a89ec8"
        strokeWidth="0.9"
      />
      {/* Рифление колпачка */}
      <g stroke="#9f94c2" strokeWidth="0.8" opacity="0.5">
        {[418, 428, 438, 448, 458].map((x) => (
          <path key={x} d={`M${x} 533 L${x - 1} 557`} />
        ))}
      </g>
      <rect x="406" y="558" width="62" height="6" rx="3" fill="#b5accf" />

      {/* Печать */}
      <text
        x="437"
        y="356"
        textAnchor="middle"
        fill="#5722c6"
        fontSize="17"
        fontWeight="700"
        letterSpacing="-0.3"
      >
        ЭнзиДекс
      </text>
      <g fill="#1030a0" opacity="0.38">
        <rect x="409" y="368" width="56" height="2.8" rx="1.4" />
        <rect x="415" y="376" width="44" height="2.8" rx="1.4" />
      </g>
      <g transform="translate(437 428) scale(0.44)" stroke="#1a2f8c" fill="none">
        <path d="M0 -42 L31 0 L0 42 L-31 0 Z" strokeWidth="3.4" strokeLinejoin="round" />
        <g strokeWidth="2.2" opacity="0.65">
          <path d="M0 -21 L0 21" />
          <path d="M-14 -8 L14 -8" />
          <path d="M-14 8 L14 8" />
        </g>
      </g>
      <text
        x="437"
        y="500"
        textAnchor="middle"
        fill="#1a2f8c"
        fontSize="10.5"
        fontWeight="600"
      >
        10 мл
      </text>
    </g>
  );
}
