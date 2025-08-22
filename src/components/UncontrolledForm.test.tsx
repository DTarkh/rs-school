import { render, screen } from '@testing-library/react';
import { it, expect, describe } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { Provider } from 'react-redux';
import { store } from '../store';
import UncontrolledForm from './UncontrolledForm';

describe('Uncontrolled form', () => {
  it('should render all required fields', () => {
    render(
      <Provider store={store}>
        <UncontrolledForm setOpen={() => {}} />
      </Provider>
    );

    const nameInput = screen.getByLabelText(/name/i);

    expect(nameInput).toBeInTheDocument();
  });
});
