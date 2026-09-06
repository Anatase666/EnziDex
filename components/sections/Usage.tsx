import { Section } from '@/components/layout/Section';
import { Value } from '@/components/ui/Value';
import { usageSection } from '@/content/home';
import { usageSteps } from '@/content/product';
import { TODO_CONTENT, isFilled } from '@/content/types';

/**
 * Режим применения (ТЗ FR-H6).
 *
 * По просьбе заказчика от раздела осталась только надпись: пока инструкция
 * изготовителя не получена, под заголовком стоит пометка «Требует
 * корректировки» — та же, что и в остальных незаполненных местах сайта.
 *
 * Нумерованный список появится сам, как только usageSteps в content/product.ts
 * будут заполнены. Это единственный раздел сайта, где нумерация уместна и
 * разрешена ТЗ 7.4: здесь порядок действий содержателен, а не декоративен.
 */
export function Usage() {
  const hasSteps = usageSteps.some(
    (step) => isFilled(step.title) && isFilled(step.description),
  );

  return (
    <Section tone="surface" heading={usageSection.heading}>
      {hasSteps ? (
        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {usageSteps.map((step, index) => (
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
                {isFilled(step.meta) && (
                  <p className="mt-3 text-sm font-medium text-accent-ink">{step.meta}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <p className="text-lg">
          <Value value={TODO_CONTENT} />
        </p>
      )}
    </Section>
  );
}
