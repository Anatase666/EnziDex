import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { LeadForm } from './LeadForm';

type CTABlockProps = {
  heading: string;
  description?: string;
  /**
   * `form`   — компактная форма прямо в блоке (главная).
   * `button` — кнопка на страницу контактов (внутренние страницы).
   */
  mode?: 'form' | 'button';
  buttonLabel?: string;
  buttonHref?: string;
  /** Дополнительная ссылка рядом — например, на полную форму. */
  secondary?: { label: string; href: string };
};

/**
 * Переиспользуемый призыв к действию (ТЗ FR-G4).
 *
 * Тёмная плашка — единственный сильный контраст на странице (ТЗ 7.1),
 * поэтому она появляется один раз и всегда в конце: если раскрасить так
 * несколько блоков, акцент перестаёт работать как акцент.
 */
export function CTABlock({
  heading,
  description,
  mode = 'button',
  buttonLabel = 'Оставить заявку',
  buttonHref = '/contacts',
  secondary,
}: CTABlockProps) {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <div className="rounded-2xl bg-ink px-6 py-12 text-ink-inverse md:px-12 md:py-14">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
            <div>
              <h2 className="text-section max-w-[16ch] text-balance">{heading}</h2>
              {description && (
                <p className="mt-5 max-w-measure text-lg text-ink-inverse/75">{description}</p>
              )}

              {mode === 'button' && (
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Button
                    href={buttonHref}
                    className="bg-surface text-ink hover:bg-surface/90"
                    size="lg"
                  >
                    {buttonLabel}
                  </Button>

                  {secondary && (
                    <a
                      href={secondary.href}
                      className="text-ink-inverse/80 underline underline-offset-4 transition-colors hover:text-ink-inverse"
                    >
                      {secondary.label}
                    </a>
                  )}
                </div>
              )}
            </div>

            {mode === 'form' && (
              <div className="rounded-xl bg-surface p-6 text-ink md:p-8">
                <LeadForm variant="compact" />
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
