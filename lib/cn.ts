/**
 * Склейка классов с отбрасыванием пустых значений.
 *
 * Отдельная зависимость (clsx, classnames) ради двадцати строк кода не
 * оправдана — ТЗ 6.4 требует обосновывать каждую библиотеку.
 * Разрешения конфликтов утилит, как в tailwind-merge, здесь нет и не нужно:
 * компоненты не принимают классы, которые спорят с их собственными.
 */
export type ClassValue = string | false | null | undefined;

export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ');
}
