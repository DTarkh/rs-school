import { vi } from 'vitest';

export function mockFetchSuccess(data: unknown) {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(data),
    })
  );
}

export function mockFetchFailure(status = 500) {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: false,
      status,
      json: () => Promise.resolve({}),
    })
  );
}

export function setSearchTerm(value: string) {
  localStorage.setItem('searchTerm', JSON.stringify(value));
}
