import { IonContent, IonPage, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import NavigationBar from '../components/NavigationBar';
import './HomePage.css';

const HomePage: React.FC = () => {
  const history = useHistory();
  const { currentUser } = useAuth();

  return (
    <IonPage>
      <IonContent fullscreen className="home-content">
        <div className="home-container">
          {/* Header */}
          <header className="home-header">
            <div className="logo-section">
              <h1 className="logo-title">EverGrove</h1>
              <p className="logo-subtitle">CAFE AND CO-WORKING SPACE</p>
            </div>
            <NavigationBar activePage="home" />
          </header>

          {/* Hero Section */}
          <div className="hero-section">
            <div className="hero-content">
              <div className="hero-text">
                <h2 className="hero-title">
                  Work<br />
                  Connect<br />
                  Recharge
                </h2>
                <p className="hero-subtitle">
                  "Find your focus to our eco-friendly co-working<br />
                  retreat nestled in nature embrace"
                </p>
                <IonButton 
                  className="cta-button" 
                  onClick={() => currentUser ? history.push('/reserve') : history.push('/signin')}
                >
                  {currentUser ? 'Reserve Your Spot Now' : 'Sign In to Reserve'}
                </IonButton>
              </div>
              <div className="hero-image">
                <div className="image-circle">
                  <div className="people-working">
                    {/* Placeholder for the image */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
