import type { Metadata } from 'next';

import { Engineering } from '@/components/sections/Engineering';
import { EnzymeOrigin } from '@/components/sections/EnzymeOrigin';
import { EvidenceBoundaries } from '@/components/sections/EvidenceBoundaries';
import { LabTests } from '@/components/sections/LabTests';
import { Mechanism } from '@/components/sections/Mechanism';
import { MutantResults } from '@/components/sections/MutantResults';
import { ProjectStage } from '@/components/sections/ProjectStage';
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
 * Порядок разделов ведёт читателя от «что происходит во рту» к «что мы с
 * этим сделали»: механизм → откуда фермент → почему его пришлось
 * переделывать → что показал скрининг → собственные испытания → что
 * доказано → стадия проекта → источники.
 *
 * Дисклеймер о стадии исследований стоит последним и остаётся обязательным
 * (BC-3): страница приводит числовые данные об активности фермента, и без
 * оговорки они читались бы как обещание клинического результата.
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
      <EnzymeOrigin />
      <Engineering />
      <MutantResults />
      <LabTests />
      <EvidenceBoundaries />
      <ProjectStage />
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
