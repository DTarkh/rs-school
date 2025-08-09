'use client';
import Link from 'next/link';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';

function withCurrentQuery(
  pathname: string,
  sp: ReadonlyURLSearchParams | null
) {
  const query = sp ? sp.toString() : '';
  return query ? `${pathname}?${query}` : pathname;
}

export default function Header() {
  const searchParams = useSearchParams();
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-100 z-50 w-full fixed top-0 flex justify-center items-center h-[60px]">
      <nav className="layout w-full flex justify-between items-center">
        <ul className="flex items-center justify-center gap-2 py-4">
          <li>
            <Link
              href={withCurrentQuery('/products', searchParams)}
              className="flex items-center gap-1 px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-gray-700 hover:text-purple-600 hover:bg-purple-50"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              href={withCurrentQuery('/about', searchParams)}
              className="flex items-center gap-1 px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-gray-700 hover:text-purple-600 hover:bg-purple-50"
            >
              About
            </Link>
          </li>
        </ul>
        {/* <Themeswitch /> */}
      </nav>
    </header>
  );
}
