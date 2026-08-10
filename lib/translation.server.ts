import { getDictionary } from './i18n';
import { getLocaleFromServer } from './locale.server';

export function getServerDictionary() {
  return getDictionary(getLocaleFromServer());
}
