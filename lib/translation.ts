'use client';

import { usePathname } from 'next/navigation';
import { useLocaleContext } from '@/components/providers/locale-provider';
import { getDictionary } from './i18n';
import { getClientLocaleFromWindow, getLocaleFromPathname } from './locale';

export function useTranslation() {
  const pathname = usePathname();

  try {
    const { locale } = useLocaleContext();
    return getDictionary(locale);
  } catch {
    const locale = getClientLocaleFromWindow() ?? getLocaleFromPathname(pathname ?? '/') ?? 'en';
    return getDictionary(locale);
  }
}
