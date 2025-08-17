'use client';

import { exportCSV } from '../actions/exportCsv';
import { Items } from '../../util/utils';

export default function DownloadCSVButton({ items }: { items: Items[] }) {
  async function handleDownload() {
    const formData = new FormData();
    formData.append('data', JSON.stringify(items));

    const csv = await exportCSV(formData);

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${items.length}_items.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <button
      onClick={handleDownload}
      className="px-4 py-2 bg-blue-600 text-white rounded-xl"
    >
      Download CSV
    </button>
  );
}
