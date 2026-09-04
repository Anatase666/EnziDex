import type { Metadata } from 'next';

import { Benefits } from '@/components/sections/Benefits';
import { CTABlock } from '@/components/sections/CTABlock';
import { Composition } from '@/components/sections/Composition';
import { FaqPreview } from '@/components/sections/FaqPreview';
import { Hero } from '@/components/sections/Hero';
import { Problem } from '@/components/sections/Problem';
import { Solution } from '@/components/sections/Solution';
import { Usage } from '@/components/sections/Usage';
import { homeCta } from '@/content/home';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata('home');

/**
 * Главная (ТЗ 4.1).
 *
 * Порядок секций задаёт маршрут чтения: что это (Hero) → почему это трудно
 * решить привычными средствами (Problem) → что делаем мы (Solution) → что
 * следует из состава (Benefits) → из чего сделано (Composition) →
 * как применять (Usage) → что спрашивают (FaqPreview) → действие (CTA).
 *
 * Чередование фонов page/surface разбивает страницу на смысловые блоки без
 * капслок-лейблов и анимаций появления, запрещённых ТЗ 7.4.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <Solution />
      <Benefits />
      <Composition />
      <Usage />
      <FaqPreview />
      <CTABlock
        heading={homeCta.heading}
        description={homeCta.description}
        mode="form"
      />
    </>
  );
}
