import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProductDetails from '../pages/ProductDetails';
import '@testing-library/jest-dom/vitest';
import {
  mockDetailsFetchSuccess,
  mockDetailsFetchFailure,
} from '../../test-utils/test-utils';
import { Provider } from 'react-redux';
import { store } from '../store/index';

const mockProduct = {
  id: 1,
  title: 'Test Product',
  description: 'Test Description',
  thumbnail: 'https://example.com/image.jpg',
  category: 'electronics',
};

describe('ProductDetails', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders loading state and then product details after successful fetch', async () => {
    mockDetailsFetchSuccess(mockProduct);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/product/1']}>
          <Routes>
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    waitFor(() => {
      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });

    expect(await screen.findByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText(/electronics/i)).toBeInTheDocument();
  });

  it('shows error message when API responds with non-OK status', async () => {
    mockDetailsFetchFailure();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/product/1']}>
          <Routes>
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(
      await screen.findByText(/Request failed with status 500/i)
    ).toBeInTheDocument();
  });

  it('shows network error message when fetch fails', async () => {
    mockDetailsFetchFailure();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/product/1']}>
          <Routes>
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/Request failed with status 500/i)
      ).toBeInTheDocument();
    });
  });

  it('shows fallback error message if data is null and not loading', async () => {
    mockDetailsFetchFailure(404);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/product/123456']}>
          <Routes>
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    });

    expect(
      await screen.findByText(/Request failed with status 404/i)
    ).toBeInTheDocument();
  });
});
