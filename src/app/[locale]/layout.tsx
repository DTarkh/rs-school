import '../../globals.css';
import Providers from './providers';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';
import { getMessages } from 'next-intl/server';
import { cookies as nextCookies } from 'next/headers';
import { Metadata } from 'next';

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'RS-React-App',
  description: 'Learn React',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const messages = await getMessages();

  const theme = (await cookies()).get('theme')?.value;
  const darkMode = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50';

  return (
    <html lang={locale}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <body>
          <Providers initialTheme={theme === 'dark' ? 'dark' : 'light'}>
            <Header />
            <main
              id="root"
              className={` ${darkMode} w-full min-h-screen flex flex-col items-center justify-center p-6`}
            >
              <Menu />
              {children}
            </main>
          </Providers>
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
function cookies() {
  return nextCookies();
}
