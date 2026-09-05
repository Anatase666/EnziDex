import { Container } from '@/components/layout/Container';
import { solution } from '@/content/home';

/**
 * Решение (ТЗ FR-H3, переработано по правкам заказчика).
 *
 * Сетка стадий механизма отсюда убрана — она осталась на странице научной
 * базы, где ей и место. Вместо неё три отличия, сформулированные через
 * отрицание: не абразив, не антисептик, не пероксид. Каждое проверяется по
 * списку компонентов, поэтому это факты о рецептуре, а не обещания.
 *
 * Подача через «чем это не является» выбрана намеренно: продукт попадает в
 * категорию, где у покупателя уже есть готовые ожидания от зубных паст и
 * отбеливающих систем, и быстрее всего объяснить новое, отделив его от
 * знакомого.
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

        <ul className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-3">
          {solution.contrasts.map((contrast) => (
            <li key={contrast.title} className="border-t-2 border-accent pt-5">
              <h3 className="text-xl font-semibold text-ink">{contrast.title}</h3>
              <p className="mt-2.5 text-ink-muted">{contrast.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
