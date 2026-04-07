import React, { useEffect, useRef, useState } from 'react';
import { IonContent, IonPage, IonIcon } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { useAuth } from '../AuthContext';
import {
  arrowBack, personOutline, cardOutline, helpCircleOutline,
  notificationsOutline, starOutline, logOutOutline,
  chevronForwardOutline, createOutline, calendarOutline, chatbubbleOutline,
  pencilOutline, imageOutline, notificationsOffOutline,
} from 'ionicons/icons';
import './ProfilePage.css';

type View = 'main' | 'personalInfo' | 'faq' | 'reviews' | 'notifications' | 'notifSetup';

interface UserData {
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
  bio?: string;
  photoURL?: string;
}

const FAQ_ITEMS = [
  {
    q: 'What is EverGrove Cafe and Co-working Space?',
    a: "It's an Eco-friendly co working space, design to let user work, connect, and recharge in a nature-inspired setting.",
  },
  {
    q: 'What are the key features of the space?',
    a: 'It emphasizes a "nature embrace" design, likely with plants and natural elements. The space offer work areas and combines cafe services with co-working amenities',
  },
  {
    q: 'Is the space suitable for all types of worker and students?',
    a: "Yes, it's likely open to students, remote employees, small team, and anyone looking for a focused, nature-friendly work environment.",
  },
  {
    q: 'How long does the reservation process take?',
    a: 'Once all the details have been fill-out processing can be completed within 5 minutes or less.',
  },
];

const REVIEWS = [
  {
    text: "EverGrove is my new go-to spot in QC! The nature-inspired design makes working here so calming, all the plants feel like a breath of fresh air from the city. I'll definitely be booking again for future events!",
    user: 'User name',
  },
  {
    text: "It's absolutely wonderful co-working space. I think the atmosphere, the view, the overall energy. I think its really nice this is one of the best space in this area.",
    user: 'User name',
  },
];

