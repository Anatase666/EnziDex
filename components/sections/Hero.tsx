import { ChainIllustration } from './ChainIllustration';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { hero } from '@/content/home';

/**
 * Первый экран (ТЗ FR-H1).
 *
 * Над заголовком нет капслок-лейбла, в заголовке нет слова, выделенного
 * цветом, у кнопок нет стрелок — всё это ТЗ 7.4 называет шаблонными приёмами.
 * Иерархию держат кегль, вес и воздух.
 */
export function Hero() {
  return (
    <section className="pt-10 pb-16 md:pt-16 md:pb-20 lg:pt-20 lg:pb-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7 xl:col-span-6">
            <h1 className="text-hero text-ink">{hero.heading}</h1>

            <p className="mt-6 max-w-measure text-lg text-ink-muted md:mt-7">
              {hero.subheading}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href={hero.primaryCta.href} size="lg">
                {hero.primaryCta.label}
              </Button>
              <Button href={hero.secondaryCta.href} variant="secondary" size="lg">
                {hero.secondaryCta.label}
              </Button>
            </div>

            {/* Короткие факты вместо декоративных «цифр достижений»:
                каждый из них проверяется по составу и упаковке. */}
            <dl className="mt-12 grid gap-x-8 gap-y-6 border-t border-hairline pt-8 sm:grid-cols-3">
              {hero.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-sm text-ink-muted">{fact.label}</dt>
                  <dd className="mt-1 font-medium text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-5 xl:col-span-6">
            <ChainIllustration className="mx-auto max-w-lg" />
          </div>
        </div>
      </Container>
    </section>
  );
}
