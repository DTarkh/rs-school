import { cleanup, render, screen } from '@testing-library/react';
import { it, expect, describe, afterEach, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { Provider } from 'react-redux';
import { store } from '../store';
import ReactHookForm from './ReactHookForm';
import userEvent from '@testing-library/user-event';

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

describe('React Hook Form', () => {
  afterEach(() => {
    cleanup();
  });
  it('should render all required fields', () => {
    render(
      <Provider store={store}>
        <ReactHookForm setOpen={() => {}} />
      </Provider>
    );

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^male$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/female/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
    expect(screen.getByText(/i accept the terms/i)).toBeInTheDocument();
    expect(screen.getByText(/upload picture/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });
  it('shows validation errors for invalid submission', async () => {
    render(
      <Provider store={store}>
        <ReactHookForm setOpen={() => {}} />
      </Provider>
    );

    await userEvent.type(screen.getByLabelText(/name/i), 'john');
    await userEvent.type(screen.getByLabelText(/age/i), ' ');
    await userEvent.type(screen.getByLabelText(/email/i), 'johnexample.com');
    await userEvent.type(screen.getByLabelText(/^password$/i), 'Pas');

    expect(
      screen.queryByText(/first letter of name must be uppercase/i)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/age is required, have to be more then 1/i)
    ).toBeInTheDocument();
    expect(screen.queryByText(/enter a valid email/i)).toBeInTheDocument();
    expect(
      screen.queryByText(/password must be at least 4 characters/i)
    ).toBeInTheDocument();
  });
  it('should check whether form was submitted successfully', async () => {
    const setOpen = vi.fn();

    render(
      <Provider store={store}>
        <ReactHookForm setOpen={setOpen} />
      </Provider>
    );

    await userEvent.type(screen.getByLabelText(/name/i), 'John');
    await userEvent.type(screen.getByLabelText(/age/i), '25');
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
    await userEvent.type(screen.getByLabelText(/^password$/i), 'Passw0rd!');
    await userEvent.type(
      screen.getByLabelText(/confirm password/i),
      'Passw0rd!'
    );
    await userEvent.click(screen.getByLabelText(/^male$/i));

    await userEvent.selectOptions(screen.getByLabelText(/country/i), 'Georgia');

    await userEvent.click(
      screen.getByRole('checkbox', { name: /i accept the terms/i })
    );

    const file = new File(['hello'], 'avatar.png', { type: 'image/png' });
    await userEvent.upload(screen.getByText(/upload picture/i), file);

    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await screen.findByRole('button', { name: /submit/i });
    expect(setOpen).toHaveBeenCalledWith(false);

    expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/first letter of name must be uppercase/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/age is required, have to be more then 1/i)
    ).not.toBeInTheDocument();
  });

  it('should test password strength calculation', async () => {
    const setOpen = vi.fn();

    render(
      <Provider store={store}>
        <ReactHookForm setOpen={setOpen} />
      </Provider>
    );

    await userEvent.type(screen.getByLabelText(/name/i), 'John');
    await userEvent.type(screen.getByLabelText(/age/i), '25');
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');

    await userEvent.type(
      screen.getByLabelText(/confirm password/i),
      'Passw0rd!'
    );
    await userEvent.click(screen.getByLabelText(/^male$/i));

    await userEvent.selectOptions(screen.getByLabelText(/country/i), 'Georgia');

    await userEvent.click(
      screen.getByRole('checkbox', { name: /i accept the terms/i })
    );

    const file = new File(['hello'], 'avatar.png', { type: 'image/png' });
    await userEvent.upload(screen.getByText(/upload picture/i), file);

    await userEvent.type(screen.getByLabelText(/confirm password/i), 'd');
    await userEvent.type(screen.getByLabelText(/^password$/i), 'd');
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(
      screen.getByText(/password must be at least 4 characters/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/password must include at least one number/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/password must include at least one uppercase letter/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/password must include at least one special character/i)
    ).toBeInTheDocument();

    await userEvent.clear(screen.getByLabelText(/^password$/i));
    await userEvent.clear(screen.getByLabelText(/confirm password/i));

    await userEvent.type(screen.getByLabelText(/confirm password/i), 'dD');
    await userEvent.type(screen.getByLabelText(/^password$/i), 'dD');
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(
      screen.getByText(/password must be at least 4 characters/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/password must include at least one number/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/password must include at least one special character/i)
    ).toBeInTheDocument();

    await userEvent.clear(screen.getByLabelText(/^password$/i));
    await userEvent.clear(screen.getByLabelText(/confirm password/i));

    await userEvent.type(screen.getByLabelText(/^password$/i), 'dD!');
    await userEvent.type(screen.getByLabelText(/confirm password/i), 'dD!');
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(
      screen.getByText(/password must be at least 4 characters/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/password must include at least one number/i)
    ).toBeInTheDocument();

    await userEvent.clear(screen.getByLabelText(/^password$/i));
    await userEvent.clear(screen.getByLabelText(/confirm password/i));

    await userEvent.type(screen.getByLabelText(/^password$/i), 'dD!1');
    await userEvent.type(screen.getByLabelText(/confirm password/i), 'dD!1');
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(
      screen.queryByText(/password must be at least 4 characters/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/password must include at least one number/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/password must include at least one uppercase letter/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/password must include at least one lowercase letter/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        /password must include at least one special character/i
      )
    ).not.toBeInTheDocument();
  });
});
