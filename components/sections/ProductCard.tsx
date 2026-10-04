import { Container } from '@/components/layout/Container';
import { ProductImage } from '@/components/ui/ProductImage';
import { RichText } from '@/components/ui/RichText';
import { productCard } from '@/content/product';

/**
 * Карточка продукта (ТЗ FR-P1).
 *
 * Атрибуты выведены списком определений: пары «характеристика — значение»
 * это ровно то, для чего существует <dl>, и скринридер читает их связанно.
 * Незаполненные значения не прячутся, а помечаются — см. components/ui/Value.
 */
export function ProductCard() {
  return (
    <section className="pt-10 pb-16 md:pt-14 md:pb-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <ProductImage
              sizes="(min-width: 64rem) 27rem, (min-width: 27rem) 24rem, calc(100vw - 3rem)"
              className="mx-auto max-w-sm lg:sticky lg:top-28 lg:max-w-none"
            />
          </div>

          <div className="lg:col-span-7">
            <h1 className="text-4xl text-ink">{productCard.title}</h1>
            <p className="mt-4 max-w-measure text-xl text-ink-muted">
              {productCard.subtitle}
            </p>

            <dl className="mt-10 divide-y divide-hairline border-y border-hairline">
              {productCard.attributes.map((attribute) => (
                <div
                  key={attribute.label}
                  className="grid gap-1 py-4 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-6"
                >
                  <dt className="text-ink-muted">{attribute.label}</dt>
                  <dd className="font-medium text-ink">
                    {/* RichText, а не Value: маркер может стоять и внутри фразы. */}
                    <RichText measure={false}>{attribute.value}</RichText>
                    {attribute.note && (
                      <p className="mt-1 text-sm font-normal text-ink-muted">{attribute.note}</p>
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 text-ink-muted">{productCard.footnote}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
