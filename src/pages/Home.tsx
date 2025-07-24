import Button from '../components/Button';
import Search from '../components/Search';
import Results from '../components/Results';
import ErrorBoundary from '../components/ErrorBoundary';
import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

export type Props = Record<string, never>;

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState<null | string>(null);
  const [triggerError, setTriggerError] = useState<boolean>(false);

  const location = useLocation();

  const isInSplitView = location.pathname.includes('/product/');

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

          {isInSplitView ? (
            <div className="flex">
              <div className="w-1/2 pr-3 border-r border-gray-200">
                {searchTerm !== null && (
                  <Results
                    searchTerm={searchTerm}
                    tirggerError={triggerError}
                    setError={setTriggerError}
                  />
                )}
              </div>

              <div className="w-1/2 pl-3">
                <div className="bg-[#F3F4F6] rounded-lg shadow-sm border h-full">
                  <Outlet />
                </div>
              </div>
            </div>
          ) : (
            <div>
              {searchTerm !== null && (
                <Results
                  searchTerm={searchTerm}
                  tirggerError={triggerError}
                  setError={setTriggerError}
                />
              )}
            </div>
          )}
        </div>
      </ErrorBoundary>
    </>
  );
}
