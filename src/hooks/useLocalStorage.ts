import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [searchTerm, setSearchTermRaw] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setSearchTerm = (value: T) => {
    let newValue = value;

    if (typeof value === 'string') {
      newValue = value.trim().toLowerCase() as T;
    }

    setSearchTermRaw(newValue);
  };

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(searchTerm));
    } catch (error) {
      console.warn(`Error writing to localStorage key "${key}":`, error);
    }
  }, [key, searchTerm]);

  return [searchTerm, setSearchTerm] as const;
}
