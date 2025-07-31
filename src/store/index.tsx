import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './items/itemSlice';

export const store = configureStore({ reducer: { items: itemsReducer } });
