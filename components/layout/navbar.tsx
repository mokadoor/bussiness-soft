'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Moon, Sun, ArrowRight } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Container } from './container';
import { Logo } from './logo';
import { Button } from '@/components/ui/button';
import { getPathnameWithoutLocale } from '@/lib/locale';
import { useTranslation } from '@/lib/translation';
import { useLocaleContext } from '@/components/providers/locale-provider';

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const normalizedPathname = getPathnameWithoutLocale(pathname ?? '/');

  const isActive = (href: string) => {
    const targetPath = getPathnameWithoutLocale(href);
    return targetPath === '/'
      ? normalizedPathname === '/'
      : normalizedPathname.startsWith(targetPath);
  };

  const dictionary = useTranslation();
  const { locale, switchLocale } = useLocaleContext();

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'border-b border-border/80 bg-background/75 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-background/70'
          : 'border-b border-transparent bg-background/0'
      )}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between gap-4 lg:h-20">
          <Link href="/" aria-label="Business Software TN — Home" className="shrink-0">
            <Logo />
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {dictionary.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'nav-link rounded-md px-3 py-2',
                  isActive(item.href) && 'text-foreground after:w-full'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <label htmlFor="locale-select" className="sr-only">
              Language
            </label>
            <select
              id="locale-select"
              value={locale}
              onChange={(event) => switchLocale(event.target.value as any)}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition hover:border-primary"
            >
              <option value="en">{dictionary.common.english}</option>
              <option value="fr">{dictionary.common.french}</option>
              <option value="ar">{dictionary.common.arabic}</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="Toggle theme"
            >
              {mounted &&
                (theme === 'dark' ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                ))}
            </button>
            <Button
              asChild
              size="sm"
              className="hidden bg-primary text-primary-foreground hover:bg-primary/90 sm:inline-flex"
            >
              <Link href="/contact">
                {dictionary.common.requestDemo}
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile menu */}
      <div
        className={cn(
          'fixed inset-x-0 top-16 z-40 origin-top overflow-hidden border-b border-border bg-background transition-all duration-300 lg:hidden',
          mobileOpen
            ? 'max-h-[calc(100vh-4rem)] opacity-100'
            : 'pointer-events-none max-h-0 opacity-0'
        )}
      >
        <Container className="flex flex-col gap-1 py-4">
          {dictionary.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'rounded-lg px-4 py-3 text-base font-medium transition-colors hover:bg-secondary',
                isActive(item.href)
                  ? 'bg-secondary text-primary'
                  : 'text-foreground'
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-3 rounded-lg border border-border bg-secondary/40 p-2">
            <label htmlFor="mobile-locale-select" className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Language
            </label>
            <select
              id="mobile-locale-select"
              value={locale}
              onChange={(event) => switchLocale(event.target.value as any)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition hover:border-primary"
            >
              <option value="en">{dictionary.common.english}</option>
              <option value="fr">{dictionary.common.french}</option>
              <option value="ar">{dictionary.common.arabic}</option>
            </select>
          </div>
          <Button asChild className="mt-2 bg-primary">
            <Link href="/contact">
              {dictionary.common.requestDemo}
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </Container>
      </div>
    </header>
  );
}