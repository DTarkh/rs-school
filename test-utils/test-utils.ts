import { vi } from 'vitest';
import * as api from '../src/store/products/productsApiSlice';

type Products = {
  products: Product[];
};

type Product = {
  id: number;
  title?: string;
  thumbnail?: string;
  description?: string;
  category?: string;
};

export function mockFetchSuccess(data: Products) {
  vi.spyOn(api, 'useGetProductsQuery').mockReturnValue({
    data,
    isLoading: false,
    isFetching: false,
    isError: false,
    error: null,
    refetch: vi.fn(),
  });
}

export function mockLoadingFetchSuccess() {
  vi.spyOn(api, 'useGetProductsQuery').mockReturnValue({
    data: undefined,
    isLoading: true,
    isFetching: true,
    isError: false,
    error: null,
    refetch: vi.fn(),
  });
}

export function mockDetailsFetchSuccess(data: Product) {
  vi.spyOn(api, 'useGetSingleProductQuery').mockReturnValue({
    data,
    isLoading: false,
    isFetching: false,
    isError: false,
    error: null,
    refetch: vi.fn(),
  });
}

export function mockDetailsFetchFailure(status: number = 500) {
  vi.spyOn(api, 'useGetSingleProductQuery').mockReturnValue({
    data: undefined,
    isLoading: false,
    isError: true,
    error: {
      status,
      data: { message: `Request failed with status ${status}` },
    },
    refetch: vi.fn(),
  });
}

export function mockFetchFailure(status: number = 500) {
  vi.spyOn(api, 'useGetProductsQuery').mockReturnValue({
    data: undefined,
    isLoading: false,
    isError: true,
    error: {
      status,
      data: { message: `Request failed with status ${status}` },
    },
    refetch: vi.fn(),
  });
}

export function setSearchTerm(value: string) {
  localStorage.setItem('searchTerm', JSON.stringify(value));
}
