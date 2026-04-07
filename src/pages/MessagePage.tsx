// MessagePage.tsx
// Redesigned to match the source design (index.html / style.css):
//   - Full-page background image (source: .message background-image)
//   - Centered logo header with "EverGrove" + subtitle (source: .logo, .text-wrapper-3/4)
//   - Shared NavigationBar component (source: .group-2 nav row)
//   - Glassmorphism card wrapping the form (source: .rectangle backdrop-filter panel)
//   - "WRITE A MESSAGE" section title + SVG divider line (source: .text-wrapper, .line)
//   - Semi-transparent textarea (source: .div input area)
//   - Glassmorphism SEND button (source: .rectangle-2 + .text-wrapper-2)
// All existing routing, IonPage/IonContent structure, and public API are preserved.

import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import NavigationBar from '../components/NavigationBar';
import './MessagePage.css';

const MessagePage: React.FC = () => {
  // Local state for the textarea — preserves the send interaction
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      // TODO: wire up to backend / Firebase function
      alert('Message sent!');
      setMessage('');
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="message-content">
        <div className="message-container">

          {/* ── Logo header ──────────────────────────────────────────────
              Source: .logo / .text-wrapper-3 / .text-wrapper-4
              Mirrors the same header used on ContactPage / HomePage.     */}
          <header className="message-header">
            <div className="logo-section-center">
              <h1 className="logo-title">EverGrove</h1>
              <p className="logo-subtitle">CAFE AND CO-WORKING SPACE</p>
            </div>
          </header>

          {/* ── Shared navigation bar ────────────────────────────────────
              Source: .group-2 nav row (Home / Menu / Spaces / Pricing /
              Contact [active pill] / Reserve Now)
              Uses the existing NavigationBar component so nav stays DRY. */}
          <NavigationBar activePage="contact" />

          {/* ── Message form card ────────────────────────────────────────
              Source: .rectangle glassmorphism panel (top:425 / 718×408)
              Backdrop-filter + inset box-shadow replicated in CSS.       */}
          <section className="message-form-section" aria-label="Send a message">

            {/* Source: .text-wrapper "WRITE A MESSAGE" */}
            <h2 className="form-title">WRITE A MESSAGE</h2>

            {/* Source: .line (line-5.svg horizontal rule) */}
            <div className="form-divider" role="separator" />

            {/* Source: .div semi-transparent textarea background */}
            <div className="textarea-container">
              <textarea
                className="message-textarea"
                placeholder="Type your message here…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={8}
                aria-label="Message text"
              />
            </div>

            {/* Source: .rectangle-2 + .text-wrapper-2 "SEND" button
                Glassmorphism pill button matching the source pill style. */}
            <button
              className="send-button"
              onClick={handleSend}
              aria-label="Send message"
            >
              SEND
            </button>

          </section>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MessagePage;
