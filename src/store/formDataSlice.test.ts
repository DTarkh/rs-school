import { describe, it, expect } from 'vitest';
import reducer, { FormActions } from './formDataSlice';

const getInitial = () => reducer(undefined, { type: '@@INIT' });

describe('formDataSlice: reducers & actions', () => {
  it('should return initial state on unknown action', () => {
    const initial = getInitial();
    const next = reducer(undefined, { type: 'unknown' });
    expect(next).toEqual(initial);
  });

  it('Add should replace formData', () => {
    const initial = getInitial();
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
    const next = reducer(initial, FormActions.Add(payload));
    expect(next.formData).toEqual(payload);
  });

  it('setImage should set image info', () => {
    const initial = getInitial();
    const image = {
      base64: 'data:fake;base64,AAA',
      mime: 'image/png',
      name: 'avatar.png',
      size: 123,
    };
    const next = reducer(initial, FormActions.setImage(image));
    expect(next.image).toEqual(image);
  });

  it('clear should reset to initial and wipe image', () => {
    const initial = getInitial();
    const dirty = {
      ...initial,
      formData: {
        name: 'Jane',
        age: 30,
        email: 'jane@example.com',
        password: 'Xx1!',
        confirmPassword: 'Xx1!',
        gender: 'female',
        terms: true,
        country: 'Kazakhstan',
      },
      image: { base64: 'x', mime: 'y', name: 'z', size: 1 },
    };
    const next = reducer(dirty, FormActions.clear());
    expect(next).toEqual(initial);
  });
});
