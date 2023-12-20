import { useRoutes, Navigate } from "react-router-dom";
import { useState } from "react";

import SideMenu from "../layouts/SideMenu";
import SimpleMenu from "../layouts/SimpleMenu";
import TopMenu from "../layouts/TopMenu";
import RegularTable from "../pages/RegularTable";
import Calendar from "../pages/Calendar";
import PointOfSales from "../pages/PointOfSale";
import Post from "../pages/Post";
import DashboardOverview2 from "../pages/DashboardOverview2";
import LoginPage from "../pages/Login"; // Add your login page component

function Router() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const routes = [
    {
      path: "/login",
    },
    {
      path: "/",
      element: isLoggedIn ? <SideMenu /> : <Navigate to="/login" />,
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
      ],
    },
  ];

  return useRoutes(routes);
}

export default Router;