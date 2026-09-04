'use client';

import { useEffect, useRef, useState } from 'react';

import { mechanism } from '@/content/science';

const BEADS_LEFT = [60, 130, 200, 270];
const BEADS_RIGHT = [340, 410, 480, 550, 620];

/**
 * Схема механизма действия (ТЗ FR-S1, 7.4).
 *
 * Анимация проигрывается один раз при попадании схемы в область просмотра
 * и дальше — только по нажатию кнопки: движение на сайте допускается либо
 * как единственный осмысленный момент, либо в ответ на действие пользователя.
 *
 * Ключ на <svg> нужен, чтобы повтор действительно перезапускал CSS-анимации:
 * без пересоздания узла браузер считает, что анимация уже отыграна.
 */
export function MechanismDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    // Если IntersectionObserver недоступен, показываем схему сразу.
    if (typeof IntersectionObserver === 'undefined') {
      setIsPlaying(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setIsPlaying(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <figure className="mt-4">
      <div
        ref={containerRef}
        data-play={isPlaying ? 'true' : 'false'}
        className="mechanism-diagram overflow-hidden rounded-xl border border-hairline bg-surface p-4 md:p-8"
      >
        <svg
          key={runId}
          viewBox="0 0 720 300"
          role="img"
          aria-labelledby="mech-title mech-desc"
          className="h-auto w-full"
        >
          <title id="mech-title">{mechanism.diagram.title}</title>
          <desc id="mech-desc">
            Полисахаридная цепь, закреплённая на поверхности эмали. Фермент
            подходит к связи между двумя звеньями, связь разрывается, правая
            часть цепи отделяется, а на месте разрыва появляются короткие
            фрагменты полимера.
          </desc>

          {/* Поверхность эмали */}
          <path
            d="M0 252 H720"
            stroke="var(--color-hairline-strong)"
            strokeWidth="2"
          />
          <path d="M0 252 H720 V300 H0 Z" fill="var(--color-sunken)" opacity="0.7" />

          {/* Крепления цепи к поверхности */}
          <g stroke="var(--color-ink)" strokeWidth="2.5" strokeLinecap="round" opacity="0.28">
            <path d="M60 196 V250" />
            <path d="M620 196 V250" />
          </g>

          {/* Левая часть цепи */}
          <g
            fill="var(--color-surface)"
            stroke="var(--color-ink)"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M60 180 H270" />
            {BEADS_LEFT.map((x) => (
              <circle key={x} cx={x} cy="180" r="16" />
            ))}
          </g>

          {/* Разрываемая связь */}
          <g className="mech-bond" style={{ transformOrigin: '305px 180px' }}>
            <path
              d="M286 180 H324"
              stroke="var(--color-ink)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>

          {/* Правая часть цепи — после разрыва отходит вправо */}
          <g className="mech-right">
            <g
              fill="var(--color-surface)"
              stroke="var(--color-ink)"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M340 180 H620" />
              {BEADS_RIGHT.map((x) => (
                <circle key={x} cx={x} cy="180" r="16" />
              ))}
            </g>
          </g>

          {/* Короткие фрагменты, освободившиеся при гидролизе */}
          <g
            className="mech-fragments"
            style={{ transformOrigin: '305px 110px' }}
            fill="var(--color-surface)"
            stroke="var(--color-accent)"
            strokeWidth="2.2"
          >
            <circle cx="268" cy="96" r="10" />
            <circle cx="296" cy="80" r="10" />
            <path d="M277 91 L 287 85" strokeLinecap="round" />
            <circle cx="344" cy="88" r="10" />
          </g>

          {/* Фермент */}
          <g className="mech-enzyme">
            <circle cx="305" cy="180" r="46" fill="var(--color-accent)" opacity="0.08" />
            <circle
              cx="305"
              cy="180"
              r="46"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="2.5"
              strokeDasharray="104 24"
              strokeLinecap="round"
            />
            <text
              x="305"
              y="248"
              textAnchor="middle"
              className="fill-accent-ink text-[15px] font-medium"
            >
              декстраназа
            </text>
          </g>
        </svg>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <figcaption className="max-w-measure text-sm text-ink-muted">
          {mechanism.diagram.caption}
        </figcaption>

        <button
          type="button"
          onClick={() => {
            setIsPlaying(true);
            setRunId((current) => current + 1);
          }}
          className="inline-flex min-h-11 shrink-0 items-center rounded-lg px-3 text-sm font-medium text-accent-ink transition-colors hover:bg-accent-soft"
        >
          Показать ещё раз
        </button>
      </div>
    </figure>
  );
}
