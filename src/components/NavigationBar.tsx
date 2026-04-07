import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { auth } from '../firebase';
import './NavigationBar.css';

interface NavigationBarProps {
  activePage?: string;
  showAuthButtons?: boolean;
  className?: string;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ 
  activePage, 
  showAuthButtons = true, 
  className = '' 
}) => {
  const history = useHistory();
  const { currentUser } = useAuth();

  const handleSignOut = () => {
    auth.signOut();
  };

  const handleProfileClick = () => {
    history.push(currentUser ? '/profile' : '/signin');
  };

  return (
    <nav className={`nav-menu ${className}`}>
      <Link to="/" className={`nav-link ${activePage === 'home' ? 'active' : ''}`}>Home</Link>
      <Link to="/menu" className={`nav-link ${activePage === 'menu' ? 'active' : ''}`}>Menu</Link>
      <Link to="/spaces" className={`nav-link ${activePage === 'spaces' ? 'active' : ''}`}>Spaces</Link>
      <Link to="/pricing" className={`nav-link ${activePage === 'pricing' ? 'active' : ''}`}>Pricing</Link>
      <Link to="/contact" className={`nav-link ${activePage === 'contact' ? 'active' : ''}`}>Contact</Link>
      <Link to="/reserve" className={`nav-link reserve-link ${activePage === 'reserve' ? 'active' : ''}`}>Reserve Now</Link>
      
      {showAuthButtons && (
        <>
          {currentUser && (
            <>
              <Link to="/profile" className={`nav-link ${activePage === 'profile' ? 'active' : ''}`}>Profile</Link>
              <button 
                onClick={handleSignOut} 
                className="nav-link sign-out-btn"
              >
                Sign Out
              </button>
            </>
          )}
          <button className="user-icon" onClick={handleProfileClick}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="4" />
              <path d="M16 14v2a2 2 0 01-2 2H10a2 2 0 01-2-2v-2" />
            </svg>
          </button>
        </>
      )}
    </nav>
  );
};

export default NavigationBar;
