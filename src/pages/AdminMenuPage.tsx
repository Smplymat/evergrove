import React, { useState } from 'react';

import { IonContent, IonPage } from '@ionic/react';

import { useHistory } from 'react-router-dom';

import { signOut } from 'firebase/auth';

import { auth } from '../firebase';

import { useAuth } from '../AuthContext';

import './AdminMenuPage.css';



interface MenuItemAdmin {

  id: string;

  category: 'COFFEES' | 'PASTRIES';

  name: string;

  ingredients: string;

  availableStock: number;

}



const INITIAL_ITEMS: MenuItemAdmin[] = [

  { id: 'mocha-frappe',     category: 'COFFEES',  name: 'Mocha Frappe',      ingredients: 'Ilocos Beans, Cow Milk, Mocha Syrup',   availableStock: 7  },

  { id: 'black-coffee',     category: 'COFFEES',  name: 'Black Coffee',      ingredients: 'Ilocos Beans, Hot Water',                availableStock: 10 },

  { id: 'cappuccino',       category: 'COFFEES',  name: 'Cappuccino',        ingredients: 'Espresso, Steamed Milk, Milk Foam',      availableStock: 8  },

  { id: 'latte',            category: 'COFFEES',  name: 'Latte',             ingredients: 'Espresso, Steamed Milk',                 availableStock: 6  },

  { id: 'cold-brew',        category: 'COFFEES',  name: 'Cold Brew',         ingredients: 'Ilocos Beans, Cold Water',               availableStock: 5  },

  { id: 'americano',        category: 'COFFEES',  name: 'Americano',         ingredients: 'Espresso, Hot Water',                    availableStock: 9  },

  { id: 'matcha-latte',     category: 'COFFEES',  name: 'Matcha Latte',      ingredients: 'Matcha Powder, Oat Milk, Honey',         availableStock: 4  },

  { id: 'croissant',        category: 'PASTRIES', name: 'Croissant',         ingredients: 'Flour, Butter, Yeast, Salt',             availableStock: 12 },

  { id: 'stuffed-bagel',    category: 'PASTRIES', name: 'Stuffed Bagel',     ingredients: 'Flour, Cream Cheese, Sesame Seeds',      availableStock: 9  },

  { id: 'blueberry-muffin', category: 'PASTRIES', name: 'Blueberry Muffin',  ingredients: 'Flour, Blueberries, Butter, Sugar',      availableStock: 14 },

  { id: 'veggie-sandwich',  category: 'PASTRIES', name: 'Veggie Sandwich',   ingredients: 'Bread, Lettuce, Tomato, Cucumber',       availableStock: 7  },

  { id: 'cheesecake',       category: 'PASTRIES', name: 'Cheesecake',        ingredients: 'Cream Cheese, Sugar, Graham Crust',      availableStock: 5  },

];



