import { cookies, headers } from 'next/headers';
import { cache } from 'react';
import { getLocaleFromPathname } from './locale';
import { locales, type Locale } from './i18n';

export const getLocaleFromServer = cache(function getLocaleFromServer(): Locale {
  const requestHeaders = headers();

  const headerLocale = requestHeaders.get('x-next-locale');
  if (headerLocale && locales.includes(headerLocale as Locale)) {
    return headerLocale as Locale;
  }

  const cookieLocale = cookies().get('NEXT_LOCALE')?.value;
  if (cookieLocale && locales.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale;
  }

  const referer = requestHeaders.get('referer');
  if (referer) {
    try {
      const pathname = new URL(referer).pathname;
      const pathLocale = getLocaleFromPathname(pathname);
      if (pathLocale && pathLocale !== 'en') {
        return pathLocale;
      }
    } catch {
      // ignore invalid referer value
    }
  }

  return 'en';
});
