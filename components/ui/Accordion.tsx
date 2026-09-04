'use client';

import { useId, useState } from 'react';

import { RichText } from './RichText';
import { cn } from '@/lib/cn';

export type AccordionEntry = {
  id: string;
  question: string;
  /** Текст с ограниченной разметкой — см. lib/richText.ts. */
  answer: string;
};

type AccordionProps = {
  items: readonly AccordionEntry[];
  /** По умолчанию можно держать открытыми несколько пунктов сразу. */
  allowMultiple?: boolean;
  defaultOpenId?: string;
  className?: string;
};

/**
 * Доступный аккордеон (ТЗ FR-G4).
 *
 * Заголовок — настоящий <button> внутри <h3>, поэтому активация по Enter и
 * Space, фокус и озвучивание роли работают средствами платформы, а не
 * эмулируются обработчиками. Связь кнопки с панелью — aria-controls,
 * состояние — aria-expanded.
 *
 * Свёрнутая панель скрывается через visibility: она исчезает из дерева
 * доступности и из порядка обхода табом, но, в отличие от display: none,
 * допускает плавное раскрытие. Само раскрытие сделано переходом
 * grid-template-rows от 0fr к 1fr — это не требует измерения высоты в JS
 * и корректно ведёт себя при любой длине ответа.
 */
export function Accordion({
  items,
  allowMultiple = true,
  defaultOpenId,
  className,
}: AccordionProps) {
  const baseId = useId();
  const [openIds, setOpenIds] = useState<readonly string[]>(
    defaultOpenId ? [defaultOpenId] : [],
  );

  function toggle(id: string) {
    setOpenIds((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      return allowMultiple ? [...current, id] : [id];
    });
  }

  return (
    <div className={cn('divide-y divide-hairline border-y border-hairline', className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        const buttonId = `${baseId}-${item.id}-button`;
        const panelId = `${baseId}-${item.id}-panel`;

        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex w-full items-start justify-between gap-6 py-5 text-left text-lg font-medium text-ink transition-colors hover:text-accent-ink"
              >
                <span className="max-w-[52ch]">{item.question}</span>
                <PlusMinus isOpen={isOpen} />
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                'grid transition-[grid-template-rows] duration-200 ease-out',
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div className={cn('overflow-hidden', isOpen ? 'visible' : 'invisible')}>
                <RichText className="pb-6 text-ink-muted">{item.answer}</RichText>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Индикатор состояния: горизонтальная черта, к которой добавляется вертикальная. */
function PlusMinus({ isOpen }: { isOpen: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="relative mt-2 block size-4 shrink-0 text-accent"
    >
      <span className="absolute top-1/2 left-0 h-px w-4 -translate-y-1/2 bg-current" />
      <span
        className={cn(
          'absolute top-0 left-1/2 h-4 w-px -translate-x-1/2 bg-current transition-transform duration-200',
          isOpen ? 'scale-y-0' : 'scale-y-100',
        )}
      />
    </span>
  );
}
