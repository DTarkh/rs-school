import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';
import ErrorBoundary from './ErrorBoundary';
import App from '../App';

describe('Main app component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should catche and handles JavaScript errors in child components', async () => {
    const ThrowingComponent = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    );

    expect(await screen.findByText(/test error/i)).toBeInTheDocument();
  });
  it('should display fallback UI when error occurs', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 500,
          json: () => Promise.resolve({}),
        })
      )
    );

    localStorage.setItem('searchTerm', JSON.stringify(''));

    render(<App />);

    expect(
      await screen.findByRole('heading', { name: /error/i })
    ).toBeInTheDocument();

    expect(
      await screen.findByText(/failed to fetch data, status 500/i)
    ).toBeInTheDocument();
  });
  it('should log error to console', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    const ThrowingComponent = () => {
      throw new Error('Logging test');
    };

    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Error caught by ErrorBoundary'),
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });
  it('should throw error when test button is clicked', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ products: [] }),
        })
      )
    );

    localStorage.setItem('searchTerm', JSON.stringify(''));

    render(<App />);

    const button = screen.getByText(/trigger error/i);
    await userEvent.click(button);

    expect(
      await screen.findByRole('heading', { name: /error/i })
    ).toBeInTheDocument();
  });
  it('should trigger error boundary fallback UI', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 404,
          json: () => Promise.resolve({}),
        })
      )
    );

    localStorage.setItem('searchTerm', JSON.stringify(''));

    render(<App />);

    expect(
      await screen.findByText(/failed to fetch data, status 404/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /error/i })).toBeInTheDocument();
  });
});
