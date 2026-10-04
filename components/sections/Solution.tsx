import type { ComponentType, SVGProps } from 'react';

import { Container } from '@/components/layout/Container';
import {
  NoFluorideIcon,
  SnowflakeIcon,
  ToothFeatherIcon,
  ToothShieldIcon,
} from '@/components/icons';
import { solution } from '@/content/home';

/**
 * Решение (ТЗ FR-H3, переработано по правкам заказчика).
 *
 * Под текстом четыре ячейки с иконками — формулировки и оформление по
 * образцу заказчика.
 *
 * Подача через «чем это не является» выбрана намеренно: продукт попадает в
 * категорию, где у покупателя уже есть готовые ожидания от зубных паст и
 * отбеливающих систем, и быстрее всего объяснить новое, отделив его от
 * знакомого.
 */
const BENEFIT_ICONS: Record<
  (typeof solution.benefits)[number]['icon'],
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  caries: ToothShieldIcon,
  sensitivity: ToothFeatherIcon,
  freshness: SnowflakeIcon,
  fluoride: NoFluorideIcon,
};

export function Solution() {
  return (
    <section className="py-16 md:py-20 lg:py-24">
      <Container>
        <div className="max-w-measure">
          <h2 className="text-section text-balance text-ink">{solution.heading}</h2>
          <p className="mt-5 text-xl text-ink">{solution.lead}</p>

          <div className="mt-6 flex flex-col gap-5 text-lg text-ink-muted">
            {solution.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Ячейки по образцу заказчика: иконка в шестиугольнике, текст справа,
            две колонки. */}
        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          {solution.benefits.map((benefit) => {
            const BenefitIcon = BENEFIT_ICONS[benefit.icon];
            return (
              <li
                key={benefit.icon}
                className="flex items-center gap-4 rounded-xl border border-hairline bg-surface px-5 py-5 md:gap-6 md:px-6 md:py-6"
              >
                <span className="relative flex size-18 shrink-0 items-center justify-center text-accent">
                  <svg
                    viewBox="0 0 72 72"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinejoin="round"
                    aria-hidden="true"
                    focusable="false"
                    className="absolute inset-0 size-full"
                  >
                    <path d="M26 6.5h20a6 6 0 0 1 5.2 3l10 17.5a6 6 0 0 1 0 6L51.2 50.5a6 6 0 0 1-5.2 3H26a6 6 0 0 1-5.2-3L10.8 33a6 6 0 0 1 0-6l10-17.5a6 6 0 0 1 5.2-3Z" transform="translate(0 6)" />
                  </svg>
                  <BenefitIcon className="relative size-8" aria-hidden="true" />
                </span>
                <p className="text-lg leading-snug text-ink md:text-xl">{benefit.text}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
