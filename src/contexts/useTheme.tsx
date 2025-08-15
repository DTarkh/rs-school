'use client';

import {
  createContext,
  useContext,
  useMemo,
  useState,
  startTransition,
} from 'react';
import { useRouter } from 'next/navigation';
import type { Theme } from '../actions/theme';
import { setThemeCookie } from '../actions/theme';

type ThemeCtx = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeCtx>({
  theme: 'light',
  setTheme: () => {},
  toggleTheme: () => {},
});

export function ThemeProvider({
  initialTheme,
  children,
}: {
  initialTheme: Theme;
  children: React.ReactNode;
}) {
  const [theme, setThemeState] = useState<Theme>(initialTheme);
  const router = useRouter();

  const setTheme = (t: Theme) => {
    setThemeState(t);

    document.documentElement.classList.toggle('dark', t === 'dark');

    startTransition(async () => {
      await setThemeCookie(t);
      router.refresh();
    });
  };

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  return useContext(ThemeContext);
}
