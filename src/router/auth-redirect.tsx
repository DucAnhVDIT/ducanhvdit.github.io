import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import { useSelector } from 'react-redux';
import { RootState } from "../stores/store";
interface PrivateRouteProps {
  path: string;
  element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ path, element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated() ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;