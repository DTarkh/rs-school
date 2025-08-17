import React from 'react';
import { Link } from '../../../../../i18n/navigation';
import Image from 'next/image';

export default async function ProductDetailsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { id } = await searchParams;

  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    next: { revalidate: 300 },
  });
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
        <Link
          href={{ pathname: '/products', query: id?.toString() }}
          className="hover:underline"
        >
          Back to Products
        </Link>
        <div className="aspect-square w-full max-w-md mx-auto mb-6 bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={data.thumbnail}
            alt={data.title}
            width={200}
            height={200}
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
