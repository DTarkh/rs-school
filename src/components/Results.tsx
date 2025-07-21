import { useEffect, useState } from 'react';
import ResultsList from './ResultsList';

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

  useEffect(() => {
    function fetchData(searchTerm: string) {
      const url = 'https://dummyjson.com/products/search?q=' + searchTerm;

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
          setIsLoading(false);
        })
        .catch((err) => {
          console.error('Fetch error:', err);
          setIsLoading(false);
        });
    }

    fetchData(searchTerm);
  }, [searchTerm, setError]);

  if (tirggerError) {
    throw new Error(errorMessage || 'An undexpected error occurred.');
  }
  return (
    <div className="border rounded-md  p-3 ">
      {isLoading && (
        <div
          className="w-full h-[500px] flex items-center justify-center"
          data-testid="loading"
        >
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {!isLoading && data.length === 0 && (
        <div className="w-full h-[500px] flex items-center justify-center">
          <p>No results found for &quot;{searchTerm}&quot;.</p>
        </div>
      )}
      <div className="grid grid-cols-1 gap-4">
        {!isLoading &&
          data.map((product) => (
            <ResultsList
              key={product.id}
              title={product.title}
              image={product.thumbnail}
            />
          ))}
      </div>
    </div>
  );
}
