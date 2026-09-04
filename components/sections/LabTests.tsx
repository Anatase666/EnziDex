import { Section } from '@/components/layout/Section';
import { Disclaimer } from '@/components/ui/Disclaimer';
import { labTests } from '@/content/science';

/**
 * Собственные лабораторные испытания (ТЗ FR-S2).
 *
 * Пока протоколов нет, вместо таблицы выводится оговорка. Заполнять таблицу
 * правдоподобными числами нельзя категорически: это не пробел в вёрстке,
 * а данные, за которые изготовитель отвечает перед регулятором.
 *
 * Секция визуализации результатов (FR-S3) не выводится вовсе — ТЗ прямо
 * требует не публиковать её без количественных данных.
 */
export function LabTests() {
  if (labTests.length === 0) {
    return (
      <Section
        id="lab-tests"
        heading="Собственные лабораторные испытания"
        lead="Опубликованные исследования выше описывают декстраназу как фермент. Свойства конкретной рецептуры «ЭнзиДекс» подтверждаются отдельно."
      >
        <Disclaimer tone="gap" title="Протоколы испытаний ещё не опубликованы">
          {`Раздел заполняется данными из протоколов изготовителя: что проверяли, по какой методике, с каким результатом, в каких условиях, когда и в какой организации.\n\nДо получения этих документов на сайте не появится ни одной цифры об эффективности «ЭнзиДекс» — включая графики и сравнения. Утверждение об эффективности без источника не публикуется.`}
        </Disclaimer>
      </Section>
    );
  }

  return (
    <Section
      id="lab-tests"
      heading="Собственные лабораторные испытания"
      lead="Результаты испытаний рецептуры. Условия проведения указаны для каждого испытания отдельно."
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[48rem] border-collapse text-left">
          <caption className="sr-only">
            Лабораторные испытания геля «ЭнзиДекс»: предмет проверки, методика,
            результат, условия и дата
          </caption>
          <thead>
            <tr className="border-b border-ink/15 text-sm text-ink-muted">
              <th scope="col" className="py-3 pr-6 font-medium">Что проверяли</th>
              <th scope="col" className="py-3 pr-6 font-medium">Методика</th>
              <th scope="col" className="py-3 pr-6 font-medium">Результат</th>
              <th scope="col" className="py-3 pr-6 font-medium">Условия</th>
              <th scope="col" className="py-3 font-medium">Дата</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {labTests.map((test) => (
              <tr key={`${test.title}-${test.date}`}>
                <th scope="row" className="py-4 pr-6 font-medium text-ink">
                  {test.title}
                </th>
                <td className="py-4 pr-6 text-ink-muted">{test.method}</td>
                <td className="py-4 pr-6 text-ink">{test.result}</td>
                <td className="py-4 pr-6">
                  <span className="rounded-sm bg-accent-soft px-2 py-1 text-sm font-medium text-accent-ink">
                    {test.conditions}
                  </span>
                </td>
                <td className="py-4 text-ink-muted">{test.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
