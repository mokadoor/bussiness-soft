import { cookies, headers } from 'next/headers';
import { getLocaleFromPathname } from './locale';
import { locales, type Locale } from './i18n';

export function getLocaleFromServer(): Locale {
  const cookieLocale = cookies().get('NEXT_LOCALE')?.value;
  const headerLocale = headers().get('x-next-locale');

  const requestPath = headers().get('referer') ?? '';
  let pathLocale: Locale | null = null;

  if (requestPath) {
    try {
      const pathname = requestPath.startsWith('http') ? new URL(requestPath).pathname : requestPath;
      pathLocale = getLocaleFromPathname(pathname);
    } catch {
      // ignore invalid path value
    }
  }

  if (pathLocale && pathLocale !== 'en') {
    return pathLocale;
  }

  if (headerLocale && locales.includes(headerLocale as Locale)) {
    return headerLocale as Locale;
  }

  if (cookieLocale && locales.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale;
  }

  return 'en';
}
