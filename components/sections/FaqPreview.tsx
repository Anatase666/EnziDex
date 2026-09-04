import Link from 'next/link';

import { Section } from '@/components/layout/Section';
import { Accordion } from '@/components/ui/Accordion';
import { faqSection } from '@/content/home';
import { faqItems, homeFaqIds } from '@/content/faq';
import type { FaqItem } from '@/content/types';

/**
 * Превью FAQ на главной (ТЗ FR-H7).
 *
 * Четыре вопроса из общего списка — те, на которые есть содержательный
 * ответ. Дублирования текста нет: и здесь, и на /faq данные берутся из
 * одного массива, поэтому правка ответа не может «забыться» на одной
 * из страниц.
 */
export function FaqPreview() {
  const items = homeFaqIds
    .map((id) => faqItems.find((item) => item.id === id))
    .filter((item): item is FaqItem => item !== undefined);

  return (
    <Section
      tone="surface"
      heading={faqSection.heading}
      action={
        <Link href={faqSection.moreLink.href} className="link">
          {faqSection.moreLink.label}
        </Link>
      }
    >
      <Accordion items={items} defaultOpenId={items[0]?.id} />
    </Section>
  );
}
