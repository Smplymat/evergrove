/**
 * MenuPage.tsx
 *
 * NEW FILE — added to mirror the EverGrove static HTML/CSS menu mockup
 * (index.html + style.css provided as source input).
 *
 * Design elements adopted from the source:
 *  - Same IonPage > IonContent > container div hierarchy used by every other page
 *    (SpacesPage, PricingPage, ContactPage, etc.)
 *  - Shared header / nav markup identical to SpacesPage (logo-section, nav-menu,
 *    nav-link, reserve-link classes) so the glassmorphism pill and font tokens
 *    already defined in HomePage.css / SpacesPage.css apply automatically.
 *  - Hero banner with backdrop-filter frosted-glass overlay, Kavoon-Regular hero
 *    title, and "SCROLL TO SEE MORE" sub-label — directly from source .main-banner.
 *  - Two-section menu grid (FOOD & SNACKS / DRINKS) with item cards that carry
 *    the same flex-column + image-on-top + name/price-below structure from source.
 *  - Figtree-SemiBold section headings, Figtree-Light price labels — matching
 *    source .text-wrapper-11 / .text-wrapper-12 tokens.
 *  - useHistory for the Reserve Now nav link, matching PricingPage pattern.
 */

import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import { useData } from '../DataContext';
import './MenuPage.css';

// ─── Data ────────────────────────────────────────────────────────────────────
// Mirrors every item listed in the source index.html, grouped by section.

interface MenuItem {
  id: string;
  name: string;
  price: string;
  /** Unsplash placeholder — no new external deps; same pattern as SpacesPage */
  image: string;
  category: string;
  availableStock: number;
}

