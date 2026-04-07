/**
 * ReservePage.tsx
 *
 * Design merged from source (EverGrove static HTML/CSS mockup — index.html).
 * Source architecture applied:
 *   - Logo block structure: .logo > .text-wrapper-12 (EverGrove) + .text-wrapper-13 (subtitle)
 *   - Nav structure: .group-11 with Home / Menu / Spaces / Pricing / Contact + Reserve Now pill
 *   - Form card: .rectangle glassmorphism panel containing all reservation fields
 *   - Field groups: .group-3 (service), .group-6 (name), .group-7 (phone), .group-8 (email),
 *     .group-2 (date), .group-4/.group-5 (pay online / pay cash)
 *   - RESERVE button: .div + .text-wrapper-11 frosted pill
 *   - Search bar: .group-10 (magnifying glass) + .line-2 (horizontal rule)
 * All existing routing, auth logic, multi-step flow, and IonPage structure are preserved.
 */

import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } from '../emailjs.config';
import NavigationBar from '../components/NavigationBar';
import './ReservePage.css';

/** Multi-step flow type — preserved from target */
type Step = 'form' | 'payment' | 'confirmation';

/** Available services — preserved from target */
const SERVICES = [
  'The Canopy Commons',
  'The Banyan Hall',
  'Palm Pod',
  'The Grove Lounge',
  'The Study Grove',
];

