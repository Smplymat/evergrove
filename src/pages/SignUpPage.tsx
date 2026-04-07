/**
 * SignUpPage.tsx
 *
 * DESIGN MERGE: Layout architecture adopted from the source TeleportHQ export
 * (index.html / index.css) while preserving all existing Firebase auth logic.
 *
 * Structural changes (no functional changes):
 *  - Replaced generic glassmorphism panel with source-style full-page layout:
 *      signup-bg  →  mirrors sign-up-thq-sign-up-page-elm full-bleed wrapper
 *      signup-nav →  mirrors sign-up-thq-logo-elm + nav text elements + rectangle5 pill button
 *      signup-card → mirrors sign-up-thq-rectangle12-elm (border-radius: 45px card)
 *  - Input rows now use rounded-pill style (border-radius: 50px) matching
 *      source rectangle13/14/16/17/18/19 elements
 *  - "Create Your Account" heading matches sign-up-thq-text-elm16 (Figtree Bold 48px)
 *  - Submit button matches sign-up-thq-group93-elm (rgba white 0.65, Figtree Bold)
 *  - "Already have an account? Log In" row matches sign-up-thq-text-elm13/14
 *  - Social sign-up section matches sign-up-thq-text-elm12 "Log In with" pattern
 *  - IonButton replaced with native <button> elements to match source's plain HTML approach;
 *    IonPage/IonContent retained for Ionic routing compatibility (no breaking change)
 *  - All state, handlers, and Firebase calls are unchanged
 */

