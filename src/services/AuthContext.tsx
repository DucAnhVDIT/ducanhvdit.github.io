import React, { createContext, useContext, useState, ReactNode } from 'react';
import userRepository from '../repositories/userRepository';
import { toast } from 'react-toastify';

export interface User {
  AccountID: number;
  FirstName: string;
  LastName: string;
  Email: string;
  BusinessModel: [{
    BusinessID: string
    BusinessName: string
  }];
}

interface AuthContextProps {
  children: ReactNode;
}

interface AuthContextType {
  user: User | null;
  login: (loginDetail: any) => any;
  logout: () => void;
  isAuthenticated: () => boolean;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const login = (loginDetail: any) => {
    return new Promise((resolve, reject) => {
      userRepository.login(loginDetail).then((res: any) => {
        if (res.data !== null) {
          const authenticatedUser = res.data.Account
          setUser(authenticatedUser);
          resolve(res)
        } else {
          toast.error('Wrong login details')
        }
      }).catch((err: any) => {
        reject(err)
        console.log(err)
      })
    })  
  };

  const logout = () => {
    console.log('logout')
    setUser(null)
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