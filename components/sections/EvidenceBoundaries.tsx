import { Section } from '@/components/layout/Section';
import { RichText } from '@/components/ui/RichText';
import { evidenceBoundaries } from '@/content/science';

/**
 * Что установлено опубликованными исследованиями (ТЗ BC-2).
 *
 * Парная колонка «не установлено и не утверждается» убрана по правке
 * заказчика, поэтому блок стал одноколоночным. Каждый пункт по-прежнему
 * сам называет условия получения результата, а дисклеймер о стадии
 * исследований остался внизу страницы — требование BC-3 закрыто.
 */
export function EvidenceBoundaries() {
  const { heading, known } = evidenceBoundaries;

  return (
    <Section tone="surface" heading={heading}>
      <div className="max-w-3xl border-t-2 border-accent pt-6">
        <h3 className="text-xl font-semibold text-ink">{known.title}</h3>

        <ul className="mt-5 flex flex-col gap-4">
          {known.items.map((item) => (
            <li key={item.slice(0, 40)} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent"
              />
              <RichText measure={false} className="text-ink-muted">
                {item}
              </RichText>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
