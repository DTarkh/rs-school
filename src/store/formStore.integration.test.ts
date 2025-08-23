import { describe, it, expect } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import reducer, { FormActions } from './formDataSlice';
import { selectFormData, selectImage } from './formSelectors';

function makeStore() {
  return configureStore({
    reducer: { formData: reducer },
  });
}

describe('form store integration', () => {
  it('updates store on Add and setImage, and resets on clear', () => {
    const store = makeStore();

    let state = store.getState();
    expect(selectFormData(state).name).toBe('');
    expect(selectImage(state)).toBeNull();

    const payload = {
      name: 'John',
      age: 25,
      email: 'john@example.com',
      password: 'Passw0rd!',
      confirmPassword: 'Passw0rd!',
      gender: 'male',
      terms: true,
      country: 'Georgia',
    };
    store.dispatch(FormActions.Add(payload));

    const image = {
      base64: 'data:fake;base64,AAA',
      mime: 'image/png',
      name: 'avatar.png',
      size: 111,
    };
    store.dispatch(FormActions.setImage(image));

    state = store.getState();
    expect(selectFormData(state)).toEqual(payload);
    expect(selectImage(state)).toEqual(image);

    store.dispatch(FormActions.clear());

    state = store.getState();
    expect(selectFormData(state)).toEqual({
      name: '',
      age: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
      terms: false,
      country: ['Kazakhstan', 'Georgia', 'England'],
    });
    expect(selectImage(state)).toBeNull();
  });
});
