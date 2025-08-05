import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { ThemeProvider, useTheme } from './useTheme';
import userEvent from '@testing-library/user-event';

function TestComponent() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    cleanup();
  });

  it('uses light theme by default if no value in localStorage', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByText(/Current theme: light/i)).toBeInTheDocument();
  });

  it('reads initial theme from localStorage', () => {
    localStorage.setItem('theme', 'dark');
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByText(/Current theme: dark/i)).toBeInTheDocument();
  });

  it('toggles theme from light to dark', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const button = screen.getByRole('button', { name: /toggle theme/i });
    await userEvent.click(button);

    expect(screen.getByText(/Current theme: dark/i)).toBeInTheDocument();
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('toggles theme from dark to light', async () => {
    localStorage.setItem('theme', 'dark');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const button = screen.getByRole('button', { name: /toggle theme/i });
    await userEvent.click(button);

    expect(screen.getByText(/Current theme: light/i)).toBeInTheDocument();
    expect(localStorage.getItem('theme')).toBe('light');
  });
});
