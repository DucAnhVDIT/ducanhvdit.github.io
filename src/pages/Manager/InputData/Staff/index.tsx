import React, { useState } from "react";
import StaffList from "./staffList";
import DynamicTabs from "../../../../components/DynamicTabs";

const StaffHome: React.FC = () => {
  const tabs = [
    {
      label: "Staff List",
      key: "staff-list",
      component: <StaffList />,
    },
  ];

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="flex flex-col w-full overflow-x-auto no-scrollbar">
        <div className="">
          <DynamicTabs tabs={tabs} />
        </div>
      </div>
    </div>
  );
};

export default StaffHome;
