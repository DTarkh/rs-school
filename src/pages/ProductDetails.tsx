import { useNavigate, useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';

type Item = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
};

export default function ProductDetails() {
  const params = useParams();
  const [data, setData] = useState<Item | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchSingleProduct() {
      setIsLoading(true);

      try {
        const response = await fetch(
          'https://dummyjson.com/products/' + params.id
        );

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
  }, [params.id]);

  const navigate = useNavigate();

  if (!data && !isLoading) return <div>Error, Could not fetch data!</div>;

  return (
    <div className="p-6">
      {error && <p>{error}</p>}
      {isLoading && <Spinner />}
      {!isLoading && data && (
        <>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Products
          </button>
          <div className="aspect-square w-full max-w-md mx-auto mb-6 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={data.thumbnail}
              alt={data.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {data.title}
            </h1>
            <p className="text-sm text-gray-500 capitalize">{data.category}</p>
          </div>
        </>
      )}
    </div>
  );
}
