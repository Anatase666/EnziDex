import type { Metadata } from 'next';

import { CTABlock } from '@/components/sections/CTABlock';
import { Documents } from '@/components/sections/Documents';
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
 * Научная база (ТЗ 4.3).
 *
 * Порядок разделов выбран так, чтобы оговорка не выглядела отпиской:
 * сначала механизм, затем прямой разбор того, что доказано и что нет,
 * затем отсутствующие пока собственные испытания, затем источники —
 * и только в конце формальный дисклеймер, который к этому моменту
 * уже ничего не «раскрывает впервые».
 *
 * Секция визуализации результатов (FR-S3) отсутствует намеренно:
 * ТЗ требует не публиковать её без количественных данных.
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
      <Documents />

      <section className="pb-4">
        <Container>
          <Disclaimer title={researchDisclaimer.title}>
            {researchDisclaimer.body}
          </Disclaimer>
        </Container>
      </section>

      <CTABlock
        heading="Остались вопросы по данным"
        description="Если для оценки продукта нужен документ, которого нет на сайте, — напишите, какой именно. Ответим тем, что есть на сегодня, и скажем прямо, чего пока нет."
        buttonLabel="Написать нам"
        secondary={{ label: 'Вопросы и безопасность', href: '/faq' }}
      />

      <JsonLd data={breadcrumbJsonLd('science')} />
    </>
  );
}
