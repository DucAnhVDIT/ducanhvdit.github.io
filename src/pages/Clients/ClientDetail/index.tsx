import React, { useState } from "react";
import Info from "./info";

function ClientDetail() {
  const [activeTab, setActiveTab] = useState("basic");

  const handleTabChange = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex">
      <div className="flex flex-col">
        <button
          className={`min-w-max py-2 px-4 text-left ${
            activeTab === "basic"
              ? "border-r-2 border-primary text-black"
              : "text-gray-600"
          }`}
          onClick={() => handleTabChange("basic")}
        >
          Basic Info
        </button>
        <button
          className={`min-w-max py-2 px-4 text-left ${
            activeTab === "address"
              ? "border-r-2 border-primary text-black"
              : "text-gray-600"
          }`}
          onClick={() => handleTabChange("address")}
        >
          Address
        </button>
      </div>

      <div className="ml-6 w-full">
        {activeTab === "basic" && <div>Info Component</div>}
        {activeTab === "address" && <div>Address Component</div>}
      </div>
    </div>
  );
}

export default ClientDetail;
