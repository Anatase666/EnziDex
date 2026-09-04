import type { Metadata } from 'next';

import { BenefitsDetailed } from '@/components/sections/BenefitsDetailed';
import { CTABlock } from '@/components/sections/CTABlock';
import { CompositionTable } from '@/components/sections/CompositionTable';
import { Limitations } from '@/components/sections/Limitations';
import { ProductCard } from '@/components/sections/ProductCard';
import { UsageDetailed } from '@/components/sections/UsageDetailed';
import { JsonLd } from '@/components/ui/JsonLd';
import { breadcrumbJsonLd, buildMetadata, productJsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata('product');

/** О продукте (ТЗ 4.2). */
export default function ProductPage() {
  return (
    <>
      <ProductCard />
      <CompositionTable />
      <BenefitsDetailed />
      <UsageDetailed />
      <Limitations />

      <CTABlock
        heading="Нужны данные для профессионального решения"
        description="Механизм действия, опубликованные исследования и границы применимости собраны в отдельном разделе. Если нужного документа там нет — запросите его напрямую."
        buttonLabel="Перейти к научной базе"
        buttonHref="/science"
        secondary={{ label: 'Запросить документы', href: '/contacts' }}
      />

      <JsonLd data={productJsonLd()} />
      <JsonLd data={breadcrumbJsonLd('product')} />
    </>
  );
}
