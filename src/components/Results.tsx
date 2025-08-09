import ResultItem from './ResultItem';

export type Item = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
};

export default async function Results() {
  const response = await fetch('https://dummyjson.com/products');
  const data = await response.json();

  return (
    <>
      <div className="border rounded-md  p-3 h-[600px]">
        {/* {isFetching && (
          <div
            className="w-full  flex justify-center items-center h-full"
            data-testid="loading"
          >
            <Spinner />
          </div>
        )}
        {isError && (
          <div className="w-full  flex justify-center items-center h-full">
            <ErrorMessage error={error} />
          </div>
        )} */}
        {data && data.products.length === 0 && (
          <div className="w-full  flex items-center justify-center h-full">
            <p>No results found for &quot;&quot;.</p>
          </div>
        )}
        <div className="grid grid-cols-1 gap-4  overflow-y-auto">
          {data &&
            data.products.map((product) => (
              <ResultItem
                key={product.id}
                id={product.id}
                title={product.title}
                image={product.thumbnail}
              />
            ))}
        </div>
      </div>
    </>
  );
}
