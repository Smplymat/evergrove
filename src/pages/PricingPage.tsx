/**
 * PricingPage.tsx
 *
 * Design integration: The source HTML/CSS design (index.html + style.css) was
 * merged into this React/Ionic component.  The following architectural elements
 * were adopted from the source:
 *
 *  1. Font families – Kavoon-Regular (space titles), Figtree-ExtraBold (CTA /
 *     "See Details"), Figtree-Regular (body copy), Figtree-Italic (notes),
 *     Sacramento-Regular (logo), Edu QLD Beginner-Regular (logo subtitle).
 *  2. Color palette – earth-tone cream (#f0eee4, #e1d2a8ed), dark overlay
 *     (#0000005e), olive tint (#41461d33) for the reserve button.
 *  3. Card structure – each space card uses the source's semi-transparent dark
 *     panel (background-color: #0000005e, border-radius: 45px) with a circular
 *     image on the left and text on the right, matching the source .div / .the-banyan-hall layout.
 *  4. "RESERVE NOW!" button – olive-tinted glass pill (matches source .rectangle).
 *  5. Active nav pill – #f0eee480 background with backdrop blur (matches source .rectangle-3).
 *  6. Canonical rate data – rates, subtitles, and notes are taken verbatim from
 *     the source HTML so both pages stay in sync.
 *
 * Preserved functionality:
 *  - Carousel navigation (prev/next arrows, dot indicators, goToSlide)
 *  - Routing to /spaces#<hash> via "See Details"
 *  - Routing to /reserve via "RESERVE NOW!"
 *  - Routing to /profile via user icon
 *  - All existing props / public API unchanged
 */

import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import './PricingPage.css';

// ---------------------------------------------------------------------------
// Data model – unchanged interface, updated rate values to match source design
// ---------------------------------------------------------------------------
interface PricingSpace {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  /** Bullet lines rendered under "Rates:" heading */
  rates: string[];
  /** Optional italic note shown below rates (e.g. free coffee, quiet policy) */
  note?: string;
  spaceHash: string;
}

/**
 * Canonical space data sourced from the design HTML.
 * Rates, subtitles, and notes are kept in sync with the source index.html.
 */
