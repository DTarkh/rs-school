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
  }, [searchTerm, setError, skip, limit]);

  return { data, isLoading, errorMessage, total };
}
