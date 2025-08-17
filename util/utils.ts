import { ReadonlyURLSearchParams } from 'next/navigation';

export type Items = {
  [key: string]: string | number;
  id: number;
  title: string;
  image: string;
  quantity: number;
};

export function convertToCSV(data: Items[]) {
  if (!data.length) return '';
  const headers = Object.keys(data[0]);
  const rows = data.map((obj) =>
    headers
      .map((h) => `"${String(obj[h] ?? '').replace(/"/g, '""')}"`)
      .join(',')
  );
  return [headers.join(','), ...rows].join('\n');
}

export function withCurrentQuery(
  pathname: string,
  sp: ReadonlyURLSearchParams | null
) {
  const query = sp ? sp.toString() : '';
  return query ? `${pathname}?${query}` : pathname;
}
