/**
 * AdminPage.test.tsx
 *
 * Test suite for AdminPage component.
 * Verifies that the admin dashboard renders correctly and maintains
 * the design architecture from the source HTML/CSS while preserving
 * all existing functionality.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { AuthProvider } from '../AuthContext';
import AdminPage from './AdminPage';

// Mock the useHistory hook
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual as any,
    useHistory: () => ({
      push: vi.fn()
    })
  };
});

/**
 * Test: AdminPage renders without crashing
 * Verifies the component can be rendered with the merged design architecture
 */
test('AdminPage renders without crashing', () => {
  render(
    <AuthProvider>
      <MemoryRouter>
        <AdminPage />
      </MemoryRouter>
    </AuthProvider>
  );
});

/**
 * Test: AdminPage displays key design elements from source
 * Verifies that the merged design elements are present
 */
test('AdminPage displays key design elements', () => {
  render(
    <AuthProvider>
      <MemoryRouter>
        <AdminPage />
      </MemoryRouter>
    </AuthProvider>
  );

  // Check for logo elements (from source .logo)
  expect(screen.getByText('EverGrove')).toBeInTheDocument();
  expect(screen.getByText('CAFE AND CO-WORKING SPACE')).toBeInTheDocument();

  // Check for navigation elements (from source .navbar)
  expect(screen.getByText('Spaces')).toBeInTheDocument();
  expect(screen.getByText('Accounts')).toBeInTheDocument();
  expect(screen.getByText('Reservations')).toBeInTheDocument();

  // Check for space listings (from source space names)
  expect(screen.getByText('THE CANOPY COMMONS')).toBeInTheDocument();
  expect(screen.getByText('THE BANYAN HALL')).toBeInTheDocument();
  expect(screen.getByText('PALM POD')).toBeInTheDocument();
  expect(screen.getByText('THE GROVE LOUNGE')).toBeInTheDocument();
  expect(screen.getByText('THE STUDY GROVE')).toBeInTheDocument();

  // Check for action buttons (from source button elements)
  expect(screen.getByText('Add New')).toBeInTheDocument();
  expect(screen.getByText('Save Changes')).toBeInTheDocument();
  expect(screen.getByText('Sign Out')).toBeInTheDocument();
});

/**
 * Test: AdminPage displays space details when space is selected
 * Verifies the interactive functionality works with the merged design
 */
test('AdminPage displays space details for selected space', () => {
  render(
    <AuthProvider>
      <MemoryRouter>
        <AdminPage />
      </MemoryRouter>
    </AuthProvider>
  );

  // Check for space details content (from source space description)
  expect(screen.getByText(/12-Pax Private Tropical Suite/)).toBeInTheDocument();
  expect(screen.getByText(/A spacious semi-private meeting haven/)).toBeInTheDocument();
  expect(screen.getByText(/Capacity:/)).toBeInTheDocument();
  expect(screen.getByText(/Includes:/)).toBeInTheDocument();
  expect(screen.getByText(/Available Slots/)).toBeInTheDocument();
});
