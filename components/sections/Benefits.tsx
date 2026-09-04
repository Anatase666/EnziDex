import Link from 'next/link';

import { Section } from '@/components/layout/Section';
import { ICONS } from '@/components/icons';
import { benefitsSection } from '@/content/home';
import { benefits, homeBenefitIds } from '@/content/product';
import type { Benefit } from '@/content/types';

/**
 * Преимущества (ТЗ FR-H4).
 *
 * Не карточки с тенями, а сетка, разделённая волосяными линиями: ТЗ 7.4
 * прямо запрещает превращать весь контент в одинаковые карточки. Тень здесь
 * не несла бы смысла — эти блоки не подняты над потоком, они его часть.
 */
export function Benefits() {
  const items = homeBenefitIds
    .map((id) => benefits.find((benefit) => benefit.id === id))
    .filter((benefit): benefit is Benefit => benefit !== undefined);

  return (
    <Section
      heading={benefitsSection.heading}
      lead={benefitsSection.lead}
      action={
        <Link href={benefitsSection.moreLink.href} className="link">
          {benefitsSection.moreLink.label}
        </Link>
      }
    >
      <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
        {items.map((benefit) => {
          const Icon = benefit.icon ? ICONS[benefit.icon] : null;

          return (
            <li key={benefit.id} className="border-t border-hairline pt-6">
              {Icon && <Icon className="size-7 text-accent" aria-hidden="true" />}
              <h3 className="mt-4 text-xl font-semibold text-ink">{benefit.title}</h3>
              <p className="mt-2.5 text-ink-muted">{benefit.description}</p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
