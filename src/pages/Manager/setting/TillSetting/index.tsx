import React, { useState } from "react";
import FormLabel from "../../../../base-components/Form/FormLabel";
import FormInput from "../../../../base-components/Form/FormInput";
import TillSettingForm from "./tillSettingForm";
import "../styles.css"

function TillSettingHome() {
  const [activeTab, setActiveTab] = useState("till");

  const handleTabChange = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col w-full overflow-x-auto no-scrollbar">
      <div className="flex mb-5 w-full px-4 space-x-3 ">
        <button
          className={`min-w-max py-2 px-4 ${
            activeTab === "till"
              ? "border-b-2 border-primary text-black"
              : "text-gray-600"
          }`}
          onClick={() => handleTabChange("till")}
        >
          Till Setting
        </button>
      </div>
      <div className="mt-4 md:flex justify-center items-center flex-col md:border md:rounded-md md:border-slate-500/60 w-full overflow-y-auto">
        {activeTab === "till" && <TillSettingForm />}
      </div>
    </div>
  );
}

export default TillSettingHome;
