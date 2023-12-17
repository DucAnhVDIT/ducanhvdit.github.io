import { useRoutes } from "react-router-dom";
import SideMenu from "../layouts/SideMenu";
import SimpleMenu from "../layouts/SimpleMenu";
import TopMenu from "../layouts/TopMenu";
import RegularTable from "../pages/RegularTable";
import Calendar from "../pages/Calendar";
import PointOfSales from "../pages/PointOfSale"
import Post from "../pages/Post"
import DashboardOverview2 from "../pages/DashboardOverview2"
import AddClient from "../components/AddClient";
function Router() {
  const routes = [
    {
      path: "/",
      element: <SideMenu />,
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
          element:<Post />,
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
  ];

  return useRoutes(routes);
}

export default Router;
