import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Data, ProductItem } from '../../types/Products';

export const productsApiSlice = createApi({
  reducerPath: 'products',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com',
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<
      Data,
      { searchTerm: string; limit: number; skip: number }
    >({
      query: ({ searchTerm, limit, skip }) =>
        `/products/search?q=${searchTerm}&limit=${limit}&skip=${skip}`,
    }),
    getSingleProduct: builder.query<ProductItem, { id: string | undefined }>({
      query: ({ id }) => `/products/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetSingleProductQuery } =
  productsApiSlice;
