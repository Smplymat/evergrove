/**
 * App.test.tsx - Test for app functionality including admin auto-redirect
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Mock the AuthContext
jest.mock('./AuthContext', () => ({
  useAuth: () => ({
    currentUser: { uid: 'admin-user', email: 'healerbld@gmail.com' },
    loading: false,
    isAdmin: true,
  }),
}));

test('renders without crashing', () => {
  const { baseElement } = render(<App />);
  expect(baseElement).toBeDefined();
});

test('admin user is automatically redirected to admin page', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  // The admin user should be redirected to /admin
  // Since we're using Redirect, the component should render the admin page
  // We can check this by looking for admin-specific content
  expect(screen.getByText('Spaces')).toBeInTheDocument();
});

test('non-admin user can access regular pages', () => {
  // Mock non-admin user
  jest.doMock('./AuthContext', () => ({
    useAuth: () => ({
      currentUser: { uid: 'regular-user', email: 'user@example.com' },
      loading: false,
      isAdmin: false,
    }),
  }));

  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  // Non-admin should be able to access regular pages
  // This would render HomePage at root path
  expect(screen.queryByText('Spaces')).not.toBeInTheDocument();
});
