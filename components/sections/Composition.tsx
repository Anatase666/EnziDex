import Link from 'next/link';

import { Section } from '@/components/layout/Section';
import { compositionSection } from '@/content/home';
import { compositionHighlights } from '@/content/product';

/**
 * Краткий состав (ТЗ FR-H5): компонент → назначение → что это даёт.
 *
 * Здесь карточки уместны, хотя ТЗ 7.4 предостерегает от них: три элемента
 * действительно параллельны и сопоставляются друг с другом, а белая
 * плоскость на фиолетовом фоне страницы разделяет их без рамок и теней.
 * Ключевое слово в предостережении — «весь контент»: приём не должен быть
 * фоновым, и на главной он использован ровно один раз.
 *
 * Разметка — список определений: это пары «термин — толкование», и
 * скринридер читает их связанно, а не как отдельные абзацы.
 */
export function Composition() {
  return (
    <Section
      heading={compositionSection.heading}
      action={
        <Link href={compositionSection.fullLink.href} className="link">
          {compositionSection.fullLink.label}
        </Link>
      }
    >
      <dl className="grid gap-5 md:grid-cols-3 md:gap-6">
        {compositionHighlights.map((item) => (
          <div
            key={item.inci}
            className="flex flex-col rounded-xl bg-surface p-6 md:p-7"
          >
            <dt>
              <span className="inline-flex rounded-sm bg-accent-soft px-2 py-1 text-sm font-medium text-accent-ink">
                {item.role}
              </span>

              <span className="mt-4 block text-xl font-semibold text-ink">
                {item.name}
              </span>

              <span className="mt-1.5 block font-mono text-sm tracking-tight text-ink-muted">
                {item.inci}
              </span>
            </dt>

            <dd className="mt-4 border-t border-hairline pt-4 text-ink-muted">
              {item.benefit}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
