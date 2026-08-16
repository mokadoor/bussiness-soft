'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Locale, locales } from '@/lib/i18n';
import { getClientLocaleFromWindow, getLocaleFromPathname, getLocalizedPathname } from '@/lib/locale';

interface LocaleContextValue {
  locale: Locale;
  switchLocale: (locale: Locale) => void;
}

export const LocaleContext = React.createContext<LocaleContextValue | undefined>(undefined);

function getCookieLocale(): Locale | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/(?:^|;\s*)NEXT_LOCALE=([^;]+)/);
  const value = match?.[1];
  return value && locales.includes(value as Locale) ? (value as Locale) : null;
}

export function LocaleProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: Locale;
}) {
  const pathname = usePathname() ?? '/';
  const router = useRouter();
  const [locale, setLocale] = React.useState<Locale>(initialLocale);

  React.useEffect(() => {
    const nextLocale = getClientLocaleFromWindow() ?? getLocaleFromPathname(pathname) ?? getCookieLocale() ?? 'en';
    setLocale((current) => (current === nextLocale ? current : nextLocale));
    document.documentElement.lang = nextLocale;
    document.documentElement.dir = nextLocale === 'ar' ? 'rtl' : 'ltr';
  }, [pathname]);

  const switchLocale = React.useCallback(
    (nextLocale: Locale) => {
      const currentPath =
        typeof window !== 'undefined'
          ? `${window.location.pathname}${window.location.search}${window.location.hash}`
          : pathname;
      const currentLocale = getLocaleFromPathname(currentPath) ?? getCookieLocale() ?? 'en';
      if (nextLocale === currentLocale) return;

      const targetPath = getLocalizedPathname(currentPath, nextLocale);
      document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
      setLocale(nextLocale);
      document.documentElement.lang = nextLocale;
      document.documentElement.dir = nextLocale === 'ar' ? 'rtl' : 'ltr';

      if (typeof window !== 'undefined') {
        window.location.assign(targetPath);
        return;
      }

      router.replace(targetPath, { scroll: false });
    },
    [pathname, router]
  );

  return (
    <LocaleContext.Provider value={{ locale, switchLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocaleContext() {
  const context = React.useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocaleContext must be used within a LocaleProvider');
  }
  return context;
}
