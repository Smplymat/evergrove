import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import './firebase';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
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
// NEW: PaymentMethodPage import - payment method selection for reservations
import PaymentMethodPage from './pages/PaymentMethodPage';
// NEW: MenuPage import — added to register the /menu route below
import MenuPage from './pages/MenuPage';
// NEW: AdminPage import — admin dashboard for space management
import AdminPage from './pages/AdminPage';
// NEW: AdminAccountsPage import - admin accounts management page
import AdminAccountsPage from './pages/AdminAccountsPage';
// NEW: AdminMenuPage import — admin menu item management page
import AdminMenuPage from './pages/AdminMenuPage';
// NEW: AdminReservation import — admin reservations management page
import AdminReservation from './pages/AdminReservation';
// TEMP: AdminSetupPage import - temporary setup page for creating admin account
import AdminSetupPage from './pages/AdminSetupPage';
import { useAuth } from './AuthContext';
import { DataProvider } from './DataContext';

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

const App: React.FC = () => {
  const { currentUser, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: '100vh', background: '#000', color: '#fff', fontSize: '18px'
      }}>
        Loading...
      </div>
    );
  }

  // Admin users get their own router with all admin routes
  if (isAdmin && currentUser) {
    return (
      <IonApp>
        <DataProvider>
          <IonReactRouter basename="/evergrove">
            <IonRouterOutlet id="main">
              <Route path="/admin" exact={true} component={AdminPage} />
              <Route path="/admin-accounts" exact={true} component={AdminAccountsPage} />
              <Route path="/admin-menu" exact={true} component={AdminMenuPage} />
              <Route path="/admin-reservations" exact={true} component={AdminReservation} />
              <Route path="/admin-setup" exact={true} component={AdminSetupPage} />
              <Redirect to="/admin" />
            </IonRouterOutlet>
          </IonReactRouter>
        </DataProvider>
      </IonApp>
    );
  }

  return (
    <IonApp>
      <DataProvider>
        <IonReactRouter basename="/evergrove">
          <IonRouterOutlet id="main">
            <Route path="/" exact={true} component={HomePage} />
            <Route path="/spaces" exact={true} component={SpacesPage} />
            <Route path="/pricing" exact={true} component={PricingPage} />
            <Route path="/contact" exact={true} component={ContactPage} />
            <Route path="/message" exact={true}>
              {currentUser ? <MessagePage /> : <Redirect to="/signin" />}
            </Route>
            <Route path="/reserve" exact={true}>
              {currentUser ? <ReservePage /> : <Redirect to="/signin" />}
            </Route>
            <Route path="/profile" exact={true}>
              {currentUser ? <ProfilePage /> : <Redirect to="/signin" />}
            </Route>
            <Route path="/folder/:name" exact={true}>
              {currentUser ? <Page /> : <Redirect to="/signin" />}
            </Route>
            {/* NEW: /menu route — public page, no auth guard, mirrors /spaces and /pricing */}
            <Route path="/menu" exact={true} component={MenuPage} />
            <Route path="/signin" exact={true}>
              {!currentUser ? <SignInPage /> : <Redirect to="/" />}
            </Route>
            <Route path="/signup" exact={true}>
              {!currentUser ? <SignUpPage /> : <Redirect to="/" />}
            </Route>
            {/* NEW: /payment-method route - requires authentication for reservation flow */}
            <Route path="/payment-method" exact={true}>
              {currentUser ? <PaymentMethodPage /> : <Redirect to="/signin" />}
            </Route>
            {/* NEW: /admin route - requires admin authentication for admin dashboard */}
            <Route path="/admin" exact={true}>
              {isAdmin && currentUser ? <AdminPage /> : <Redirect to="/signin" />}
            </Route>
            {/* NEW: /admin-accounts route - requires admin authentication for admin accounts management */}
            <Route path="/admin-accounts" exact={true}>
              {isAdmin && currentUser ? <AdminAccountsPage /> : <Redirect to="/signin" />}
            </Route>
            {/* NEW: /admin-menu route - requires admin authentication for menu management */}
            <Route path="/admin-menu" exact={true}>
              {isAdmin && currentUser ? <AdminMenuPage /> : <Redirect to="/signin" />}
            </Route>
            {/* TEMP: /admin-setup route - temporary setup page for creating admin account */}
            <Route path="/admin-setup" exact={true} component={AdminSetupPage} />
          </IonRouterOutlet>
      </IonReactRouter>
      </DataProvider>
    </IonApp>
  );
};

export default App;
