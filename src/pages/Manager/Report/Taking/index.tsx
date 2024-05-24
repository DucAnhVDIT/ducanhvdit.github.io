import React from "react";
import Taking from "./taking";
import DynamicTabs from "../../../../components/DynamicTabs";

const TakingHome: React.FC = () => {
  const tabs = [
    {
      label: "Taking",
      key: "taking",
      component: <Taking />,
    },

  ];

  return <DynamicTabs tabs={tabs} />;
};

export default TakingHome;
