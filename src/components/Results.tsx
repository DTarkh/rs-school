import ResultItem from './ResultItem';
import Pagination from './Pagination';
import { useLocation } from 'react-router-dom';
import { useGetProductsQuery } from '../store/products/productsApiSlice';
import Spinner from './Spinner';

type Props = {
  searchTerm: string;
  tirggerError: boolean;
};

export type Item = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
};

export default function Results({ searchTerm, tirggerError }: Props) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const pageParam = parseInt(params.get('page') || '1', 10);
  const page = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

  const limit = 5;
  const skip = (page - 1) * limit;

  const { data, isFetching, isError } = useGetProductsQuery({
    searchTerm,
    skip,
    limit,
  });

  if (tirggerError) {
    throw new Error('An undexpected error occurred.');
  }

  return (
    <>
      <div className="border rounded-md  p-3 h-[600px]">
        {isFetching && (
          <div
            className="w-full  flex justify-center items-center h-full"
            data-testid="loading"
          >
            <Spinner />
          </div>
        )}
        {isError && (
          <div className="w-full  flex justify-center items-center h-full">
            <p>An unexpected error occured!</p>
          </div>
        )}
        {!isFetching && data && data.products.length === 0 && (
          <div className="w-full  flex items-center justify-center h-full">
            <p>No results found for &quot;{searchTerm}&quot;.</p>
          </div>
        )}
        <div className="grid grid-cols-1 gap-4  overflow-y-auto">
          {!isFetching &&
            data &&
            data.products.map((product) => (
              <ResultItem
                key={product.id}
                id={product.id}
                title={product.title}
                image={product.thumbnail}
                page={page}
              />
            ))}
        </div>
      </div>
      <div className="h-[35px] mt-[25px]">
        {data && !isFetching && data.products.length !== 0 && (
          <Pagination page={page} total={data.total} limit={limit} />
        )}
      </div>
    </>
  );
}
