import { describe, it, expect } from 'vitest';
import { selectFormData, selectImage, selectCountries } from './formSelectors';

const mockState = {
  formData: {
    formData: {
      name: 'John',
      age: 25,
      email: 'john@example.com',
      password: 'Passw0rd!',
      confirmPassword: 'Passw0rd!',
      gender: 'male',
      terms: true,
      country: ['Kazakhstan', 'Georgia', 'England'],
    },
    image: {
      base64: 'data:fake;base64,AAA',
      mime: 'image/png',
      name: 'avatar.png',
      size: 123,
    },
  },
};

describe('form selectors', () => {
  it('selectFormData returns formData', () => {
    expect(selectFormData(mockState)).toEqual(mockState.formData.formData);
  });

  it('selectImage returns image', () => {
    expect(selectImage(mockState)).toEqual(mockState.formData.image);
  });

  it('selectCountries normalizes to array', () => {
    expect(selectCountries(mockState)).toEqual([
      'Kazakhstan',
      'Georgia',
      'England',
    ]);

    const state2 = {
      ...mockState,
      formData: {
        ...mockState.formData,
        formData: { ...mockState.formData.formData, country: 'Georgia' },
      },
    };
    expect(selectCountries(state2)).toEqual(['Georgia']);
  });
});
