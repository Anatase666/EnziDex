import { Container } from '@/components/layout/Container';
import { problem } from '@/content/home';

/**
 * Проблема (ТЗ FR-H2, переработана по правкам заказчика).
 *
 * Единственная тёмная полоса на сайте. ТЗ 7.1 отводит роль главного
 * контраста тёмному #171A45, и здесь он работает по смыслу: раздел про
 * устойчивость биоплёнки — единственное место страницы, где уместна
 * тяжёлая, «плотная» подача. Повторять этот приём в других секциях нельзя,
 * иначе акцент перестанет быть акцентом.
 *
 * Формулировки описательные: что такое биоплёнка и почему она устойчива, —
 * без слов о лечении и заболеваниях (BC-1).
 */
export function Problem() {
  return (
    <section className="bg-ink py-16 text-ink-inverse md:py-20 lg:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="text-section max-w-[14ch] text-balance text-ink-inverse">
              {problem.heading}
            </h2>
          </div>

          <div className="lg:col-span-7">
            <div className="flex max-w-measure flex-col gap-5 text-lg text-ink-inverse/70">
              {problem.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
