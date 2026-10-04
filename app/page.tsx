import type { Metadata } from 'next';

import { Hero } from '@/components/sections/Hero';
import { Problem } from '@/components/sections/Problem';
import { Solution } from '@/components/sections/Solution';
import { Usage } from '@/components/sections/Usage';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata('home');

/**
 * Главная (ТЗ 4.1, переработана по правкам заказчика).
 *
 * Маршрут чтения: что это (Hero) → почему налёт возвращается (Problem) →
 * что делает фермент (Solution) → как пользоваться (Usage).
 *
 * Ритм страницы задан чередованием плоскостей: светлый градиент первого
 * экрана → тёмная полоса проблемы → фон страницы → белая полоса применения.
 * Тёмная полоса одна: это главный контраст сайта, и второе такое пятно
 * обесценило бы первое.
 *
 * Блок частых вопросов убран — страница ведёт в разделы, а не пересказывает
 * их. Призывов к действию нет: сайт информационный.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <Solution />
      <Usage />
    </>
  );
}
