import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';
import {
  mockFetchSuccess,
  mockFetchFailure,
  setSearchTerm,
} from '../test-utils/test-utils';

describe('Main app component', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  afterEach(() => {
    cleanup();
  });
  it('should make initial API call on component mount', () => {
    mockFetchSuccess({ products: [] });
    setSearchTerm('initial');

    render(<App />);

    expect(fetch).toHaveBeenCalledWith(
      'https://dummyjson.com/products/search?q=initial'
    );
  });
  it('should handle search term from localStorage on initial load', async () => {
    setSearchTerm('saved');

    mockFetchSuccess({ products: [] });

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
    setSearchTerm('loadingtest');

    render(<App />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    expect(await screen.findByText(/no results/i)).toBeInTheDocument();
  });
  it('should call API with correct parameters', async () => {
    mockFetchSuccess({ products: [] });

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
    mockFetchSuccess({
      products: [
        { id: 1, title: 'React Book', description: 'Learn React fast' },
      ],
    });

    setSearchTerm('react');

    render(<App />);

    expect(await screen.findByText(/react book/i)).toBeInTheDocument();
  });
  it('should handle API error responses', async () => {
    mockFetchFailure();

    setSearchTerm('');

    render(<App />);

    expect(
      await screen.findByText(/failed to fetch data, status 500/i)
    ).toBeInTheDocument();

    expect(
      await screen.findByRole('heading', { name: /error/i })
    ).toBeInTheDocument();
  });
  it('should update component state based on API responses', async () => {
    mockFetchSuccess({
      products: [
        { id: 1, title: 'Book A', description: 'About A' },
        { id: 2, title: 'Book B', description: 'About B' },
      ],
    });

    setSearchTerm('books');

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
