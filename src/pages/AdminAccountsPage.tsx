/**
 * AdminAccountsPage.tsx
 *
 * DESIGN MERGE: Layout architecture adopted from AdminMenuPage (source design).
 * The old TeleportHQ absolute-positioned layout has been replaced with the same
 * flexbox/responsive structure used in AdminMenuPage — header → navbar-bar → layout
 * (sidebar + detail panel). All existing React state, routing, auth-guard, and
 * business logic are fully preserved; only the JSX structure and CSS class names
 * have been updated to mirror the source design system.
 */

import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../AuthContext';
import './AdminAccountsPage.css';

// ─── Types ────────────────────────────────────────────────────────────────────

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  address: string;
}

// ─── Mock data (preserved from original) ─────────────────────────────────────

const INITIAL_USERS: User[] = [
  {
    id: '1',
    name: 'Tim Ba Dela Cruz',
    email: 'delacruztimba@gmail.com',
    role: 'Admin',
    phone: '63+ 955 456 8080',
    address: '8080 Golden Meadows Subd., Brgy. Greenbelt., Manila, Philippines',
  },
  {
    id: '2',
    name: 'Nieves Solanna Riego',
    email: 'nieves.riego@example.com',
    role: 'Store Manager',
    phone: '63+ 912 345 6789',
    address: '123 Manila Street, Quezon City, Philippines',
  },
  {
    id: '3',
    name: 'Riguel Jameson Alleje',
    email: 'riguel.alleje@example.com',
    role: 'Staff',
    phone: '63+ 923 456 7890',
    address: '456 Makati Avenue, Makati City, Philippines',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

const AdminAccountsPage: React.FC = () => {
  const history = useHistory();
  const { currentUser, isAdmin } = useAuth();

  // Preserved state — same inputs/outputs as original
  const [users] = useState<User[]>(INITIAL_USERS);
  const [selectedUser, setSelectedUser] = useState<User>(INITIAL_USERS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editRole, setEditRole] = useState(INITIAL_USERS[0].role);
  const [saveMsg, setSaveMsg] = useState('');

  // Auth guard — preserved from original
  if (!currentUser || !isAdmin) {
    history.replace('/signin');
    return null;
  }

  // Filter users — same logic as original
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Select user — preserved from original
  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setEditRole(user.role);
    setSaveMsg('');
  };

  // Save changes — preserved from original
  const handleSaveChanges = () => {
    console.log('Changes saved for:', selectedUser.name);
    setSaveMsg('Saved!');
    setTimeout(() => setSaveMsg(''), 2000);
  };

  // Sign out — updated to use Firebase signOut, matching AdminMenuPage pattern
  const handleSignOut = async () => {
    await signOut(auth);
    history.replace('/signin');
  };

  return (
    <IonPage>
      {/*
       * DESIGN MERGE: IonContent uses transparent background so the full-page
       * .aacct-bg div fills the viewport — mirrors .admin-menu-content pattern.
       */}
      <IonContent className="admin-accounts-content" fullscreen>
        <div className="aacct-bg">

          {/* ── Header: logo + search + sign out ──────────────────────────────
           * DESIGN MERGE: Replaced absolute-positioned logo/sign-out divs with
           * the .amenu-header flex column pattern from AdminMenuPage. The edit
           * icon, logo, search bar, and sign-out button all follow the same
           * structure and class-naming convention (aacct- prefix instead of amenu-).
           */}
          <div className="aacct-header">

            {/* Edit icon — top-left, mirrors .amenu-header-edit */}
            <button className="aacct-header-edit" aria-label="Edit header">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                   strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              <div className="aacct-header-edit-line" />
            </button>

            {/* Logo — mirrors .amenu-logo */}
            <div className="aacct-logo">
              <div className="aacct-logo-name">EverGrove</div>
              <div className="aacct-logo-sub">CAFE AND CO-WORKING SPACE</div>
            </div>

            {/* Search bar — mirrors .amenu-search-bar; wired to existing searchQuery state */}
            <div className="aacct-search-bar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                className="aacct-search-input"
                placeholder="Search accounts..."
                aria-label="Search accounts"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Sign Out — mirrors .amenu-signout; uses Firebase signOut like AdminMenuPage */}
            <button className="aacct-signout" onClick={handleSignOut} aria-label="Sign out">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                   strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              <span className="aacct-signout-label">Sign Out</span>
            </button>
          </div>

          {/* ── Navbar bar ────────────────────────────────────────────────────
           * DESIGN MERGE: Replaced the old absolute-positioned .admin-accounts-navbar
           * with the glassmorphism flex bar from AdminMenuPage (.amenu-navbar-bar).
           * "Accounts" is marked active; navigation targets preserved from original.
           */}
          <nav className="aacct-navbar-bar" aria-label="Admin navigation">
            <div className="aacct-navbar-links">
              <button className="aacct-nav-item" onClick={() => history.push('/admin')}>
                Spaces
              </button>
              <button className="aacct-nav-item" onClick={() => history.push('/admin-menu')}>
                Menu
              </button>
              {/* "Accounts" is the active page — mirrors .amenu-nav-item--active */}
              <button className="aacct-nav-item aacct-nav-item--active">
                Accounts
              </button>
              <button className="aacct-nav-item" onClick={() => history.push('/admin-reservations')}>
                Reservations
              </button>            </div>
            {/* User icon — mirrors .amenu-navbar-user */}
            <button className="aacct-navbar-user" aria-label="User profile">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                   strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </button>
          </nav>

          {/* ── Main layout: sidebar + detail ─────────────────────────────────
           * DESIGN MERGE: Replaced the absolute-positioned .admin-accounts-main-content
           * with the .amenu-layout flex container pattern. The sidebar and detail panel
           * now use the same flex-based responsive layout as AdminMenuPage.
           */}
          <div className="aacct-layout">

            {/* ── Left sidebar: user list ──────────────────────────────────────
             * DESIGN MERGE: Mirrors .amenu-sidebar — glassmorphism background,
             * a sticky header row (.aacct-user-header), scrollable list, and an
             * "Add New" button pinned to the bottom. Existing filteredUsers logic preserved.
             */}
            <aside className="aacct-sidebar" aria-label="User accounts">
              {/* Header row — mirrors .amenu-category-header */}
              <div className="aacct-user-header">
                <span>ACCOUNTS</span>
              </div>

              {/* User list — mirrors .amenu-item-list / .amenu-item-row */}
              <ul className="aacct-user-list" role="listbox" aria-label="User list">
                {filteredUsers.map(user => (
                  <li
                    key={user.id}
                    role="option"
                    aria-selected={selectedUser.id === user.id}
                    className={`aacct-user-row${selectedUser.id === user.id ? ' aacct-user-row--active' : ''}`}
                    onClick={() => handleSelectUser(user)}
                  >
                    {user.name}
                  </li>
                ))}
              </ul>

              {/* Add New — mirrors .amenu-add-new */}
              <button className="aacct-add-new">Add New</button>
            </aside>

            {/* ── Right detail panel ──────────────────────────────────────────
             * DESIGN MERGE: Mirrors .amenu-detail — flex column, centered content,
             * edit icon top-right, avatar placeholder, editable fields, save button.
             * All existing selectedUser data bindings are preserved.
             */}
            <section className="aacct-detail" aria-label="Account detail">

              {/* Edit icon — mirrors .amenu-detail-edit */}
              <button className="aacct-detail-edit" aria-label="Edit account">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                     strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
                <div className="aacct-detail-edit-line" />
              </button>

              {/* Avatar placeholder — mirrors .amenu-detail-img using an SVG person icon */}
              <div className="aacct-detail-avatar" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                     strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>

              {/* User name — mirrors .amenu-detail-name */}
              <h2 className="aacct-detail-name">{selectedUser.name}</h2>

              {/* Role — editable inline, mirrors .amenu-detail-ingredients pattern */}
              <input
                className="aacct-detail-role"
                value={editRole}
                onChange={e => setEditRole(e.target.value)}
                placeholder="Role..."
                aria-label="User role"
              />

              {/* Contact info — preserved from original, styled as detail rows */}
              <div className="aacct-contact-group">
                <a
                  className="aacct-contact-item"
                  href={`mailto:${selectedUser.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {selectedUser.email}
                </a>
                <span className="aacct-contact-item">{selectedUser.phone}</span>
                <span className="aacct-contact-item">{selectedUser.address}</span>
              </div>

              {/* Save Changes — mirrors .amenu-save-btn */}
              <button className="aacct-save-btn" onClick={handleSaveChanges}>
                {saveMsg || 'Save Changes'}
              </button>
            </section>

          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AdminAccountsPage;
