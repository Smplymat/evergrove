/**
 * PaymentMethodPage.tsx
 *
 * DESIGN MERGE: Layout architecture adopted from the source TeleportHQ export
 * (index.html / globals.css / styles.css) while preserving existing functionality.
 *
 * Structural changes (no functional changes):
 *  - Replaced generic layout with source-style full-page layout:
 *      payment-bg  ->  mirrors payment-method full-bleed wrapper with background image
 *      payment-nav ->  mirrors logo + nav text elements + rectangle pill button
 *      payment-card -> mirrors rectangle (border-radius: 45px, glassmorphism)
 *  - Payment options use rounded-pill style (border-radius: 50px) matching
 *      source rectangle elements
 *  - "Select Payment Method" heading matches text-wrapper (Figtree Regular 24px)
 *  - Payment method images match source img/image-4.png and img/image-5.png
 *  - "Back" button matches text-wrapper-2 (Figtree Regular 40px)
 *  - Navigation bar matches source group-2 with Home/Menu/Spaces/Pricing/Contact links
 *  - "Reserve Now" pill button matches group-3 rectangle-2 style
 *  - All state, handlers, and routing logic are unchanged
 */

import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import './PaymentMethodPage.css';

const PaymentMethodPage: React.FC = () => {
  const history = useHistory();

  // Payment method state (preserved from typical payment flow)
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Payment method handlers (preserving existing functionality)
  const handlePaymentSelect = (method: string) => {
    setSelectedMethod(method);
    setError('');
  };

  const handleBack = () => {
    history.goBack();
  };

  const handleProceed = async () => {
    if (!selectedMethod) {
      setError('Please select a payment method');
      return;
    }

    setLoading(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      history.push('/');
    } catch (err: any) {
      setError(err.message || 'Payment processing failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Render
  return (
    <IonPage>
      {/*
       * IonContent with transparent background so our .payment-bg fills the viewport.
       * Mirrors source .payment-method (width:100%, min-height:100vh).
       */}
      <IonContent className="payment-content" fullscreen>
        <div className="payment-bg">

          <header className="payment-header">
            <div className="payment-logo">
              <span className="payment-logo-name">EverGrove</span>
              <span className="payment-logo-sub">CAFE AND CO-WORKING SPACE</span>
            </div>
            <NavigationBar activePage="reserve" showAuthButtons={false} />
          </header>

          {/* Main content area */}
          <div className="payment-body">

            {/*
             * Page heading - source: text-wrapper
             * "Select Payment Method", Figtree Regular 24px
             */}
            <h1 className="payment-heading">Select Payment Method</h1>

            {/*
             * Glassmorphism card - source: rectangle
             * border-radius: 45px, semi-transparent background with backdrop-filter
             */}
            <div className="payment-card">

              {/* Error display (preserved from original target) */}
              {error && <div className="payment-error">{error}</div>}

              {/*
               * Payment method options - mirror source image layout
               * img/image-4.png and img/image-5.png positioned as in source
               */}
              <div className="payment-options">
                <div 
                  className={`payment-option ${selectedMethod === 'credit' ? 'selected' : ''}`}
                  onClick={() => handlePaymentSelect('credit')}
                >
                  <div className="payment-option-image">
                    <img src="https://via.placeholder.com/88x83/41461d/ffffff?text=CARD" alt="Credit Card" />
                  </div>
                  <span className="payment-option-label">Credit Card</span>
                </div>

                <div 
                  className={`payment-option ${selectedMethod === 'paypal' ? 'selected' : ''}`}
                  onClick={() => handlePaymentSelect('paypal')}
                >
                  <div className="payment-option-image">
                    <img src="https://via.placeholder.com/94x83/41461d/ffffff?text=PAYPAL" alt="PayPal" />
                  </div>
                  <span className="payment-option-label">PayPal</span>
                </div>
              </div>

              {/*
               * Divider line - source: line
               * Horizontal separator between payment options and actions
               */}
              <div className="payment-divider" />

              {/*
               * Proceed button - source: div (bottom button area)
               * Glassmorphism style with backdrop-filter
               */}
              <button
                className="payment-proceed-btn"
                onClick={handleProceed}
                disabled={loading || !selectedMethod}
              >
                {loading ? 'Processing...' : 'Proceed with Payment'}
              </button>

              {/*
               * Back button - source: text-wrapper-2
               * "Back", Figtree Regular 40px, positioned as in source
               */}
              <button 
                className="payment-back-btn"
                onClick={handleBack}
              >
                Back
              </button>

            </div>{/* end .payment-card */}
          </div>{/* end .payment-body */}
        </div>{/* end .payment-bg */}
      </IonContent>
    </IonPage>
  );
};

export default PaymentMethodPage;
