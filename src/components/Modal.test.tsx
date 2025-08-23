import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { it, expect, describe, afterEach, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { Provider } from 'react-redux';
import { store } from '../store';
import userEvent from '@testing-library/user-event';
import App from '../App';

vi.mock('./ImageUpload', () => {
  return {
    __esModule: true,
    default: ({ onSelect }: { onSelect: (f: File | null) => void }) => (
      <div>
        <label htmlFor="test-file">Upload picture</label>
        <input
          id="test-file"
          type="file"
          onChange={(e) => {
            const file = (e.target as HTMLInputElement).files?.[0] ?? null;
            onSelect(file);
          }}
        />
      </div>
    ),
    toBase64: () => Promise.resolve('data:fake;base64,AAA'),
  };
});

describe('Uncontrolled form', () => {
  afterEach(() => {
    cleanup();
  });
  it('should open modal on click', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const openBtn = screen.getByRole('button', { name: /uncontrolled form/i });
    openBtn.click();

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toBeInTheDocument();
  });
  it('should close modal on click', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const openBtn = screen.getByRole('button', { name: /uncontrolled form/i });
    await userEvent.click(openBtn);

    await screen.findByRole('dialog');

    const closeBtn = await screen.findByRole('button', { name: /close/i });
    await userEvent.click(closeBtn);

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
  it('should close modal on the outside click', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const openBtn = screen.getByRole('button', { name: /uncontrolled form/i });
    openBtn.click();

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toBeInTheDocument();

    await userEvent.pointer([{ keys: '[MouseLeft]', target: dialog }]);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
  it('should close modal on ESC key press', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const openBtn = screen.getByRole('button', { name: /uncontrolled form/i });
    await userEvent.click(openBtn);

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');

    const dlg = document.querySelector('dialog') as HTMLDialogElement;
    expect(dlg).toBeInTheDocument();
    expect(dlg.hasAttribute('open')).toBe(false);
  });
});
