import type { Metadata } from 'next';

import { CompositionTable } from '@/components/sections/CompositionTable';
import { ProductCard } from '@/components/sections/ProductCard';
import { UsageDetailed } from '@/components/sections/UsageDetailed';
import { JsonLd } from '@/components/ui/JsonLd';
import { breadcrumbJsonLd, buildMetadata, productJsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata('product');

export default function ProductPage() {
  return (
    <>
      <ProductCard />
      <CompositionTable />
      <UsageDetailed />

      <JsonLd data={productJsonLd()} />
      <JsonLd data={breadcrumbJsonLd('product')} />
    </>
  );
}