import React, { useState } from 'react';
import { IonContent, IonIcon, IonPage } from '@ionic/react';
import {
  personOutline,
  mailOutline,
  lockClosedOutline,
  logoFacebook,
  logoGoogle,
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import NavigationBar from '../components/NavigationBar';
import './SignUpPage.css';

const SignUpPage: React.FC = () => {
  const history = useHistory();

  // ── Form state (unchanged from original) ──────────────────────────────────
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // ── Google sign-up handler (unchanged) ────────────────────────────────────
  const handleGoogleSignUp = async () => {
    setError('');
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user document already exists
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      // Only create user document if it doesn't exist
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          fullName: user.displayName || 'Google User',
          email: user.email || '',
          createdAt: serverTimestamp(),
        });
      }

      history.push('/');
    } catch (err: any) {
      if (err.code === 'auth/configuration-not-found') {
        setError(
          'Google authentication is not enabled in Firebase. Please enable it in the Firebase Console under Authentication > Sign-in method.'
        );
      } else {
        setError(err.message || 'Google sign up failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // ── Facebook sign-up handler (unchanged) ──────────────────────────────────
  const handleFacebookSignUp = async () => {
    setError('');
    setLoading(true);
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user document already exists
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      // Only create user document if it doesn't exist
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          fullName: user.displayName || 'Facebook User',
          email: user.email || '',
          createdAt: serverTimestamp(),
        });
      }

      history.push('/');
    } catch (err: any) {
      if (err.code === 'auth/configuration-not-found') {
        setError(
          'Facebook authentication is not enabled in Firebase. Please enable it in the Firebase Console under Authentication > Sign-in method.'
        );
      } else {
        setError(err.message || 'Facebook sign up failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // ── Email/password sign-up handler (unchanged) ────────────────────────────
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate form fields
    if (!fullName.trim()) { setError('Please enter your full name.'); return; }
    if (!email.trim()) { setError('Please enter your email address.'); return; }
    if (!password.trim()) { setError('Please enter a password.'); return; }
    if (!confirmPassword.trim()) { setError('Please confirm your password.'); return; }
    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
    if (password.length < 6) { setError('Password should be at least 6 characters long.'); return; }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update display name in Firebase Auth
      await updateProfile(user, { displayName: fullName });

      // Save user data to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        fullName,
        email,
        createdAt: serverTimestamp(),
      });

      history.push('/');
    } catch (err: any) {
      if (err.code === 'auth/configuration-not-found') {
        setError(
          'Email/Password authentication is not enabled in Firebase. Please enable it in the Firebase Console under Authentication > Sign-in method.'
        );
      } else {
        setError(err.message || 'Sign up failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <IonPage>
      {/*
       * IonContent with transparent background so our .signup-bg fills the viewport.
       * Mirrors source .sign-up-container1 (width:100%, min-height:100vh).
       */}
      <IonContent className="signup-content" fullscreen>
        <div className="signup-bg">

          <header className="signup-header">
            <div className="signup-logo">
              <span className="signup-logo-name">EverGrove</span>
              <span className="signup-logo-sub">CAFE AND CO-WORKING SPACE</span>
            </div>
            <NavigationBar activePage="signup" showAuthButtons={false} />
          </header>

          {/* ── Main content area ── */}
          <div className="signup-body">

            {/*
             * Page heading — source: sign-up-thq-text-elm16
             * "Create Your Account", Figtree Bold 48px, text-shadow
             */}
            <h1 className="signup-heading">Create Your Account</h1>

            {/*
             * Glassmorphism card — source: sign-up-thq-rectangle12-elm
             * border-radius: 45px, semi-transparent background
             */}
            <div className="signup-card">

              {/* Error display (preserved from original target) */}
              {error && <div className="signup-error">{error}</div>}

              {/*
               * Email/password form — inputs mirror source rectangle16-19 pill fields
               * with icon + placeholder text matching sign-up-thq-text-elm17-22
               */}
              <form style={{ width: '100%' }} onSubmit={handleSignUp}>

                {/* Full Name — source: sign-up-thq-text-elm22 "Username" field pattern */}
                <div className="signup-input-row">
                  <IonIcon icon={personOutline} />
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                {/* Email — source: sign-up-thq-text-elm17 "Email" field */}
                <div className="signup-input-row">
                  <IonIcon icon={mailOutline} />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Password — source: sign-up-thq-text-elm19 "Password" field */}
                <div className="signup-input-row">
                  <IonIcon icon={lockClosedOutline} />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {/* Confirm Password — source: sign-up-thq-text-elm20 "Confirm Password" field */}
                <div className="signup-input-row">
                  <IonIcon icon={lockClosedOutline} />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                {/*
                 * Register button — source: sign-up-thq-group93-elm
                 * rgba(255,255,255,0.65) background, Figtree Bold, "Register" label
                 */}
                <button
                  type="submit"
                  className="signup-submit-btn"
                  disabled={loading}
                >
                  {loading ? 'Creating Account...' : 'Register'}
                </button>
              </form>

              {/*
               * Divider — source: sign-up-thq-line5-elm horizontal separator
               * with "or sign up with" label
               */}
              <div className="signup-divider">
                <div className="signup-divider-line" />
                <span className="signup-divider-text">or sign up with</span>
                <div className="signup-divider-line" />
              </div>

              {/*
               * Social buttons — source: sign-up-thq-text-elm12 "Log In with"
               * + vector icons (sign-up-thq-vector-elm14/15 for social logos)
               */}
              <div className="signup-social-row">
                <button
                  className="signup-social-btn facebook"
                  onClick={handleFacebookSignUp}
                  disabled={loading}
                >
                  <IonIcon icon={logoFacebook} />
                </button>
                <button
                  className="signup-social-btn google"
                  onClick={handleGoogleSignUp}
                  disabled={loading}
                >
                  <IonIcon icon={logoGoogle} />
                </button>
              </div>

              {/*
               * "Already have an account? Log In" row
               * Source: sign-up-thq-text-elm13 (regular) + sign-up-thq-text-elm14 (italic bold)
               */}
              <div className="signup-login-row">
                Already have an account?
                <span onClick={() => history.push('/signin')}>Log In</span>
              </div>

            </div>{/* end .signup-card */}
          </div>{/* end .signup-body */}
        </div>{/* end .signup-bg */}
      </IonContent>
    </IonPage>
  );
};

export default SignUpPage;
