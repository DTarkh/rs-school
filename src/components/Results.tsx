import ResultItem from './ResultItem';

type Item = {
  id: number;
  title: string;
  thumbnail: string;
};

type APIResponse = {
  products: Item[];
};

export default async function Results({
  searchTerm,
  page,
}: {
  searchTerm?: string;
  page?: number;
}) {
  let data: APIResponse | null = null;

  const limit = 5;
  const skip = (page ? page - 1 : 0) * limit;

  try {
    const res = await fetch(
      `https://dummyjson.com/products/search?q=${searchTerm ?? ''}&limit=${limit}&skip=${skip}`
    );
    if (!res.ok) {
      return <div>Error: Failed to fetch data (status {res.status})</div>;
    }
    data = (await res.json()) as APIResponse;
  } catch (err) {
    return <div>Error: {String(err)}</div>;
  }

  if (!data || data.products.length === 0) {
    return (
      <div className="border rounded-md p-3 h-[600px] flex items-center justify-center">
        <p>No results found for &quot;{searchTerm}&quot;.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-md p-3 h-[600px]">
      <div className="grid grid-cols-1 gap-4 overflow-y-auto">
        {data.products.map((p) => (
          <ResultItem
            key={p.id}
            id={p.id}
            title={p.title}
            image={p.thumbnail}
          />
        ))}
      </div>
    </div>
  );
}
