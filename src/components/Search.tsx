import { type FormEvent, type ChangeEvent } from 'react';
import Button from './Button';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function Search({
  onSubmit,
}: {
  onSubmit: (value: string) => void;
}) {
  const [inputValue, setInputValue] = useLocalStorage<string>('searchTerm', '');

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
        className="border rounded-xl outline-fuchsia-600 text-zinc-800 px-[10px] py-[7px] w-full border-gray-400"
      />
      <Button data-testid="search-button">Search</Button>
    </form>
  );
}
