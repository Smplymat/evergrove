import { IonContent, IonPage, IonButton } from '@ionic/react';
import { useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import { useData } from '../DataContext';
import './SpacesPage.css';

/**
 * SpacesPage - Enhanced with source design architecture integration
 * 
 * Design elements integrated from source:
 * - Font families: Kavoon-Regular, Figtree variants, Sacramento-Regular, Edu QLD Beginner-Regular
 * - Color scheme: Earth tones (#f0eee4, #41461d, #e1d2a8, #ffffff)
 * - Layout structure: Frame containers with backdrop filters
 * - Button styling: Backdrop blur effects with rgba backgrounds
 * - Typography hierarchy: Specific font sizes and weights
 * 
 * Preserved functionality:
 * - Smooth scrolling to anchored sections
 * - Navigation routing
 * - Reservation button actions
 * - Responsive design
 */

const SpacesPage: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const contentRef = useRef<HTMLIonContentElement>(null);
  const { spaces } = useData();

  useEffect(() => {
    const hash = location.hash;
    if (!hash) return;

    // Wait for render + Ionic content to be ready
    setTimeout(async () => {
      const el = document.querySelector(hash) as HTMLElement;
      if (!el || !contentRef.current) return;

      const scrollEl = await contentRef.current.getScrollElement();
      const elTop = el.offsetTop;
      const elHeight = el.offsetHeight;
      const viewHeight = scrollEl.clientHeight;
      // Center the element in the viewport
      const scrollTo = elTop - (viewHeight / 2) + (elHeight / 2);
      scrollEl.scrollTo({ top: scrollTo, behavior: 'smooth' });
    }, 200);
  }, [location.hash]);

  // Helper function to find space by ID
  const getSpaceById = (id: string) => spaces.find(space => space.id === id);

  return (
    <IonPage>
      <IonContent ref={contentRef} fullscreen className="spaces-content">
        <div className="spaces-container">
          {/* Header */}
          <header className="spaces-header">
            <div className="logo-section">
              <h1 className="logo-title">EverGrove</h1>
              <p className="logo-subtitle">CAFE AND CO-WORKING SPACE</p>
            </div>
            <NavigationBar activePage="spaces" />
          </header>

          {/* Hero Section */}
          <div className="spaces-hero">
            <h2 className="spaces-hero-title">Explore Space</h2>
            <p className="spaces-hero-subtitle">SCROLL TO SEE MORE</p>
          </div>

          {/* Spaces List - Enhanced with source frame design */}
          <div className="spaces-list">
            {/* Frame container for spaces - Integrated from source design */}
            <div className="spaces-frame">
              
              {/* The Canopy Commons */}
              <div id="canopy-commons" className="space-item">
                <div className="space-image">
                  <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600" alt="The Canopy Commons" />
                </div>
                <div className="space-details">
                  {(() => {
                    const space = getSpaceById('canopy-commons');
                    if (!space) return null;
                    return (
                      <>
                        <h3 className="space-title">{space.name}</h3>
                        <p className="space-tagline">{space.subtitle}</p>
                        <p className="space-description">{space.description}</p>
                        <p className="space-capacity">Capacity: {space.capacity}</p>
                        <ul className="space-features">
                          {space.includes.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                        <IonButton className="reserve-button" onClick={() => history.push('/reserve')}>RESERVE NOW!</IonButton>
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* The Banyan Hall */}
              <div id="banyan-hall" className="space-item reverse">
                <div className="space-details">
                  {(() => {
                    const space = getSpaceById('banyan-hall');
                    if (!space) return null;
                    return (
                      <>
                        <h3 className="space-title">{space.name}</h3>
                        <p className="space-tagline">{space.subtitle}</p>
                        <p className="space-description">{space.description}</p>
                        <p className="space-capacity">Capacity: {space.capacity}</p>
                        <ul className="space-features">
                          {space.includes.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                        <IonButton className="reserve-button" onClick={() => history.push('/reserve')}>RESERVE NOW!</IonButton>
                      </>
                    );
                  })()}
                </div>
                <div className="space-image">
                  <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600" alt="The Banyan Hall" />
                </div>
              </div>

              {/* Palm Pod */}
              <div id="palm-pod" className="space-item">
                <div className="space-image">
                  <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600" alt="Palm Pod" />
                </div>
                <div className="space-details">
                  {(() => {
                    const space = getSpaceById('palm-pod');
                    if (!space) return null;
                    return (
                      <>
                        <h3 className="space-title">{space.name}</h3>
                        <p className="space-tagline">{space.subtitle}</p>
                        <p className="space-description">{space.description}</p>
                        <p className="space-capacity">Capacity: {space.capacity}</p>
                        <ul className="space-features">
                          {space.includes.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                        <IonButton className="reserve-button" onClick={() => history.push('/reserve')}>RESERVE NOW!</IonButton>
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* The Grove Lounge */}
              <div id="grove-lounge" className="space-item reverse">
                <div className="space-details">
                  {(() => {
                    const space = getSpaceById('grove-lounge');
                    if (!space) return null;
                    return (
                      <>
                        <h3 className="space-title">{space.name}</h3>
                        <p className="space-tagline">{space.subtitle}</p>
                        <p className="space-description">{space.description}</p>
                        <ul className="space-features">
                          {space.includes.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                        <IonButton className="reserve-button" onClick={() => history.push('/reserve')}>RESERVE NOW!</IonButton>
                      </>
                    );
                  })()}
                </div>
                <div className="space-image">
                  <img src="https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=600" alt="The Grove Lounge" />
                </div>
              </div>

              {/* The Study Grove */}
              <div id="study-grove" className="space-item">
                <div className="space-image">
                  <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600" alt="The Study Grove" />
                </div>
                <div className="space-details">
                  {(() => {
                    const space = getSpaceById('study-grove');
                    if (!space) return null;
                    return (
                      <>
                        <h3 className="space-title">{space.name}</h3>
                        <p className="space-tagline">{space.subtitle}</p>
                        <p className="space-description">{space.description}</p>
                        <p className="space-info">Strict Quiet Policy Enforced</p>
                        <ul className="space-features">
                          {space.includes.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                        <IonButton className="reserve-button" onClick={() => history.push('/reserve')}>RESERVE NOW!</IonButton>
                      </>
                    );
                  })()}
                </div>
              </div>

            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SpacesPage;
