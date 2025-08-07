'use client';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// const initialItems = JSON.parse(localStorage.getItem('items') || '[]');

type Item = {
  id: number;
  title: string;
  image: string;
  quantity: number;
};

export type ItemsState = {
  items: Item[];
  totalQuantity: number;
};

const initialState: ItemsState = {
  items: [],
  totalQuantity: 0,
};

const itemSlice = createSlice({
  name: 'Products',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Item>) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
      state.totalQuantity++;
    },
    removeItem(state, action: PayloadAction<number>) {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      state.totalQuantity--;
    },
    removeAllItems(state) {
      state.items = [];
      state.totalQuantity = 0;
    },
  },
});

export default itemSlice.reducer;
export const itemsActions = itemSlice.actions;
