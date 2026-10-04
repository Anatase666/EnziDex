import { Container } from '@/components/layout/Container';
import { Accordion } from '@/components/ui/Accordion';
import { faqItems } from '@/content/faq';

/**
 * Список вопросов (ТЗ FR-F1). Одна группа без подзаголовка: вопросов
 * немного, и деление на категории заказчик убрал.
 */
export function FaqList() {
  return (
    <section className="pb-16 md:pb-20">
      <Container>
        <Accordion items={faqItems} />
      </Container>
    </section>
  );
}
