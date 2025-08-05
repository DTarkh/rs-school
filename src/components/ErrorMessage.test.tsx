import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import ErrorMessage from '../components/ErrorMessage';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

describe('ErrorMessage component', () => {
  const fallbackText = 'Something went wrong. Please try again later.';
  afterEach(() => {
    cleanup();
  });
  it('renders fallback message when error is undefined', () => {
    render(<ErrorMessage error={undefined} />);
    expect(screen.getByText(fallbackText)).toBeInTheDocument();
  });

  it('renders FetchBaseQueryError with string data', () => {
    const error: FetchBaseQueryError = {
      status: 404,
      data: 'Product not found',
    };

    render(<ErrorMessage error={error} />);
    expect(screen.getByText(/Error 404:/i)).toBeInTheDocument();
    expect(screen.getByText(/Product not found/i)).toBeInTheDocument();
  });

  it('renders FetchBaseQueryError with object data', () => {
    const error: FetchBaseQueryError = {
      status: 500,
      data: { message: 'Internal Server Error', code: 'SERVER_ERR' },
    };

    render(<ErrorMessage error={error} />);
    expect(screen.getByText(/Error 500:/i)).toBeInTheDocument();
    expect(screen.getByText(JSON.stringify(error.data))).toBeInTheDocument();
  });

  it('renders fallback for FetchBaseQueryError with unknown data', () => {
    const error: FetchBaseQueryError = {
      status: 400,
      data: null as unknown as string,
    };

    render(<ErrorMessage error={error} />);
    expect(screen.getByText(/Error 400:/i)).toBeInTheDocument();
    expect(screen.getByText(fallbackText)).toBeInTheDocument();
  });
});
