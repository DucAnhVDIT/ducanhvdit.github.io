import React from "react";
import StaffServicePerformance from "./staffServicePerformance";
import DynamicTabs from "../../../../components/DynamicTabs";


const PerformanceHome: React.FC = () => {
  const tabs = [
    {
      label: "Performance",
      key: "performance",
      component: <StaffServicePerformance />,
    },
  ];

  return <DynamicTabs tabs={tabs} />;
};

export default PerformanceHome;
