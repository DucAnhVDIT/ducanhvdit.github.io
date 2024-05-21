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
import ManagerMain from "../pages/Manager/main";
import { Settings } from "lucide-react";
import SettingsPage from "../pages/Manager/setting";
import "./styles.css"
import ReviewSettings from "../pages/Marketing/ReviewSettings";
import InputDataPage from "../pages/Manager/InputData";
import AddStaff from "../pages/Manager/InputData/Staff/AddStaff/addStaff";

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
          element: <ManagerMain />,
        },
        // {
        //   path: "/clients/add",
        //   element: <AddClient />,
        // },
        // {
        //   path: "/clients/:customerId/edit",
        //   element: <EditClient />,
        // },
      ],
    },
    {
      path: "/clients/add",
      element: <AddClient />
    },
    
    {
      path: "/clients/:customerId/edit",
      element: <EditClient />,
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
    },
    {
      path: "/manager/setting",
      element: <SettingsPage />
    },
    {
      path: "/manager/inputdata",
      element: <InputDataPage />
    },
    {
      path: "/manager/inputdata/add-new-staff",
      element: <AddStaff />
    },
    {
      path: "/marketing/reviewsettings",
      element: <ReviewSettings />
    },
  ];

   return useRoutes(routes);
}

const AddClientWithBackgroundColor = () => {
  return (
    <div style={{ backgroundColor: "#fff" }}>
      <AddClient />
    </div>
  );
};

export default Router;