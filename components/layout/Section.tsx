import type { ReactNode } from 'react';

import { Container } from './Container';
import { cn } from '@/lib/cn';

type SectionProps = {
  children: ReactNode;
  id?: string;
  heading?: string;
  lead?: string;
  /** Уровень заголовка в разметке. Визуальный размер от него не зависит. */
  headingAs?: 'h2' | 'h3';
  /** Фоновая полоса во всю ширину экрана. */
  tone?: 'page' | 'surface' | 'ink';
  size?: 'compact' | 'default' | 'spacious';
  /** Ссылка или кнопка справа от заголовка — «подробнее», «все вопросы». */
  action?: ReactNode;
  containerWidth?: 'default' | 'measure';
  className?: string;
};

const TONE_CLASS = {
  page: '',
  surface: 'bg-surface border-y border-hairline',
  ink: 'bg-ink text-ink-inverse',
} as const;

const SIZE_CLASS = {
  compact: 'py-12 md:py-14',
  default: 'py-16 md:py-20 lg:py-24',
  spacious: 'py-20 md:py-28 lg:py-32',
} as const;

/**
 * Единый вертикальный ритм страниц (ТЗ FR-G4).
 *
 * Отступы задаются здесь и только здесь: если каждая секция назначает их
 * сама, ритм страницы разъезжается на второй же итерации правок.
 */
export function Section({
  children,
  id,
  heading,
  lead,
  headingAs: Heading = 'h2',
  tone = 'page',
  size = 'default',
  action,
  containerWidth = 'default',
  className,
}: SectionProps) {
  const hasHeader = Boolean(heading || lead);

  return (
    <section id={id} className={cn(TONE_CLASS[tone], SIZE_CLASS[size], className)}>
      <Container width={containerWidth}>
        {hasHeader && (
          <div className="mb-10 md:mb-12">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
              {heading && (
                <Heading
                  className={cn(
                    'text-section max-w-[22ch] text-balance',
                    tone === 'ink' ? 'text-ink-inverse' : 'text-ink',
                  )}
                >
                  {heading}
                </Heading>
              )}
              {action && <div className="shrink-0 md:pb-1">{action}</div>}
            </div>

            {lead && (
              <p
                className={cn(
                  'mt-4 max-w-measure text-lg',
                  tone === 'ink' ? 'text-ink-inverse/75' : 'text-ink-muted',
                )}
              >
                {lead}
              </p>
            )}
          </div>
        )}

        {children}
      </Container>
    </section>
  );
}
