import React from "react";
import ScheduleTable from "./schedule";
import DynamicTabs from "../../../../components/DynamicTabs";

const ScheduleHome: React.FC = () => {
  const tabs = [
    {
      label: "Schedule",
      key: "schedule",
      component: <ScheduleTable selectedDate={null} />,
    },

  ];

  return <DynamicTabs tabs={tabs} />;
};

export default ScheduleHome;
