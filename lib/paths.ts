/**
 * Сравнение адресов для подсветки активного пункта навигации (ТЗ 2.2).
 *
 * Нужно потому, что в конфиге включён trailingSlash: usePathname() отдаёт
 * «/product/», а в контенте ссылки записаны как «/product». Без нормализации
 * активный пункт не подсвечивается ни на одной внутренней странице.
 */

export function normalizePath(path: string | null | undefined): string {
  if (!path) return '/';
  const withoutSlash = path.replace(/\/+$/, '');
  return withoutSlash === '' ? '/' : withoutSlash;
}

export function isActivePath(pathname: string | null, href: string): boolean {
  const current = normalizePath(pathname);
  const target = normalizePath(href);
  if (target === '/') return current === '/';
  return current === target || current.startsWith(`${target}/`);
}
