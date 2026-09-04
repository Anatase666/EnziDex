import type { Metadata } from 'next';

import { Composition } from '@/components/sections/Composition';
import { FaqPreview } from '@/components/sections/FaqPreview';
import { Hero } from '@/components/sections/Hero';
import { Problem } from '@/components/sections/Problem';
import { Solution } from '@/components/sections/Solution';
import { Usage } from '@/components/sections/Usage';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata('home');

/**
 * Главная (ТЗ 4.1 с учётом правок заказчика).
 *
 * Порядок секций задаёт маршрут чтения: что это (Hero) → почему это трудно
 * решить привычными средствами (Problem) → что делаем мы (Solution) →
 * из чего сделано (Composition) → как применять (Usage) → что спрашивают
 * (FaqPreview).
 *
 * Убраны: блок «Что следует из состава», сетка стадий механизма с оговоркой
 * и финальный блок с формой «Получить консультацию». Страница заканчивается
 * вопросами, а не призывом к действию, — сайт информационный.
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
      <Composition />
      <Usage />
      <FaqPreview />
    </>
  );
}
