import { isFilled } from '@/content/types';
import { PENDING_LABEL } from '@/lib/richText';
import { cn } from '@/lib/cn';

type ValueProps = {
  value: string;
  /** Что показать вместо незаполненного значения. */
  pending?: string;
  className?: string;
};

/**
 * Значение из контента, которое может быть ещё не заполнено.
 *
 * Показывать пользователю строку «TODO_CONTENT» нельзя, а молча прятать
 * поле — значит скрыть от него сам факт отсутствия данных. Поэтому вместо
 * значения выводится нейтральная пометка, а сам пробел остаётся видимым:
 * это честнее и по отношению к посетителю, и по отношению к заказчику,
 * который сразу видит на сайте, что именно ещё не предоставлено.
 *
 * Полный список таких мест собирает scripts/check-content.mjs, а сборка
 * с CONTENT_STRICT=1 не проходит, пока хоть один пробел остался.
 */
export function Value({ value, pending = PENDING_LABEL, className }: ValueProps) {
  if (isFilled(value)) return <span className={className}>{value}</span>;

  return (
    <span
      className={cn('text-ink-muted italic', className)}
      title="Сведения ещё не предоставлены изготовителем"
    >
      {pending}
    </span>
  );
}
