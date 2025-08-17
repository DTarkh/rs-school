'use server';

import { convertToCSV } from '../../util/utils';

export async function exportCSV(formData: FormData) {
  const raw = formData.get('data');
  const parsed = JSON.parse(raw as string);

  const csv = convertToCSV(parsed);

  return csv;
}
