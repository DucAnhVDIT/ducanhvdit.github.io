import React, { useState } from "react";
import { Plus } from "lucide-react";
import ScheduleTable from "./schedule";


const ScheduleHome: React.FC = () => {
  const [activeTab, setActiveTab] = useState("schedule");
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
                activeTab === "schedule"
                  ? "border-b-2 border-primary text-black"
                  : "text-gray-600"
              }`}
              onClick={() => handleTabChange("schedule")}
            >
              Schedule
            </button>
          </div>
        </div>

        <div className="flex-1 md:flex justify-center items-center flex-col md:border md:rounded-md md:border-slate-500/60 w-full overflow-y-auto">
        {activeTab === "schedule" && <ScheduleTable />}
        </div>
      </div>

    
    </div>
  );
};

export default ScheduleHome;
