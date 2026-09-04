import type { Metadata } from 'next';

import { CompositionTable } from '@/components/sections/CompositionTable';
import { ProductCard } from '@/components/sections/ProductCard';
import { UsageDetailed } from '@/components/sections/UsageDetailed';
import { JsonLd } from '@/components/ui/JsonLd';
import { breadcrumbJsonLd, buildMetadata, productJsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata('product');

/**
 * О продукте (ТЗ 4.2 с учётом правок заказчика).
 *
 * Убраны блоки «Что следует из состава», «Чего продукт не делает» и
 * финальный призыв с кнопками. Страница осталась справочной: карточка
 * продукта с объёмной визуализацией упаковки, полный состав и режим
 * применения.
 */
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
