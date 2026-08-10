'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Locale } from '@/lib/i18n';
import { getLocaleFromPathname, getLocalizedPathname } from '@/lib/locale';

interface LocaleContextValue {
  locale: Locale;
  switchLocale: (locale: Locale) => void;
}

const LocaleContext = React.createContext<LocaleContextValue | undefined>(undefined);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? '/';
  const router = useRouter();
  const locale = getLocaleFromPathname(pathname);

  React.useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  const switchLocale = React.useCallback(
    (nextLocale: Locale) => {
      const nextPathname = getLocalizedPathname(pathname, nextLocale);
      router.push(nextPathname);
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
