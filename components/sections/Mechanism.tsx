import { Section } from '@/components/layout/Section';
import { Accordion } from '@/components/ui/Accordion';
import { mechanism } from '@/content/science';

/**
 * Механизм действия (ТЗ FR-S1 с учётом правок заказчика).
 *
 * Двухуровневая подача: сверху объяснение для неспециалиста, ниже —
 * раскрывающийся блок с терминологией, ферментной номенклатурой и ссылкой
 * на конкретную работу. Так страница остаётся читаемой для аудитории A,
 * не теряя содержания для аудитории B.
 *
 * Анимированная схема расщепления цепи убрана. Стадии реакции остались
 * текстовым списком — последовательность передана связкой «точка на общей
 * линии», без цифр, которые ТЗ 7.4 оставляет разделу «Как использовать».
 */
export function Mechanism() {
  return (
    <Section id="mechanism" heading={mechanism.plain.heading}>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <div className="flex max-w-measure flex-col gap-5 text-lg text-ink-muted">
            {mechanism.plain.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Стадии реакции. Порядок передан связкой «точка на общей линии»,
            а не цифрами: ТЗ 7.4 оставляет видимую нумерацию единственному
            разделу «Как использовать». Семантика последовательности при
            этом сохранена — это по-прежнему <ol>. */}
        <ol className="relative flex flex-col gap-7 lg:col-span-5">
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[5px] w-px bg-hairline-strong"
          />

          {mechanism.stages.steps.map((step) => (
            <li key={step.id} className="relative flex gap-5">
              <span
                aria-hidden="true"
                className="mt-2 size-[11px] shrink-0 rounded-full border-2 border-accent bg-surface"
              />
              <div>
                <h3 className="font-semibold text-ink">{step.title}</h3>
                <p className="mt-1 text-ink-muted">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-12">
        <Accordion
          items={[
            {
              id: 'detailed',
              question: mechanism.detailed.heading,
              answer: mechanism.detailed.paragraphs.join('\n\n'),
            },
          ]}
        />
      </div>
    </Section>
  );
}
