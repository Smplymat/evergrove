import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({ currentUser: null, loading: true, isAdmin: false });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      // Check if user is the authorized admin (healerbld@gmail.com)
      setIsAdmin(user?.email === 'healerbld@gmail.com');
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Always render children — App handles the loading spinner.
  // Previously this returned a bare <div> which blocked the React tree
  // from mounting and caused a blank white screen.
  return (
    <AuthContext.Provider value={{ currentUser, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
