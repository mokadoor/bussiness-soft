import { cookies, headers } from 'next/headers';
import { getLocaleFromPathname } from './locale';
import { locales, type Locale } from './i18n';

export function getLocaleFromServer(): Locale {
  const cookieLocale = cookies().get('NEXT_LOCALE')?.value;
  if (cookieLocale && locales.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale;
  }

  const matchedPath = headers().get('x-matched-path');
  if (typeof matchedPath === 'string' && matchedPath.length > 0) {
    return getLocaleFromPathname(matchedPath);
  }

  const referer = headers().get('referer');
  if (referer) {
    try {
      const url = new URL(referer);
      return getLocaleFromPathname(url.pathname);
    } catch {
      // ignore invalid referer header
    }
  }

  return 'en';
}
