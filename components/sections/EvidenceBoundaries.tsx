import { Section } from '@/components/layout/Section';
import { RichText } from '@/components/ui/RichText';
import { evidenceBoundaries } from '@/content/science';

/**
 * Границы применимости данных (ТЗ BC-2, BC-3).
 *
 * Раздела с таким названием в ТЗ нет — он добавлен сознательно. Требование
 * BC-2 («утверждение об эффективности без источника не публикуется») и BC-3
 * («не переносить in vitro на клинический эффект») выполняются формально
 * дисклеймером внизу страницы, но по существу — только если рядом с данными
 * стоит то, чего они не доказывают.
 *
 * Для аудитории B и D (клиники, экспертиза) именно этот блок отличает
 * научную страницу от рекламной: он показывает, что авторы понимают
 * разницу между свойством молекулы и свойством готовой рецептуры.
 */
export function EvidenceBoundaries() {
  const { heading, known, unknown } = evidenceBoundaries;

  return (
    <Section tone="surface" heading={heading}>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="border-t-2 border-accent pt-6">
          <h3 className="text-xl font-semibold text-ink">{known.title}</h3>
          <ul className="mt-5 flex flex-col gap-4">
            {known.items.map((item) => (
              <li key={item.slice(0, 40)} className="flex gap-3">
                <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                <RichText measure={false} className="text-ink-muted">
                  {item}
                </RichText>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t-2 border-hairline-strong pt-6">
          <h3 className="text-xl font-semibold text-ink">{unknown.title}</h3>
          <ul className="mt-5 flex flex-col gap-4">
            {unknown.items.map((item) => (
              <li key={item.slice(0, 40)} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2.5 size-1.5 shrink-0 rounded-full bg-hairline-strong"
                />
                <RichText measure={false} className="text-ink-muted">
                  {item}
                </RichText>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
