import React, { useState } from "react";
import { Plus } from "lucide-react";
import StaffList from "./staffList";

const StaffHome: React.FC = () => {
  const [activeTab, setActiveTab] = useState("staff-list");
  const [showModal, setShowModal] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };


  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="flex flex-col w-full overflow-x-auto no-scrollbar">
        <div className="flex mb-5 w-full px-4 space-x-3">
          <button
            className={`min-w-max py-2 px-4 ${
              activeTab === "staff-list"
                ? "border-b-2 border-primary text-black"
                : "text-gray-600"
            }`}
            onClick={() => handleTabChange("staff-list")}
          >
            Staff List
          </button>
          <button
            className={`min-w-max py-2 px-4 ${
              activeTab === "staff-service"
                ? "border-b-2 border-primary text-black"
                : "text-gray-600"
            }`}
            onClick={() => handleTabChange("staff-service")}
          >
            Staff Services
          </button>
        </div>
        <div className="flex-1 mt-4 md:flex justify-center items-center flex-col md:border md:rounded-md md:border-slate-500/60 w-full overflow-y-auto">
          {activeTab === "staff-list" && <StaffList />}

        </div>
      </div>

    </div>
  );
};

export default StaffHome;
