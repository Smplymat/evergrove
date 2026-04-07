import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import HomePage from './pages/HomePage';
import SpacesPage from './pages/SpacesPage';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';
import MessagePage from './pages/MessagePage';
import ReservePage from './pages/ReservePage';
import ProfilePage from './pages/ProfilePage';
import Page from './pages/Page';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import './index.css';

setupIonicReact();

const AppContent: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname.substring(1) || 'home';
  const hideNavbar = currentPath === 'signin' || currentPath === 'signup';

  const navigate = (page: string) => {
    window.location.href = `/${page === 'home' ? '' : page}`;
  };

  return (
    <>
      {!hideNavbar && <Navbar currentPage={currentPath} onNavigate={navigate} />}
      <IonRouterOutlet id="main">
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
        <Route path="/spaces" exact={true}>
          <SpacesPage />
        </Route>
        <Route path="/pricing" exact={true}>
          <PricingPage />
        </Route>
        <Route path="/contact" exact={true}>
          <ContactPage />
        </Route>
        <Route path="/message" exact={true}>
          <MessagePage />
        </Route>
        <Route path="/reserve" exact={true}>
          <ReservePage />
        </Route>
        <Route path="/profile" exact={true}>
          <ProfilePage />
        </Route>
        <Route path="/folder/:name" exact={true}>
          <Page />
        </Route>
        <Route path="/signin" exact={true}>
          <SignInPage />
        </Route>
        <Route path="/signup" exact={true}>
          <SignUpPage />
        </Route>
      </IonRouterOutlet>
    </>
  );
};

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <AppContent />
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
