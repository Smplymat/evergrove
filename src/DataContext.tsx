/**
 * DataContext.tsx
 * 
 * Shared data context for the EverGrove application.
 * Provides centralized state management for spaces, menu items, and reservations
 * that can be updated by admin panels and consumed by main project pages.
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Space data types
export interface Space {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  capacity: string;
  includes: string[];
  rates: string[];
  availableSlots: number;
}

// Menu item data types
export interface MenuItem {
  id: string;
  category: 'COFFEES' | 'PASTRIES';
  name: string;
  ingredients: string;
  availableStock: number;
  price?: string;
  image?: string;
}

// Reservation data types
export interface Reservation {
  id: number;
  customerName: string;
  service: string;
  date: string;
  time: string;
  status: 'Confirmed' | 'Pending' | 'New' | 'Cancelled';
  selected: boolean;
  people?: number;
  specialRequests?: string;
  contact?: {
    email: string;
    phone: string;
    preferredContact: string;
  };
}

// Initial data
export const INITIAL_SPACES: Space[] = [
  { 
    id: 'canopy-commons', 
    name: 'THE CANOPY COMMONS', 
    subtitle: '12-Pax Private Tropical Suite', 
    description: 'A spacious semi-private meeting haven surrounded by lush greenery and warm wood interiors. Ideal for team meetings, workshops, thesis defenses, and collaborative sessions.', 
    capacity: '8-12 guests', 
    includes: ['High-speed WiFi', 'Air-conditioning', 'Whiteboard', 'Extension outlets', 'Water station', 'Free use of presentation clicker'], 
    rates: ['P1,500/hour', 'P5,000 - Half-day (4 hrs)', 'P9,000 - Whole day (8 hrs)'], 
    availableSlots: 7 
  },
  { 
    id: 'banyan-hall', 
    name: 'THE BANYAN HALL', 
    subtitle: 'Seminar & Workshop Room (20-30 Pax)', 
    description: "Inspired by the strength and shelter of the banyan tree, this is EverGrove's dedicated seminar and event space.", 
    capacity: '20-30 guests', 
    includes: ['Projector and screen', 'Sound system', 'WiFi', 'Air-conditioning', 'Whiteboard', 'Flexible seating layout'], 
    rates: ['P3,500/hour', 'P12,000 - Half-day (4 hrs)', 'P22,000 - Whole day (8 hrs)'], 
    availableSlots: 3 
  },
  { 
    id: 'palm-pod', 
    name: 'PALM POD', 
    subtitle: '4-6 Pax Private Work Nook', 
    description: 'A cozy enclosed workspace perfect for focused discussions, online meetings, and small group collaborations.', 
    capacity: '4-6 guests', 
    includes: ['High-speed WiFi', 'Air-conditioning', 'Whiteboard', 'Individual outlet', 'Acoustic privacy panels'], 
    rates: ['P800/hour', 'P2,500 - Half-day (4 hrs)', 'P4,500 - Whole day (8 hrs)'], 
    availableSlots: 5 
  },
  { 
    id: 'grove-lounge', 
    name: 'THE GROVE LOUNGE', 
    subtitle: 'Open Co-Working Area', 
    description: 'Work in a relaxed tropical atmosphere surrounded by plants and natural light.', 
    capacity: 'Open seating', 
    includes: ['High-speed fiber WiFi', 'Shared power outlets', 'Ergonomic seating', 'Air-conditioning', 'Ambient music', 'Water station'], 
    rates: ['P150/hour', 'P400 - 3-hour pass', 'P600 - Day pass'], 
    availableSlots: 4 
  },
  { 
    id: 'study-grove', 
    name: 'THE STUDY GROVE', 
    subtitle: 'Quiet Study & Focus Zone', 
    description: 'A distraction-free environment for deep work, reviewing, reading, and solo productivity.', 
    capacity: 'Individual desks', 
    includes: ['High-speed fiber WiFi', 'Individual study desk', 'Personal power outlet', 'Ergonomic chair', 'Air-conditioning', 'Locker use (day pass)'], 
    rates: ['P120/hour', 'P350 - 3-hour pass', 'P500 - Day pass'], 
    availableSlots: 8 
  },
];

export const INITIAL_MENU_ITEMS: MenuItem[] = [
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

export const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 1,
    customerName: "Riguel Jameson Alleje",
    service: "Palm Pod",
    date: "Mon. 1/2/23",
    time: "2:00 PM",
    status: "Confirmed",
    selected: false,
  },
  {
    id: 2,
    customerName: "Nieves Solanna Riego",
    service: "The Canopy Commons",
    date: "Today",
    time: "3:30 PM",
    status: "Pending",
    selected: true,
  },
  {
    id: 3,
    customerName: "Maria Santos",
    service: "The Banyan Hall",
    date: "New. 3 mins ago",
    time: "10:00 AM",
    status: "New",
    selected: false,
  },
  {
    id: 4,
    customerName: "John Chen",
    service: "The Grove Lounge",
    date: "Today",
    time: "5:00 PM",
    status: "Confirmed",
    selected: false,
  },
];

// Context interface
interface DataContextType {
  // Spaces
  spaces: Space[];
  updateSpace: (id: string, updates: Partial<Space>) => void;
  addSpace: (space: Omit<Space, 'id'>) => void;
  
  // Menu items
  menuItems: MenuItem[];
  updateMenuItem: (id: string, updates: Partial<MenuItem>) => void;
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  
  // Reservations
  reservations: Reservation[];
  updateReservation: (id: number, updates: Partial<Reservation>) => void;
  addReservation: (reservation: Omit<Reservation, 'id'>) => void;
}

// Create context
const DataContext = createContext<DataContextType | undefined>(undefined);

// Provider component
export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [spaces, setSpaces] = useState<Space[]>(INITIAL_SPACES);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU_ITEMS);
  const [reservations, setReservations] = useState<Reservation[]>(INITIAL_RESERVATIONS);

  // Space operations
  const updateSpace = (id: string, updates: Partial<Space>) => {
    setSpaces(prev => prev.map(space => 
      space.id === id ? { ...space, ...updates } : space
    ));
  };

  const addSpace = (space: Omit<Space, 'id'>) => {
    const newSpace: Space = {
      ...space,
      id: `space-${Date.now()}`
    };
    setSpaces(prev => [...prev, newSpace]);
  };

  // Menu item operations
  const updateMenuItem = (id: string, updates: Partial<MenuItem>) => {
    setMenuItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: `item-${Date.now()}`
    };
    setMenuItems(prev => [...prev, newItem]);
  };

  // Reservation operations
  const updateReservation = (id: number, updates: Partial<Reservation>) => {
    setReservations(prev => prev.map(reservation => 
      reservation.id === id ? { ...reservation, ...updates } : reservation
    ));
  };

  const addReservation = (reservation: Omit<Reservation, 'id'>) => {
    const newReservation: Reservation = {
      ...reservation,
      id: Date.now()
    };
    setReservations(prev => [...prev, newReservation]);
  };

  const value: DataContextType = {
    spaces,
    updateSpace,
    addSpace,
    menuItems,
    updateMenuItem,
    addMenuItem,
    reservations,
    updateReservation,
    addReservation,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

// Hook to use the data context
export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export default DataContext;
