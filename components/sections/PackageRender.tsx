import { cn } from '@/lib/cn';

/**
 * Объёмная визуализация упаковки: картонная пачка и туба.
 *
 * Построена по фотографии продукта и развёртке упаковки, предоставленным
 * заказчиком. Векторная, а не растровая: масштабируется без потери качества,
 * весит единицы килобайт, не даёт скачка вёрстки при загрузке и одинаково
 * выглядит на любой плотности экрана.
 *
 * Цвета взяты с оригинала: фиалковый акцент #6C30E0 и глубокое индиго
 * #1433A0 на почти белом картоне с облачной текстурой. Они отличаются от
 * акцента сайта намеренно — это цвета продукта, а не интерфейса, и подменять
 * их зелёным значило бы показать посетителю упаковку, которой не существует.
 *
 * Мелкий текст на гранях передан не выдуманными словами, а полосами нужной
 * плотности: реальные надписи на предоставленной фотографии неразличимы,
 * а сочинять текст на упаковке продукта в области здоровья нельзя.
 */

type PackageRenderProps = {
  className?: string;
  /** `full` — пачка и туба, `box` — только пачка. */
  variant?: 'full' | 'box';
};

export function PackageRender({ className, variant = 'full' }: PackageRenderProps) {
  return (
    <svg
      viewBox="0 0 600 620"
      role="img"
      aria-labelledby="package-title package-desc"
      className={cn('h-auto w-full', className)}
    >
      <title id="package-title">Упаковка геля «ЭнзиДекс»</title>
      <desc id="package-desc">
        {variant === 'full'
          ? 'Картонная пачка светлого цвета с фиалковым логотипом «ЭнзиДекс» и ромбовидной эмблемой, рядом стоит белая туба геля объёмом 10 мл.'
          : 'Картонная пачка светлого цвета с фиалковым логотипом «ЭнзиДекс» и ромбовидной эмблемой.'}
      </desc>

      <defs>
        {/* Облачная текстура картона — как на оригинальной упаковке. */}
        <filter id="pkg-marble" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015"
            numOctaves="4"
            seed="11"
            result="noise"
          />
          <feColorMatrix in="noise" type="saturate" values="0" result="grey" />
          <feComponentTransfer in="grey" result="soft">
            <feFuncA type="linear" slope="0.5" intercept="0" />
          </feComponentTransfer>
          <feComposite in="soft" in2="SourceGraphic" operator="in" />
        </filter>

        {/* Лицевая грань: мягкий свет слева направо. */}
        <linearGradient id="pkg-front" x1="0" y1="0" x2="1" y2="0.2">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#f6f4fc" />
          <stop offset="100%" stopColor="#e8e4f4" />
        </linearGradient>

        {/* Боковая грань уходит в тень. */}
        <linearGradient id="pkg-side" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#d9d3ec" />
          <stop offset="100%" stopColor="#c3bbdd" />
        </linearGradient>

        <linearGradient id="pkg-top" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#efecf8" />
        </linearGradient>

        {/* Туба: блик по центру, затемнение по краям — цилиндр. */}
        <linearGradient id="tube-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#cfcbdd" />
          <stop offset="18%" stopColor="#eeecf5" />
          <stop offset="42%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#f2f0f8" />
          <stop offset="100%" stopColor="#c9c4da" />
        </linearGradient>

        <linearGradient id="tube-cap" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#bdb6d2" />
          <stop offset="35%" stopColor="#efedf6" />
          <stop offset="75%" stopColor="#ddd8ea" />
          <stop offset="100%" stopColor="#b0a8c8" />
        </linearGradient>

        {/* Мягкая тень на плоскости под упаковкой. */}
        <radialGradient id="pkg-shadow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#2b2545" stopOpacity="0.26" />
          <stop offset="60%" stopColor="#2b2545" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#2b2545" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Тень */}
      <ellipse cx="290" cy="556" rx="215" ry="30" fill="url(#pkg-shadow)" />

      {variant === 'full' && <Tube />}

      {/* ─── Пачка ─────────────────────────────────────────────────────── */}
      <g>
        {/* Верхняя грань */}
        <path
          d="M110 145 L270 145 L332 111 L172 111 Z"
          fill="url(#pkg-top)"
          stroke="#cdc6e0"
          strokeWidth="1"
        />

        {/* Боковая грань */}
        <path
          d="M270 145 L332 111 L332 511 L270 545 Z"
          fill="url(#pkg-side)"
          stroke="#c0b8d8"
          strokeWidth="1"
        />

        {/* Лицевая грань */}
        <path
          d="M110 145 L270 145 L270 545 L110 545 Z"
          fill="url(#pkg-front)"
          stroke="#cdc6e0"
          strokeWidth="1"
        />

        {/* Облачная текстура поверх лицевой грани */}
        <path
          d="M110 145 L270 145 L270 545 L110 545 Z"
          fill="#8f7fc4"
          opacity="0.16"
          filter="url(#pkg-marble)"
        />
        <path
          d="M270 145 L332 111 L332 511 L270 545 Z"
          fill="#7d6cb4"
          opacity="0.14"
          filter="url(#pkg-marble)"
        />

        {/* ─── Печать на лицевой грани ─────────────────────────────────── */}

        {/* Логотип */}
        <text
          x="130"
          y="205"
          fill="#4b23c4"
          fontSize="30"
          fontWeight="700"
          letterSpacing="-0.5"
        >
          ЭнзиДекс
        </text>

        {/* Дескриптор: реальные надписи на фотографии неразличимы,
            поэтому переданы плотностью строк, а не выдуманным текстом. */}
        <g fill="#1433a0" opacity="0.5">
          <rect x="130" y="223" width="112" height="4" rx="2" />
          <rect x="130" y="233" width="126" height="4" rx="2" />
          <rect x="130" y="243" width="86" height="4" rx="2" />
        </g>

        {/* Разделительная черта */}
        <rect x="130" y="264" width="52" height="3" rx="1.5" fill="#6c30e0" />

        {/* Ромбовидная эмблема */}
        <g transform="translate(190 380)" stroke="#1f2f80" fill="none">
          <path
            d="M0 -46 L34 0 L0 46 L-34 0 Z"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M0 -34 L25 0 L0 34 L-25 0 Z" strokeWidth="0.9" opacity="0.55" />
          <g strokeWidth="0.9" opacity="0.75">
            <path d="M0 -22 L0 22" />
            <path d="M-15 -8 L15 -8" />
            <path d="M-15 8 L15 8" />
            <path d="M-11 -15 L11 15" />
            <path d="M11 -15 L-11 15" />
          </g>
          <circle cx="0" cy="0" r="4.5" fill="#6c30e0" stroke="none" />
        </g>

        {/* Объём */}
        <text x="130" y="512" fill="#1f2f80" fontSize="15" fontWeight="600">
          10 мл
        </text>

        {/* Печать на боковой грани */}
        <g fill="#1433a0" opacity="0.35">
          <rect
            x="284"
            y="196"
            width="34"
            height="3.5"
            rx="1.75"
            transform="rotate(-28 284 196)"
          />
          <rect
            x="284"
            y="212"
            width="40"
            height="3.5"
            rx="1.75"
            transform="rotate(-28 284 212)"
          />
          <rect
            x="284"
            y="228"
            width="28"
            height="3.5"
            rx="1.75"
            transform="rotate(-28 284 228)"
          />
        </g>

        {/* Блик по левому ребру */}
        <path d="M110 145 L118 145 L118 545 L110 545 Z" fill="#ffffff" opacity="0.55" />
      </g>
    </svg>
  );
}

