/**
 * AdminAccountsPage.test.tsx
 *
 * DESIGN MERGE: Test architecture adopted from existing project patterns
 * while incorporating new admin accounts functionality.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminAccountsPage from './AdminAccountsPage';

// Mock the AuthContext
jest.mock('../AuthContext', () => ({
  useAuth: () => ({
    currentUser: { uid: 'test-user', email: 'healerbld@gmail.com' },
    loading: false,
    isAdmin: true,
  }),
}));

// Mock the useHistory
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

// Mock NavigationBar
jest.mock('../components/NavigationBar', () => {
  return function MockNavigationBar() {
    return <div data-testid="navigation-bar">Navigation</div>;
  };
});

describe('AdminAccountsPage', () => {
  test('renders admin accounts page with correct structure', () => {
    render(
      <MemoryRouter>
        <AdminAccountsPage />
      </MemoryRouter>
    );

    // Check if the main elements are present
    expect(screen.getByText('EverGrove')).toBeInTheDocument();
    expect(screen.getByText('CAFE AND CO-WORKING SPACE')).toBeInTheDocument();
    expect(screen.getByText('Accounts')).toBeInTheDocument();
    expect(screen.getByText('Spaces')).toBeInTheDocument();
    expect(screen.getByText('Reservations')).toBeInTheDocument();
  });

  test('non-admin users are redirected to signin', () => {
    // Mock non-admin user
    jest.doMock('../AuthContext', () => ({
      useAuth: () => ({
        currentUser: { uid: 'test-user', email: 'user@example.com' },
        loading: false,
        isAdmin: false,
      }),
    }));

    render(
      <MemoryRouter>
        <AdminAccountsPage />
      </MemoryRouter>
    );

    // Should redirect to signin - page should not render admin content
    expect(screen.queryByText('EverGrove')).not.toBeInTheDocument();
  });

  test('displays user list correctly', () => {
    render(
      <MemoryRouter>
        <AdminAccountsPage />
      </MemoryRouter>
    );

    // Check if user names are displayed
    expect(screen.getByText('Tim Ba Dela Cruz')).toBeInTheDocument();
    expect(screen.getByText('Nieves Solanna Riego')).toBeInTheDocument();
    expect(screen.getByText('Riguel Jameson Alleje')).toBeInTheDocument();
  });

  test('displays selected user details', () => {
    render(
      <MemoryRouter>
        <AdminAccountsPage />
      </MemoryRouter>
    );

    // Check if selected user details are displayed
    expect(screen.getByText('Tim Ba Dela Cruz')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByText('delacruztimba@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('63+ 955 456 8080')).toBeInTheDocument();
  });

  test('search functionality filters users correctly', async () => {
    render(
      <MemoryRouter>
        <AdminAccountsPage />
      </MemoryRouter>
    );

    // Get search input
    const searchInput = screen.getByPlaceholderText('Search users...');
    
    // Type search query
    fireEvent.change(searchInput, { target: { value: 'Nieves' } });

    // Wait for filtering to take effect
    await waitFor(() => {
      expect(screen.getByText('Nieves Solanna Riego')).toBeInTheDocument();
    });

    // Check that other users are not displayed
    expect(screen.queryByText('Tim Ba Dela Cruz')).not.toBeInTheDocument();
    expect(screen.queryByText('Riguel Jameson Alleje')).not.toBeInTheDocument();
  });

  test('user selection updates details view', async () => {
    render(
      <MemoryRouter>
        <AdminAccountsPage />
      </MemoryRouter>
    );

    // Click on a different user
    const nievesUser = screen.getByText('Nieves Solanna Riego');
    fireEvent.click(nievesUser);

    // Wait for selection to update
    await waitFor(() => {
      expect(screen.getByText('Store Manager')).toBeInTheDocument();
      expect(screen.getByText('nieves.riego@example.com')).toBeInTheDocument();
    });
  });

  test('save changes button is present', () => {
    render(
      <MemoryRouter>
        <AdminAccountsPage />
      </MemoryRouter>
    );

    // Check if save changes button is present
    expect(screen.getByText('Save Changes')).toBeInTheDocument();
  });

  test('sign out button is present', () => {
    render(
      <MemoryRouter>
        <AdminAccountsPage />
      </MemoryRouter>
    );

    // Check if sign out button is present
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
  });
});
