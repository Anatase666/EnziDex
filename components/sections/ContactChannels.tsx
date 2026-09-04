import { ChatIcon, MailIcon, PhoneIcon } from '@/components/icons';
import { Value } from '@/components/ui/Value';
import { isFilled } from '@/content/types';
import type { ContactChannel } from '@/content/types';

const ICON = {
  email: MailIcon,
  phone: PhoneIcon,
  messenger: ChatIcon,
  address: ChatIcon,
} as const;

/** Готовая ссылка для канала связи: mailto:, tel: или заданная в контенте. */
function hrefFor(channel: ContactChannel): string | undefined {
  if (channel.href) return channel.href;
  if (!isFilled(channel.value)) return undefined;
  if (channel.kind === 'email') return `mailto:${channel.value}`;
  if (channel.kind === 'phone') return `tel:${channel.value.replace(/[^\d+]/g, '')}`;
  return undefined;
}

/**
 * Прямые контакты (ТЗ FR-C2).
 *
 * Адрес почты и телефон кликабельны — на мобильном это разница между
 * «позвонить» и «переписать номер вручную». Незаполненные каналы остаются
 * видимыми, но помечены: скрывать их значило бы прятать от посетителя тот
 * факт, что связаться пока можно только через форму.
 */
export function ContactChannels({ channels }: { channels: readonly ContactChannel[] }) {
  return (
    <ul className="divide-y divide-hairline border-y border-hairline">
      {channels.map((channel) => {
        const Icon = ICON[channel.kind];
        const href = hrefFor(channel);

        return (
          <li key={`${channel.kind}-${channel.label}`} className="py-5">
            <div className="flex items-start gap-4">
              <Icon className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />

              <div className="min-w-0">
                <p className="text-sm text-ink-muted">{channel.label}</p>

                <p className="mt-1 text-lg">
                  {href ? (
                    <a href={href} className="link">
                      {channel.value}
                    </a>
                  ) : (
                    <Value value={channel.value} />
                  )}
                </p>

                {channel.note && (
                  <p className="mt-1 text-sm text-ink-muted">{channel.note}</p>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
