import { Section } from '@/components/layout/Section';
import { projectStage } from '@/content/science';

/**
 * Стадия проекта.
 *
 * Аудитории клиник, партнёров и экспертизы (ТЗ 1.3, сегменты B, C, D) важно
 * не только что умеет фермент, но и насколько далеко продвинулась работа.
 * Раздел отвечает на это прямо: слева сделанное, справа предстоящее —
 * включая клиническую апробацию, которой ещё не было.
 *
 * Умолчание здесь работало бы против продукта: пробел в данных, о котором
 * сказано вслух, вызывает меньше подозрений, чем пробел, который читатель
 * обнаруживает сам.
 */
export function ProjectStage() {
  const { heading, lead, done, next } = projectStage;

  return (
    <Section id="stage" heading={heading} lead={lead}>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="border-t-2 border-accent pt-6">
          <h3 className="text-xl font-semibold text-ink">{done.title}</h3>
          <ul className="mt-5 flex flex-col gap-4">
            {done.items.map((item) => (
              <li key={item.slice(0, 40)} className="flex gap-3 text-ink-muted">
                <span
                  aria-hidden="true"
                  className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t-2 border-hairline-strong pt-6">
          <h3 className="text-xl font-semibold text-ink">{next.title}</h3>
          <ul className="mt-5 flex flex-col gap-4">
            {next.items.map((item) => (
              <li key={item.slice(0, 40)} className="flex gap-3 text-ink-muted">
                <span
                  aria-hidden="true"
                  className="mt-2.5 size-1.5 shrink-0 rounded-full bg-hairline-strong"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