const ReservePage: React.FC = () => {
  const history = useHistory();

  // Multi-step state — preserved from target
  const [step, setStep] = useState<Step>('form');
  const [form, setForm] = useState({
    service: '',
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    paymentType: 'online',
  });
  const [selectedOnlineMethod, setSelectedOnlineMethod] = useState<string>('');
  const [emailSending, setEmailSending] = useState(false);
  const [emailError, setEmailError] = useState('');

  const sendConfirmationEmail = async (paymentMethod?: string) => {
    setEmailSending(true);
    setEmailError('');
    const paymentLine =
      form.paymentType === 'online' && paymentMethod
        ? `Online — ${paymentMethod}`
        : 'Pay at the venue (Cash)';
    try {
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_email: form.email,
          to_name: form.name,
          service: form.service,
          date: form.date,
          time: form.time,
          payment: paymentLine,
        },
        EMAILJS_PUBLIC_KEY
      );
      console.log('EmailJS success:', result.status, result.text);
    } catch (err: any) {
      console.error('EmailJS error:', err);
      const msg = err?.text || err?.message || JSON.stringify(err);
      setEmailError(`Email failed: ${msg}`);
    } finally {
      setEmailSending(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.paymentType === 'online') {
      setStep('payment');
    } else {
      sendConfirmationEmail();
      setStep('confirmation');
    }
  };

  const handlePaymentSelect = (method: string) => {
    setSelectedOnlineMethod(method);
    sendConfirmationEmail(method);
    setStep('confirmation');
  };

  const handleConfirm = () => {
    history.push('/');
  };

  /**
   * Navbar — mirrors source .reservation .logo + .group-11 structure.
   * Source: logo block (Sacramento-Regular wordmark + Edu QLD Beginner subtitle),
   *         search icon + line-2 divider, then nav links in a row.
   * NavigationBar component handles the nav links (Home/Menu/Spaces/Pricing/Contact/Reserve Now).
   */
  const Navbar = () => (
    <header className="reserve-header">
      {/* Source: .reservation .logo — EverGrove wordmark + subtitle */}
      <div className="logo-section-center">
        {/* Source: .text-wrapper-12 — Sacramento-Regular, 96px, #ffffff */}
        <h1 className="logo-title">EverGrove</h1>
        {/* Source: .text-wrapper-13 — Edu QLD Beginner-Regular, 32px, #ffffff */}
        <p className="logo-subtitle">CAFE AND CO-WORKING SPACE</p>
      </div>

      {/* Source: .reservation .group-10 (magnifying glass) + .line-2 (426px rule) */}
      <div className="reserve-search-bar">
        <span className="search-icon">🔍</span>
        <div className="search-line" />
      </div>

      {/* Source: .reservation .group-11 — nav row with frosted active pill */}
      <NavigationBar activePage="reserve" />
    </header>
  );

  return (
    <IonPage>
      <IonContent fullscreen className="reserve-content">
        {/*
         * Source: .reservation — full-viewport container.
         * Background image applied via CSS ::before pseudo-element (see ReservePage.css).
         */}
        <div className="reserve-container">
          <Navbar />

          {/* ── Step 1: Reservation Form ──────────────────────────────────
           * Source: .reservation .rectangle — glassmorphism card (#41461d33,
           *   border-radius 45px, backdrop-filter blur(4.5px)).
           * Contains: title (.text-wrapper), divider (.line), all field groups.
           */}
          {step === 'form' && (
            <div className="reservation-form-section">
              {/* Source: .text-wrapper — Figtree-Regular, 24px, #ffffff */}
              <h2 className="form-title">Reservation Details</h2>
              {/* Source: .line — 408px × 3px horizontal divider */}
              <div className="form-divider" />

              <form className="form-fields" onSubmit={handleReserve}>
                {/*
                 * Source: .group-3 / .rectangle-3 — Type of Service dropdown
                 * (300×30px pill, #ffffffa6, border-radius 50px, Figtree-Regular 13px)
                 */}
                <select
                  name="service"
                  className="reserve-select"
                  value={form.service}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>▾ Type of Service</option>
                  {SERVICES.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>

                {/*
                 * Source: .group-6 / .rectangle-4 — Name field
                 * (246×18px pill, #ffffffa6, Figtree-Regular 13px, label .text-wrapper-8)
                 */}
                <input
                  name="name"
                  className="reserve-input-field"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />

                {/*
                 * Source: .group-7 / .rectangle-4 — Phone Number field
                 * (label: .text-wrapper-9)
                 */}
                <input
                  name="phone"
                  className="reserve-input-field"
                  placeholder="Phone Number"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />

                {/*
                 * Source: .group-8 / .rectangle-4 — Email Address field
                 * (label: .text-wrapper-10)
                 */}
                <input
                  name="email"
                  className="reserve-input-field"
                  placeholder="Email Address"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />

                {/*
                 * Source: .group-2 / .rectangle-2 — Date field
                 * (136×18px pill, #ffffffa6, label .text-wrapper-2, calendar icon .group)
                 */}
                <div className="date-row">
                  <span className="field-icon">📅</span>
                  <input
                    name="date"
                    className="reserve-input-field date-field"
                    type="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="date-row">
                  <span className="field-icon">🕐</span>
                  <input
                    name="time"
                    className="reserve-input-field date-field"
                    type="time"
                    value={form.time}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/*
                 * Source: .group-4 (.text-wrapper-6 "Pay Online") +
                 *         .group-5 (.text-wrapper-7 "Pay Cash")
                 * Each is a .rectangle-2 pill with an .ellipse radio indicator.
                 * Target uses native radio inputs styled to match.
                 */}
                <div className="payment-row">
                  <span className="field-icon">💳</span>
                  <div className="radio-group">
                    {/* Source: .group-4 — Pay Online */}
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="paymentType"
                        value="online"
                        checked={form.paymentType === 'online'}
                        onChange={handleChange}
                      />
                      Pay Online
                    </label>
                    {/* Source: .group-5 — Pay Cash */}
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="paymentType"
                        value="cash"
                        checked={form.paymentType === 'cash'}
                        onChange={handleChange}
                      />
                      Pay Cash
                    </label>
                  </div>
                </div>

                {/*
                 * Source: .reservation .div + .text-wrapper-11
                 * Frosted glass pill (252×66px, #41461d33, border-radius 45px),
                 * label "RESERVE" in Figtree-Regular 40px #ffffff.
                 */}
                <button type="submit" className="reserve-submit-button">RESERVE</button>
              </form>
            </div>
          )}

          {/* ── Step 2: Payment Method ────────────────────────────────────
           * Not present in source (source only shows Pay Online / Pay Cash radio).
           * Preserved from target for full payment flow functionality.
           * Styled using the source's glassmorphism card system.
           */}
          {step === 'payment' && (
            <div className="reservation-form-section">
              <h2 className="form-title">Select Payment Method</h2>
              <div className="form-divider" />
              <div className="payment-methods">
                <button className="payment-method-btn gcash-btn" onClick={() => handlePaymentSelect('GCash')}>
                  <span className="pm-label gcash-label">G</span>
                  <span className="pm-name">GCash</span>
                </button>
                <button className="payment-method-btn maya-btn" onClick={() => handlePaymentSelect('Maya')}>
                  <span className="pm-label maya-label">m</span>
                  <span className="pm-name">maya</span>
                </button>
                <button className="payment-method-btn bpi-btn" onClick={() => handlePaymentSelect('BPI')}>
                  <span className="pm-label bpi-label">🏦</span>
                  <span className="pm-name bpi-text">BPI</span>
                </button>
              </div>
              <button className="reserve-back-button" onClick={() => setStep('form')}>Back</button>
            </div>
          )}

          {/* ── Step 3: Confirmation ──────────────────────────────────────
           * Not present in source. Preserved from target for post-reservation UX.
           * Typography updated to Figtree-Regular to match source font system.
           */}
          {step === 'confirmation' && (
            <div className="reservation-form-section confirmation-section">
              <h2 className="confirmation-title">
                {emailSending ? 'Sending confirmation...' : 'Reservation Confirmed!'}
              </h2>
              <div className="form-divider" />
              {emailSending ? (
                <p className="confirmation-text">Sending your confirmation receipt to <strong>{form.email}</strong>…</p>
              ) : (
                <p className="confirmation-text">
                  {emailError
                    ? emailError
                    : `A confirmation receipt has been sent to ${form.email}. Thank you!`}
                </p>
              )}
              <button
                className="reserve-submit-button confirm-btn"
                onClick={handleConfirm}
                disabled={emailSending}
              >
                {emailSending ? 'Please wait...' : 'Done'}
              </button>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ReservePage;
