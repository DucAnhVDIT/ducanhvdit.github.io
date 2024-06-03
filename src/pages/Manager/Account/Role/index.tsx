import React from 'react'
import DynamicTabs from '../../../../components/DynamicTabs';
import Roles from './roles';


function RoleHome() {
  const tabs = [
    {
      label: "Roles",
      key: "roles",
      component:<Roles /> ,
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

export default RoleHome