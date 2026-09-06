import type { Metadata } from 'next';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Disclaimer } from '@/components/ui/Disclaimer';
import { JsonLd } from '@/components/ui/JsonLd';
import { Value } from '@/components/ui/Value';
import { legalPage } from '@/content/legal';
import { requisites } from '@/content/site';
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata('legal');

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

      {/* От страницы остались только реквизиты. Убраны по просьбе заказчика:
          «Состав по INCI» (FR-L2) и «Данные маркировки» (FR-L3) — этой
          правкой; «Регуляторный статус» (FR-L4) и «Условия использования
          сайта» (FR-L5) — предыдущей, вместе с их текстами.
          Полный состав и характеристики продукта остались на /product. */}

      <section className="pb-16 md:pb-20">
        <Container>
          <Disclaimer title="Сведения на этой странице">
            Реквизиты публикуются по информации изготовителя. Часть полей ещё
            не предоставлена и помечена как уточняемая — мы не заполняем их
            предположениями. Состав продукта приведён на странице «Продукт»;
            при расхождении с упаковкой приоритет имеет упаковка.
          </Disclaimer>
        </Container>
      </section>

      <JsonLd data={breadcrumbJsonLd('legal')} />
    </>
  );
}
