import 'server-only';

import { cookies } from 'next/headers';

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  id: () => import('./dictionaries/id.json').then((module) => module.default),
  ja: () => import('./dictionaries/ja.json').then((module) => module.default),
};

export type Locale = keyof typeof dictionaries;

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]?.() ?? dictionaries.en();
}

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('NEXT_LOCALE');

  if (localeCookie?.value && localeCookie.value in dictionaries) {
    return localeCookie.value as Locale;
  }

  return 'en';
}

export async function getI18n() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  return { locale, dict };
}
