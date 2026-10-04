import type { SVGProps } from 'react';

/**
 * Локальный набор иконок (ТЗ 6.1).
 *
 * Подключать библиотеку ради нескольких иконок — лишние килобайты и чужая
 * визуальная манера. Здесь единая система: сетка 24×24, обводка 1.5,
 * скруглённые концы, без заливок. Цвет всегда currentColor, поэтому
 * иконка наследует цвет текста и не требует отдельного токена.
 *
 * Набор сокращён до фактически используемых знаков после того, как с сайта
 * убрали форму обращения и раздел документов. Держать в
 * репозитории десяток иконок «на всякий случай» — тот же мусор, что и
 * библиотека ради шести глифов, только свой.
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


/* ─── Отличия продукта (блок «Что делает наш гель») ───────────────────── */

/** Зуб: без абразивных частиц. */
export function ToothIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M8 3.75c-2.3 0-3.75 1.7-3.75 4.1 0 1.9.6 3.3 1.15 4.9.5 1.5.7 3.4 1.15 5.3.3 1.3.85 2.2 1.75 2.2 1.15 0 1.35-1.5 1.65-3.1.28-1.45.75-2.6 2.05-2.6s1.77 1.15 2.05 2.6c.3 1.6.5 3.1 1.65 3.1.9 0 1.45-.9 1.75-2.2.45-1.9.65-3.8 1.15-5.3.55-1.6 1.15-3 1.15-4.9 0-2.4-1.45-4.1-3.75-4.1-1.75 0-2.45.95-4 .95s-2.25-.95-4-.95Z" />
      <path d="M15.6 7.2c.6.3 1 .9 1.1 1.6" />
    </Icon>
  );
}

/** Микрофлора: колония клеток. */
export function MicrofloraIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="8.5" cy="9" r="3.25" />
      <circle cx="15.5" cy="15" r="3.75" />
      <circle cx="16.75" cy="6.25" r="1.75" />
      <circle cx="7" cy="17" r="1.5" />
      <path d="M11.4 11.4l1.3 1.3" />
    </Icon>
  );
}

/** Перечёркнутая капля: без пероксидов. */
export function NoPeroxideIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3.75S6.25 9.9 6.25 14a5.75 5.75 0 0 0 11.5 0c0-4.1-5.75-10.25-5.75-10.25Z" />
      <path d="M4.5 4.5l15 15" />
    </Icon>
  );
}

/** Перечёркнутая F: без фторидов. */
export function NoFluorideIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M9.5 6.5h6M9.5 6.5v11M9.5 12h4.5" />
      <path d="M4.5 19.5l15-15" />
    </Icon>
  );
}
