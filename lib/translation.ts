'use client';

import { usePathname } from 'next/navigation';
import { getDictionary } from './i18n';
import { getLocaleFromPathname } from './locale';

export function useTranslation() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname ?? '/');
  return getDictionary(locale);
}
