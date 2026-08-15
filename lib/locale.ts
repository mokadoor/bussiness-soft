import type { Locale } from './i18n';
import { locales } from './i18n';

export function getPathnameWithoutLocale(pathname: string) {
  const pathnameWithoutQuery = pathname.split('?')[0].split('#')[0];
  const segments = pathnameWithoutQuery.split('/').filter(Boolean);
  if (segments.length === 0) return '/';
  if (locales.includes(segments[0] as Locale)) {
    return '/' + segments.slice(1).join('/');
  }
  return pathnameWithoutQuery;
}

export function getClientLocaleFromWindow(): Locale | null {
  if (typeof window === 'undefined') return null;
  return getLocaleFromPathname(window.location.pathname) ?? null;
}

export function getLocaleFromPathname(pathname: string): Locale | null {
  const pathnameWithoutQuery = pathname.split('?')[0].split('#')[0];
  const segments = pathnameWithoutQuery.split('/').filter(Boolean);
  const locale = segments[0];
  if (locales.includes(locale as Locale)) {
    return locale as Locale;
  }
  return null;
}

export function getLocalizedPathname(pathname: string, locale: Locale) {
  const normalizedPath = getPathnameWithoutLocale(pathname);
  if (locale === 'en') return normalizedPath;
  if (normalizedPath === '/') return `/${locale}`;
  return `/${locale}${normalizedPath}`;
}
