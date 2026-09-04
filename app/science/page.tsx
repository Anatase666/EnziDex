import type { Metadata } from 'next';

import { EvidenceBoundaries } from '@/components/sections/EvidenceBoundaries';
import { LabTests } from '@/components/sections/LabTests';
import { Mechanism } from '@/components/sections/Mechanism';
import { References } from '@/components/sections/References';
import { Container } from '@/components/layout/Container';
import { Disclaimer } from '@/components/ui/Disclaimer';
import { JsonLd } from '@/components/ui/JsonLd';
import { researchDisclaimer } from '@/content/science';
import { pageSeo } from '@/content/seo';
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata('science');

/**
 * Научная база (ТЗ 4.3 с учётом правок заказчика).
 *
 * Убраны: анимированная схема механизма, парная колонка «чего пока не
 * известно», раздел «Документы» и финальный призыв с кнопками.
 *
 * Дисклеймер о стадии исследований оставлен намеренно. Заказчик его убрать
 * не просил, а требование BC-3 — не переносить результаты in vitro на
 * клинический эффект — остаётся обязательным: страница приводит числовые
 * данные об эффективности фермента, и без этой оговорки они читались бы
 * как обещание клинического результата.
 *
 * Секция визуализации результатов (FR-S3) отсутствует: ТЗ требует не
 * публиковать её без количественных данных, а их пока нет.
 */
export default function SciencePage() {
  return (
    <>
      <section className="pt-10 pb-4 md:pt-14">
        <Container>
          <h1 className="text-4xl max-w-[18ch] text-balance text-ink">
            Научная база
          </h1>
          <p className="mt-5 max-w-measure text-xl text-ink-muted">
            {pageSeo.science.description}
          </p>
        </Container>
      </section>

      <Mechanism />
      <EvidenceBoundaries />
      <LabTests />
      <References />

      <section className="pt-4 pb-16 md:pb-20">
        <Container>
          <Disclaimer title={researchDisclaimer.title}>
            {researchDisclaimer.body}
          </Disclaimer>
        </Container>
      </section>

      <JsonLd data={breadcrumbJsonLd('science')} />
    </>
  );
}
