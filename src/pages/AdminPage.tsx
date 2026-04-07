import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../AuthContext';
import { useData, Space } from '../DataContext';
import './AdminPage.css';

const AdminPage: React.FC = () => {
  const history = useHistory();
  const { currentUser, isAdmin } = useAuth();
  const { spaces, updateSpace, addSpace } = useData();
  const [selected, setSelected] = useState<Space>(spaces[0]);
  const [editSlots, setEditSlots] = useState(spaces[0].availableSlots);
  const [editSubtitle, setEditSubtitle] = useState(spaces[0].subtitle);
  const [saveMsg, setSaveMsg] = useState('');

  if (!currentUser || !isAdmin) { history.replace('/signin'); return null; }

  const handleSelect = (space: Space) => { 
    setSelected(space); 
    setEditSlots(space.availableSlots); 
    setEditSubtitle(space.subtitle); 
    setSaveMsg(''); 
  };
  
  const handleSave = () => { 
    updateSpace(selected.id, { subtitle: editSubtitle, availableSlots: editSlots });
    setSelected({ ...selected, subtitle: editSubtitle, availableSlots: editSlots }); 
    setSaveMsg('Saved!'); 
    setTimeout(() => setSaveMsg(''), 2000); 
  };
  
  const handleAddNew = () => { 
    const newSpace = { 
      name: 'NEW SPACE', 
      subtitle: 'Enter subtitle', 
      description: 'Enter description.', 
      capacity: '0 guests', 
      includes: [], 
      rates: [], 
      availableSlots: 0 
    }; 
    addSpace(newSpace); 
    const addedSpace = { ...newSpace, id: `space-${Date.now()}` };
    handleSelect(addedSpace); 
  };
  
  const handleSignOut = async () => { 
    await signOut(auth); 
    history.replace('/signin'); 
  };

  return (
    <IonPage>
      <IonContent className="admin-content" fullscreen>
        <div className="admin-bg">
          <div className="admin-header">
            <button className="admin-header-edit" aria-label="Edit header">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              <div className="admin-header-edit-line" />
            </button>
            <div className="admin-logo">
              <div className="admin-logo-name">EverGrove</div>
              <div className="admin-logo-sub">CAFE AND CO-WORKING SPACE</div>
            </div>
            <div className="admin-search-bar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input className="admin-search-input" placeholder="Search spaces..." aria-label="Search spaces" />
            </div>
            <button className="admin-signout" onClick={handleSignOut} aria-label="Sign out">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              <span className="admin-signout-label">Sign Out</span>
            </button>
          </div>
          <nav className="admin-navbar-bar" aria-label="Admin navigation">
            <div className="admin-navbar-links">
              <button className="admin-nav-item admin-nav-item--active">Spaces</button>
              <button className="admin-nav-item" onClick={() => history.push('/admin-menu')}>Menu</button>
              <button className="admin-nav-item" onClick={() => history.push('/admin-accounts')}>Accounts</button>
              <button className="admin-nav-item" onClick={() => history.push('/admin-reservations')}>Reservations</button>
            </div>
            <button className="admin-navbar-user" aria-label="User profile">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </button>
          </nav>
          <div className="admin-main-content">
            <aside className="admin-spaces-sidebar" aria-label="Spaces list">
              <ul className="admin-spaces-list" role="listbox">
                {spaces.map(space => (
                  <li key={space.id} role="option" aria-selected={selected.id === space.id} className={`admin-space-item${selected.id === space.id ? ' admin-space-item--active' : ''}`} onClick={() => handleSelect(space)}>{space.name}</li>
                ))}
              </ul>
              <button className="admin-add-new" onClick={handleAddNew}>Add New</button>
            </aside>
            <section className="admin-space-details" aria-label="Space detail">
              <button className="admin-detail-edit" aria-label="Edit space">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                <div className="admin-detail-edit-line" />
              </button>
              <div className="admin-detail-img" aria-hidden="true">
                <svg viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="10" y="5" width="80" height="100" rx="6" ry="6" stroke="white" strokeWidth="4" fill="none"/>
                  <polyline points="70,5 90,25 70,25" stroke="white" strokeWidth="4" fill="none"/>
                  <polyline points="22,85 42,58 55,72 65,60 78,85" stroke="white" strokeWidth="3.5" fill="none" strokeLinejoin="round"/>
                  <circle cx="35" cy="48" r="6" stroke="white" strokeWidth="3.5" fill="none"/>
                  <circle cx="88" cy="100" r="18" fill="rgba(65,70,29,0.6)" stroke="white" strokeWidth="3"/>
                  <line x1="88" y1="90" x2="88" y2="110" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
                  <line x1="78" y1="100" x2="98" y2="100" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
                </svg>
              </div>
              <h2 className="admin-space-title">{selected.name}</h2>
              <input className="admin-space-subtitle" value={editSubtitle} onChange={e => setEditSubtitle(e.target.value)} placeholder="Subtitle..." aria-label="Space subtitle" />
              <p className="admin-space-description">{selected.description}</p>
              <p className="admin-space-capacity">Capacity: {selected.capacity}</p>
              {selected.includes.length > 0 && (
                <div className="admin-space-includes">
                  <span className="admin-includes-label">Includes:</span>
                  <div className="admin-includes-grid">{selected.includes.map((item, i) => <span key={i} className="admin-include-item">· {item}</span>)}</div>
                </div>
              )}
              {selected.rates.length > 0 && (
                <div className="admin-space-rates">
                  <span className="admin-rates-label">Rates:</span>
                  {selected.rates.map((r, i) => <span key={i} className="admin-rate-item">· {r}</span>)}
                </div>
              )}
              <div className="admin-slots-row">
                <div className="admin-slots-group">
                  <input className="admin-slots-number" type="number" min={0} value={editSlots} onChange={e => setEditSlots(Number(e.target.value))} aria-label="Available slots" />
                  <span className="admin-slots-label">Available Slots</span>
                </div>
                <button className="admin-save-btn" onClick={handleSave}>{saveMsg || 'Save Changes'}</button>
              </div>
            </section>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AdminPage;