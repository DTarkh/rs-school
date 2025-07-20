import Container from './components/Container';
import Button from './components/Button';
import Search from './components/Search';
import Results from './components/Results';
import ErrorBoundary from './components/ErrorBoundary';
import { useEffect, useState } from 'react';

export type Props = Record<string, never>;

export default function App() {
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
    <main className="bg-amber-200 w-full h-screen flex items-center justify-center">
      <Container>
        <div className="w-full">
          <h1 className="text-xl pb-[10px] text-center">Search</h1>
          <Search onSubmit={handleSubmit} />
        </div>
        <ErrorBoundary>
          <div className="w-full">
            <h1 className="text-xl pb-[10px] text-center">Results</h1>
            {searchTerm !== null && (
              <Results
                searchTerm={searchTerm}
                tirggerError={triggerError}
                setError={setTriggerError}
              />
            )}
          </div>
        </ErrorBoundary>
        <div className="w-full flex justify-end">
          <Button onClick={onTriggerError}>Trigger Error</Button>
        </div>
      </Container>
    </main>
  );
}
