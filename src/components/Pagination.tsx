'use client';

import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '../i18n/navigation';
import { useTranslations } from 'next-intl';

export default function Pagination({
  page,
  total,
  limit,
}: {
  page: number;
  total: number;
  limit: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const path = usePathname();
  const t = useTranslations();

  const totalPages = Math.ceil(total / limit);

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams?.toString() ?? '');
    params.set('page', String(newPage));

    const targetPath = path?.startsWith('/products/') ? '/products' : path;
    router.push(`${targetPath}?${params.toString()}`);
  };

  const clsForButton =
    'px-5 py-1 border rounded-2xl hover:cursor-pointer bg-amber-300 hover:bg-amber-400 transition-all disabled:bg-gray-300 disabled:border-gray-200 disabled:text-gray-400';

  if (total <= 1) return null;

  return (
    <div className="flex gap-2 justify-center items-center mt-2">
      <button
        onClick={() => changePage(page - 1)}
        disabled={page === 1}
        className={clsForButton}
      >
        {t('prev')}
      </button>
      <span>
        {page} of {totalPages}
      </span>
      <button
        onClick={() => changePage(page + 1)}
        disabled={page === totalPages}
        className={clsForButton}
      >
        {t('next')}
      </button>
    </div>
  );
}
