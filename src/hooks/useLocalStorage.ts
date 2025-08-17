'use client';

import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn('Failed to read localStorage key:', key, error);
      return initialValue;
    }
  });

  useEffect(() => {
    const valueToStore =
      typeof storedValue === 'string'
        ? storedValue.trim().toLowerCase()
        : storedValue;

    window.localStorage.setItem(key, JSON.stringify(valueToStore));
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
