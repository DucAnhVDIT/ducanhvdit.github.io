import { useRoutes, Navigate } from "react-router-dom";
import { useState } from "react";

import SideMenu from "../layouts/SideMenu";
import SimpleMenu from "../layouts/SimpleMenu";
import TopMenu from "../layouts/TopMenu";
import RegularTable from "../pages/RegularTable";
import Calendar from "../pages/Calendar";
import AddClient from "../components/AddClient";
import PointOfSales from "../pages/PointOfSale";
import Post from "../pages/Post";
import DashboardOverview2 from "../pages/DashboardOverview2";
import LoginPage from "../pages/Login"; // Add your login page component
import Register from "../pages/Register"
import { useAuth } from "../services/AuthContext";

function Router() {
  const user = useAuth();

  const routes = [
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/",
      element: !!user.user ? <SideMenu /> : <Navigate to="/login" />,
      children: [
        {
          path: "/",
          element: <Calendar />,
        },
        {
          path: "/clients",
          element: <RegularTable />,
        },
        {
          path: "/marketing",
          element: <Post />,
        },
        {
          path: "/purchase",
          element: <PointOfSales />,
        },
        {
          path: "/manager",
          element: <DashboardOverview2 />,
        },
        {
          path: "/clients/add",
          element: <AddClient />,
        },
      ],
    },
    {
      path: "/register",
      element: <Register />,
    },
  ];

  return useRoutes(routes);
}

export default Router;