import { type FormEvent, type ChangeEvent, useState, useEffect } from 'react';
import Button from './Button';

export default function Search({
  onSubmit,
}: {
  onSubmit: (value: string) => void;
}) {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const searchTermInLs = JSON.parse(
      localStorage.getItem('searchTerm') || '""'
    );
    setInputValue(searchTermInLs);
  }, []);

  function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(inputValue);
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
        className="border rounded-md outline-zinc-700 text-zinc-800 px-[10px] py-[3px] w-full"
      />
      <Button data-testid="search-button">Search</Button>
    </form>
  );
}
