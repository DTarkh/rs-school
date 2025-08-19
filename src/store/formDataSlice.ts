import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type FormDataFields = {
  name: string;
  age: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  terms: boolean;
  country: string;
};

export type ImageInfo = {
  base64: string;
  mime: string;
  name: string;
  size: number;
};

type State = {
  formData: FormDataFields;
  image: ImageInfo | null;
};

const initialState: State = {
  formData: {
    name: '',
    age: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    terms: false,
    country: '',
  },
  image: null,
};

const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    Add(state, action: PayloadAction<FormDataFields>) {
      state.formData = action.payload;
    },
    clear(state) {
      state.formData = initialState.formData;
      state.image = null;
    },
    setImage(state, action: PayloadAction<ImageInfo | null>) {
      state.image = action.payload;
    },
  },
});

export const FormActions = formDataSlice.actions;
export default formDataSlice.reducer;