const pricingSpaces: PricingSpace[] = [
  {
    id: 1,
    title: 'The Canopy Commons',
    // Source: .text-wrapper-3 "12-Pax Private Tropical Suite"
    subtitle: '12-Pax Private Tropical Suite',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800',
    // Source: .rates-hour
    rates: [
      '₱1,200/hour (Weekdays)',
      '₱1,400/hour (Weekends)',
      '₱5,500 – 4-hour block',
      '₱10,000 – Whole day (8 hrs)',
    ],
    spaceHash: 'canopy-commons',
  },
  {
    id: 2,
    title: 'The Banyan Hall',
    // Source: .seminar-workshop "Seminar & Workshop Room (20–30 Pax)"
    subtitle: 'Seminar & Workshop Room (20–30 Pax)',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    // Source: .p
    rates: [
      '₱3,500/hour',
      '₱12,000 – Half-day (4 hrs)',
      '₱22,000 – Whole day (8 hrs)',
    ],
    spaceHash: 'banyan-hall',
  },
  {
    id: 3,
    title: 'Palm Pod',
    // Source: .text-wrapper-8 "4–6 Pax Private Work Nook"
    subtitle: '4–6 Pax Private Work Nook',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
    // Source: .rates-hour-2
    rates: [
      '₱600/hour',
      '₱2,200 – 4-hour block',
    ],
    spaceHash: 'palm-pod',
  },
  {
    id: 4,
    title: 'The Grove Lounge',
    // Source: .text-wrapper-11 "Open Co-Working Area"
    subtitle: 'Open Co-Working Area',
    image: 'https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=800',
    // Source: .rates-per-person  (Per Person)
    rates: [
      '₱199/hour',
      '₱499 – 3 hours',
      '₱799 – Whole day',
    ],
    // Source: .free-brewed-coffee (italic note)
    note: 'Free brewed coffee for 3-hour and day passes.',
    spaceHash: 'grove-lounge',
  },
  {
    id: 5,
    title: 'The Study Grove',
    // Source: .quiet-study-focus "Quiet Study & Focus Zone"
    subtitle: 'Quiet Study & Focus Zone',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800',
    // Source: .rates-per-person-2  (Per Person)
    rates: [
      '₱149/hour',
      '₱399 – 3 hours',
      '₱699 – Whole day',
    ],
    // Source: .text-wrapper-14 "Strict quiet policy" (italic note)
    note: 'Strict quiet policy',
    spaceHash: 'study-grove',
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
const PricingPage: React.FC = () => {
  const history = useHistory();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Carousel navigation – logic unchanged from original target
  const nextSlide = () =>
    setCurrentIndex((prev) => (prev === pricingSpaces.length - 1 ? 0 : prev + 1));

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? pricingSpaces.length - 1 : prev - 1));

  const goToSlide = (index: number) => setCurrentIndex(index);

  const currentSpace = pricingSpaces[currentIndex];

  return (
    <IonPage>
      <IonContent fullscreen className="pricing-content">
        <div className="pricing-container">

          {/* ----------------------------------------------------------------
              Header – structure preserved; font/color classes updated to match
              source typography (Sacramento-Regular logo, Figtree-Regular nav,
              Figtree-ExtraBold active pill, #f0eee4 text color).
          ---------------------------------------------------------------- */}
          <header className="pricing-header">
            {/* Logo – matches source .logo / .text-wrapper-16 / .text-wrapper-17 */}
            <div className="logo-section">
              <h1 className="logo-title">EverGrove</h1>
              <p className="logo-subtitle">CAFE AND CO-WORKING SPACE</p>
            </div>

            <NavigationBar activePage="pricing" />
          </header>

          {/* ----------------------------------------------------------------
              Carousel Section – layout preserved; card visual updated to match
              source .div / .the-banyan-hall panel design (dark overlay,
              border-radius 45px, circular image, Kavoon title, Figtree body).
          ---------------------------------------------------------------- */}
          <div className="carousel-section">
            <div className="carousel-container">

              {/* Left peek image – unchanged */}
              <div className="side-image left-image">
                <img
                  src={pricingSpaces[(currentIndex - 1 + pricingSpaces.length) % pricingSpaces.length].image}
                  alt="Previous space"
                />
              </div>

              {/* ---- Main card – redesigned to match source panel layout ---- */}
              {/*
               * Source design: each space is a .div (or .the-banyan-hall) panel
               * with background-color #0000005e, border-radius 45px, a circular
               * image (.ellipse) on the left, and text blocks on the right.
               * The card class "pricing-card" carries those styles in the CSS.
               */}
              <div className="pricing-card">
                {/* Circular image – mirrors source .ellipse positioning */}
                <div className="space-image-main">
                  <img src={currentSpace.image} alt={currentSpace.title} />
                </div>

                <div className="pricing-details">
                  {/* Space title – Kavoon-Regular, #e1d2a8ed (source .text-wrapper-2 etc.) */}
                  <h2 className="pricing-title">{currentSpace.title}</h2>

                  {/* Subtitle – Figtree-Regular, #f0eee4 (source .text-wrapper-3 etc.) */}
                  <p className="pricing-subtitle">{currentSpace.subtitle}</p>

                  {/* Rates block – Figtree-Regular (source .rates-hour etc.) */}
                  <div className="rates-section">
                    {/* Label "Rates (Per Person):" for open/quiet spaces, "Rates:" otherwise */}
                    <p className="rates-label">
                      {currentSpace.id >= 4 ? 'Rates (Per Person):' : 'Rates:'}
                    </p>
                    <ul className="rates-list">
                      {currentSpace.rates.map((rate, i) => (
                        <li key={i}>{rate}</li>
                      ))}
                    </ul>
                    {/* Italic note – Figtree-Italic (source .free-brewed-coffee / .text-wrapper-14) */}
                    {currentSpace.note && (
                      <p className="space-note">{currentSpace.note}</p>
                    )}
                  </div>

                  {/* "See Details" – Figtree-ExtraBold (source .text-wrapper-4 etc.) */}
                  <button
                    className="details-btn"
                    onClick={() => history.push(`/spaces#${currentSpace.spaceHash}`)}
                  >
                    See Details
                  </button>
                </div>
              </div>
              {/* ---- End main card ---- */}

              {/* Right peek image – unchanged */}
              <div className="side-image right-image">
                <img
                  src={pricingSpaces[(currentIndex + 1) % pricingSpaces.length].image}
                  alt="Next space"
                />
              </div>

              {/* Navigation arrows – unchanged */}
              <button className="carousel-arrow left-arrow" onClick={prevSlide}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button className="carousel-arrow right-arrow" onClick={nextSlide}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>

            {/* Dot indicators – unchanged */}
            <div className="carousel-indicators">
              {pricingSpaces.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>

            {/* ----------------------------------------------------------------
                "RESERVE NOW!" button – olive-tinted glass pill matching source
                .rectangle (.pricing .rectangle: background #41461d33,
                border-radius 45px, backdrop-filter blur).
            ---------------------------------------------------------------- */}
            <div className="reserve-section">
              <button
                className="reserve-now-button"
                onClick={() => history.push('/reserve')}
              >
                RESERVE NOW!
              </button>
            </div>
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default PricingPage;
