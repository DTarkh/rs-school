'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '../i18n/navigation';
import { useSearchParams } from 'next/navigation';

export default function LanguageSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const nextLocale = locale === 'en' ? 'ru' : 'en';
  const label = nextLocale === 'ru' ? 'Русский' : 'English';

  const query = Object.fromEntries(
    (searchParams ?? new URLSearchParams()).entries()
  );

  return (
    <Link
      href={{ pathname, query }}
      locale={nextLocale}
      className="inline-flex items-center justify-center h-9 px-3 rounded-2xl border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
    >
      {label}
    </Link>
  );
}
