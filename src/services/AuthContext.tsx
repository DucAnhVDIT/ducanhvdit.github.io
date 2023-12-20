import React, { createContext, useContext, useState, ReactNode } from 'react';
import userData from '../assets/json/userData.json'

interface User {
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
    console.log('login click')
    console.log(username, password)
    const authenticatedUser = userData.find(
      (u:any) => u.username === username && u.password === password
    );
    if (authenticatedUser) {
      setUser(authenticatedUser);
      
      console.log(authenticatedUser)
      console.log('login done')
    }
  };

  const logout = () => {
    setUser(null);
  };

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
  console.log(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};