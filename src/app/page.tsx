'use client';

import { redirect } from 'next/navigation';

export default function Home() {
  if (typeof window !== 'undefined') {
    const searchTerm = JSON.parse(localStorage.getItem('searchTerm') || '""');
    const url =
      searchTerm && searchTerm.trim() !== ''
        ? `products?page=1&search=${searchTerm}`
        : 'products?page=1&search=';

    return redirect(url);
  }

  return null;
}
