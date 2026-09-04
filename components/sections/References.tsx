import { Section } from '@/components/layout/Section';
import { ExternalIcon } from '@/components/icons';
import { references } from '@/content/science';

/**
 * Публикации и источники (ТЗ FR-S4).
 *
 * У каждой работы указано не только описание, но и то, какое именно
 * утверждение на странице она обеспечивает: требование BC-2 — «утверждение
 * об эффективности без источника не публикуется» — проверяемо только тогда,
 * когда видно соответствие между ссылкой и тезисом.
 *
 * Выходные данные и DOI сверены с первоисточниками, ссылки ведут на
 * doi.org и открываются в новой вкладке (ТЗ 9).
 */
export function References() {
  return (
    <Section
      id="references"
      tone="surface"
      heading="Источники"
      lead="Работы, на которые опирается этот раздел. Ссылки ведут на постоянные адреса DOI."
    >
      <ol className="divide-y divide-hairline border-y border-hairline">
        {references.map((reference) => (
          <li key={reference.doi ?? reference.title} className="py-6">
            <div className="grid gap-x-10 gap-y-3 lg:grid-cols-[1fr_minmax(0,20rem)]">
              <div>
                <p className="text-ink">
                  <span className="font-medium">{reference.authors}</span>{' '}
                  <span className="text-ink-muted">({reference.year})</span>
                </p>

                <p className="mt-1.5 text-ink">{reference.title}</p>

                <p className="mt-1.5 text-sm text-ink-muted">{reference.source}</p>

                {reference.url && (
                  <a
                    href={reference.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link mt-2.5 inline-flex items-center gap-1.5 font-mono text-sm tracking-tight"
                  >
                    doi: {reference.doi}
                    <ExternalIcon className="size-3.5" aria-hidden="true" />
                    <span className="sr-only">(откроется в новой вкладке)</span>
                  </a>
                )}
              </div>

              <p className="text-sm text-ink-muted lg:border-l lg:border-hairline lg:pl-8">
                {reference.relevance}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
