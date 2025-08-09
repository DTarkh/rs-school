'use client';

import { type FormEvent, type ChangeEvent, useEffect } from 'react';
import Button from './Button';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useRouter } from 'next/navigation';

export default function Search() {
  const router = useRouter();

  const [inputValue, setInputValue] = useLocalStorage<string>('searchTerm', '');

  useEffect(() => {
    const value = inputValue.trim().toLowerCase();

    const params = new URLSearchParams();
    params.set('page', '1');
    params.set('search', value);

    router.push(`products?${params.toString()}`);
  }, []);

  function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = inputValue.trim().toLowerCase();

    const params = new URLSearchParams();
    params.set('page', '1');
    params.set('search', value);

    router.push(`products?${params.toString()}`);
  }

  function inputHandler(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  return (
    <form className="flex justify-center items-center" onSubmit={submitHandler}>
      <input
        data-testid="search-input"
        onChange={inputHandler}
        value={inputValue}
        type="text"
        className="border rounded-xl outline-fuchsia-600 text-zinc-800 px-[10px] py-[7px] w-full border-gray-400"
      />
      <Button data-testid="search-button">Search</Button>
    </form>
  );
}
