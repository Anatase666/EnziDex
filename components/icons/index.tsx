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
 * убрали блоки преимуществ, форму обращения и раздел документов. Держать в
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

