'use client';

import { type FormEvent, type ChangeEvent } from 'react';
import Button from './Button';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '../i18n/navigation';
import { useTranslations } from 'next-intl';

export default function Search() {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations();

  const [inputValue, setInputValue] = useLocalStorage<string>('searchTerm', '');

  function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = inputValue.trim().toLowerCase();

    const params = new URLSearchParams(searchParams?.toString() ?? '');
    params.set('page', '1');
    params.set('search', value);

    const targetPath = path?.startsWith('/products/') ? '/products' : path;

    router.push(`${targetPath}?${params.toString()}`);
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
        className="border rounded-xl outline-fuchsia-600 text-zinc-800 px-[10px] py-[7px] w-full border-gray-400 mr-2"
      />
      <Button data-testid="search-button">{t('search')}</Button>
    </form>
  );
}
