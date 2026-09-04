import Link from 'next/link';

import { Section } from '@/components/layout/Section';
import { Disclaimer } from '@/components/ui/Disclaimer';
import { usageSection } from '@/content/home';
import { usageSteps } from '@/content/product';
import { isFilled } from '@/content/types';

/**
 * Режим применения (ТЗ FR-H6).
 *
 * Единственный раздел сайта, где нумерация уместна и разрешена ТЗ 7.4:
 * здесь порядок действий содержателен, а не декоративен.
 *
 * Пока инструкция изготовителя не получена, вместо трёх пустых шагов
 * выводится честная оговорка. Показывать нумерованный список из строк
 * заглушек — худший вариант: он выглядит как недоделанная вёрстка,
 * хотя проблема не в вёрстке, а в отсутствии данных.
 */
export function Usage() {
  const hasSteps = usageSteps.some(
    (step) => isFilled(step.title) && isFilled(step.description),
  );

  return (
    <Section
      heading={usageSection.heading}
      lead={hasSteps ? usageSection.lead : undefined}
      action={
        <Link href={usageSection.moreLink.href} className="link">
          {usageSection.moreLink.label}
        </Link>
      }
    >
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
        <Disclaimer tone="gap" title="Инструкция по применению готовится">
          {`Порядок нанесения, количество геля, время выдержки и длительность курса — часть утверждённой инструкции изготовителя. Придумать эти параметры нельзя: от них зависит и результат, и безопасность применения.\n\nРаздел будет заполнен сразу после получения инструкции. До этого момента ориентируйтесь на вкладыш в упаковке продукта.`}
        </Disclaimer>
      )}
    </Section>
  );
}
