import React, { useState } from "react";
import Info from "./info";
import Address from "./address";

function ClientDetail() {
  const [activeTab, setActiveTab] = useState("basic");

  const handleTabChange = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  return (
    <div className="">
      <div className="flex">
        <button
          className={`min-w-max py-2 px-4 text-left ${
            activeTab === "basic"
              ? "border-b-2 border-primary text-black"
              : "text-gray-600"
          }`}
          onClick={() => handleTabChange("basic")}
        >
          Basic Info
        </button>
        <button
          className={`min-w-max py-2 px-4 text-left ${
            activeTab === "address"
              ? "border-b-2 border-primary text-black"
              : "text-gray-600"
          }`}
          onClick={() => handleTabChange("address")}
        >
          Address
        </button>
      </div>

      <div className="mt-4 md:flex justify-center items-center flex-col md:border md:rounded-md md:border-slate-500/60 w-full overflow-y-auto">
        {activeTab === "basic" && <Info />}
        {activeTab === "address" && <Address />}
      </div>
    </div>
  );
}

export default ClientDetail;
