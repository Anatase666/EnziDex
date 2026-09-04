import { Section } from '@/components/layout/Section';
import { limitations } from '@/content/product';

/**
 * Чего продукт не делает (ТЗ FR-P5).
 *
 * Блок стоит на странице продукта не из скромности, а по расчёту: он
 * закрывает BC-1, снимая сам повод для формулировок о лечебном действии,
 * и работает на доверие сильнее, чем ещё один список достоинств.
 * Поэтому он оформлен как полноценный раздел, а не как сноска мелким шрифтом.
 */
export function Limitations() {
  return (
    <Section
      heading="Чего продукт не делает"
      lead="Список составлен по тому же принципу, что и список свойств: только проверяемые утверждения. Если механизма нет в составе — значит, нет и эффекта."
    >
      <ul className="grid gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {limitations.map((limitation) => (
          <li key={limitation.title} className="border-l-2 border-hairline-strong pl-5">
            <h3 className="font-semibold text-ink">{limitation.title}</h3>
            <p className="mt-2 text-ink-muted">{limitation.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
