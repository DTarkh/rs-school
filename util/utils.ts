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

export function toPlainQuery(
  obj: Record<string, string | string[] | undefined>,
  omitKeys: string[] = []
) {
  const out: Record<string, string | string[]> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (omitKeys.includes(k) || v === undefined) continue;
    out[k] = Array.isArray(v) ? v.map(String) : String(v);
  }
  return out;
}
