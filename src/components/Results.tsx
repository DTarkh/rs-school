import { useEffect, useState } from 'react';
import ResultItem from './ResultItem';
import Pagination from './Pagination';
import useFetchProducts from '../hooks/useFetchProducts';

type Props = {
  searchTerm: string;
  tirggerError: boolean;
  setError: (error: boolean) => void;
};

export type Item = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
};

export default function Results({ searchTerm, tirggerError, setError }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  const skip = (currentPage - 1) * limit;

  const { data, isLoading, errorMessage, total } = useFetchProducts({
    searchTerm,
    setError,
    skip,
    limit,
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('page', String(currentPage));
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, '', newUrl);
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (tirggerError) {
    throw new Error(errorMessage || 'An undexpected error occurred.');
  }
  return (
    <>
      <div className="border rounded-md  p-3 h-[600px]">
        {isLoading && (
          <div
            className="w-full  flex justify-center items-center h-full"
            data-testid="loading"
          >
            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {!isLoading && data.length === 0 && (
          <div className="w-full  flex items-center justify-center h-full">
            <p>No results found for &quot;{searchTerm}&quot;.</p>
          </div>
        )}
        <div className="grid grid-cols-1 gap-4  overflow-y-auto">
          {!isLoading &&
            data.map((product) => (
              <ResultItem
                key={product.id}
                id={product.id}
                title={product.title}
                image={product.thumbnail}
              />
            ))}
        </div>
      </div>
      <div className="h-[35px] mt-[25px]">
        {!isLoading && data.length !== 0 && (
          <Pagination
            page={currentPage}
            setPage={setCurrentPage}
            total={total}
            limit={limit}
          />
        )}
      </div>
    </>
  );
}
