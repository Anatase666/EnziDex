import { Section } from '@/components/layout/Section';
import { compositionSection, ingredients } from '@/content/product';
import { cn } from '@/lib/cn';

/**
 * Полный состав
 *
 * Сетка коротких карточек: название, INCI, назначение. После того как
 * заказчик убрал колонку комментариев, таблица из двух колонок превратилась
 * в длинный разреженный список — карточки показывают все десять компонентов
 * на одном экране. Действующий компонент выделен фиалковой подложкой.
 *
 * Разметка — нумерованный список: порядок перечисления по правилам
 * маркировки означает убывание концентрации и должен совпадать с упаковкой,
 * поэтому он не сортируется и не меняется. Номеров на карточках нет:
 * нумерация на сайте разрешена только в инструкции по применению.
 */
export function CompositionTable({ headless = false }: { headless?: boolean }) {
  const content = (
    <>
      <ol className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5 lg:gap-4">
        {ingredients.map((ingredient) => (
          <li
            key={ingredient.inci}
            className={cn(
              'flex flex-col rounded-2xl border p-4 md:p-5',
              // Десятый компонент на планшете остался бы один в ряду из трёх.
              ingredient.isActive && 'md:col-span-3 lg:col-span-1',
              ingredient.isActive
                ? 'border-accent/40 bg-accent-soft'
                : 'border-hairline bg-surface',
            )}
          >
            {ingredient.isActive && (
              <span className="mb-3 self-start rounded-sm bg-accent px-1.5 py-0.5 text-xs font-medium text-ink-inverse">
                действующий
              </span>
            )}

            <p className="font-medium leading-snug text-ink [overflow-wrap:break-word]">
              {ingredient.name}
            </p>
            <p className="mt-1 font-mono text-xs tracking-tight text-ink-muted">
              {ingredient.inci}
            </p>

            <p className="mt-auto pt-4 text-sm font-medium text-accent-ink [overflow-wrap:break-word]">
              <span className="sr-only">Назначение: </span>
              {ingredient.role}
            </p>
          </li>
        ))}
      </ol>

      <p className="mt-6 text-ink-muted">{compositionSection.footnote}</p>
    </>
  );

  if (headless) return content;

  return (
    <Section id="composition" heading={compositionSection.heading}>
      {content}
    </Section>
  );
}
