'use client';

import { Provider } from 'react-redux';
import { store } from '../../../src/store/';
import { ThemeProvider } from '../../contexts/useTheme';

export default function Providers({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme: 'light' | 'dark';
}) {
  return (
    <Provider store={store}>
      <ThemeProvider initialTheme={initialTheme}>{children}</ThemeProvider>
    </Provider>
  );
}
