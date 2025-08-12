'use client';

import { ReactNode } from 'react';
import Button from '../../../../components/Button';
import Search from '../../../../components/Search';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/dist/client/components/navigation';

interface ProductsLayoutClientProps {
  children: ReactNode;
  list: ReactNode;
  details: ReactNode;
}

export default function ProductsLayoutClient({
  children,
  list,
  details,
}: ProductsLayoutClientProps) {
  const searchParams = useSearchParams();
  const t = useTranslations();

  const isDetailPage = !!searchParams?.get('id');

  return (
    <>
      <div className="layout border p-4 rounded-xl border-gray-400 bg-white mt-[75px]">
        <Search />
      </div>

      <div className="layout mt-[20px]">
        <div className="flex justify-between items-center pb-3">
          <h1 className="text-2xl pb-[10px] text-start font-semibold">
            {t('results')}
          </h1>
          <Button>Trigger Error</Button>
        </div>

        {isDetailPage ? (
          <div className="flex">
            <div className="w-1/2 pr-3 border-r border-gray-200">{list}</div>

            <div className="w-1/2 pl-3">
              <div className="bg-[#F3F4F6] rounded-lg shadow-sm border h-full">
                {details}
              </div>
            </div>
          </div>
        ) : (
          <div>{list}</div>
        )}
      </div>
      {children}
    </>
  );
}
