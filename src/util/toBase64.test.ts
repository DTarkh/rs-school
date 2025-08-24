import { describe, it, expect, vi, afterEach } from 'vitest';
import { toBase64 } from './util';

afterEach(() => vi.unstubAllGlobals());

describe('toBase64', () => {
  it('resolves with base64 (success)', async () => {
    vi.stubGlobal(
      'FileReader',
      vi.fn(() => {
        let onload:
          | ((this: FileReader, ev: ProgressEvent<FileReader>) => void)
          | null = null;

        const reader = {
          result: 'data:image/png;base64,QUJD',
          get onload() {
            return onload;
          },
          set onload(cb) {
            onload = cb;
          },
          onerror: null as
            | ((this: FileReader, ev: ProgressEvent<FileReader>) => void)
            | null,
          readAsDataURL() {
            setTimeout(() => {
              onload?.call(
                reader as unknown as FileReader,
                {} as ProgressEvent<FileReader>
              );
            }, 0);
          },
        } as unknown as FileReader;

        return reader;
      })
    );

    await expect(
      toBase64(new File(['x'], 'a.png', { type: 'image/png' }))
    ).resolves.toBe('QUJD');
  });

  it('rejects on read error', async () => {
    vi.stubGlobal(
      'FileReader',
      vi.fn(() => {
        let onerror:
          | ((this: FileReader, ev: ProgressEvent<FileReader>) => void)
          | null = null;

        const reader = {
          onload: null as
            | ((this: FileReader, ev: ProgressEvent<FileReader>) => void)
            | null,
          get onerror() {
            return onerror;
          },
          set onerror(cb) {
            onerror = cb;
          },
          readAsDataURL() {
            setTimeout(() => {
              onerror?.call(
                reader as unknown as FileReader,
                {} as ProgressEvent<FileReader>
              );
            }, 0);
          },
        } as unknown as FileReader;

        return reader;
      })
    );

    await expect(
      toBase64(new File(['x'], 'a.png', { type: 'image/png' }))
    ).rejects.toThrow('Failed to read file');
  });
});
