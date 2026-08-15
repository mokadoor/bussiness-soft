import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, type Locale } from './lib/i18n';

const LOCALE_COOKIE = 'NEXT_LOCALE';
const LOCALE_HEADER = 'x-next-locale';

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const segments = pathname.split('/').filter(Boolean);
  const maybeLocale = segments[0];
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  const isLocaleRoute = locales.includes(maybeLocale as Locale);
  const requestHeaders = new Headers(request.headers);

  const activeLocale =
    isLocaleRoute
      ? (maybeLocale as Locale)
      : cookieLocale && locales.includes(cookieLocale as Locale)
        ? (cookieLocale as Locale)
        : 'en';

  requestHeaders.set(LOCALE_HEADER, activeLocale);

  if (isLocaleRoute) {
    const normalizedPath = `/${segments.slice(1).join('/')}`;
    const rewriteTarget = normalizedPath === '/' ? '/' : normalizedPath;
    const response = NextResponse.rewrite(new URL(`${rewriteTarget}${search}`, request.url), {
      request: {
        headers: requestHeaders,
      },
    });
    response.cookies.set(LOCALE_COOKIE, activeLocale, { path: '/' });
    return response;
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  if (cookieLocale !== activeLocale) {
    response.cookies.set(LOCALE_COOKIE, activeLocale, { path: '/' });
  }

  return response;
}

export const config = {
  // Run on every route except static files, _next internals, and API routes
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};