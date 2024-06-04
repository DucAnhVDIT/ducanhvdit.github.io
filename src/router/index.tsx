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
import Register from "../pages/Register";
import ForgotPass from "../pages/ForgotPassword";
import NotFound from "../pages/404";
import Clients from "../pages/Clients/main";
import { useAuth } from "../services/AuthContext";
import EditClient from "../pages/Clients/editClient";
import MainPage from "../pages/Marketing/mainpage";
import ManagerMain from "../pages/Manager/main";
import { Settings } from "lucide-react";
import SettingsPage from "../pages/Manager/setting";
import "./styles.css";
import ReviewSettings from "../pages/Marketing/ReviewSettings";
import InputDataPage from "../pages/Manager/InputData";
import EditStaff from "../pages/Manager/InputData/Staff/editStaff";
import ServicesHome from "../pages/Manager/InputData/Services";
import StaffHome from "../pages/Manager/InputData/Staff";
import ScheduleHome from "../pages/Manager/InputData/Schedules";
import FormsHome from "../pages/Manager/InputData/Forms";
import General from "../pages/Manager/setting/General/general";
import TillSettingHome from "../pages/Manager/setting/TillSetting";
import TimeSettingHome from "../pages/Manager/setting/TimeSetting";
import CardConfigHome from "../pages/Manager/setting/CardConfig";
import BookingConfigHome from "../pages/Manager/setting/BookingConfig";
import ReportPage from "../pages/Manager/Report";
import TakingHome from "../pages/Manager/Report/Taking";
import PerformanceHome from "../pages/Manager/Report/StaffPerformance";
import SaleReportHome from "../pages/Manager/Report/SalesReport";
import AccountPage from "../pages/Manager/Account";
import ConfigHome from "../pages/Manager/Account/Config";
import RoleHome from "../pages/Manager/Account/Role";
import AddStaffSteps from "../pages/Manager/InputData/Staff/addNewStaff";
import Voucher from "../pages/Marketing/Vouchers";
import BirthdayReminder from "../pages/Marketing/BirthdayReminder";
import ReturnCustomer from "../pages/Marketing/ReturnCustomer";
import Campaign from "../pages/Marketing/Campaign";
import Templates from "../pages/Marketing/Templates";





function Router() {
  const user = useAuth();
  //get data from session storage
  const sessionUser = sessionStorage.getItem("user");
  //parse data from string back to object
  const isAuthenticated = JSON.parse(sessionUser!);

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
      element: <AddClient />,
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
      element: <ForgotPass />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "/manager/setting",
      element: <SettingsPage />,
      children: [
        { path: "general", element: <General /> },
        { path: "till", element: <TillSettingHome /> },
        { path: "time", element: <TimeSettingHome /> },
        { path: "card", element: <CardConfigHome /> },
        { path: "booking", element: <BookingConfigHome /> },
      ],
    },
    {
      path: "/manager/inputdata",
      element: <InputDataPage />,
      children: [
        { path: "services", element: <ServicesHome /> },
        { path: "staff", element: <StaffHome /> },
        { path: "schedules", element: <ScheduleHome /> },
        { path: "forms", element: <FormsHome /> },
        // { path: "add-new-staff", element: <AddStaff /> },
        // { path: "edit-staff/:id", element: <EditStaff /> },
      ],
    },
    { path: "/manager/inputdata/add-new-staff", element: <AddStaffSteps/> },
    { path: "/manager/inputdata/edit-staff/:id", element: <EditStaff /> },
    {
      path: "/manager/report",
      element: <ReportPage />,
      children: [
        { path: "taking", element: <TakingHome /> },
        { path: "staff-performance", element: <PerformanceHome /> },
        { path: "sales-report", element: <SaleReportHome /> },
      ],
    },
    {
      path: "/manager/account",
      element: <AccountPage />,
      children: [
        { path: "config", element: <ConfigHome /> },
        { path: "role", element: <RoleHome /> },
      ],
    },
    {
      path: "/marketing/reviewsettings",
      element: <ReviewSettings />,
    },
    {
      path: "/marketing/vouchers",
      element: <Voucher />,
    },
    {
      path: "/marketing/birthdayreminder",
      element: <BirthdayReminder />,
    },
    {
      path: "/marketing/returncustomer",
      element: <ReturnCustomer />,
    },
    {
      path: "/marketing/campaigns",
      element: <Campaign />,
    },
    {
      path: "/marketing/templates",
      element: <Templates />,
    },
  ];

  return useRoutes(routes);
}


export default Router;
