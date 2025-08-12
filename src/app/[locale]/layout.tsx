import '../../globals.css';
import Providers from './providers'; // client wrapper
import Header from '../../components/Header'; // can be client or server
import Menu from '../../components/Menu'; // can be client or server
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';
import { getMessages } from 'next-intl/server';

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

  return (
    <html lang={locale}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <body>
          <Providers>
            <Header />
            <main
              id="root"
              className="bg-gray-50 w-full min-h-screen flex flex-col items-center justify-center p-6"
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
