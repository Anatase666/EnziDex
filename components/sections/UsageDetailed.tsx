import { Section } from '@/components/layout/Section';
import { Disclaimer } from '@/components/ui/Disclaimer';
import { RichText } from '@/components/ui/RichText';
import { usageInstructions } from '@/content/product';

/**
 * Инструкция по применению (ТЗ FR-P4).
 *
 * Формулировки шагов готовы; значения, которые задаёт только утверждённая
 * инструкция изготовителя, стоят пометкой «Требует корректировки» прямо
 * внутри фразы. Когда инструкция придёт, достаточно заменить маркеры в
 * content/product.ts — вёрстку трогать не нужно.
 *
 * Справа — блок «Важно»: то, что можно сказать уже сейчас, без инструкции.
 * На мобильном он встаёт под шаги.
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

          <dl className="mt-10 divide-y divide-hairline border-y border-hairline">
            {details.map((detail) => (
              <div
                key={detail.label}
                className="grid gap-1 py-4 sm:grid-cols-[minmax(0,13rem)_1fr] sm:gap-6"
              >
                <dt className="text-ink-muted">{detail.label}</dt>
                <dd className="text-ink">
                  <RichText measure={false}>{detail.value}</RichText>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-5">
          <Disclaimer title={important.heading} className="lg:sticky lg:top-28">
            <ul className="flex list-disc flex-col gap-2 pl-5 marker:text-ink-muted">
              {important.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Disclaimer>
        </div>
      </div>
    </Section>
  );
}
