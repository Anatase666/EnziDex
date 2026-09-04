import type { Metadata } from 'next';

import { CompositionTable } from '@/components/sections/CompositionTable';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Disclaimer } from '@/components/ui/Disclaimer';
import { JsonLd } from '@/components/ui/JsonLd';
import { Value } from '@/components/ui/Value';
import { legalPage, marking, regulatory, siteTerms } from '@/content/legal';
import { ingredients } from '@/content/product';
import { requisites } from '@/content/site';
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata('legal');

/** Строка состава ровно в том виде, в каком она читается на упаковке. */
const inciLine = ingredients.map((ingredient) => ingredient.inci).join(', ');

const REQUISITE_ROWS: { label: string; value: string }[] = [
  { label: 'Полное наименование', value: requisites.legalName },
  { label: 'Сокращённое наименование', value: requisites.shortName },
  { label: 'ИНН', value: requisites.inn },
  { label: 'ОГРН', value: requisites.ogrn },
  { label: 'КПП', value: requisites.kpp ?? '' },
  { label: 'Юридический адрес', value: requisites.legalAddress },
  { label: 'Фактический адрес', value: requisites.actualAddress },
];

/**
 * Юридические данные (ТЗ 4.5).
 *
 * Страница намеренно без декоративных элементов: здесь читаемость важнее
 * эффектности, а часть содержимого обязана дословно совпадать с упаковкой.
 */
export default function LegalPage() {
  return (
    <>
      <section className="pt-10 pb-10 md:pt-14">
        <Container>
          <h1 className="text-4xl max-w-[18ch] text-balance text-ink">
            {legalPage.heading}
          </h1>
          <p className="mt-5 max-w-measure text-xl text-ink-muted">{legalPage.lead}</p>
        </Container>
      </section>

      {/* FR-L1 */}
      <Section id="requisites" heading="Реквизиты изготовителя" size="compact">
        <dl className="max-w-3xl divide-y divide-hairline border-y border-hairline">
          {REQUISITE_ROWS.map((row) => (
            <div
              key={row.label}
              className="grid gap-1 py-4 sm:grid-cols-[minmax(0,16rem)_1fr] sm:gap-6"
            >
              <dt className="text-ink-muted">{row.label}</dt>
              <dd className="text-ink">
                <Value value={row.value} />
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* FR-L2 */}
      <Section
        id="composition-line"
        tone="surface"
        heading="Состав по INCI"
        lead="Приведён в порядке убывания концентрации, как на упаковке. При расхождении с упаковкой приоритет имеет упаковка."
        size="compact"
      >
        <p className="max-w-4xl rounded-xl bg-sunken px-5 py-5 font-mono text-base leading-relaxed tracking-tight text-ink">
          {inciLine}
        </p>

        <div className="mt-10">
          <CompositionTable headless />
        </div>
      </Section>

      {/* FR-L3 */}
      <Section id="marking" heading="Данные маркировки" size="compact">
        <dl className="max-w-3xl divide-y divide-hairline border-y border-hairline">
          {marking.map((row) => (
            <div
              key={row.label}
              className="grid gap-1 py-4 sm:grid-cols-[minmax(0,16rem)_1fr] sm:gap-6"
            >
              <dt className="text-ink-muted">{row.label}</dt>
              <dd className="text-ink">
                <Value value={row.value} />
                {row.note && (
                  <span className="mt-1 block text-sm text-ink-muted">{row.note}</span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* FR-L4 */}
      <Section id="regulatory" tone="surface" heading={regulatory.heading} size="compact">
        <div className="max-w-measure">
          <dl className="divide-y divide-hairline border-y border-hairline">
            <div className="grid gap-1 py-4 sm:grid-cols-[minmax(0,16rem)_1fr] sm:gap-6">
              <dt className="text-ink-muted">Категория продукции</dt>
              <dd className="text-ink">
                <Value value={regulatory.status} />
              </dd>
            </div>
            <div className="grid gap-1 py-4 sm:grid-cols-[minmax(0,16rem)_1fr] sm:gap-6">
              <dt className="text-ink-muted">Номер документа</dt>
              <dd className="text-ink">
                <Value value={regulatory.documentNumber} />
              </dd>
            </div>
          </dl>

          <p className="mt-6 text-ink-muted">{regulatory.explanation}</p>
        </div>
      </Section>

      {/* FR-L5 */}
      <Section id="terms" heading={siteTerms.heading} size="compact" containerWidth="measure">
        <div className="flex flex-col gap-8">
          {siteTerms.blocks.map((block) => (
            <div key={block.title}>
              <h3 className="text-xl font-semibold text-ink">{block.title}</h3>
              <p className="mt-2.5 text-ink-muted">{block.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="pb-16 md:pb-20">
        <Container>
          <Disclaimer title="Сведения на этой странице">
            Реквизиты, регуляторный статус и данные маркировки публикуются по
            информации изготовителя. Часть полей ещё не предоставлена и помечена
            как уточняемая — мы не заполняем их предположениями.
          </Disclaimer>
        </Container>
      </section>

      <JsonLd data={breadcrumbJsonLd('legal')} />
    </>
  );
}
