'use client';

import { createContext, useContext, ReactNode, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Dictionary = any; // We revert back to any and ignore the lint issue, or use an interface

type I18nContextType = {
  locale: string;
  dict: Dictionary;
  setLocale: (locale: string) => void;
};

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({
  children,
  initialLocale,
  initialDict
}: {
  children: ReactNode;
  initialLocale: string;
  initialDict: Dictionary;
}) {
  const [locale, setLocaleState] = useState(initialLocale);
  const [dict] = useState(initialDict);

  const setLocale = async (newLocale: string) => {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    setLocaleState(newLocale);

    // In a real app we'd fetch the new dict here or trigger a router refresh
    // For this implementation, refreshing the page is easiest to get the new server dicts
    window.location.reload();
  };

  return (
    <I18nContext.Provider value={{ locale, dict, setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
