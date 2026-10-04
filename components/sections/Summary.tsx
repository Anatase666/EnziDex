import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { summary } from '@/content/home';

/**
 * Завершающий блок главной перед подвалом.
 *
 * Пересказ страницы одним абзацем — для того, кто долистал до конца, — и
 * переход в «Продукт». Без отдельной плашки: блок стоит на фоне страницы
 * между белой полосой применения и белым подвалом, и этого контраста
 * достаточно.
 */
export function Summary() {
  return (
    <section className="py-16 md:py-20 lg:py-24">
      <Container>
        <div className="max-w-measure">
          <h2 className="text-section text-balance text-ink">{summary.heading}</h2>
          <p className="mt-6 text-xl text-ink">{summary.text}</p>

          <div className="mt-9">
            <Button href={summary.cta.href} size="lg">
              {summary.cta.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
