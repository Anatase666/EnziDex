import Link from 'next/link';

import { Section } from '@/components/layout/Section';
import { usageSection } from '@/content/home';

/**
 * Как пользоваться (ТЗ FR-H6).
 *
 * Три шага без цифр: они описывают логику применения и не требуют
 * утверждённой инструкции. Точные дозировка, время выдержки и частота —
 * на странице продукта, куда ведёт ссылка под шагами.
 *
 * Это единственный раздел сайта, где нумерация уместна и разрешена ТЗ 7.4:
 * здесь порядок действий содержателен, а не декоративен.
 */
export function Usage() {
  return (
    <Section tone="surface" heading={usageSection.heading}>
      <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {usageSection.steps.map((step, index) => (
          <li key={step.title} className="flex gap-5">
            <span
              aria-hidden="true"
              className="flex size-10 shrink-0 items-center justify-center rounded-full border border-accent/40 text-lg font-medium text-accent-ink"
            >
              {index + 1}
            </span>

            <div>
              <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-ink-muted">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-12 max-w-measure border-t border-hairline pt-6 text-ink-muted">
        {usageSection.note}{' '}
        <Link href={usageSection.link.href} className="link">
          {usageSection.link.label}
        </Link>
      </p>
    </Section>
  );
}
