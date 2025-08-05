import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import AboutPage from './About';

describe('AboutPage', () => {
  afterEach(() => {
    cleanup();
  });
  it('renders profile image', () => {
    render(<AboutPage />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', '/dd.jpg');
  });

  it('renders heading with name and role', () => {
    render(<AboutPage />);
    expect(screen.getByText(/Hey, I'm David. -/i)).toBeInTheDocument();
    expect(screen.getByText(/A React Developer/i)).toBeInTheDocument();
  });

  it('renders GitHub link with correct href', () => {
    render(<AboutPage />);
    const githubLink = screen.getByRole('link', { name: /My github: Dtarkh/i });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/DTarkh');
  });

  it('renders RS School course link', () => {
    render(<AboutPage />);
    const rsLink = screen.getByRole('link', { name: /RS React Course/i });
    expect(rsLink).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
  });
});
