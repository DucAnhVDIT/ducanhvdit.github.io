import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Dispatch } from 'redux';
import userData from '../assets/json/userData.json'
import userRepository from '../repositories/userRepository';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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
  login: (loginDetail: any) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (loginDetail: any) => {
    return new Promise((resolve, reject) => {
      userRepository.login(loginDetail).then((res: any) => {
        const authenticatedUser = res.data
        console.log(authenticatedUser)
        if (authenticatedUser !== null) {
          setUser(authenticatedUser);
          localStorage.setItem("authSuccess","true")
          toast.success('Login success')
          console.log('true')
        }
        else {
          toast.error('wrong info');
          
        }
        resolve(res)
      }).catch((err: any) => {
        reject(err)
        console.log(err)
      })
    })
    
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