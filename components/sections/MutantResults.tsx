import { Section } from '@/components/layout/Section';
import { mutantResults, mutantResultsSection } from '@/content/science';
import { cn } from '@/lib/cn';

const MAX_ACTIVITY = Math.max(...mutantResults.map((item) => item.activity));

/**
 * Результаты скрининга мутантных форм (ТЗ FR-S2, FR-S3).
 *
 * Секция с визуализацией появилась только сейчас: ТЗ прямо запрещает
 * публиковать её без количественных данных, а данные пришли вместе с
 * отчётом о проделанной работе.
 *
 * Диаграмма нарисована руками на SVG. Библиотека графиков ради пяти
 * горизонтальных полос не оправдана (ТЗ 6.4), а собственная реализация
 * ещё и не требует JavaScript — диаграмма видна и при отключённых скриптах.
 *
 * Для доступности диаграмма скрыта от скринридера: ровно те же числа
 * стоят ниже в таблице, и читать их дважды пользователю незачем.
 */
export function MutantResults() {
  return (
    <Section
      id="screening"
      tone="surface"
      heading={mutantResultsSection.heading}
      lead={mutantResultsSection.lead}
    >
      <figure>
        <ul aria-hidden="true" className="flex flex-col gap-4">
          {mutantResults.map((item) => (
            <li key={item.name} className="grid grid-cols-[minmax(0,9rem)_1fr] items-center gap-4">
              <span
                className={cn(
                  'truncate text-sm',
                  item.isReference ? 'text-ink-muted' : 'font-medium text-ink',
                )}
              >
                {item.name}
              </span>

              <span className="flex items-center gap-3">
                <span
                  className={cn(
                    'block h-7 rounded-sm',
                    item.isReference ? 'bg-hairline-strong' : 'bg-accent',
                  )}
                  style={{ width: `${Math.max((item.activity / MAX_ACTIVITY) * 100, 1.5)}%` }}
                />
                <span className="shrink-0 text-sm tabular-nums text-ink-muted">
                  {item.activity}
                </span>
              </span>
            </li>
          ))}
        </ul>

        <figcaption className="mt-5 max-w-measure text-sm text-ink-muted">
          {mutantResultsSection.chartCaption}
        </figcaption>
      </figure>

      <div className="mt-12 overflow-x-auto">
        <table className="w-full min-w-[44rem] border-collapse text-left">
          <caption className="sr-only">
            Удельная активность и кинетические константы мутантных форм декстраназы
            в сравнении с природным ферментом
          </caption>
          <thead>
            <tr className="border-b border-ink/15 text-sm text-ink-muted">
              <th scope="col" className="py-3 pr-6 font-medium">
                Форма фермента
              </th>
              <th scope="col" className="py-3 pr-6 font-medium">
                Активность, ед/мл
              </th>
              <th scope="col" className="py-3 pr-6 font-medium">
                K<sub>m</sub>, мкмоль/л
              </th>
              <th scope="col" className="py-3 pr-6 font-medium">
                k<sub>cat</sub>, с⁻¹
              </th>
              <th scope="col" className="py-3 font-medium">
                k<sub>cat</sub>/K<sub>m</sub>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {mutantResults.map((item) => (
              <tr key={item.name} className={cn(item.isReference && 'bg-sunken/60')}>
                <th scope="row" className="py-4 pr-6 align-top font-medium text-ink">
                  {item.name}
                  {item.verdict && (
                    <span className="mt-1 block max-w-[26ch] text-sm font-normal text-ink-muted">
                      {item.verdict}
                    </span>
                  )}
                </th>
                <td className="py-4 pr-6 align-top tabular-nums text-ink">{item.activity}</td>
                <td className="py-4 pr-6 align-top tabular-nums text-ink-muted">
                  {item.km?.toLocaleString('ru-RU') ?? '—'}
                </td>
                <td className="py-4 pr-6 align-top tabular-nums text-ink-muted">
                  {item.kcat?.toLocaleString('ru-RU') ?? '—'}
                </td>
                <td className="py-4 align-top tabular-nums text-ink-muted">
                  {item.efficiency?.toLocaleString('ru-RU') ?? '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-8 max-w-measure text-lg text-ink-muted">
        {mutantResultsSection.conclusion}
      </p>
    </Section>
  );
}
