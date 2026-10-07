import type { Metadata } from 'next';
import Link from 'next/link';

import { Container } from '@/components/layout/Container';
import { notFoundPage } from '@/content/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata('notFound');

export default function NotFound() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <p className="font-mono text-lg tracking-tight text-accent-ink">
          {notFoundPage.code}
        </p>

        <h1 className="text-4xl mt-3 max-w-[16ch] text-balance text-ink">
          {notFoundPage.heading}
        </h1>

        <p className="mt-5 max-w-measure text-xl text-ink-muted">
          {notFoundPage.description}
        </p>

        <ul className="mt-10 max-w-3xl divide-y divide-hairline border-y border-hairline">
          {notFoundPage.links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group flex flex-col gap-1 py-5 transition-colors"
              >
                <span className="text-xl font-medium text-ink group-hover:text-accent-ink">
                  {link.label}
                </span>
                <span className="text-ink-muted">{link.hint}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
