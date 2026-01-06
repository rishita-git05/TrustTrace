import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  governmentId: string;
  totalDonated: number;
  impactScore: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, governmentId: string) => Promise<void>;
  logout: () => void;
  updateDonation: (amount: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, _password: string) => {
    // Mock login
    await new Promise(resolve => setTimeout(resolve, 800));
    setUser({
      id: 'user-1',
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      email,
      governmentId: 'XXXX-XXXX-1234',
      totalDonated: 525,
      impactScore: 87,
    });
  };

  const signup = async (name: string, email: string, _password: string, governmentId: string) => {
    // Mock signup
    await new Promise(resolve => setTimeout(resolve, 800));
    setUser({
      id: 'user-' + Date.now(),
      name,
      email,
      governmentId,
      totalDonated: 0,
      impactScore: 0,
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateDonation = (amount: number) => {
    if (user) {
      setUser({
        ...user,
        totalDonated: user.totalDonated + amount,
        impactScore: Math.min(100, user.impactScore + Math.floor(amount / 10)),
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, updateDonation }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
