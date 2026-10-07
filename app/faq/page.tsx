import type { Metadata } from 'next';

import { FaqList } from '@/components/sections/FaqList';
import { Container } from '@/components/layout/Container';
import { JsonLd } from '@/components/ui/JsonLd';
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata('faq');


export default function FaqPage() {
  return (
    <>
      <section className="pt-10 pb-10 md:pt-14">
        <Container>
          <h1 className="text-4xl max-w-[18ch] text-balance text-ink">
            FAQ
          </h1>
        </Container>
      </section>

      <FaqList />

      <JsonLd data={faqJsonLd()} />
      <JsonLd data={breadcrumbJsonLd('faq')} />
    </>
  );
}
