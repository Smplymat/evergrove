import React, { useState } from "react";
import { IonContent, IonIcon, IonPage } from "@ionic/react";
import { mailOutline, lockClosedOutline, logoFacebook, logoGoogle } from "ionicons/icons";
import { Link, useHistory } from "react-router-dom";
import { signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import "./SignInPage.css";

const SignInPage: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      history.push("/");
    } catch (err: any) {
      console.error('Google sign in error:', err); // Debug logging
      if (err.code === "auth/configuration-not-found") {
        setError("Google authentication is not enabled in Firebase. Please enable it in Firebase Console under Authentication > Sign-in method.");
      } else if (err.code === 'auth/invalid-credential') {
        setError('Google sign-in failed. Please try again or use a different sign-in method.');
      } else if (err.code === 'auth/popup-closed-by-user') {
        setError('Sign-in was cancelled. Please try again.');
      } else {
        setError(err.message || "Google sign in failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      const provider = new FacebookAuthProvider();
      await signInWithPopup(auth, provider);
      history.push("/");
    } catch (err: any) {
      console.error('Facebook sign in error:', err); // Debug logging
      if (err.code === "auth/configuration-not-found") {
        setError("Facebook authentication is not enabled in Firebase. Please enable it in Firebase Console under Authentication > Sign-in method.");
      } else if (err.code === 'auth/invalid-credential') {
        setError('Facebook sign-in failed. Please try again or use a different sign-in method.');
      } else if (err.code === 'auth/popup-closed-by-user') {
        setError('Sign-in was cancelled. Please try again.');
      } else {
        setError(err.message || "Facebook sign in failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) { setError("Please enter your email address."); return; }
    if (!password.trim()) { setError("Please enter your password."); return; }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      history.push("/");
    } catch (err: any) {
      console.error('Sign in error:', err); // Debug logging
      if (err.code === 'auth/invalid-credential') {
        setError('Invalid email or password. Please check your credentials and try again.');
      } else if (err.code === 'auth/user-not-found') {
        setError('No account found with this email address.');
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please try again later.');
      } else if (err.code === 'auth/user-disabled') {
        setError('This account has been disabled. Please contact support.');
      } else {
        setError(err.message || 'Sign in failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent className="signin-content" fullscreen scrollY={false}>
        <div className="sign-in">
          {/* ── Navbar header ── */}
          <header className="signin-header">
            <div className="signin-logo">
              <div className="signin-logo-name">EverGrove</div>
              <div className="signin-logo-sub">CAFE AND CO-WORKING SPACE</div>
            </div>
            <nav className="signin-nav-links">
              <Link to="/">Home</Link>
              <Link to="/menu">Menu</Link>
              <Link to="/spaces">Spaces</Link>
              <Link to="/pricing">Pricing</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/signin" className="signin-nav-btn">Sign In</Link>
            </nav>
          </header>

          {/* ── Main body ── */}
          <main className="signin-body">
            <h1 className="signin-heading">WELCOME!</h1>
            
            <div className="signin-card">
              {error && <div className="signin-error" role="alert">{error}</div>}

              {/* Email input */}
              <div className="signin-input-row">
                <IonIcon icon={mailOutline} />
                <label htmlFor="signin-email" className="sr-only">Email</label>
                <input
                  type="email"
                  id="signin-email"
                  placeholder="Email or Username"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password input */}
              <div className="signin-input-row">
                <IonIcon icon={lockClosedOutline} />
                <label htmlFor="signin-password" className="sr-only">Password</label>
                <input
                  type="password"
                  id="signin-password"
                  placeholder="Password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Log In button */}
              <button
                className="signin-submit-btn"
                type="button"
                disabled={loading}
                onClick={handleSignIn as any}
              >
                {loading ? "Signing In..." : "Log In"}
              </button>

              {/* Divider */}
              <div className="signin-divider">
                <div className="signin-divider-line"></div>
                <div className="signin-divider-text">Log In with</div>
                <div className="signin-divider-line"></div>
              </div>

              {/* Social buttons */}
              <div className="signin-social-row">
                <button
                  className="signin-social-btn facebook"
                  aria-label="Log in with Facebook"
                  onClick={handleFacebookSignIn}
                  disabled={loading}
                >
                  <IonIcon icon={logoFacebook} />
                </button>
                <button
                  className="signin-social-btn google"
                  aria-label="Log in with Google"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                >
                  <IonIcon icon={logoGoogle} />
                </button>
              </div>

              {/* Register link */}
              <div className="signin-register-row">
                {"Don't have an account? "}
                <Link to="/signup">Register</Link>
              </div>
            </div>
          </main>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignInPage;