import type { RootState } from './index';

export const selectFormData = (state: RootState) => state.formData.formData;
export const selectImage = (state: RootState) => state.formData.image;

export const selectCountries = (state: RootState) => {
  const c = state.formData.formData.country;
  return Array.isArray(c) ? c : [c].filter(Boolean);
};
