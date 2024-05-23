import React, { useState } from "react";
import StaffServicePerformance from "./staffServicePerformance";

const PerformanceHome: React.FC = () => {
  const [activeTab, setActiveTab] = useState("performance");
  const [showModal, setShowModal] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="flex flex-col w-full overflow-x-auto no-scrollbar">
        <div className="flex w-full px-4 items-center justify-between mb-4">
          <div className="flex space-x-3">
            <button
              className={`min-w-max py-2 px-4 ${
                activeTab === "performance"
                  ? "border-b-2 border-primary text-black"
                  : "text-gray-600"
              }`}
              onClick={() => handleTabChange("performance")}
            >
              Performance
            </button>
          </div>
        </div>

        <div className="flex-1 md:flex justify-center items-center flex-col md:border md:rounded-md md:border-slate-500/60 w-full overflow-y-auto">
          {activeTab === "performance" && <StaffServicePerformance />}
        </div>
      </div>
    </div>
  );
};

export default PerformanceHome;
