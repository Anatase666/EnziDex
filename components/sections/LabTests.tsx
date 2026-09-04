import { Section } from '@/components/layout/Section';
import { Disclaimer } from '@/components/ui/Disclaimer';
import { RichText } from '@/components/ui/RichText';
import { Value } from '@/components/ui/Value';
import { labTests, labTestsSection } from '@/content/science';

/**
 * Собственные лабораторные испытания (ТЗ FR-S2).
 *
 * Реализовано списком, а не элементом <table>: у каждого испытания есть
 * развёрнутое описание методики, и таблица из пяти колонок с абзацем прозы
 * в одной из них на 360px либо уезжает в горизонтальный скролл, либо
 * ломается приёмом display:block, который лишает её семантики.
 *
 * Пометка условий обязательна по BC-3 и вынесена в заметное место рядом
 * с результатом, а не спрятана в конце строки.
 */
export function LabTests() {
  if (labTests.length === 0) {
    return (
      <Section id="lab-tests" heading={labTestsSection.heading}>
        <Disclaimer tone="gap" title="Протоколы испытаний ещё не опубликованы">
          {`Раздел заполняется данными из протоколов изготовителя: что проверяли, по какой методике, с каким результатом, в каких условиях, когда и в какой организации.`}
        </Disclaimer>
      </Section>
    );
  }

  return (
    <Section id="lab-tests" heading={labTestsSection.heading} lead={labTestsSection.lead}>
      <ol className="divide-y divide-hairline border-y border-hairline">
        {labTests.map((test) => (
          <li key={test.title} className="py-7">
            <div className="grid gap-x-10 gap-y-4 lg:grid-cols-[minmax(0,20rem)_1fr]">
              <div>
                <h3 className="text-lg font-semibold text-ink">{test.title}</h3>

                <p className="mt-3">
                  <span className="inline-block rounded-sm bg-accent-soft px-2 py-1 text-sm font-medium text-accent-ink">
                    {test.conditions}
                  </span>
                </p>

                <p className="mt-3 text-sm text-ink-muted">
                  Дата: <Value value={test.date} />
                  <br />
                  Исполнитель: <Value value={test.performedBy ?? ''} />
                </p>
              </div>

              <div>
                <p className="text-sm text-ink-muted">Методика</p>
                <RichText measure={false} className="mt-1 text-ink-muted">
                  {test.method}
                </RichText>

                <p className="mt-5 text-sm text-ink-muted">Результат</p>
                <RichText measure={false} className="mt-1 text-ink">
                  {test.result}
                </RichText>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <Disclaimer tone="gap" className="mt-10">
        {labTestsSection.gapNotice}
      </Disclaimer>
    </Section>
  );
}
