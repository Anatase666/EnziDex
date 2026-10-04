import { Section } from '@/components/layout/Section';
import { InfoIcon } from '@/components/icons';
import { RichText } from '@/components/ui/RichText';
import { usageInstructions } from '@/content/product';

/**
 * Инструкция по применению (ТЗ FR-P4).
 *
 * Тексты — в content/product.ts → usageInstructions. Значения могут
 * содержать TODO_CONTENT: RichText выведет его пометкой «Требует корректировки».
 *
 * Справа — параметры применения и блок «Важно». На мобильном они встают
 * под шаги.
 *
 * Нумерация шагов — единственное разрешённое ТЗ 7.4 место для цифр:
 * здесь последовательность действительно является последовательностью.
 */
export function UsageDetailed() {
  const { stepsHeading, steps, details, important } = usageInstructions;

  return (
    <Section id="usage" tone="surface" heading={usageInstructions.heading}>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <h3 className="text-xl font-semibold text-ink">{stepsHeading}</h3>

          <ol className="mt-6 flex flex-col gap-5">
            {steps.map((step, index) => (
              <li key={index} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="flex size-9 shrink-0 items-center justify-center rounded-full border border-accent/40 font-medium text-accent-ink"
                >
                  {index + 1}
                </span>
                <RichText measure={false} className="pt-1 text-ink">
                  {step}
                </RichText>
              </li>
            ))}
          </ol>
        </div>

        {/* Справа — параметры применения и «Важно» одной компактной колонкой:
            шаги читаются слева, ключевые цифры видны рядом без прокрутки. */}
        <div className="flex flex-col gap-4 lg:col-span-5">
          <dl className="divide-y divide-hairline rounded-2xl border border-hairline bg-page px-6">
            {details.map((detail) => (
              <div key={detail.label} className="py-4">
                <dt className="text-sm text-ink-muted">{detail.label}</dt>
                <dd className="mt-1 font-medium text-ink">
                  <RichText measure={false}>{detail.value}</RichText>
                </dd>
              </div>
            ))}
          </dl>

          <aside className="rounded-2xl border border-accent/25 bg-accent-soft/70 px-6 py-5">
            <p className="flex items-center gap-2 font-semibold text-ink">
              <InfoIcon className="size-5 shrink-0 text-accent" aria-hidden="true" />
              {important.heading}
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-ink-muted">
              {important.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </Section>
  );
}