const ProfilePage: React.FC = () => {
  const history = useHistory();
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [view, setView] = useState<View>('main');
  const [editing, setEditing] = useState(false);
  const [editPhone, setEditPhone] = useState('');
  const [editBio, setEditBio] = useState('');
  const [showPicModal, setShowPicModal] = useState(false);
  const [picPreview, setPicPreview] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [notifEnabled, setNotifEnabled] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!currentUser) { history.replace('/signin'); return; }
    const fetchUser = async () => {
      const snap = await getDoc(doc(db, 'users', currentUser.uid));
      if (snap.exists()) {
        const data = snap.data() as UserData;
        setUserData(data);
        setEditPhone(data.phone || '');
        setEditBio(data.bio || '');
      } else {
        const fallback: UserData = { fullName: currentUser.displayName || 'User', email: currentUser.email || '' };
        setUserData(fallback);
      }
    };
    fetchUser();
  }, [currentUser, history]);

  const handleSignOut = async () => { await signOut(auth); history.replace('/'); };

  const handleSaveProfile = async () => {
    if (!currentUser) return;
    await updateDoc(doc(db, 'users', currentUser.uid), { phone: editPhone, bio: editBio });
    setUserData(prev => prev ? { ...prev, phone: editPhone, bio: editBio } : prev);
    setEditing(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => setPicPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSavePic = () => {
    if (picPreview) setUserData(prev => prev ? { ...prev, photoURL: picPreview } : prev);
    setShowPicModal(false);
    setPicPreview(null);
  };

  const avatarSrc = userData?.photoURL ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(userData?.fullName || 'U')}&background=4a90d9&color=fff&size=120`;

  const Logo = () => (
    <div className="prof-logo">
      <h1 className="logo-title">EverGrove</h1>
      <p className="logo-subtitle">CAFE AND CO-WORKING SPACE</p>
    </div>
  );

  const BackBtn = ({ to }: { to: View }) => (
    <button className="back-btn" onClick={() => { setEditing(false); to === 'main' ? history.goBack() : setView(to); }}>
      <IonIcon icon={arrowBack} />
    </button>
  );

  // ── MAIN VIEW ──────────────────────────────────────────────────────────────
  if (view === 'main') return (
    <IonPage>
      <IonContent fullscreen className="profile-content">
        <div className="profile-container">
          <Logo />
          <div className="profile-card">
            <div className="profile-topbar">
              <BackBtn to="main" />
              <h2 className="profile-card-title">My Profile</h2>
              <div className="profile-topbar-icons">
                <button className="icon-sq-btn" onClick={() => history.push('/reserve')}>
                  <IonIcon icon={calendarOutline} />
                </button>
                <button className="icon-sq-btn" onClick={() => history.push('/message')}>
                  <IonIcon icon={chatbubbleOutline} />
                </button>
              </div>
            </div>

            <div className="user-hero">
              <img className="user-avatar" src={avatarSrc} alt="avatar" />
              <div>
                <h3 className="user-name">{userData?.fullName || 'Loading...'}</h3>
                <p className="user-email">{userData?.email}</p>
              </div>
            </div>

            <div className="menu-grid">
              <button className="menu-item" onClick={() => setView('personalInfo')}>
                <IonIcon icon={personOutline} className="mi-icon" />
                <span>Personal Info</span>
                <IonIcon icon={chevronForwardOutline} className="mi-arrow" />
              </button>
              <button className="menu-item" onClick={() => history.push('/payment-method')}>
                <IonIcon icon={cardOutline} className="mi-icon" />
                <span>Payment Method</span>
                <IonIcon icon={chevronForwardOutline} className="mi-arrow" />
              </button>
              <button className="menu-item" onClick={() => setView('faq')}>
                <IonIcon icon={helpCircleOutline} className="mi-icon" />
                <span>FAQ</span>
                <IonIcon icon={chevronForwardOutline} className="mi-arrow" />
              </button>
              <button className="menu-item" onClick={() => setView('notifSetup')}>
                <IonIcon icon={notificationsOutline} className="mi-icon" />
                <span>Notification</span>
                <IonIcon icon={chevronForwardOutline} className="mi-arrow" />
              </button>
              <button className="menu-item" onClick={() => setView('reviews')}>
                <IonIcon icon={starOutline} className="mi-icon" />
                <span>User Review</span>
                <IonIcon icon={chevronForwardOutline} className="mi-arrow" />
              </button>
            </div>

            <div className="signout-row">
              <button className="signout-btn" onClick={handleSignOut}>
                <IonIcon icon={logOutOutline} />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );

  // ── PERSONAL INFO VIEW ─────────────────────────────────────────────────────
  if (view === 'personalInfo') return (
    <IonPage>
      <IonContent fullscreen className="profile-content">
        <div className="profile-container">
          <Logo />
          <div className="profile-card info-card">
            <div className="info-topbar">
              <BackBtn to="main" />
              <h2 className="profile-card-title">Profile</h2>
              {!editing ? (
                <button className="edit-profile-btn" onClick={() => setEditing(true)}>
                  <IonIcon icon={pencilOutline} /> Edit Profile
                </button>
              ) : (
                <button className="edit-profile-btn cancel" onClick={() => setEditing(false)}>
                  <IonIcon icon={pencilOutline} /> Cancel Editing
                </button>
              )}
            </div>

            <div className="info-body">
              <div className="info-avatar-col">
                <img className="user-avatar large" src={avatarSrc} alt="avatar" />
                <button className="edit-pic-btn" onClick={() => setShowPicModal(true)}>
                  Edit Profile Picture
                </button>
              </div>

              {!editing ? (
                <div className="info-details">
                  <h3 className="user-name">{userData?.fullName}</h3>
                  <p className="user-email">{userData?.email}</p>
                  <h4 className="info-section-title">Contact</h4>
                  <p className="info-line">📞 {userData?.phone || '—'}</p>
                  <p className="info-line">📍 {userData?.address || '—'}</p>
                  <h4 className="info-section-title">Biography</h4>
                  <p className="info-bio">{userData?.bio || 'No Biography has been added'}</p>
                </div>
              ) : (
                <div className="info-details">
                  <h3 className="user-name">
                    {userData?.fullName}
                    <IonIcon icon={pencilOutline} style={{ fontSize: '1rem', marginLeft: '0.5rem', opacity: 0.7 }} />
                  </h3>
                  <p className="user-email">{userData?.email}</p>
                  <label className="edit-label">Change Contact</label>
                  <input
                    className="edit-input"
                    value={editPhone}
                    onChange={e => setEditPhone(e.target.value)}
                    placeholder="Phone number"
                  />
                  <label className="edit-label">Biography</label>
                  <textarea
                    className="edit-textarea"
                    value={editBio}
                    onChange={e => setEditBio(e.target.value)}
                    placeholder="Write something about yourself..."
                    rows={4}
                  />
                  <div className="edit-actions">
                    <button className="edit-cancel-btn" onClick={() => setEditing(false)}>Cancel</button>
                    <button className="edit-save-btn" onClick={handleSaveProfile}>Save</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile Picture Modal */}
        {showPicModal && (
          <div className="modal-overlay">
            <div className="modal-card">
              <div className="modal-header">
                <h3>Select Profile Picture</h3>
                <button className="modal-close" onClick={() => { setShowPicModal(false); setPicPreview(null); }}>✕</button>
              </div>
              <div className="modal-divider" />
              <p className="modal-label">Picture Options</p>
              <div className="pic-upload-area" onClick={() => fileInputRef.current?.click()}>
                {picPreview ? (
                  <img src={picPreview} alt="preview" className="pic-preview" />
                ) : (
                  <IonIcon icon={imageOutline} className="pic-upload-icon" />
                )}
                <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
                <span className="pic-choose-text">Choose Picture</span>
              </div>
              <div className="modal-actions">
                <button className="edit-cancel-btn" onClick={() => { setShowPicModal(false); setPicPreview(null); }}>Cancel</button>
                <button className="edit-save-btn" onClick={handleSavePic}>Save</button>
              </div>
            </div>
          </div>
        )}
      </IonContent>
    </IonPage>
  );

  // ── FAQ VIEW ───────────────────────────────────────────────────────────────
  if (view === 'faq') return (
    <IonPage>
      <IonContent fullscreen className="profile-content">
        <div className="profile-container">
          <Logo />
          <div className="profile-card faq-card">
            <div className="faq-layout">
              <div className="faq-left">
                <BackBtn to="main" />
                <h2 className="faq-title">FAQ</h2>
                <div className="faq-contact-list">
                  <p>📍 143 Brgy. Mangga, Anonas, Quezon City, Philippines</p>
                  <p>📞 63+ 954-634-3353</p>
                  <p>💬 EverGroveManila</p>
                  <p>📷 evergrove.manila</p>
                  <p>✉️ evergrove.manila@gmail.com</p>
                </div>
                <button className="reserve-now-btn" onClick={() => history.push('/reserve')}>RESERVE NOW!</button>
              </div>
              <div className="faq-right">
                {FAQ_ITEMS.map((item, i) => (
                  <div key={i} className="faq-item">
                    <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                      <span>{item.q}</span>
                      <span className="faq-chevron">{openFaq === i ? '∧' : '∨'}</span>
                    </button>
                    {openFaq === i && <p className="faq-answer">{item.a}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );

  // ── REVIEWS VIEW ───────────────────────────────────────────────────────────
  if (view === 'reviews') return (
    <IonPage>
      <IonContent fullscreen className="profile-content">
        <div className="profile-container">
          <Logo />
          <div className="reviews-topbar">
            <BackBtn to="main" />
          </div>
          <div className="reviews-grid">
            {REVIEWS.map((r, i) => (
              <div key={i} className="review-card">
                <span className="review-quote">"</span>
                <p className="review-text">{r.text}</p>
                <img className="review-avatar" src={avatarSrc} alt="reviewer" />
                <p className="review-user">{r.user}</p>
              </div>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );

  // ── NOTIFICATION SETUP VIEW ────────────────────────────────────────────────
  if (view === 'notifSetup') return (
    <IonPage>
      <IonContent fullscreen className="profile-content">
        <div className="profile-container">
          <Logo />
          <div className="profile-card notif-setup-card">
            <BackBtn to="main" />
            <h2 className="notif-setup-title">Get Notified about important stuff</h2>
            <p className="notif-setup-sub"><em>We'll notified you when</em></p>
            <div className="notif-list-box">
              <ul className="notif-list">
                <li>You're payment is settle</li>
                <li>You make a new reservation</li>
                <li>You're reservation is approved</li>
                <li>We've got space we think you'll like</li>
              </ul>
            </div>
            <div className="notif-divider" />
            <p className="notif-adjust">You can adjust this settings later.</p>
            <div className="notif-setup-actions">
              <button className="notif-later-btn" onClick={() => setView('notifications')}>Later</button>
              <button className="notif-get-btn" onClick={() => { setNotifEnabled(true); setView('notifications'); }}>Get Notified</button>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );

  // ── NOTIFICATIONS VIEW ─────────────────────────────────────────────────────
  return (
    <IonPage>
      <IonContent fullscreen className="profile-content">
        <div className="profile-container">
          <Logo />
          <div className="profile-card notif-card">
            <div className="profile-topbar">
              <BackBtn to="main" />
              <h2 className="profile-card-title">Notifications</h2>
              <div />
            </div>
            {!notifEnabled ? (
              <div className="notif-empty">
                <IonIcon icon={notificationsOffOutline} className="notif-empty-icon" />
                <h3 className="notif-empty-title"><em>No Notification yet</em></h3>
                <p className="notif-empty-sub">You're notifications will appear here once you've received them.</p>
              </div>
            ) : (
              <div className="notif-empty">
                <IonIcon icon={notificationsOutline} className="notif-empty-icon" />
                <h3 className="notif-empty-title"><em>You're all set!</em></h3>
                <p className="notif-empty-sub">Notifications are enabled. We'll let you know when something happens.</p>
              </div>
            )}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
