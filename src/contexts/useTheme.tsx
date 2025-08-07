'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

type Props = {
  children: ReactNode;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: Props) {
  const [theme, setTheme] = useState('light');

  function toggleTheme() {
    setTheme((prev: string) => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  }

  const values = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  return useContext(ThemeContext);
}
