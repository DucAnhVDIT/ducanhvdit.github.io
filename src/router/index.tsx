import { useRoutes, Navigate } from "react-router-dom";
import { useState } from "react";

import SideMenu from "../layouts/SideMenu";
import SimpleMenu from "../layouts/SimpleMenu";
import TopMenu from "../layouts/TopMenu";
import RegularTable from "../pages/RegularTable";
import Calendar from "../pages/Calendar";
import AddClient from "../pages/Clients/addClient";
import PointOfSales from "../pages/PointOfSale";
import Post from "../pages/Post";
import DashboardOverview2 from "../pages/DashboardOverview2";
import LoginPage from "../pages/Login"; 
import Register from "../pages/Register"
import ForgotPass from "../pages/ForgotPassword"
import NotFound from "../pages/404"
import Clients from "../pages/Clients/main"
import { useAuth } from "../services/AuthContext";
import EditClient from "../pages/Clients/editClient";
import MainPage from "../pages/Marketing/mainpage";

function Router() {
  const user = useAuth();
  //get data from session storage
  const sessionUser = sessionStorage.getItem('user')
  //parse data from string back to object
  const isAuthenticated = JSON.parse(sessionUser!)


  const routes = [
    {
      path: "/login", 
      element: <LoginPage />,
    },
    {
      path: "/",
      // check if there is data and rediect to page or back to login
      element: !!isAuthenticated ? <SideMenu /> : <Navigate to="/login" />,
      children: [
        {
          path: "/",
          element: <Calendar />,
        },
        {
          path: "/clients",
          element: <Clients />,
          children: [
            {
              path: "/clients/:customerId/edit",
              element: <EditClient />,
            }
          ]
        },
        {
          path: "/marketing",
          element: <MainPage />,
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
        // {
        //   path: "/clients/:customerId/edit",
        //   element: <EditClient />,
        // },
      ],
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/forgotpassword",
      element: <ForgotPass />
    },
    {
      path: "*",
      element: <NotFound />
    }
  ];

   return useRoutes(routes);
}

export default Router;