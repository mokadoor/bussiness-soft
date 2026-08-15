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

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? '/';
  const router = useRouter();
  const [locale, setLocale] = React.useState<Locale>(() => {
    return getClientLocaleFromWindow() ?? getLocaleFromPathname(pathname) ?? getCookieLocale() ?? 'en';
  });

  React.useEffect(() => {
    const nextLocale = getClientLocaleFromWindow() ?? getLocaleFromPathname(pathname) ?? getCookieLocale() ?? 'en';
    setLocale((current) => (current === nextLocale ? current : nextLocale));
    document.documentElement.lang = nextLocale;
    document.documentElement.dir = nextLocale === 'ar' ? 'rtl' : 'ltr';
  }, [pathname]);

  React.useEffect(() => {
    // Prefetch localized routes for all locales to speed up language switches
    try {
      locales.forEach((l) => {
        const p = getLocalizedPathname(pathname, l);
        if (p !== pathname) {
          // router.prefetch may be async; fire-and-forget to warm the cache
          router.prefetch(p).catch(() => {});
        }
      });
    } catch (e) {
      // ignore
    }

    const handleInternalLinkClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const anchor = target?.closest('a[href]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute('href') ?? '';
      if (!href.startsWith('/') || href.startsWith('//') || href.startsWith('/_') || href.startsWith('/api')) {
        return;
      }

      const localizedHref = getLocalizedPathname(href, locale);
      if (href === localizedHref) return;

      event.preventDefault();
      router.replace(localizedHref, { scroll: false });
    };

    document.addEventListener('click', handleInternalLinkClick);
    return () => document.removeEventListener('click', handleInternalLinkClick);
  }, [locale, router]);

  const switchLocale = React.useCallback(
    (nextLocale: Locale) => {
      (async () => {
        const currentPath = typeof window !== 'undefined' ? window.location.pathname : pathname;
        const targetPath = getLocalizedPathname(currentPath, nextLocale);
        document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
        setLocale(nextLocale);
        document.documentElement.lang = nextLocale;
        document.documentElement.dir = nextLocale === 'ar' ? 'rtl' : 'ltr';

        let prefetchMs = 0;
        try {
          const t0 = performance.now();
          await router.prefetch(targetPath);
          const t1 = performance.now();
          prefetchMs = Math.round(t1 - t0);
        } catch (e) {
          // ignore prefetch errors
        }

        if (currentPath !== targetPath) {
          try {
            const tNavStart = performance.now();
            const res = await router.replace(targetPath, { scroll: false });
            const tNavEnd = performance.now();
            console.debug(`[locale] switched -> ${nextLocale}; prefetch=${prefetchMs}ms nav=${Math.round(tNavEnd - tNavStart)}ms res=${String(res)}`);
          } catch (e) {
            console.debug(`[locale] navigation error switching -> ${nextLocale}`, e);
          }
        } else {
          // refresh doesn't return a promise we can await; log prefetch and trigger a refresh
          console.debug(`[locale] refresh -> ${nextLocale}; prefetch=${prefetchMs}ms (calling router.refresh())`);
          router.refresh();
        }
      })();
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
