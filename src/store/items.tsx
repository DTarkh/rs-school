import { createSlice } from '@reduxjs/toolkit';

const itemsSlice = createSlice({
  name: 'Products',
  initialState: { items: [] },
  reducers: {
    addItem() {},
    removeItem() {},
  },
});

export default itemsSlice.reducer;
export const itemsActions = itemsSlice.actions;
