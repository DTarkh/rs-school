import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router-dom';
import Results from '../../components/Results';
import userEvent from '@testing-library/user-event';
import { mockFetchSuccess } from '../../../test-utils/test-utils';
import { Provider } from 'react-redux';
import { store } from '..';

const setErrorMock = vi.fn();

const sampleData = {
  products: [
    { id: 1, title: 'Item 1', thumbnail: 'img1.jpg' },
    { id: 2, title: 'Item 2', thumbnail: 'img2.jpg' },
    { id: 3, title: 'Item 3', thumbnail: 'img3.jpg' },
  ],
};

describe('Redux List Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    setErrorMock.mockClear();
  });

  afterEach(() => {
    cleanup();
  });

  it('should save item in redux state and in local storage on checking the checkbox', async () => {
    mockFetchSuccess(sampleData);

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Results
            searchTerm="item"
            tirggerError={false}
            setError={setErrorMock}
          />
        </Provider>
      </MemoryRouter>
    );

    const checkboxes = await screen.findAllByTestId('checkbox');
    expect(checkboxes.length).toBe(3);

    await userEvent.click(checkboxes[0]);

    // Check Redux store
    const state = store.getState();
    expect(state.items.items).toHaveLength(1);
    expect(state.items.items[0].title).toBe('Item 1');
    expect(state.items.totalQuantity).toBe(1);

    // Check localStorage
    const localItems = JSON.parse(localStorage.getItem('items') || '[]');
    expect(localItems).toHaveLength(1);
    expect(localItems[0].title).toBe('Item 1');
  });

  it('should remove item in redux state and in local storage on unchecking the checkbox', async () => {
    mockFetchSuccess(sampleData);

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Results
            searchTerm="item"
            tirggerError={false}
            setError={setErrorMock}
          />
        </Provider>
      </MemoryRouter>
    );

    const checkboxes = await screen.findAllByTestId('checkbox');
    expect(checkboxes.length).toBe(3);

    await userEvent.click(checkboxes[0]);

    // Check Redux store
    const state = store.getState();
    expect(state.items.items).toHaveLength(0);
    expect(state.items.totalQuantity).toBe(0);

    // Check localStorage
    const localItems = JSON.parse(localStorage.getItem('items') || '[]');
    expect(localItems).toHaveLength(0);
  });
});
