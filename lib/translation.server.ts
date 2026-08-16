import { getDictionary } from './i18n';
import { getLocaleFromServer } from './locale.server';
import { cache } from 'react';

export const getServerDictionary = cache(function getServerDictionary() {
  return getDictionary(getLocaleFromServer());
});
