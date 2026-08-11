import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, type Locale } from './lib/i18n';

const LOCALE_COOKIE = 'NEXT_LOCALE';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split('/').filter(Boolean);
  const maybeLocale = segments[0];

  // Case 1: URL starts with /fr or /ar -> rewrite internally to the
  // un-prefixed path (which is where the actual page files live)
  // and remember the choice in a cookie.
  if (locales.includes(maybeLocale as Locale) && maybeLocale !== 'en') {
    const rest = segments.slice(1).join('/');
    const newPathname = rest ? `/${rest}` : '/';

    const url = request.nextUrl.clone();
    url.pathname = newPathname;

    const response = NextResponse.rewrite(url);
    response.cookies.set(LOCALE_COOKIE, maybeLocale, { path: '/' });
    return response;
  }

  // Case 2: no locale prefix (default English pages).
  // Make sure the cookie exists so getLocaleFromServer() has a fallback.
  if (!request.cookies.get(LOCALE_COOKIE)) {
    const response = NextResponse.next();
    response.cookies.set(LOCALE_COOKIE, 'en', { path: '/' });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  // Run on every route except static files, _next internals, and API routes
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};