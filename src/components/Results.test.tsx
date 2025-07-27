import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router-dom';
import Results from './Results';
import App from '../App';
import ErrorBoundary from './ErrorBoundary';
import {
  mockFetchSuccess,
  mockFetchFailure,
  setSearchTerm,
} from '../../test-utils/test-utils';
import { Provider } from 'react-redux';
import { store } from '../store';

const setErrorMock = vi.fn();

const sampleData = {
  products: [
    { id: 1, title: 'Item 1', thumbnail: 'img1.jpg' },
    { id: 2, title: 'Item 2', thumbnail: 'img2.jpg' },
    { id: 3, title: 'Item 3', thumbnail: 'img3.jpg' },
  ],
};

describe('Results List Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    setErrorMock.mockClear();
  });

  afterEach(() => {
    cleanup();
  });

  it('should render correct number of items when data is provided', async () => {
    mockFetchSuccess(sampleData);

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Results
            searchTerm="item"
            tirggerError={false}
            setError={setErrorMock}
          />
        </Provider>
      </MemoryRouter>
    );

    const titles = await screen.findAllByTestId('item-title');

    expect(titles.length).toBe(3);
  });

  it('should display "no results" message when data array is empty', async () => {
    mockFetchSuccess({ products: [] });

    render(
      <Results searchTerm="test" tirggerError={false} setError={setErrorMock} />
    );

    expect(
      await screen.findByText('No results found for "test".')
    ).toBeInTheDocument();
  });

  it('should show loading state while fetching data', () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () =>
                resolve({
                  ok: true,
                  json: () => Promise.resolve(sampleData),
                }),
              1000
            )
          )
      )
    );

    render(
      <Results searchTerm="test" tirggerError={false} setError={setErrorMock} />
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('should handle missing or undefined data gracefully', async () => {});

  it('should display error message when API call fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.reject('Network error'))
    );

    render(
      <ErrorBoundary>
        <Results
          searchTerm="fail"
          tirggerError={true}
          setError={setErrorMock}
        />
      </ErrorBoundary>
    );

    expect(
      await screen.findByText(/An undexpected error occurred/i)
    ).toBeInTheDocument();
  });

  it('should call setError on 500 response and show fallback message', async () => {
    mockFetchFailure();

    setSearchTerm('');

    render(<App />);

    expect(
      await screen.findByRole('heading', { name: /error/i })
    ).toBeInTheDocument();

    expect(
      await screen.findByText(/something went wrong.*500/i)
    ).toBeInTheDocument();
  });
});
