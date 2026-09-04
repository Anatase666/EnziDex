import { Container } from '@/components/layout/Container';
import { problem } from '@/content/home';

/**
 * Проблема (ТЗ FR-H2).
 *
 * Раскладка «заголовок слева, текст справа» выбрана, чтобы разорвать
 * монотонность одноколоночных секций и дать длинному объяснению нормальную
 * длину строки. Формулировки описательные: что такое биоплёнка и почему она
 * устойчива, — без слов о лечении и заболеваниях (BC-1).
 */
export function Problem() {
  return (
    <section className="border-y border-hairline bg-surface py-16 md:py-20 lg:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="text-section max-w-[14ch] text-balance text-ink">
              {problem.heading}
            </h2>
          </div>

          <div className="lg:col-span-7">
            <div className="flex max-w-measure flex-col gap-5 text-lg text-ink-muted">
              {problem.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>

            <p className="mt-8 max-w-measure border-l-2 border-accent pl-5 text-base text-ink">
              {problem.figureCaption}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
