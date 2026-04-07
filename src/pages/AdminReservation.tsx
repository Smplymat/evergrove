/**
 * AdminReservation.tsx
 *
 * Enhanced with modern design architecture from AdminMenuPage.css source.
 * Design patterns incorporated:
 *   - Responsive clamp() functions for fluid typography and spacing
 *   - Modern glassmorphism effects with backdrop-filter and consistent shadows
 *   - Flexible flexbox layouts replacing rigid absolute positioning
 *   - Mobile-first responsive design with proper breakpoints
 *   - Component-based structure with semantic naming conventions
 *   - Consistent color palette and opacity transitions
 *   - Preserved all existing functionality and Ionic/React patterns
 */

import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../AuthContext';
import { useData, Reservation } from '../DataContext';
import './AdminReservation.css';

/** Navigation items - matching source design pattern with Reservations highlighted */
const navItems = [
  { label: "Spaces", ml: "" },
  { label: "Menu", ml: "ml-40" },
  { label: "Accounts", ml: "ml-[142px]" },
  { label: "Reservations", ml: "ml-[145px]" },
];

const AdminReservation: React.FC = () => {
  const history = useHistory();
  const { currentUser, isAdmin } = useAuth();
  const { reservations, updateReservation } = useData();
  const [selectedReservation, setSelectedReservation] = useState(reservations.find(r => r.selected) || reservations[0]);
  const [searchQuery, setSearchQuery] = useState('');

  if (!currentUser || !isAdmin) {
    history.replace('/signin');
    return null;
  }

  /** Handle reservation selection - preserving existing functionality */
  const handleReservationSelect = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    // Update selection state in the list
    reservations.forEach(r => {
      if (r.id === reservation.id) {
        updateReservation(r.id, { selected: true });
      } else {
        updateReservation(r.id, { selected: false });
      }
    });
  };

  /** Handle search functionality - preserving existing behavior */
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Filter logic would go here
  };

  /** Handle sign out - uses Firebase signOut matching other admin pages */
  const handleSignOut = async () => {
    await signOut(auth);
    history.replace('/signin');
  };

  return (
    <IonPage>
      <IonContent className="admin-reservation-content">
        <div className="admin-reservation-bg">
          {/* Header area with logo - matching source design pattern */}
          <div className="admin-header">
            <div className="admin-logo">
              <div className="admin-logo-name">EverGrove</div>
              <div className="admin-logo-sub">CAFE AND CO-WORKING SPACE</div>
            </div>
            
            {/* Sign Out button - matching source positioning */}
            <button className="admin-signout" onClick={handleSignOut}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5-5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
              </svg>
              <span className="sign-out-text">Sign Out</span>
            </button>
          </div>

          {/* Navigation bar - enhanced with glassmorphism from source design */}
          <div className="admin-navbar-bar">
            <div className="admin-nav-menu">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  className={`admin-nav-item ${item.label === "Reservations" ? "admin-nav-item--active" : ""}`}
                  onClick={() => {
                    if (item.label === 'Spaces') history.push('/admin');
                    else if (item.label === 'Menu') history.push('/admin-menu');
                    else if (item.label === 'Accounts') history.push('/admin-accounts');
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
            
            {/* User icon - matching source design */}
            <button className="admin-navbar-user">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </button>
          </div>

          {/* Main layout: sidebar + detail - matching source architecture */}
          <div className="admin-layout">
            {/* Left sidebar - reservation list */}
            <div className="admin-sidebar">
              {/* Category header - matching source design pattern */}
              <div className="admin-category-header">
                <span>RESERVATIONS</span>
              </div>
              
              {/* Search bar - matching source design */}
              <div className="admin-search-bar">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
                <input
                  type="text"
                  className="admin-search-input"
                  placeholder="Search reservations..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              
              {/* Reservation list - matching source messageList pattern */}
              <div className="admin-item-list">
                {reservations.map((reservation) => (
                  <div
                    key={reservation.id}
                    className={`admin-item-row ${reservation.selected ? "admin-item-row--active" : ""}`}
                    onClick={() => handleReservationSelect(reservation)}
                  >
                    <div className="reservation-info">
                      <div className="reservation-name">{reservation.customerName}</div>
                      <div className="reservation-details">
                        {reservation.service} · {reservation.date}
                      </div>
                    </div>
                    <div className={`reservation-status status-${reservation.status.toLowerCase()}`}>
                      {reservation.status}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Add New button - matching source design */}
              <button className="admin-add-new">
                Add New Reservation
              </button>
            </div>

            {/* Right detail panel - reservation details */}
            <div className="admin-detail">
              {/* Edit icon - matching source design pattern */}
              <button className="admin-detail-edit">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                </svg>
                <div className="admin-detail-edit-line"></div>
              </button>

              {/* Customer name - matching source design */}
              <h2 className="admin-detail-name">{selectedReservation.customerName}</h2>
              
              {/* Service details - matching source ingredients pattern */}
              <input
                type="text"
                className="admin-detail-ingredients"
                defaultValue={`${selectedReservation.service} · ${selectedReservation.date} at ${selectedReservation.time}`}
                placeholder="Service details..."
              />
              
              {/* Stock group - adapted for reservation capacity */}
              <div className="admin-stock-group">
                <input
                  type="number"
                  className="admin-stock-number"
                  defaultValue="4"
                  placeholder="0"
                />
                <div className="admin-stock-label">People</div>
              </div>

              {/* Special requests - matching source description pattern */}
              <div className="admin-space-description">
                <strong>Special Requests:</strong> Customer requested window seat with power outlet access. 
                Prefers quiet area for work. Mentioned birthday celebration - may need cake arrangement.
              </div>

              {/* Contact information - matching source amenities pattern */}
              <div className="admin-space-amenities">
                <div className="amenities-title">Contact Information</div>
                <div className="amenities-grid">
                  <div className="amenity-item">· nieves.riego@email.com</div>
                  <div className="amenity-item">· +63 912 345 6789</div>
                  <div className="amenity-item">· Viber/WhatsApp</div>
                  <div className="amenity-item">· Verified Customer</div>
                </div>
              </div>

              {/* Save Changes button - matching source design */}
              <button className="admin-save-btn">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AdminReservation;
