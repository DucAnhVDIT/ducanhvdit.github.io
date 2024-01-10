import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Dispatch } from 'redux';
import userData from '../assets/json/userData.json'

export interface User {
  id: number;
  username: string;
  password: string;
  name: string;
  roles: string[];
}

interface AuthContextProps {
  children: ReactNode;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string) => {
    // Replace this with actual API
    console.log('check this login in auth?')
    const authenticatedUser = userData.find(
      (u:any) => u.username === username && u.password === password
    );
    if (authenticatedUser) {
      setUser(authenticatedUser);
      localStorage.setItem("authSuccess","true")
    }
    else {
      console.log('false')
    }
  };
  const logout = () => {
    setUser(null)
    localStorage.removeItem("authSuccess")
    
  }

  const isAuthenticated = () => {
    return !!user;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
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