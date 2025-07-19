import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';

describe('Main app component', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  afterEach(() => {
    cleanup();
  });
  it('should make initial API call on component mount', () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ products: [] }),
        })
      )
    );

    localStorage.setItem('searchTerm', JSON.stringify('initial'));

    render(<App />);

    expect(fetch).toHaveBeenCalledWith(
      'https://dummyjson.com/products/search?q=initial'
    );
  });
  it('should handle search term from localStorage on initial load', async () => {
    localStorage.setItem('searchTerm', JSON.stringify('saved'));

    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ products: [] }),
        })
      )
    );

    render(<App />);

    expect(
      await screen.findByText(/no results found for "saved"/i)
    ).toBeInTheDocument();
  });
  it('should manage loading states during API calls', async () => {
    const fetchPromise = new Promise<{
      ok: boolean;
      json: () => Promise<{ products: [] }>;
    }>((resolve) => {
      setTimeout(() => {
        resolve({
          ok: true,
          json: () => Promise.resolve({ products: [] }),
        });
      }, 50); // simulate short delay
    });

    vi.stubGlobal(
      'fetch',
      vi.fn(() => fetchPromise)
    );

    localStorage.setItem('searchTerm', JSON.stringify('loadingtest'));

    render(<App />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    expect(await screen.findByText(/no results/i)).toBeInTheDocument();
  });
  it('should call API with correct parameters', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ products: [] }),
        })
      )
    );

    render(<App />);

    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('search-button');

    await userEvent.type(input, 'React');
    await userEvent.click(button);

    expect(fetch).toHaveBeenCalledWith(
      'https://dummyjson.com/products/search?q=react'
    );
  });
  it('should handle successful API responses', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              products: [
                { id: 1, title: 'React Book', description: 'Learn React fast' },
              ],
            }),
        })
      )
    );

    localStorage.setItem('searchTerm', JSON.stringify('react'));

    render(<App />);

    expect(await screen.findByText(/react book/i)).toBeInTheDocument();
  });
  it('should handle API error responses', async () => {
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
      await screen.findByText(/failed to fetch data, status 500/i)
    ).toBeInTheDocument();

    expect(
      await screen.findByRole('heading', { name: /error/i })
    ).toBeInTheDocument();
  });
  it('should update component state based on API responses', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              products: [
                { id: 1, title: 'Book A', description: 'About A' },
                { id: 2, title: 'Book B', description: 'About B' },
              ],
            }),
        })
      )
    );

    localStorage.setItem('searchTerm', JSON.stringify('books'));

    render(<App />);

    expect(await screen.findByText(/book a/i)).toBeInTheDocument();
    expect(screen.getByText(/book b/i)).toBeInTheDocument();
  });
  it('should manage search term state correctly', async () => {
    render(<App />);

    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('search-button');

    await userEvent.type(input, 'Redux');
    await userEvent.click(button);

    const stored = JSON.parse(localStorage.getItem('searchTerm') || '""');
    expect(stored).toBe('redux');
  });
});
