import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';
import {
  mockFetchSuccess,
  mockFetchFailure,
  setSearchTerm,
  mockLoadingFetchSuccess,
} from '../test-utils/test-utils';
import { Provider } from 'react-redux';
import { store } from '../src/store/index';
import { ThemeProvider } from './contexts/useTheme';
import * as api from '../src/store/products/productsApiSlice';

describe('Main app component', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  afterEach(() => {
    cleanup();
  });
  it('should make initial API call on component mount', () => {
    const mockFn = vi.fn();

    vi.spyOn(api, 'useGetProductsQuery').mockImplementation((args) => {
      mockFn(args);
      return {
        data: { products: [] },
        isLoading: false,
        isFetching: false,
        isError: false,
        error: null,
        refetch: vi.fn(),
      };
    });
    setSearchTerm('initial');

    render(
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    );

    expect(mockFn).toHaveBeenCalledWith({
      searchTerm: 'initial',
      limit: 5,
      skip: 0,
    });
  });
  it('should handle search term from localStorage on initial load', async () => {
    setSearchTerm('saved');

    mockFetchSuccess({ products: [] });

    render(
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    );

    expect(
      await screen.findByText(/no results found for "saved"/i)
    ).toBeInTheDocument();
  });
  it('should manage loading states during API calls', async () => {
    mockLoadingFetchSuccess();
    setSearchTerm('loadingtest');

    render(
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByTestId(/loading/i)).toBeInTheDocument();

    mockFetchSuccess({ products: [] });

    render(
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    );

    expect(
      await screen.findByText(/No results found for "loadingtest"/i)
    ).toBeInTheDocument();
  });
  it('should call API with correct parameters', async () => {
    const mockFn = vi.fn();

    vi.spyOn(api, 'useGetProductsQuery').mockImplementation((args) => {
      mockFn(args);
      return {
        data: { products: [] },
        isLoading: false,
        isFetching: false,
        isError: false,
        error: null,
        refetch: vi.fn(),
      };
    });

    render(
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    );

    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('search-button');

    await userEvent.type(input, 'React');
    await userEvent.click(button);

    expect(mockFn).toHaveBeenCalledWith({
      searchTerm: 'react',
      limit: 5,
      skip: 0,
    });
  });
  it('should handle successful API responses', async () => {
    mockFetchSuccess({
      products: [
        { id: 1, title: 'React Book', description: 'Learn React fast' },
      ],
    });

    setSearchTerm('react book');

    render(
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    );

    expect(await screen.findByText(/react book/i)).toBeInTheDocument();
  });
  it('should handle API error responses', async () => {
    mockFetchFailure();

    setSearchTerm('');

    render(
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    );

    expect(await screen.findByText(/Error 500:/i)).toBeInTheDocument();

    expect(
      await screen.findByText(/Request failed with status 500/i)
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

    render(
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    );

    expect(await screen.findByText(/book a/i)).toBeInTheDocument();
    expect(screen.getByText(/book b/i)).toBeInTheDocument();
  });
  it('should manage search term state correctly', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    );

    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('search-button');

    await userEvent.type(input, 'Redux');
    await userEvent.click(button);

    const stored = JSON.parse(localStorage.getItem('searchTerm') || '""');
    expect(stored).toBe('redux');
  });
});
