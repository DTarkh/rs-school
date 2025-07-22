import { useEffect, useState } from 'react';
import ResultsList from './ResultsList';
import Pagination from './Pagination';

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
  const [data, setData] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;
  const skip = (currentPage - 1) * limit;

  useEffect(() => {
    function updatePageParam(page: number) {
      const params = new URLSearchParams(window.location.search);
      params.set('page', String(page));
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.pushState({}, '', newUrl);
    }

    updatePageParam(currentPage);
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    function fetchData(searchTerm: string) {
      const url = `https://dummyjson.com/products/search?q=${searchTerm}&limit=${limit}&skip=${skip}`;

      setIsLoading(true);

      fetch(url)
        .then((res) => {
          if (!res.ok) {
            setError(true);
            setErrorMessage(`Failed to fetch data, status ${res.status}`);
            console.error('HTTP error:', res.status);
          }
          return res.json();
        })
        .then((data) => {
          setData(data.products);
          setTotal(data.total);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error('Fetch error:', err);
          setIsLoading(false);
        });
    }

    fetchData(searchTerm);
  }, [searchTerm, setError, skip]);

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
              <ResultsList
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
