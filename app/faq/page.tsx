import type { Metadata } from 'next';

import { FaqList } from '@/components/sections/FaqList';
import { Container } from '@/components/layout/Container';
import { JsonLd } from '@/components/ui/JsonLd';
import { faqCategories, faqItems } from '@/content/faq';
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata('faq');

/**
 * Вопросы и безопасность (ТЗ 4.4 с учётом правок заказчика).
 *
 * Убраны категория «Поставки и сотрудничество» и завершающий блок
 * «Не нашли ответ» с кнопкой обращения.
 *
 * Часть ответов опирается на данные, которых у нас нет: возраст,
 * беременность, противопоказания, режим применения. Эти вопросы не удалены
 * со страницы — они обязательны по FR-F2, и честный пробел полезнее
 * правдоподобного вымысла. В разметку FAQPage такие вопросы при этом не
 * попадают (см. lib/seo.ts): сниппет с заглушкой в поиске хуже, чем его
 * отсутствие.
 */
export default function FaqPage() {
  return (
    <>
      <section className="pt-10 pb-10 md:pt-14">
        <Container>
          <h1 className="text-4xl max-w-[18ch] text-balance text-ink">
            Вопросы и безопасность
          </h1>
          <p className="mt-5 max-w-measure text-xl text-ink-muted">
            {faqItems.length} вопросов о продукте, составе и применении. Там, где
            ответ зависит от инструкции изготовителя, мы говорим об этом прямо,
            а не заполняем пробел общими словами.
          </p>

          {/* Быстрый переход по категориям: список длинный,
              и прокручивать его целиком ради одного раздела незачем. */}
          <nav aria-label="Категории вопросов" className="mt-8">
            <ul className="flex flex-wrap gap-2">
              {faqCategories.map((category) => (
                <li key={category.id}>
                  <a
                    href={`#${category.id}`}
                    className="inline-flex min-h-11 items-center rounded-lg border border-hairline-strong bg-surface px-4 text-base text-ink transition-colors hover:border-ink"
                  >
                    {category.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </section>

      <FaqList />

      <JsonLd data={faqJsonLd()} />
      <JsonLd data={breadcrumbJsonLd('faq')} />
    </>
  );
}
