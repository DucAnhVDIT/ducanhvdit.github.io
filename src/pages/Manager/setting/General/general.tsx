import React, { useState } from "react";
import CompanyInfo from "./companyInfo";

function SettingsPage() {
  const [activeTab, setActiveTab] = useState("company-info");

  const handleTabChange = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  return (
    <div className="">
      {/* Button Groups */}
      <div className="flex w-full overflow-x-auto no-scrollbar">
        <div className="flex mb-5 w-full px-4 space-x-3">
          <button
            className={`min-w-max py-2 px-4 ${
              activeTab === "company-info"
                ? "border-b-2 border-primary text-black"
                : "text-gray-600"
            }`}
            onClick={() => handleTabChange("company-info")}
          >
            Company Information
          </button>
          <button
            className={`min-w-max py-2 px-4 ${
              activeTab === "functions"
                ? "border-b-2 border-primary text-black"
                : "text-gray-600"
            }`}
            onClick={() => handleTabChange("functions")}
          >
            Functions
          </button>
          <button
            className={`min-w-max py-2 px-4 ${
              activeTab === "setting-info"
                ? "border-b-2 border-primary text-black"
                : "text-gray-600"
            }`}
            onClick={() => handleTabChange("setting-info")}
          >
            Setting Information
          </button>
          <button
            className={`min-w-max py-2 px-4 ${
              activeTab === "email-setting"
                ? "border-b-2 border-primary text-black"
                : "text-gray-600"
            }`}
            onClick={() => handleTabChange("email-setting")}
          >
            Email Setting
          </button>
          <button
            className={`min-w-max py-2 px-4 ${
              activeTab === "sms-setting"
                ? "border-b-2 border-primary text-black"
                : "text-gray-600"
            }`}
            onClick={() => handleTabChange("sms-setting")}
          >
            SMS Setting
          </button>
          <button
            className={`min-w-max py-2 px-4 ${
              activeTab === "reminder"
                ? "border-b-2 border-primary text-black"
                : "text-gray-600"
            }`}
            onClick={() => handleTabChange("reminder")}
          >
            Reminder
          </button>
        </div>
      </div>
      {/* Button Groups */}

      <div className="mt-4 md:flex justify-center items-center flex-col md:border md:rounded-md md:border-slate-500/60 w-full overflow-y-auto">
        {activeTab === "company-info" && <CompanyInfo />}
        {activeTab === "functions" && <div>Functions Content</div>}
        {activeTab === "setting-info" && <div>Setting Information Content</div>}
        {activeTab === "email-setting" && <div>Email Setting Content</div>}
        {activeTab === "sms-setting" && <div>SMS Setting Content</div>}
        {activeTab === "reminder" && <div>Reminder Content</div>}
      </div>
    </div>
  );
}

export default SettingsPage;
