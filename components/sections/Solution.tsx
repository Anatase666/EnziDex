import Link from 'next/link';

import { Container } from '@/components/layout/Container';
import { Disclaimer } from '@/components/ui/Disclaimer';
import { solution } from '@/content/home';
import { mechanism } from '@/content/science';

/**
 * Решение (ТЗ FR-H3).
 *
 * Четыре шага механизма показаны как последовательность стадий одной
 * реакции — это единственное место на главной, где содержимое действительно
 * упорядочено. Нумерация 01/02/03 при этом не ставится: ТЗ 7.4 оставляет её
 * только разделу «Как использовать», а здесь порядок читается из связки
 * стадий и без цифр.
 */
export function Solution() {
  return (
    <section className="py-16 md:py-20 lg:py-24">
      <Container>
        <div className="max-w-measure">
          <h2 className="text-section text-balance text-ink">{solution.heading}</h2>
          <p className="mt-5 text-xl text-ink">{solution.lead}</p>

          <div className="mt-6 flex flex-col gap-5 text-lg text-ink-muted">
            {solution.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </div>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {mechanism.diagram.steps.map((step) => (
            <li key={step.id} className="bg-surface p-6">
              <h3 className="font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-base text-ink-muted">{step.description}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <Disclaimer className="lg:max-w-2xl">{solution.caveat}</Disclaimer>

          <Link href={solution.moreLink.href} className="link shrink-0 text-lg">
            {solution.moreLink.label}
          </Link>
        </div>
      </Container>
    </section>
  );
}