const AdminMenuPage: React.FC = () => {

  const history = useHistory();

  const { currentUser, isAdmin } = useAuth();



  const [items, setItems] = useState<MenuItemAdmin[]>(INITIAL_ITEMS);

  const [selectedItem, setSelectedItem] = useState<MenuItemAdmin>(INITIAL_ITEMS[0]);

  const [editIngredients, setEditIngredients] = useState(INITIAL_ITEMS[0].ingredients);

  const [editStock, setEditStock] = useState(INITIAL_ITEMS[0].availableStock);

  const [saveMsg, setSaveMsg] = useState('');



  if (!currentUser || !isAdmin) {

    history.replace('/signin');

    return null;

  }



  const handleSelectItem = (item: MenuItemAdmin) => {

    setSelectedItem(item);

    setEditIngredients(item.ingredients);

    setEditStock(item.availableStock);

    setSaveMsg('');

  };



  const handleSaveChanges = () => {

    const updated = items.map(i =>

      i.id === selectedItem.id

        ? { ...i, ingredients: editIngredients, availableStock: editStock }

        : i

    );

    setItems(updated);

    setSelectedItem({ ...selectedItem, ingredients: editIngredients, availableStock: editStock });

    setSaveMsg('Saved!');

    setTimeout(() => setSaveMsg(''), 2000);

  };



  const handleAddNew = () => {

    const blank: MenuItemAdmin = {

      id: `new-${Date.now()}`,

      category: 'COFFEES',

      name: 'New Item',

      ingredients: '',

      availableStock: 0,

    };

    setItems(prev => [...prev, blank]);

    handleSelectItem(blank);

  };



  const handleSignOut = async () => {

    await signOut(auth);

    history.replace('/signin');

  };



  const coffees  = items.filter(i => i.category === 'COFFEES');

  const pastries = items.filter(i => i.category === 'PASTRIES');



  return (

    <IonPage>

      <IonContent className="admin-menu-content" fullscreen>

        <div className="admin-menu-bg">



          {/* ── Header: logo + sign out ── */}

          <div className="amenu-header">

            {/* Edit icon top-left */}

            <button className="amenu-header-edit" aria-label="Edit header">

              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">

                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>

                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>

              </svg>

              <div className="amenu-header-edit-line" />

            </button>



            {/* Logo */}

            <div className="amenu-logo">

              <div className="amenu-logo-name">EverGrove</div>

              <div className="amenu-logo-sub">CAFE AND CO-WORKING SPACE</div>

            </div>



            {/* Search */}

            <div className="amenu-search-bar">

              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">

                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>

              </svg>

              <input className="amenu-search-input" placeholder="Search menu..." aria-label="Search menu items" />

            </div>



            {/* Sign Out */}

            <button className="amenu-signout" onClick={handleSignOut} aria-label="Sign out">

              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">

                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>

                <polyline points="16 17 21 12 16 7"/>

                <line x1="21" y1="12" x2="9" y2="12"/>

              </svg>

              <span className="amenu-signout-label">Sign Out</span>

            </button>

          </div>



          {/* ── Navbar bar ── */}

          <nav className="amenu-navbar-bar" aria-label="Admin navigation">

            <div className="amenu-navbar-links">

              <button className="amenu-nav-item" onClick={() => history.push('/admin')}>

                Spaces

              </button>

              <button className="amenu-nav-item amenu-nav-item--active">

                Menu

              </button>

              <button className="amenu-nav-item" onClick={() => history.push('/admin-accounts')}>

                Accounts

              </button>

              <button className="amenu-nav-item" onClick={() => history.push('/admin-reservations')}>

                Reservations

              </button>

            </div>

            <button className="amenu-navbar-user" aria-label="User profile">

              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">

                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>

                <circle cx="12" cy="7" r="4"/>

              </svg>

            </button>

          </nav>



          {/* ── Main layout ── */}

          <div className="amenu-layout">



            {/* Sidebar */}

            <aside className="amenu-sidebar" aria-label="Menu items">

              <div className="amenu-category-header">

                <span>COFFEES</span>

              </div>

              <ul className="amenu-item-list" role="listbox" aria-label="Coffee items">

                {coffees.map(item => (

                  <li

                    key={item.id}

                    role="option"

                    aria-selected={selectedItem.id === item.id}

                    className={`amenu-item-row${selectedItem.id === item.id ? ' amenu-item-row--active' : ''}`}

                    onClick={() => handleSelectItem(item)}

                  >

                    {item.name}

                  </li>

                ))}

              </ul>



              <div className="amenu-category-header">

                <span>PASTRIES</span>

              </div>

              <ul className="amenu-item-list" role="listbox" aria-label="Pastry items">

                {pastries.map(item => (

                  <li

                    key={item.id}

                    role="option"

                    aria-selected={selectedItem.id === item.id}

                    className={`amenu-item-row${selectedItem.id === item.id ? ' amenu-item-row--active' : ''}`}

                    onClick={() => handleSelectItem(item)}

                  >

                    {item.name}

                  </li>

                ))}

              </ul>



              <button className="amenu-add-new" onClick={handleAddNew}>

                Add New

              </button>

            </aside>



            {/* Detail panel */}

            <section className="amenu-detail" aria-label="Item detail">

              {/* Edit icon top-right */}

              <button className="amenu-detail-edit" aria-label="Edit item">

                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">

                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>

                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>

                </svg>

                <div className="amenu-detail-edit-line" />

              </button>



              {/* Image upload placeholder — document + image + plus icon */}

              <div className="amenu-detail-img" aria-hidden="true">

                <svg viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg">

                  {/* Document body */}

                  <rect x="10" y="5" width="80" height="100" rx="6" ry="6" stroke="white" strokeWidth="4" fill="none"/>

                  {/* Folded corner */}

                  <polyline points="70,5 90,25 70,25" stroke="white" strokeWidth="4" fill="none"/>

                  {/* Mountain / image icon inside doc */}

                  <polyline points="22,85 42,58 55,72 65,60 78,85" stroke="white" strokeWidth="3.5" fill="none" strokeLinejoin="round"/>

                  <circle cx="35" cy="48" r="6" stroke="white" strokeWidth="3.5" fill="none"/>

                  {/* Plus badge bottom-right */}

                  <circle cx="88" cy="100" r="18" fill="rgba(65,70,29,0.6)" stroke="white" strokeWidth="3"/>

                  <line x1="88" y1="90" x2="88" y2="110" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>

                  <line x1="78" y1="100" x2="98" y2="100" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>

                </svg>

              </div>



              {/* Item name */}

              <h2 className="amenu-detail-name">{selectedItem.name}</h2>



              {/* Ingredients — editable inline */}

              <input

                className="amenu-detail-ingredients"

                value={editIngredients}

                onChange={e => setEditIngredients(e.target.value)}

                placeholder="Ingredients..."

                aria-label="Ingredients"

              />



              {/* Stock */}

              <div className="amenu-stock-group">

                <input

                  className="amenu-stock-number"

                  type="number"

                  min={0}

                  value={editStock}

                  onChange={e => setEditStock(Number(e.target.value))}

                  aria-label="Available stock count"

                />

                <span className="amenu-stock-label">Available Stocks</span>

              </div>



              {/* Save Changes */}

              <button className="amenu-save-btn" onClick={handleSaveChanges}>

                {saveMsg || 'Save Changes'}

              </button>

            </section>



          </div>

        </div>

      </IonContent>

    </IonPage>

  );

};



export default AdminMenuPage;

