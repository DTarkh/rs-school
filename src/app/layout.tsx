import '../globals.css';
import Providers from './providers'; // client wrapper
import Header from '../components/Header'; // can be client or server
import Menu from '../components/Menu'; // can be client or server

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
    </html>
  );
}
