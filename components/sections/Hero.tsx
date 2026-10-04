import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { ProductImage } from '@/components/ui/ProductImage';
import { hero } from '@/content/home';

/**
 * Первый экран (ТЗ FR-H1, переработан по правкам заказчика).
 *
 * Текст и упаковка стоят двумя равными колонками; упаковка — рендер
 * продукта на мягкой фиалковой подложке. Картинка здесь главный кандидат
 * в LCP, поэтому грузится с высоким приоритетом и без ленивой загрузки.
 *
 * Фон первого экрана — мягкий фиалковый градиент, растворяющийся в фоне
 * страницы. Это единственный градиент на сайте: он отделяет первый экран
 * от остального без линейки и без капслок-лейбла, запрещённого ТЗ 7.4.
 *
 * Кнопка одна. Вторая («Оставить заявку») убрана вместе со всей механикой
 * обращений, и оставшаяся стала основной.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pt-10 pb-14 md:pt-16 md:pb-20 lg:pt-20">
      {/* Подложка первого экрана. aria-hidden: это чистая декорация. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-linear-to-b from-accent-soft/70 via-accent-soft/20 to-transparent"
      />

      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-6">
            <h1 className="text-hero text-ink">{hero.heading}</h1>

            <p className="mt-6 max-w-measure text-lg text-ink-muted md:mt-7">
              {hero.subheading}
            </p>

            <div className="mt-9">
              <Button href={hero.cta.href} size="lg">
                {hero.cta.label}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6 lg:pl-6">
            <ProductImage
              priority
              sizes="(min-width: 64rem) 33rem, (min-width: 40rem) 28rem, (min-width: 27rem) 24rem, calc(100vw - 3rem)"
              className="mx-auto max-w-sm sm:max-w-md lg:max-w-full"
            />
          </div>
        </div>

        {/* Факты вынесены под обе колонки и разделены вертикальными линиями:
            так они читаются как характеристики продукта, а не как ещё один
            блок текста под заголовком. */}
        <dl className="mt-12 grid border-t border-hairline pt-8 sm:grid-cols-3 sm:gap-x-8 md:mt-16">
          {hero.facts.map((fact, index) => (
            <div
              key={fact.label}
              className={
                index > 0
                  ? 'mt-5 sm:mt-0 sm:border-l sm:border-hairline sm:pl-8'
                  : undefined
              }
            >
              <dt className="text-sm text-ink-muted">{fact.label}</dt>
              <dd className="mt-1 text-lg font-medium text-ink">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
