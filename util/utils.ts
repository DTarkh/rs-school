type Items = {
  [key: string]: string | number;
  id: number;
  title: string;
  image: string;
  quantity: number;
};

export function convertToCSV(items: Items[]) {
  if (items.length === 0) return '';

  const headers = Object.keys(items[0]);
  const rows = items.map((item) =>
    headers.map((header) => JSON.stringify(item[header] ?? '')).join(',')
  );

  return [headers.join(','), ...rows].join('\n');
}
