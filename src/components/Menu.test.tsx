import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from '../../src/store/items/itemSlice';
import Menu from '../components/Menu';

type Item = {
  id: number;
  title: string;
  image: string;
  quantity: number;
};

type ItemsState = {
  items: Item[];
  totalQuantity: number;
};

function renderWithRedux(
  sliceState: ItemsState = { items: [], totalQuantity: 0 }
) {
  const store = configureStore({
    reducer: { items: itemsReducer },
    preloadedState: {
      items: sliceState,
    },
  });

  return {
    store,
    ...render(
      <Provider store={store}>
        <Menu />
      </Provider>
    ),
  };
}

describe('Menu component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('should not be visible when no items are selected', () => {
    renderWithRedux();

    const menu = screen.getByText(/Download/i);
    expect(menu.closest('div')).toHaveClass('-translate-x-full');
  });

  it('should display the menu and total selected count when items exist', () => {
    const mockState = {
      items: [{ id: 1, title: 'Item 1', image: '', quantity: 1 }],
      totalQuantity: 1,
    };

    renderWithRedux(mockState);

    expect(screen.getByText(/Download/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Items Selected: 1/i)).toBeInTheDocument();
  });

  it('should remove all items when "Unselect All" is clicked', () => {
    const mockState = {
      items: [{ id: 1, title: 'Item 1', image: '', quantity: 1 }],
      totalQuantity: 1,
    };

    renderWithRedux(mockState);

    userEvent.click(screen.getByText(/Unselect All/i));

    waitFor(() => {
      expect(screen.queryByText(/Unselect All/i)).not.toBeVisible();
    });
    expect(JSON.parse(localStorage.getItem('items') || '[]')).toEqual([]);
  });
});
