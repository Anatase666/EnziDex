import type { SVGProps } from 'react';

/**
 * Локальный набор иконок (ТЗ 6.1).
 *
 * Подключать библиотеку ради десятка иконок — лишние килобайты и чужая
 * визуальная манера. Здесь единая система: сетка 24×24, обводка 1.5,
 * скруглённые концы, без заливок. Цвет всегда currentColor, поэтому
 * иконка наследует цвет текста и не требует отдельного токена.
 *
 * Все иконки декоративны: смысл несёт подпись рядом, поэтому в местах
 * использования им проставляется aria-hidden.
 */

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

/** Фермент: цепь звеньев с разорванной связью. */
export function EnzymeIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="4.5" cy="12" r="2.5" />
      <circle cx="12" cy="7" r="2.5" />
      <circle cx="19.5" cy="14" r="2.5" />
      <path d="M6.6 10.6 9.9 8.4" />
      <path d="m14.2 8.6 1.3 1.2" />
      <path d="m17.4 11.6 1.3 1.2" opacity="0.35" />
      <path d="M13.5 13.5 16 16" opacity="0.35" />
    </Icon>
  );
}

/** Щит: отсутствие абразивного воздействия. */
export function ShieldIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3 5 5.8v5.4c0 4 2.9 7.6 7 9.8 4.1-2.2 7-5.8 7-9.8V5.8L12 3Z" />
      <path d="m9.2 12.2 1.9 1.9 3.7-3.9" />
    </Icon>
  );
}

/** Капля: состав без фторидов. */
export function DropIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3.2c3.2 3.6 5.5 6.4 5.5 9.2a5.5 5.5 0 1 1-11 0c0-2.8 2.3-5.6 5.5-9.2Z" />
      <path d="M9.4 13.4a2.7 2.7 0 0 0 2.6 3.2" opacity="0.5" />
    </Icon>
  );
}

/** Слои: удержание геля на поверхности. */
export function LayersIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m12 3.5 8 4-8 4-8-4 8-4Z" />
      <path d="m4 12.5 8 4 8-4" opacity="0.55" />
      <path d="m4 16.8 8 4 8-4" opacity="0.3" />
    </Icon>
  );
}

/** Колба: лабораторные данные. */
export function FlaskIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M9.5 3h5" />
      <path d="M10.5 3v6.2L5.8 17.4A2.2 2.2 0 0 0 7.7 21h8.6a2.2 2.2 0 0 0 1.9-3.6L13.5 9.2V3" />
      <path d="M8.2 14.5h7.6" opacity="0.5" />
    </Icon>
  );
}

/** Часы: время контакта, сроки. */
export function ClockIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.3V12l3 1.8" />
    </Icon>
  );
}

/** Документ: состав и документы. */
export function DocumentIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M13.5 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.5L13.5 3Z" />
      <path d="M13.5 3v5.5H19" opacity="0.55" />
      <path d="M8.8 13h6.4M8.8 16.5h4.4" opacity="0.55" />
    </Icon>
  );
}

/** Весы: буферное равновесие. */
export function BalanceIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 4v16M7 20h10" />
      <path d="M12 6.5 5 8.5M12 6.5l7 2" />
      <path d="M2.6 14.2a2.6 2.6 0 0 0 4.8 0L5 8.5l-2.4 5.7Z" />
      <path d="M16.6 14.2a2.6 2.6 0 0 0 4.8 0L19 8.5l-2.4 5.7Z" />
    </Icon>
  );
}

/** Информация: блок-оговорка. */
export function InfoIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5.2" />
      <path d="M12 7.9h.01" strokeWidth={2} />
    </Icon>
  );
}

/** Галочка: успешная отправка. */
export function CheckIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m5 12.6 4.6 4.4L19 6.8" />
    </Icon>
  );
}

/** Бургер-меню. */
export function MenuIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 7.5h16M4 12h16M4 16.5h16" />
    </Icon>
  );
}

/** Закрытие меню. */
export function CloseIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m6.3 6.3 11.4 11.4M17.7 6.3 6.3 17.7" />
    </Icon>
  );
}

/** Почта. */
export function MailIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="m3.8 7 7.1 5.3a2 2 0 0 0 2.2 0L20.2 7" />
    </Icon>
  );
}

/** Телефон. */
export function PhoneIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M7.4 3.5H5.2A2.2 2.2 0 0 0 3 5.9c.5 8 6.1 13.6 14.1 14.1a2.2 2.2 0 0 0 2.4-2.2v-2.2a1.5 1.5 0 0 0-1.2-1.5l-2.6-.5a1.5 1.5 0 0 0-1.5.7l-.6 1a12 12 0 0 1-4.9-4.9l1-.6a1.5 1.5 0 0 0 .7-1.5l-.5-2.6a1.5 1.5 0 0 0-1.5-1.2Z" />
    </Icon>
  );
}

/** Мессенджер. */
export function ChatIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M20.5 12c0 4.1-3.8 7.4-8.5 7.4-1 0-2-.15-2.9-.42L4 20.5l1.6-4.3A7 7 0 0 1 3.5 12c0-4.1 3.8-7.4 8.5-7.4s8.5 3.3 8.5 7.4Z" />
    </Icon>
  );
}

/** Внешняя ссылка / открытие в новой вкладке. */
export function ExternalIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M14 4h6v6" />
      <path d="M20 4 11 13" />
      <path d="M18 14.5V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.5" />
    </Icon>
  );
}

/** Индикатор отправки формы. */
export function SpinnerIcon(props: IconProps) {
  return (
    <Icon {...props} className={`animate-spin ${props.className ?? ''}`}>
      <circle cx="12" cy="12" r="8.5" opacity="0.25" />
      <path d="M20.5 12a8.5 8.5 0 0 0-8.5-8.5" />
    </Icon>
  );
}

/** Сопоставление имени из контента с компонентом. */
export const ICONS = {
  enzyme: EnzymeIcon,
  shield: ShieldIcon,
  drop: DropIcon,
  layers: LayersIcon,
  flask: FlaskIcon,
  clock: ClockIcon,
  document: DocumentIcon,
  balance: BalanceIcon,
} as const;
