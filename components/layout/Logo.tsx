import { site } from '@/content/site';
import { cn } from '@/lib/cn';

/**
 * Знак и логотип.
 */

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <circle cx="16" cy="16" r="14.2" strokeWidth={1.4} opacity="0.28" />
      <circle cx="9.8" cy="18.6" r="3.1" />
      <circle cx="17.4" cy="10.6" r="3.1" />
      <path d="M12.1 16.3l3-3.2" />
      <circle cx="24" cy="17.4" r="2.4" opacity="0.45" />
      <path d="M20.2 12.6l1.2 1.3" opacity="0.45" />
      <path d="M23.4 21.1l-1.1 2.3" opacity="0.45" />
    </svg>
  );
}

type LogoProps = {
  /** Показывать дескриптор под названием (ТЗ FR-G1). */
  withDescriptor?: boolean;
  className?: string;
};

export function Logo({ withDescriptor = true, className }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark className="size-8 shrink-0 text-accent" />

      <span className="flex flex-col leading-none">
        <span className="text-xl font-semibold tracking-tight">{site.name}</span>
        {withDescriptor && (
          <span className="mt-1 hidden text-xs text-ink-muted sm:block">
            {site.descriptor}
          </span>
        )}
      </span>
    </span>
  );
}
