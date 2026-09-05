import { Section } from '@/components/layout/Section';
import { mechanism } from '@/content/science';

/**
 * Механизм действия (ТЗ FR-S1, сокращён по правкам заказчика).
 *
 * Раскрывающийся блок «подробнее для специалистов» убран — вместе с ним
 * со страницы ушли ферментная номенклатура, номера каталитических остатков
 * и разбор семейства GH49. Осталось объяснение для неспециалиста и стадии
 * реакции; терминология, нужная аудитории клиник, частично сохранилась в
 * разделах о происхождении фермента и о его модификации.
 *
 * Порядок стадий передан связкой «точка на общей линии», а не цифрами:
 * ТЗ 7.4 оставляет видимую нумерацию единственному разделу «Как
 * использовать». Семантика последовательности при этом сохранена — это
 * по-прежнему список ol.
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
    </Section>
  );
}
