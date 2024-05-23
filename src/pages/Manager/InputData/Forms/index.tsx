import React, { useState } from "react";
import FormsTable from "./formsTable";




const FormsHome: React.FC = () => {
  const [activeTab, setActiveTab] = useState("forms");
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
                activeTab === "forms"
                  ? "border-b-2 border-primary text-black"
                  : "text-gray-600"
              }`}
              onClick={() => handleTabChange("forms")}
            >
              Forms
            </button>
          </div>
        </div>

        <div className="flex-1 md:flex justify-center items-center flex-col md:border md:rounded-md md:border-slate-500/60 w-full overflow-y-auto">
        {activeTab === "forms" && <FormsTable /> }
        </div>
      </div>

    
    </div>
  );
};

export default FormsHome;