// Page component
const MenuPage: React.FC = () => {
  // useHistory matches the pattern used in SpacesPage and PricingPage
  const history = useHistory();
  const { menuItems } = useData();

  // Filter menu items by category
  const coffees = menuItems.filter(item => item.category === 'COFFEES');
  const pastries = menuItems.filter(item => item.category === 'PASTRIES');

  // Helper function to generate price from stock (for demo purposes)
  const getPriceFromStock = (name: string, stock: number): string => {
    // Simple price mapping based on item name and stock
    const basePrices: { [key: string]: string } = {
      'Mocha Frappe': '12oz | 12oz | 16oz | 16oz',
      'Black Coffee': '12oz | 12oz | 16oz | 16oz',
      'Cappuccino': '12oz | 12oz | 16oz | 16oz',
      'Latte': '12oz | 12oz | 16oz | 16oz',
      'Cold Brew': '12oz | 12oz | 16oz | 16oz',
      'Americano': '12oz | 12oz | 16oz | 16oz',
      'Matcha Latte': '12oz | 12oz | 16oz | 16oz',
      'Croissant': '65 / piece',
      'Stuffed Bagel': '75 / piece',
      'Blueberry Muffin': '75 / piece',
      'Veggie Sandwich': '120 / piece',
      'Cheesecake': '140 / slice',
    };
    return basePrices[name] || 'Price available';
  };

  // Helper function to get image based on item name
  const getImageForItem = (name: string): string => {
    const images: { [key: string]: string } = {
      'Mocha Frappe': 'https://images.unsplash.com/photo-1496908785522-9d3beedf8d71?w=400',
      'Black Coffee': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400',
      'Cappuccino': 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400',
      'Latte': 'https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=400',
      'Cold Brew': 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400',
      'Americano': 'https://images.unsplash.com/photo-1552529467-8dc816317e01?w=400',
      'Matcha Latte': 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400',
      'Croissant': 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400',
      'Stuffed Bagel': 'https://images.unsplash.com/photo-1585378239117-f9a46e0f4b7a?w=400',
      'Blueberry Muffin': 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400',
      'Veggie Sandwich': 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400',
      'Cheesecake': 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400',
    };
    return images[name] || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400';
  };

  // ─── Sub-component ────────────────────────────────────────────────────────────
  // Mirrors source item structure: image → name → price, flex-column card.
  const MenuItemCard: React.FC<MenuItem> = ({ name, price, image }) => (
    <div className="menu-item-card">
      {/* Image block — mirrors source .croissant-2 / .img-3 / .img-4 pattern */}
      <img className="menu-item-img" src={image} alt={name} loading="lazy" />
      {/* Name + price block — mirrors source .itemname / .text-wrapper-11/12 */}
      <div className="menu-item-info">
        <span className="menu-item-name">{name}</span>
        <span className="menu-item-price">{price}</span>
      </div>
    </div>
  );

  return (
    <IonPage>
      {/* IonContent with fullscreen + className — identical to every other page */}
      <IonContent fullscreen className="menu-page-content">
        <div className="menu-page-container">

          {/* ── Header ──────────────────────────────────────────────────────
              Reuses .logo-section / .logo-title / .logo-subtitle / .nav-menu /
              .nav-link / .reserve-link classes defined in HomePage.css so the
              glassmorphism pill and font tokens are inherited without duplication.
              Active class placed on "Menu" — mirrors source .text-wrapper-8 pill. */}
          <header className="menu-page-header">
            <div className="logo-section">
              <h1 className="logo-title">EverGrove</h1>
              <p className="logo-subtitle">CAFE AND CO-WORKING SPACE</p>
            </div>
            <NavigationBar activePage="menu" />
          </header>

          {/* ── Hero Banner ─────────────────────────────────────────────────
              Mirrors source .main-banner + .bg (frosted glass overlay) +
              .explore-menu (Kavoon-Regular hero text) + .p + .text-wrapper-9.
              Background image uses an Unsplash URL — same pattern as SpacesPage
              hero; no new dependencies introduced. */}
          <div className="menu-hero">
            <div className="menu-hero-overlay" />
            <div className="menu-hero-text">
              {/* Source: .explore-menu — Kavoon-Regular, 128px, color #e1d2a8ed */}
              <h2 className="menu-hero-title">Explore<br />Menu</h2>
              {/* Source: .p — Figtree-SemiBold, 28px */}
              <p className="menu-hero-tagline">Fueling your ideas with premium bites!</p>
              {/* Source: .text-wrapper-9 — Figtree-Regular, 28px */}
              <p className="menu-hero-scroll">SCROLL TO SEE MORE</p>
            </div>
            {/* Source: .coffee — decorative hero image on the right */}
            <img
              className="menu-hero-img"
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600"
              alt="Coffee"
            />
          </div>

          {/* ── FOOD & SNACKS section ────────────────────────────────────────
              Source: .FOOD-SNACKS heading + grid of item divs.
              Heading uses .menu-section-title (Figtree-SemiBold, 48px, white). */}
          <section className="menu-section">
            <h3 className="menu-section-title">FOOD &amp; SNACKS</h3>
            <div className="menu-grid">
              {pastries.map((item) => (
                <MenuItemCard 
                  key={item.id} 
                  name={item.name}
                  price={getPriceFromStock(item.name, item.availableStock)}
                  image={getImageForItem(item.name)}
                  category={item.category}
                  id={item.id}
                  availableStock={item.availableStock}
                />
              ))}
            </div>
          </section>

          {/* ── DRINKS section ───────────────────────────────────────────────
              Source: .text-wrapper-10 heading + drink item divs. */}
          <section className="menu-section">
            <h3 className="menu-section-title">DRINKS</h3>
            <div className="menu-grid">
              {coffees.map((item) => (
                <MenuItemCard 
                  key={item.id} 
                  name={item.name}
                  price={getPriceFromStock(item.name, item.availableStock)}
                  image={getImageForItem(item.name)}
                  category={item.category}
                  id={item.id}
                  availableStock={item.availableStock}
                />
              ))}
            </div>
          </section>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default MenuPage;
