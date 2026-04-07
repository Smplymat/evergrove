/**
 * AdminSetupPage.tsx
 * 
 * Temporary setup page to create the admin account (healerbld@gmail.com)
 * This page should be removed after the admin account is created.
 */

import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile 
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';
import './AdminSetupPage.css';

const AdminSetupPage: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState('healerbld@gmail.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'create' | 'verify'>('create');

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!password.trim()) {
      setError('Please enter a password.');
      return;
    }
    if (!confirmPassword.trim()) {
      setError('Please confirm your password.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password should be at least 6 characters long.');
      return;
    }

    setLoading(true);
    try {
      // Try to create the admin account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update display name
      await updateProfile(user, { displayName: 'Admin User' });

      // Save to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        fullName: 'Admin User',
        email: email,
        role: 'admin',
        createdAt: serverTimestamp(),
      });

      setStep('verify');
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Try signing in instead.');
        setStep('verify');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password is too weak. Please choose a stronger password.');
      } else {
        setError('Error creating admin account: ' + err.message);
      }
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!password.trim()) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      history.push('/admin');
    } catch (err: any) {
      setLoading(false);
      if (err.code === 'auth/invalid-credential') {
        setError('Invalid password. Please check your credentials.');
      } else if (err.code === 'auth/user-not-found') {
        setError('Admin account not found. Please create it first.');
        setStep('create');
      } else {
        setError('Sign in failed: ' + err.message);
      }
    }
  };

  return (
    <IonPage>
      <IonContent className="admin-setup-content" fullscreen>
        <div className="admin-setup-container">
          <div className="admin-setup-card">
            <h1>Admin Account Setup</h1>
            <p className="admin-setup-subtitle">
              Create or sign in to the admin account: <strong>{email}</strong>
            </p>

            {error && <div className="admin-setup-error">{error}</div>}

            {step === 'create' ? (
              <form onSubmit={handleCreateAdmin}>
                <div className="admin-setup-input-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                  />
                </div>

                <div className="admin-setup-input-group">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="admin-setup-input-group">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="admin-setup-btn primary"
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create Admin Account'}
                </button>

                <button
                  type="button"
                  className="admin-setup-btn secondary"
                  onClick={() => setStep('verify')}
                >
                  Already have account? Sign In
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignIn}>
                <div className="admin-setup-input-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                  />
                </div>

                <div className="admin-setup-input-group">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="admin-setup-btn primary"
                  disabled={loading}
                >
                  {loading ? 'Signing In...' : 'Sign In as Admin'}
                </button>

                <button
                  type="button"
                  className="admin-setup-btn secondary"
                  onClick={() => setStep('create')}
                >
                  Create New Account
                </button>
              </form>
            )}

            <div className="admin-setup-info">
              <h3>Important:</h3>
              <ul>
                <li>This page creates the admin account with email: {email}</li>
                <li>After creating the account, this page should be removed</li>
                <li>The admin account will have automatic access to admin pages</li>
                <li>Keep the password secure and private</li>
              </ul>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AdminSetupPage;
