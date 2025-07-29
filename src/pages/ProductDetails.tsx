import { useNavigate, useParams } from 'react-router-dom';

import Spinner from '../components/Spinner';
import Button from '../components/Button';
import useFetchSingleProduct from '../hooks/useFetchSingleProduct';

export default function ProductDetails() {
  const params = useParams();
  const id = params.id;

  const { data, error, isLoading } = useFetchSingleProduct({ id });
  const navigate = useNavigate();

  if (error) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        {error}
      </div>
    );
  }

  if (!data && !isLoading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        Error, Could not fetch data!
      </div>
    );
  }

  return (
    <div className="p-6 h-full">
      {isLoading && (
        <div className="h-full w-full flex justify-center items-center">
          <Spinner />
        </div>
      )}
      {!isLoading && data && (
        <>
          <Button onClick={() => navigate('/')}>Back to Products</Button>
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
