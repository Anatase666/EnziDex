import { Section } from '@/components/layout/Section';
import { Accordion } from '@/components/ui/Accordion';
import { faqCategories, faqItems } from '@/content/faq';

/**
 * Полный список вопросов, сгруппированный по категориям (ТЗ FR-F1, FR-F2).
 *
 * Аккордеоны разнесены по категориям, а не свалены в один список: у четырёх
 * групп разная аудитория, и «Поставки и сотрудничество» не должно мешать
 * человеку, который пришёл за безопасностью состава.
 */
export function FaqList() {
  return (
    <>
      {faqCategories.map((category, index) => {
        const items = faqItems.filter((item) => item.category === category.id);
        if (items.length === 0) return null;

        return (
          <Section
            key={category.id}
            id={category.id}
            heading={category.title}
            lead={category.note}
            tone={index % 2 === 1 ? 'surface' : 'page'}
            size="compact"
          >
            <Accordion items={items} />
          </Section>
        );
      })}
    </>
  );
}
