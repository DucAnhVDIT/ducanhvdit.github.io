import React from "react";
import FormsTable from "./formsTable";
import DynamicTabs from "../../../../components/DynamicTabs";

const FormsHome: React.FC = () => {
  const tabs = [
    {
      label: "Forms",
      key: "forms",
      component: <FormsTable />,
    },
  ];

  return <DynamicTabs tabs={tabs} />;
};

export default FormsHome;
