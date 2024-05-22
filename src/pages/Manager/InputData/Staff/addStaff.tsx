import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import ProfileContent from "./profileContent";
import StaffRateContent from "./staffRateContent";
import StaffServicesContent from "./staffServicesContent";

function AddStaff() {
  const [activeTab, setActiveTab] = useState("profile");
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  const navigate = useNavigate();
  useEffect(() => {
    document.body.style.backgroundColor = "white";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const handleClose = () => {
    navigate(-1);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileContent />;
      case "staff-rate":
        return <StaffRateContent />;
      case "staff-services":
        return <StaffServicesContent />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Add team member</h1>
        <div>
          <button
            className="btn btn-outline mr-2 text-black"
            onClick={handleClose}
          >
            Close
          </button>
          <button className="btn btn-primary">Add</button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 p-4">
          <ul className="mt-4 flex md:flex-col">
            <li className="py-2">
              <button
                className={`min-w-max py-2 px-4 ${
                  activeTab === "profile"
                    ? "border-b-2 border-primary text-black"
                    : "text-gray-600"
                }`}
                onClick={() => handleTabChange("profile")}
              >
                Profile
              </button>
            </li>
            <li className="py-2">
              <button
                className={`min-w-max py-2 px-4 ${
                  activeTab === "staff-rate"
                    ? "border-b-2 border-primary text-black"
                    : "text-gray-600"
                }`}
                onClick={() => handleTabChange("staff-rate")}
              >
                Staff Rate
              </button>
            </li>
            <li className="py-2">
              <button
                className={`min-w-max py-2 px-4 ${
                  activeTab === "staff-services"
                    ? "border-b-2 border-primary text-black"
                    : "text-gray-600"
                }`}
                onClick={() => handleTabChange("staff-services")}
              >
                Staff Services
              </button>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-3/4 p-4 rounded-lg md:border md:rounded-md md:border-slate-500/60 ">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}

export default AddStaff;