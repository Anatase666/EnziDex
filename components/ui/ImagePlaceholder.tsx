import { cn } from '@/lib/cn';

type ImagePlaceholderProps = {
  /** Что должно быть на этом месте — видно и посетителю, и заказчику. */
  label: string;
  /** Соотношение сторон будущего изображения, чтобы вёрстка не прыгнула. */
  ratio?: 'square' | 'portrait' | 'landscape';
  className?: string;
};

const RATIO = {
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
} as const;

/**
 * Место под изображение, которого пока нет.
 *
 * Блок держит те же пропорции, что и будущий файл, поэтому при подстановке
 * реального снимка вёрстка не сдвинется и CLS останется нулевым (ТЗ 8.1).
 *
 * Рисовать вымышленную упаковку вместо фотографии нельзя: посетитель принял
 * бы её за настоящую. Честный прямоугольник с подписью хуже выглядит,
 * но не вводит в заблуждение.
 */
export function ImagePlaceholder({
  label,
  ratio = 'portrait',
  className,
}: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`Изображение отсутствует: ${label}`}
      className={cn(
        'flex items-center justify-center rounded-xl border border-dashed border-hairline-strong bg-sunken p-6',
        RATIO[ratio],
        className,
      )}
    >
      <p className="max-w-[24ch] text-center text-sm text-ink-muted">{label}</p>
    </div>
  );
}
