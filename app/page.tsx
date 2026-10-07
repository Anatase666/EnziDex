import type { Metadata } from 'next';

import { Hero } from '@/components/sections/Hero';
import { Problem } from '@/components/sections/Problem';
import { Solution } from '@/components/sections/Solution';
import { Usage } from '@/components/sections/Usage';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata('home');
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
