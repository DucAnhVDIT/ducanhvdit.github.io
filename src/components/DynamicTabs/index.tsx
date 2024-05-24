import React, { useState } from "react";

interface Tab {
  label: string;
  key: string;
  component: React.ReactNode;
}

interface DynamicTabsProps {
  tabs: Tab[];
}

const DynamicTabs: React.FC<DynamicTabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].key);

  const handleTabChange = (tabKey: string) => {
    setActiveTab(tabKey);
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="flex flex-col w-full overflow-x-auto no-scrollbar">
        <div className="flex w-full px-4 items-center justify-between mb-4">
          <div className="flex space-x-3">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                className={`min-w-max py-2 px-4 ${
                  activeTab === tab.key
                    ? "border-b-2 border-primary text-black"
                    : "text-gray-600"
                }`}
                onClick={() => handleTabChange(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 md:flex justify-center items-center flex-col md:border md:rounded-md md:border-slate-500/60 w-full overflow-y-auto">
          {tabs.map(
            (tab) =>
              activeTab === tab.key && (
                <div key={tab.key} className="w-full">
                  {tab.component}
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default DynamicTabs;
