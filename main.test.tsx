import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import App from './src/App'; // Adjust the import path as necessary

describe('Example Test Suite', () => {
  it('should pass a basic test', () => {
    expect(true).toBe(true);
  });

  it('should render App without crashing', () => {
    render(<App />);
  });
});
