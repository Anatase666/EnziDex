import { Section } from '@/components/layout/Section';
import { ingredients } from '@/content/product';
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
 * Порядок перечисления не сортируется и не меняется: по правилам маркировки
 * он означает убывание концентрации и должен совпадать с упаковкой.
 */
export function CompositionTable({ headless = false }: { headless?: boolean }) {
  const content = (
    <>
      {/* Шапка «таблицы» появляется только там, где хватает ширины. */}
      <div
        aria-hidden="true"
        className="hidden border-b border-ink/15 pb-3 text-sm font-medium text-ink-muted lg:grid lg:grid-cols-[minmax(0,15rem)_minmax(0,11rem)_1fr] lg:gap-8"
      >
        <span>Компонент (INCI)</span>
        <span>Назначение</span>
        <span>Комментарий</span>
      </div>

      <ul className="divide-y divide-hairline border-b border-hairline lg:border-t-0">
        {ingredients.map((ingredient) => (
          <li
            key={ingredient.inci}
            className={cn(
              'grid gap-2 py-5 lg:grid-cols-[minmax(0,15rem)_minmax(0,11rem)_1fr] lg:gap-8',
              ingredient.isActive && 'bg-accent-soft/45',
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

            <p className="text-ink-muted lg:text-ink">
              <span className="sr-only">Назначение: </span>
              {ingredient.role}
            </p>

            <p className={cn('text-ink-muted', ingredient.isActive && 'lg:pr-4')}>
              <span className="sr-only">Комментарий: </span>
              {ingredient.description}
            </p>
          </li>
        ))}
      </ul>
    </>
  );

  if (headless) return content;

  return (
    <Section id="composition" heading="Состав">
      {content}
    </Section>
  );
}
