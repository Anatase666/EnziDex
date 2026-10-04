import { Section } from '@/components/layout/Section';
import { compositionSection, ingredients } from '@/content/product';
import { cn } from '@/lib/cn';

/**
 * Полный состав (ТЗ FR-P2, FR-L2).
 *
 * Реализовано списком с табличной раскладкой, а не элементом <table>.
 * Причина практическая: таблица из трёх колонок, одна из которых —
 * развёрнутое описание, на 360px либо уезжает в горизонтальный скролл
 * (что запрещает ТЗ 9), либо ломается приёмом display:block для ячеек,
 * который лишает таблицу её семантики в скринридерах. Список из десяти
 * элементов с подписанными полями честнее описывает структуру данных
 * и перестраивается в одну колонку без потерь.
 *
 * Две колонки: компонент с INCI и назначение. Колонка комментариев убрана
 * заказчиком. На мобильном каждый компонент — отдельная карточка, с lg —
 * строка таблицы.
 *
 * Порядок перечисления не сортируется и не меняется: по правилам маркировки
 * он означает убывание концентрации и должен совпадать с упаковкой.
 */
export function CompositionTable({ headless = false }: { headless?: boolean }) {
  const content = (
    <>
      {/* Шапка «таблицы» появляется только там, где хватает ширины. */}
      <div
        aria-hidden="true"
        className="hidden border-b border-ink/15 pb-3 text-sm font-medium text-ink-muted lg:grid lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-8"
      >
        <span>Компонент (INCI)</span>
        <span>Назначение</span>
      </div>

      <ul className="flex flex-col gap-3 lg:gap-0 lg:divide-y lg:divide-hairline lg:border-b lg:border-hairline">
        {ingredients.map((ingredient) => (
          <li
            key={ingredient.inci}
            className={cn(
              'grid gap-2 rounded-xl border p-5',
              'lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-8 lg:rounded-none lg:border-0 lg:px-0',
              ingredient.isActive
                ? 'border-accent/30 bg-accent-soft/45'
                : 'border-hairline bg-surface lg:bg-transparent',
            )}
          >
            <div className={cn(ingredient.isActive && 'lg:pl-4')}>
              <p className="font-medium text-ink">
                {ingredient.name}
                {ingredient.isActive && (
                  <span className="ml-2 rounded-sm bg-accent px-1.5 py-0.5 align-middle text-xs font-medium text-ink-inverse">
                    действующий
                  </span>
                )}
              </p>
              <p className="mt-1 font-mono text-sm tracking-tight text-ink-muted">
                {ingredient.inci}
              </p>
            </div>

            <p className="text-sm font-medium text-accent-ink lg:text-base lg:font-normal lg:text-ink">
              <span className="sr-only">Назначение: </span>
              {ingredient.role}
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-ink-muted">{compositionSection.footnote}</p>
    </>
  );

  if (headless) return content;

  return (
    <Section
      id="composition"
      heading={compositionSection.heading}
    >
      {content}
    </Section>
  );
}
