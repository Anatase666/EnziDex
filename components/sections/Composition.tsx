import Link from 'next/link';

import { Section } from '@/components/layout/Section';
import { compositionSection } from '@/content/home';
import { compositionHighlights } from '@/content/product';

/**
 * Краткий состав (ТЗ FR-H5): компонент → назначение → что это даёт.
 *
 * Оформлено списком определений, а не таблицей: строк всего три, а <dl>
 * точнее описывает смысл — это пары «термин — толкование», и скринридер
 * читает их как связанные, а не как ячейки.
 */
export function Composition() {
  return (
    <Section
      tone="surface"
      heading={compositionSection.heading}
      lead={compositionSection.lead}
      action={
        <Link href={compositionSection.fullLink.href} className="link">
          {compositionSection.fullLink.label}
        </Link>
      }
    >
      <dl className="grid gap-8 md:grid-cols-3 md:gap-10">
        {compositionHighlights.map((item) => (
          <div key={item.inci} className="border-t-2 border-accent pt-6">
            <dt>
              <span className="block text-xl font-semibold text-ink">{item.name}</span>
              <span className="mt-1.5 block font-mono text-sm tracking-tight text-ink-muted">
                {item.inci}
              </span>
            </dt>
            <dd className="mt-4">
              <span className="block text-sm font-medium text-accent-ink">{item.role}</span>
              <p className="mt-2 text-ink-muted">{item.benefit}</p>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
