import { IonContent, IonPage, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
  const history = useHistory();

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
            <nav className="nav-menu">
              <a href="/" className="nav-link active">Home</a>
              <a href="/spaces" className="nav-link">Spaces</a>
              <a href="/pricing" className="nav-link">Pricing</a>
              <a href="#contact" className="nav-link">Contact</a>
              <a href="#reserve" className="nav-link reserve-link">Reserve Now</a>
            </nav>
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
                  onClick={() => history.push('/signin')}
                >
                  Reserve Your Spot Now
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
