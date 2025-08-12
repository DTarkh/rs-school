import { ReactNode } from 'react';

interface ProductsLayoutProps {
  children: ReactNode;
  list: ReactNode;
  details: ReactNode;
  params?: { id?: string };
}

import ProductsLayoutClient from './products-layout-client';

export default function ProductsLayout({
  children,
  list,
  details,
}: ProductsLayoutProps) {
  return (
    <ProductsLayoutClient list={list} details={details}>
      {children}
    </ProductsLayoutClient>
  );
}
