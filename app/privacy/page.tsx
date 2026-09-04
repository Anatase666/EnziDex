import type { Metadata } from 'next';

import { Container } from '@/components/layout/Container';
import { Disclaimer } from '@/components/ui/Disclaimer';
import { RichText } from '@/components/ui/RichText';
import { Value } from '@/components/ui/Value';
import { privacyPage } from '@/content/legal';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata('privacy');

/**
 * Политика обработки персональных данных (ТЗ FR-X1).
 *
 * Структура выстроена по 152-ФЗ, формулировки написаны там, где они следуют
 * из фактического устройства сайта: какие поля есть в форме, куда уходит
 * заявка, есть ли аналитика и куки. Реквизиты оператора и сроки хранения
 * оставлены пустыми — это данные из ЕГРЮЛ и решения оператора.
 *
 * Документ обязан пройти согласование с юристом до публикации: сайт может
 * подготовить структуру и техническую часть, но не может выступать
 * источником юридической силы.
 */
export default function PrivacyPage() {
  return (
    <section className="py-10 md:py-14">
      <Container width="measure">
        <h1 className="text-4xl text-balance text-ink">{privacyPage.heading}</h1>
        <p className="mt-5 text-xl text-ink-muted">{privacyPage.lead}</p>

        <p className="mt-4 text-sm text-ink-muted">
          Редакция от <Value value={privacyPage.updatedAt} pending="даты не указано" />
        </p>

        <Disclaimer tone="gap" title="Документ не согласован с юристом" className="mt-8">
          {privacyPage.reviewNotice}
        </Disclaimer>

        <div className="mt-12 flex flex-col gap-10">
          {privacyPage.sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-semibold text-ink">{section.title}</h2>
              <RichText className="mt-3" measure={false}>
                {section.body}
              </RichText>
            </section>
          ))}
        </div>
      </Container>
    </section>
  );
}
