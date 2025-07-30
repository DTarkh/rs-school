import { useEffect, useState } from 'react';

type Item = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
};

export default function useFetchSingleProduct({
  id,
}: {
  id: string | undefined;
}) {
  const [data, setData] = useState<Item | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchSingleProduct() {
      setError('');
      setData(null);
      setIsLoading(true);

      try {
        const response = await fetch('https://dummyjson.com/products/' + id);

        if (!response.ok) {
          setIsLoading(false);
          setError(`something went wrong ${response.status}`);
          return;
        }

        const product = await response.json();
        setIsLoading(false);
        setData(product);
      } catch (error) {
        setError('Network error. Please check your internet connection.');
        console.error(error);
      }
      setIsLoading(false);
    }

    fetchSingleProduct();
  }, [id]);
  return { data, error, isLoading };
}
