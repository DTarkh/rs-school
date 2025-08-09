'use client';

import { Provider } from 'react-redux';
import { store } from '../../src/store/';
import { ThemeProvider } from '../contexts/useTheme';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
}
