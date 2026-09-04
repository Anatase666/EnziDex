import { Section } from '@/components/layout/Section';
import { RichText } from '@/components/ui/RichText';
import { enzymeOrigin } from '@/content/science';

/**
 * Происхождение фермента.
 *
 * Раздел отвечает на вопрос, который возникает у любого внимательного
 * читателя состава: откуда в геле берётся фермент и что он такое.
 * Для аудитории клиник это ещё и ответ про чистоту препарата —
 * дрожжевой продуцент почти не выделяет собственных белков, поэтому
 * в препарате нет посторонней ферментативной активности.
 */
export function EnzymeOrigin() {
  return (
    <Section id="origin" tone="surface" heading={enzymeOrigin.heading} lead={enzymeOrigin.lead}>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <div className="flex max-w-measure flex-col gap-5 text-lg text-ink-muted">
            {enzymeOrigin.paragraphs.map((paragraph) => (
              <RichText key={paragraph.slice(0, 40)} className="text-lg">
                {paragraph}
              </RichText>
            ))}
          </div>
        </div>

        <dl className="flex flex-col gap-5 lg:col-span-5">
          {enzymeOrigin.facts.map((fact) => (
            <div key={fact.label} className="border-t border-hairline pt-4">
              <dt className="text-sm text-ink-muted">{fact.label}</dt>
              <dd className="mt-1 font-medium text-ink">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
