import type { ComponentType, SVGProps } from 'react';

import { Container } from '@/components/layout/Container';
import {
  MicrofloraIcon,
  NoFluorideIcon,
  NoPeroxideIcon,
  ToothIcon,
} from '@/components/icons';
import { solution } from '@/content/home';

/**
 * Решение (ТЗ FR-H3, переработано по правкам заказчика).
 *
 * Под текстом четыре коротких отличия в ячейках с иконками: без абразива,
 * не подавляет микрофлору, без пероксидов, без фторидов. Каждое
 * проверяется по списку компонентов.
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
  abrasive: ToothIcon,
  microflora: MicrofloraIcon,
  peroxide: NoPeroxideIcon,
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

        {/* Короткие ячейки с иконкой вместо карточек с абзацами: отличия
            читаются за секунду, подробности — в составе на /product. */}
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {solution.benefits.map((benefit) => {
            const BenefitIcon = BENEFIT_ICONS[benefit.icon];
            return (
              <li
                key={benefit.icon}
                className="flex items-center gap-4 rounded-2xl border border-hairline bg-surface p-5"
              >
                <span className="flex size-14 shrink-0 items-center justify-center rounded-xl border border-accent/40 bg-accent-soft/60 text-accent">
                  <BenefitIcon className="size-7" aria-hidden="true" />
                </span>
                <p className="text-lg leading-snug text-ink">{benefit.text}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
