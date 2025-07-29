import { useEffect, useState } from 'react';

export type Item = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
};

type Props = {
  searchTerm: string;
  setError: (data: boolean) => void;
  skip: number;
  limit: number;
};

export default function useFetchProducts({
  searchTerm,
  setError,
  skip,
  limit,
}: Props) {
  const [data, setData] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const url = `https://dummyjson.com/products/search?q=${searchTerm}&limit=${limit}&skip=${skip}`;
      setIsLoading(true);

      try {
        const res = await fetch(url);

        if (!res.ok) {
          setError(true);
          setErrorMessage(`Something went wrong (status ${res.status})`);
          return;
        }

        const data = await res.json();

        setData(data.products);
        setTotal(data.total);
        setError(false);
        setErrorMessage(null);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(true);
        setErrorMessage('Network error. Please check your connection.');
      }
      setIsLoading(false);
    }

    fetchData();
  }, [searchTerm, setError, skip, limit]);

  return { data, isLoading, errorMessage, total };
}
