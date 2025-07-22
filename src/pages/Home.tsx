import Button from '../components/Button';
import Search from '../components/Search';
import Results from '../components/Results';
import ErrorBoundary from '../components/ErrorBoundary';
import { useEffect, useState } from 'react';

export type Props = Record<string, never>;

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState<null | string>(null);
  const [triggerError, setTriggerError] = useState<boolean>(false);

  useEffect(() => {
    const searchTerm = localStorage.getItem('searchTerm');
    if (searchTerm) {
      setSearchTerm(JSON.parse(searchTerm));
    }
  }, []);

  function handleSubmit(value: string) {
    const cleaned = value.trim().toLowerCase();
    localStorage.setItem('searchTerm', JSON.stringify(cleaned));
    setSearchTerm(cleaned);
  }
  function onTriggerError() {
    setTriggerError(true);
  }

  return (
    <>
      <div className="layout border p-4 rounded-xl border-gray-400 bg-white mt-[75px]">
        <Search onSubmit={handleSubmit} />
      </div>
      <ErrorBoundary>
        <div className="layout mt-[20px]">
          <div className="flex justify-between items-center pb-3">
            <h1 className="text-2xl pb-[10px] text-start font-semibold">
              Results
            </h1>
            <Button onClick={onTriggerError}>Trigger Error</Button>
          </div>
          {searchTerm !== null && (
            <Results
              searchTerm={searchTerm}
              tirggerError={triggerError}
              setError={setTriggerError}
            />
          )}
        </div>
      </ErrorBoundary>
    </>
  );
}
