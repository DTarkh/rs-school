'use client';

import { useSearchParams } from 'next/navigation';
import { withCurrentQuery } from '../../util/utils';
import { useTranslations } from 'next-intl';
import { Link } from '../i18n/navigation';
import LanguageSwitch from './LanguageSwitch';
import Themeswitch from './ThemeSwitch';

export default function Header() {
  const searchParams = useSearchParams();
  const t = useTranslations();
  return (
    <header className="bg-white/80 dark:bg-amber-700 backdrop-blur-md shadow-lg border-b border-gray-100 z-50 w-full fixed top-0 flex justify-center items-center h-[60px]">
      <nav className="layout w-full flex justify-between items-center">
        <ul className="flex items-center justify-center gap-2 py-4">
          <li>
            <Link
              href={withCurrentQuery('/products', searchParams)}
              className="flex items-center gap-1 px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-gray-700 hover:text-purple-600 hover:bg-purple-50"
            >
              {t('products')}
            </Link>
          </li>
          <li>
            <Link
              href={withCurrentQuery('/about', searchParams)}
              className="flex items-center gap-1 px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-gray-700 hover:text-purple-600 hover:bg-purple-50"
            >
              {t('about')}
            </Link>
          </li>
        </ul>
        <div className="space-x-2">
          <LanguageSwitch />
          <Themeswitch />
        </div>
      </nav>
    </header>
  );
}
