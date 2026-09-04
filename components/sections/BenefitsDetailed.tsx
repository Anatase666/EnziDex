import { Section } from '@/components/layout/Section';
import { ICONS } from '@/components/icons';
import { benefits } from '@/content/product';

/**
 * Развёрнутые свойства рецептуры (ТЗ FR-P3).
 *
 * В отличие от главной, здесь у каждого пункта есть второй абзац с разбором:
 * ТЗ требует «объяснение, а не лозунг». Там же, где объяснение честно
 * называет обратную сторону свойства, она не вырезается — блок про
 * отсутствие абразива прямо говорит, что гель не заменяет щётку,
 * а блок про фтор — что отказ от фторида не является достижением.
 */
export function BenefitsDetailed() {
  return (
    <Section
      tone="surface"
      heading="Что следует из состава"
      lead="Шесть свойств рецептуры, каждое из которых проверяется по списку компонентов."
    >
      <ul className="grid gap-x-12 gap-y-12 lg:grid-cols-2">
        {benefits.map((benefit) => {
          const Icon = benefit.icon ? ICONS[benefit.icon] : null;

          return (
            <li key={benefit.id} className="border-t border-hairline pt-6">
              {Icon && <Icon className="size-7 text-accent" aria-hidden="true" />}

              <h3 className="mt-4 text-xl font-semibold text-ink">{benefit.title}</h3>
              <p className="mt-3 text-ink">{benefit.description}</p>

              {benefit.detail && (
                <p className="mt-4 text-ink-muted">{benefit.detail}</p>
              )}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
