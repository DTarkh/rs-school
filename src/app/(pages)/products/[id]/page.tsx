import Link from 'next/link';

export default async function ProductDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) {
    return <div>Error: Failed to fetch data (status {res.status})</div>;
  }
  const data = await res.json();

  if (!data) {
    return <div>Error: Product not found.</div>;
  }

  return (
    <div className="p-6 h-full">
      <>
        <Link href={`/products`}>Back to Products</Link>
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
    </div>
  );
}
