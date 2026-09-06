import { Section } from '@/components/layout/Section';
import { Value } from '@/components/ui/Value';
import { usageNotes, usageSteps } from '@/content/product';
import { TODO_CONTENT, isFilled } from '@/content/types';

const NOTE_LABELS: { key: keyof typeof usageNotes; label: string }[] = [
  { key: 'frequency', label: 'Частота применения' },
  { key: 'course', label: 'Длительность курса' },
  { key: 'before', label: 'Что делать до применения' },
  { key: 'after', label: 'Что делать после' },
];

/**
 * Развёрнутый режим применения (ТЗ FR-P4).
 *
 * Как и на главной, от раздела осталась только надпись: под заголовком
 * стоит пометка «Требует корректировки», пока инструкция изготовителя не
 * получена. Шаги, частота и длительность курса появятся автоматически,
 * когда usageSteps и usageNotes будут заполнены.
 *
 * Нумерация шагов — единственное разрешённое ТЗ 7.4 место для цифр:
 * здесь последовательность действительно является последовательностью.
 */
export function UsageDetailed() {
  const hasSteps = usageSteps.some(
    (step) => isFilled(step.title) && isFilled(step.description),
  );
  const hasNotes = NOTE_LABELS.some(({ key }) => isFilled(usageNotes[key]));

  return (
    <Section id="usage" tone="surface" heading="Инструкция по применению">
      {hasSteps ? (
        <>
          <ol className="grid gap-10 lg:grid-cols-3">
            {usageSteps.map((step, index) => (
              <li key={step.title} className="flex gap-5">
                <span
                  aria-hidden="true"
                  className="flex size-11 shrink-0 items-center justify-center rounded-full border border-accent/40 text-lg font-medium text-accent-ink"
                >
                  {index + 1}
                </span>

                <div>
                  <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 text-ink-muted">{step.description}</p>
                  {isFilled(step.meta) && (
                    <p className="mt-3 text-sm font-medium text-accent-ink">{step.meta}</p>
                  )}
                </div>
              </li>
            ))}
          </ol>

          {hasNotes && (
            <dl className="mt-12 grid gap-x-10 gap-y-6 border-t border-hairline pt-8 sm:grid-cols-2">
              {NOTE_LABELS.map(({ key, label }) => (
                <div key={key}>
                  <dt className="text-sm text-ink-muted">{label}</dt>
                  <dd className="mt-1 text-ink">
                    <Value value={usageNotes[key]} />
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </>
      ) : (
        <p className="text-lg">
          <Value value={TODO_CONTENT} />
        </p>
      )}
    </Section>
  );
}