/**
 * Туба: стоит на колпачке, корпус заметно сужается книзу.
 *
 * Пропорции сняты с фотографии: широкий запаянный шов сверху, плавное
 * сужение к горлышку и короткий колпачок в основании. Туба ниже пачки —
 * иначе она в неё не помещалась бы.
 */
function Tube() {
  return (
    <g>
      {/* Корпус: от 84 единиц ширины сверху к 50 у горлышка */}
      <path
        d="M388 268
           C388 259 393 255 401 255
           L459 255
           C467 255 472 259 472 268
           L457 492
           C456 499 452 502 446 502
           L414 502
           C408 502 404 499 403 492
           Z"
        fill="url(#tube-body)"
        stroke="#bfb8d5"
        strokeWidth="1"
      />

      {/* Запаянный шов: плоский, чуть шире корпуса */}
      <rect
        x="384"
        y="248"
        width="92"
        height="10"
        rx="5"
        fill="#ddd8ec"
        stroke="#c3bcd9"
        strokeWidth="1"
      />
      <g stroke="#c0b8d6" strokeWidth="0.9" opacity="0.85">
        <path d="M394 250.5 L394 255.5" />
        <path d="M404 250.5 L404 255.5" />
        <path d="M414 250.5 L414 255.5" />
        <path d="M424 250.5 L424 255.5" />
        <path d="M434 250.5 L434 255.5" />
        <path d="M444 250.5 L444 255.5" />
        <path d="M454 250.5 L454 255.5" />
        <path d="M464 250.5 L464 255.5" />
      </g>

      {/* Горлышко и колпачок */}
      <rect x="406" y="500" width="48" height="8" fill="#d5cfe6" stroke="#b8b0d0" strokeWidth="1" />
      <path
        d="M404 508 L456 508 L453 543 L407 543 Z"
        fill="url(#tube-cap)"
        stroke="#b3abcb"
        strokeWidth="1"
      />
      <rect x="405" y="540" width="50" height="6" rx="3" fill="#c2bbd7" />

      {/* Печать на тубе */}
      <text
        x="430"
        y="330"
        textAnchor="middle"
        fill="#4b23c4"
        fontSize="17"
        fontWeight="700"
        letterSpacing="-0.3"
      >
        ЭнзиДекс
      </text>
      <g fill="#1433a0" opacity="0.4">
        <rect x="404" y="343" width="52" height="3" rx="1.5" />
        <rect x="409" y="351" width="42" height="3" rx="1.5" />
      </g>
      <g transform="translate(430 405) scale(0.42)" stroke="#1f2f80" fill="none">
        <path d="M0 -46 L34 0 L0 46 L-34 0 Z" strokeWidth="3.5" strokeLinejoin="round" />
        <g strokeWidth="2.4" opacity="0.7">
          <path d="M0 -24 L0 24" />
          <path d="M-16 -9 L16 -9" />
          <path d="M-16 9 L16 9" />
        </g>
      </g>
      <text x="430" y="466" textAnchor="middle" fill="#1f2f80" fontSize="10" fontWeight="600">
        10 мл
      </text>

      {/* Продольный блик вдоль левой образующей */}
      <path
        d="M403 264 C402 264 401 266 401 269 L410 490 C410 494 412 496 415 496 L420 496 L411 264 Z"
        fill="#ffffff"
        opacity="0.5"
      />
    </g>
  );
}
