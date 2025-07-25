import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProductDetails from '../pages/ProductDetails';
import '@testing-library/jest-dom/vitest';

import {
  mockFetchSuccess,
  mockFetchFailure,
} from '../../test-utils/test-utils';

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
    mockFetchSuccess(mockProduct);

    render(
      <MemoryRouter initialEntries={['/product/1']}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    expect(await screen.findByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText(/electronics/i)).toBeInTheDocument();
  });

  it('shows error message when API responds with non-OK status', async () => {
    mockFetchFailure(500);

    render(
      <MemoryRouter initialEntries={['/product/1']}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      await screen.findByText(/something went wrong 500/i)
    ).toBeInTheDocument();
  });

  it('shows network error message when fetch fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.reject('Network error'))
    );

    render(
      <MemoryRouter initialEntries={['/product/1']}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText(
          /Network error. Please check your internet connection./i
        )
      ).toBeInTheDocument();
    });
  });

  it('shows fallback error message if data is null and not loading', async () => {
    mockFetchFailure(404);

    render(
      <MemoryRouter initialEntries={['/product/123456']}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    });

    expect(
      await screen.findByText(/something went wrong 404/i)
    ).toBeInTheDocument();
  });
});
