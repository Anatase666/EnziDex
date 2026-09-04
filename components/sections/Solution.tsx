import { Container } from '@/components/layout/Container';
import { solution } from '@/content/home';

/**
 * Решение (ТЗ FR-H3 с учётом правок заказчика).
 *
 * Сетка из четырёх стадий реакции, блок-оговорка и ссылка «Разбор механизма
 * и источники» с этой секции убраны. Осталось объяснение механизма текстом;
 * подробный разбор со стадиями и источниками живёт на странице научной базы,
 * куда ведёт основная навигация.
 *
 * Пометка in vitro не потерялась вместе с блоком-оговоркой: она встроена
 * в тот же абзац, где стоит само утверждение (см. content/home.ts).
 */
export function Solution() {
  return (
    <section className="py-16 md:py-20 lg:py-24">
      <Container>
        <div className="max-w-measure">
          <h2 className="text-section text-balance text-ink">{solution.heading}</h2>
          <p className="mt-5 text-xl text-ink">{solution.lead}</p>

          <div className="mt-6 flex flex-col gap-5 text-lg text-ink-muted">
            {solution.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
