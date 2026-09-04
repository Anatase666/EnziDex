import Link from 'next/link';
import { Fragment } from 'react';

import { cn } from '@/lib/cn';
import { parseBlocks } from '@/lib/richText';
import type { InlineToken } from '@/lib/richText';

/**
 * Вывод текста с ограниченной разметкой из content/*.ts.
 *
 * Строки контента попадают в JSX как текстовые узлы, а не через
 * dangerouslySetInnerHTML: разметка строится из разобранных токенов,
 * поэтому вставить в контент произвольный HTML технически невозможно.
 */

function isExternal(href: string): boolean {
  return /^(https?:)?\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('tel:');
}

function Inline({ tokens }: { tokens: InlineToken[] }) {
  return (
    <>
      {tokens.map((token, index) => {
        switch (token.type) {
          case 'bold':
            return (
              <strong key={index} className="font-semibold">
                {token.value}
              </strong>
            );

          case 'italic':
            // Курсив в контенте используется для латинских биноменов.
            return <em key={index}>{token.value}</em>;

          case 'link':
            return isExternal(token.href) ? (
              <a
                key={index}
                href={token.href}
                className="link"
                {...(token.href.startsWith('http')
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                {token.value}
              </a>
            ) : (
              <Link key={index} href={token.href} className="link">
                {token.value}
              </Link>
            );

          case 'text':
          default:
            return <Fragment key={index}>{token.value}</Fragment>;
        }
      })}
    </>
  );
}

type RichTextProps = {
  /** Текст с разметкой: абзацы, списки, **жирный**, *курсив*, [ссылки](/путь). */
  children: string;
  className?: string;
  /** Ограничивать ширину строки. Выключается внутри узких колонок. */
  measure?: boolean;
};

export function RichText({ children, className, measure = true }: RichTextProps) {
  const blocks = parseBlocks(children);

  return (
    <div className={cn('rich-text', !measure && 'max-w-none', className)}>
      {blocks.map((block, index) =>
        block.type === 'list' ? (
          <ul key={index}>
            {block.items.map((item, itemIndex) => (
              <li key={itemIndex}>
                <Inline tokens={item} />
              </li>
            ))}
          </ul>
        ) : (
          <p key={index}>
            <Inline tokens={block.tokens} />
          </p>
        ),
      )}
    </div>
  );
}
