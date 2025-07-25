import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Search from './Search';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { setSearchTerm } from '../../test-utils/test-utils';

describe('Search component', () => {
  beforeEach(() => {
    localStorage.clear();
    setSearchTerm('react');
  });

  afterEach(() => {
    cleanup();
  });

  it('should render search input and search button', () => {
    render(<Search onSubmit={() => {}} />);
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('search-button')).toBeInTheDocument();
  });

  it('should display previously saved search term from localStorage on mount', () => {
    render(<App />);
    const input = screen.getByTestId('search-input');
    expect(input).toHaveValue('react');
  });

  it('should show empty input when no saved term exists', () => {
    localStorage.clear();
    render(<App />);
    const input = screen.getByTestId('search-input');
    expect(input).toHaveValue('');
  });

  it('should update input value when user types', async () => {
    render(<Search onSubmit={() => {}} />);
    const input = screen.getByTestId('search-input');
    await userEvent.clear(input);
    await userEvent.type(input, 'react');
    expect(input).toHaveValue('react');
  });

  it('should save search term to localStorage when search button is clicked', async () => {
    render(<App />);
    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('search-button');

    await userEvent.clear(input);
    await userEvent.type(input, 'react');
    await userEvent.click(button);

    const saved = JSON.parse(localStorage.getItem('searchTerm') || '""');
    expect(saved).toBe('react');
  });

  it('should trim whitespace from search input before saving', async () => {
    render(<App />);
    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('search-button');

    await userEvent.clear(input);
    await userEvent.type(input, '   React  ');
    await userEvent.click(button);

    const saved = JSON.parse(localStorage.getItem('searchTerm') || '""');
    expect(saved).toBe('react');
  });

  it('should trigger search callback with correct parameters', async () => {
    const mockSubmit = vi.fn();
    render(<Search onSubmit={mockSubmit} />);

    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('search-button');

    await userEvent.clear(input);
    await userEvent.type(input, 'ReAct ');
    await userEvent.click(button);

    expect(mockSubmit).toHaveBeenCalledWith('react');
  });

  it('should retrieve saved search term on component mount', () => {
    setSearchTerm('ReactLib');

    render(<Search onSubmit={() => {}} />);
    const input = screen.getByTestId('search-input');
    expect(input).toHaveValue('ReactLib');
  });

  it('should overwrite existing localStorage value when new search is performed', async () => {
    setSearchTerm('OldValue');

    render(<App />);
    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('search-button');

    await userEvent.clear(input);
    await userEvent.type(input, 'NewSearch');
    await userEvent.click(button);

    const saved = JSON.parse(localStorage.getItem('searchTerm') || '""');
    expect(saved).toBe('newsearch');
  });
});
