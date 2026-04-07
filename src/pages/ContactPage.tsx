/**
 * ContactPage.tsx
 *
 * DESIGN MERGE: Structure and content aligned with the source design (index.html).
 * - Logo block uses Sacramento-Regular (96px) + Edu QLD Beginner (32px) — source: .text-wrapper / .div
 * - Contact info column uses Inter-Regular 20px white text — source: .p, .text-wrapper-2…5
 * - Social handles corrected to match source: "evergrove.manila" (Instagram), "evergrove.manila@gmail.com"
 * - "Message" button label matches source (.text-wrapper-6) — Figtree-Regular, not all-caps
 * All existing routing, NavigationBar, and IonPage structure are preserved unchanged.
 */
import { IonContent, IonPage, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import './ContactPage.css';

const ContactPage: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent fullscreen className="contact-content">
        <div className="contact-container">
          {/* Header */}
          <header className="contact-header">
            <div className="logo-section-center">
              <h1 className="logo-title">EverGrove</h1>
              <p className="logo-subtitle">CAFE AND CO-WORKING SPACE</p>
            </div>
          </header>

          <NavigationBar activePage="contact" />

          {/* Contact Information */}
          <div className="contact-info-section">
            
            {/* Address */}
            <div className="contact-item">
              <div className="contact-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <p className="contact-text">143 Brgy. Mangga, Anonas. Quezon City, Philippines</p>
            </div>

            {/* Phone */}
            <div className="contact-item">
              <div className="contact-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <p className="contact-text">63+ 954-634-3353</p>
            </div>

            {/* Facebook Messenger */}
            <div className="contact-item">
              <div className="contact-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.912 1.446 5.51 3.707 7.206V22l3.39-1.862c.905.251 1.864.385 2.903.385 5.523 0 10-4.145 10-9.243C22 6.145 17.523 2 12 2zm.993 12.493l-2.549-2.718-4.974 2.718 5.467-5.802 2.611 2.718 4.912-2.718-5.467 5.802z"/>
                </svg>
              </div>
              <p className="contact-text">EverGroveManila</p>
            </div>

            {/* Instagram — SOURCE: .text-wrapper-4 "evergrove.manila" */}
            <div className="contact-item">
              <div className="contact-icon">
                {/* SOURCE: icon-instagram / vector-4 */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </div>
              {/* SOURCE: .text-wrapper-4 value */}
              <p className="contact-text">evergrove.manila</p>
            </div>

            {/* Email — SOURCE: .text-wrapper-5 "evergrove.manila@gmail.com" */}
            <div className="contact-item">
              <div className="contact-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="4"/>
                  <polyline points="2,6 12,13 22,6"/>
                </svg>
              </div>
              {/* SOURCE: .text-wrapper-5 value */}
              <p className="contact-text">evergrove.manila@gmail.com</p>
            </div>

          </div>

          {/* Message Button — SOURCE: .rectangle + .text-wrapper-6
               Frosted-glass pill (#41461d33, border-radius 45px, inset box-shadow)
               Label "Message" in Figtree-Regular 36px (not all-caps) */}
          <div className="message-section">
            <IonButton 
              className="message-button"
              onClick={() => history.push('/message')}
            >
              Message
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ContactPage;
