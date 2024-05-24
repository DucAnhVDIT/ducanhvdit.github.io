import React from "react";
import DynamicTabs from "../../../../components/DynamicTabs";
import SaleList from "./saleList";

const SaleReportHome: React.FC = () => {
  const tabs = [
    {
      label: "Sale List",
      key: "sale-list",
      component: <SaleList />,
    },
    {
      label: "Booking Report",
      key: "booking-report",
      component: <div>HBooking ReportBooking Reporti</div>,
    },
    {
      label: "Deposit Report",
      key: "Deposit-report",
      component: <div>Deposit Report</div>,
    },
    {
      label: "Sale A4",
      key: "sale-a4",
      component: <div>Sale A4</div>,
    },
  ];

  return <DynamicTabs tabs={tabs} />;
};

export default SaleReportHome;
