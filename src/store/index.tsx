'use client';

import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './items/itemSlice';
import { productsApiSlice } from './products/productsApiSlice';

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    [productsApiSlice.reducerPath]: productsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productsApiSlice.middleware);
  },
});
