import React from "react";
import DynamicTabs from "../../../../components/DynamicTabs";
import AccountList from "./accountList";

function ConfigHome() {
  const tabs = [
    {
      label: "Account List",
      key: "account-list",
      component: <AccountList />,
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
}

export default ConfigHome;
