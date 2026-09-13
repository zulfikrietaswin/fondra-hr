import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { Providers } from '@/components/providers';
import { Toaster } from '@/components/ui/sonner';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'FondraHR',
    template: '%s | FondraHR',
  },
  description: 'マルチテナント型タレントマネジメントSaaS',
};

import { getI18n } from '@/lib/i18n/server';
import { I18nProvider } from '@/lib/i18n/client';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { locale, dict } = await getI18n();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <I18nProvider initialLocale={locale} initialDict={dict}>
          <Providers>
            {children}
            <Toaster />
          </Providers>
        </I18nProvider>
      </body>
    </html>
  );
}
