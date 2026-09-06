import type { Metadata } from 'next';

import { Engineering } from '@/components/sections/Engineering';
import { Mechanism } from '@/components/sections/Mechanism';
import { MutantResults } from '@/components/sections/MutantResults';
import { Container } from '@/components/layout/Container';
import { JsonLd } from '@/components/ui/JsonLd';
import { pageSeo } from '@/content/seo';
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata('science');

/**
 * Научная база (ТЗ 4.3, сокращена по правкам заказчика).
 *
 * Осталось четыре раздела: как это работает, откуда берётся фермент, зачем
 * его понадобилось переделывать и что показал скрининг. Замыкают страницу
 * источники.
 *
 * Убраны по прямой просьбе: раскрывающийся блок «подробнее для
 * специалистов», собственные лабораторные испытания, «что доказано»,
 * стадия проекта и дисклеймер о статусе данных.
 *
 * Условия получения чисел не потерялись вместе с дисклеймером: они стоят
 * в подписи к диаграмме («метод Шомоди — Нельсона, субстрат — декстран»),
 * то есть при самих данных. Формулировка про in vitro и отсутствие
 * клинических исследований осталась на странице «Юридические данные»,
 * в разделе об условиях использования сайта.
 */
export default function SciencePage() {
  return (
    <>
      <section className="pt-10 pb-4 md:pt-14">
        <Container>
          <h1 className="text-4xl max-w-[18ch] text-balance text-ink">Научная база</h1>
          <p className="mt-5 max-w-measure text-xl text-ink-muted">
            {pageSeo.science.description}
          </p>
        </Container>
      </section>

      <Mechanism />
      <Engineering />
      <MutantResults />

      <JsonLd data={breadcrumbJsonLd('science')} />
    </>
  );
}
