import { Section } from '@/components/layout/Section';
import { Disclaimer } from '@/components/ui/Disclaimer';
import { DocumentIcon, ExternalIcon } from '@/components/icons';
import { documents } from '@/content/science';

/**
 * Документы (ТЗ FR-S6).
 *
 * Ссылки на файлы открываются в новой вкладке, рядом указаны формат и размер:
 * пользователь должен понимать, что произойдёт по нажатию, до нажатия —
 * особенно на мобильном трафике.
 */
export function Documents() {
  if (documents.length === 0) {
    return (
      <Section id="documents" heading="Документы">
        <Disclaimer tone="gap" title="Документы будут опубликованы после получения">
          {`Регистрационные документы, технические условия и протоколы испытаний размещаются здесь по мере поступления от изготовителя.\n\nЕсли комплект нужен для работы клиники или для оценки поставки — [запросите его через форму](/contacts), указав тип обращения.`}
        </Disclaimer>
      </Section>
    );
  }

  return (
    <Section
      id="documents"
      heading="Документы"
      lead="Файлы открываются в новой вкладке. Формат и размер указаны рядом со ссылкой."
    >
      <ul className="divide-y divide-hairline border-y border-hairline">
        {documents.map((document) => (
          <li key={document.href}>
            <a
              href={document.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 py-5 transition-colors hover:text-accent-ink"
            >
              <DocumentIcon className="mt-0.5 size-6 shrink-0 text-accent" aria-hidden="true" />

              <span className="min-w-0 flex-1">
                <span className="block font-medium text-ink group-hover:text-accent-ink">
                  {document.title}
                </span>
                {document.description && (
                  <span className="mt-1 block text-ink-muted">{document.description}</span>
                )}
                <span className="mt-1.5 block text-sm text-ink-muted">
                  {document.format} · {document.size}
                </span>
              </span>

              <ExternalIcon className="mt-1 size-4 shrink-0 text-ink-muted" aria-hidden="true" />
              <span className="sr-only">(откроется в новой вкладке)</span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
