import { Section } from '@/components/layout/Section';
import { Value } from '@/components/ui/Value';
import { engineering, enzymeProperties } from '@/content/science';

/**
 * Выигрыш модифицированного фермента над природным (ТЗ FR-S1).
 *
 * Смысловой центр научного раздела и единственное место, где показана
 * работоспособность собственной разработки. Раздел перестроен с постановки
 * задачи на результат: сверху три числа, ниже объяснение, зачем и как
 * фермент меняли, и таблица «до и после».
 *
 * Числа набраны крупно и стоят до текста намеренно. Читатель, который не
 * станет разбираться в направленном мутагенезе, всё равно унесёт главное:
 * активность вдвое выше, эффективность в шесть раз, и фермент работает
 * при температуре тела.
 *
 * В таблице там, где измерения ещё нет, стоит пометка, а не прочерк:
 * прочерк читался бы как «не изменилось».
 */
export function Engineering() {
  return (
    <Section id="engineering" heading={engineering.heading} lead={engineering.lead}>
      <dl className="grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline sm:grid-cols-3">
        {engineering.gains.map((gain) => (
          <div key={gain.title} className="bg-surface p-6 md:p-7">
            <dt>
              <span className="block text-4xl font-semibold tracking-tight text-accent-ink">
                {gain.value}
              </span>
              <span className="mt-3 block text-lg font-semibold text-ink">
                {gain.title}
              </span>
            </dt>
            <dd className="mt-2 text-ink-muted">{gain.description}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <div className="flex max-w-measure flex-col gap-5 text-lg text-ink-muted">
            {engineering.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <h3 className="text-sm font-semibold text-ink">
            Свойства фермента до и после модификации
          </h3>

          <dl className="mt-5 divide-y divide-hairline border-y border-hairline">
            {enzymeProperties.map((property) => (
              <div key={property.label} className="py-4">
                <dt className="text-sm text-ink-muted">{property.label}</dt>

                <dd className="mt-1.5">
                  <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-ink">{property.native}</span>

                    {property.modified && (
                      <>
                        <span aria-hidden="true" className="text-ink-muted">
                          →
                        </span>
                        <span className="sr-only">после модификации:</span>
                        <span className="font-medium text-accent-ink">
                          <Value value={property.modified} />
                        </span>
                      </>
                    )}
                  </span>

                  {property.note && (
                    <span className="mt-1.5 block text-sm text-ink-muted">
                      {property.note}
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
