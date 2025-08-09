'use client';

import '../globals.css';
import Header from '../components/Header';
import { Provider } from 'react-redux';
import { store } from '../../src/store/index';
import { ThemeProvider } from '../contexts/useTheme';

// export const metadata: Metadata = {
//   title: 'Rs school project',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Provider store={store}>
          <ThemeProvider>
            <main
              id="root"
              className="bg-gray-50 w-full min-h-screen flex flex-col items-center justify-center p-6"
            >
              {children}
            </main>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
