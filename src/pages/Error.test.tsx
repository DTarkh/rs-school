import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import ErrorPage from './Error';

vi.mock('../components/Header', () => ({
  default: () => <div data-testid="mock-header">Mock Header</div>,
}));

describe('ErrorPage', () => {
  it('renders error message and header', () => {
    render(<ErrorPage />);

    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByText('404 Not Found!')).toBeInTheDocument();
    expect(screen.getByText('Could not find this page!')).toBeInTheDocument();
  });
});
