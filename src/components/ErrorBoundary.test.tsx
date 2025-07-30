import {
  describe,
  it,
  expect,
  afterEach,
  vi,
  beforeAll,
  afterAll,
} from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';
import ErrorBoundary from './ErrorBoundary';
import App from '../App';
import {
  mockFetchFailure,
  mockFetchSuccess,
  setSearchTerm,
} from '../../test-utils/test-utils';
import { ThemeProvider } from '../contexts/useTheme';
import { Provider } from 'react-redux';
import { store } from '../store';

describe('Main app component', () => {
  afterEach(() => {
    cleanup();
  });

  beforeAll(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    vi.restoreAllMocks();
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
    mockFetchFailure();

    setSearchTerm('');

    render(
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    );

    expect(
      await screen.findByRole('heading', { name: /error/i })
    ).toBeInTheDocument();

    expect(
      await screen.findByText(/something went wrong.*500/i)
    ).toBeInTheDocument();
  });
  it('should log error to console', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

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
    mockFetchSuccess({ products: [] });

    setSearchTerm('');

    render(
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    );

    const button = screen.getByText(/trigger error/i);
    await userEvent.click(button);

    expect(
      await screen.findByRole('heading', { name: /error/i })
    ).toBeInTheDocument();
  });
  it('should trigger error boundary fallback UI', async () => {
    mockFetchFailure(404);
    setSearchTerm('');

    render(
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    );

    expect(
      await screen.findByText(/something went wrong.*404/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /error/i })).toBeInTheDocument();
  });
});
