import { useRoutes } from "react-router-dom";
import SideMenu from "../layouts/SideMenu";
import SimpleMenu from "../layouts/SimpleMenu";
import TopMenu from "../layouts/TopMenu";
import RegularTable from "../pages/RegularTable";
import Calendar from "../pages/Calendar";
import PointOfSales from "../pages/PointOfSale"

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
        // {
        //   path: "/marketing",
        //   element: <Page1 />,
        // },
        {
          path: "/purchase",
          element: <PointOfSales />,
        },
        // {
        //   path: "/manager",
        //   element: <Page1 />,
        // },
      ],
    },
  ];

  return useRoutes(routes);
}

export default Router;
