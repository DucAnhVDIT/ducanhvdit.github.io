import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Lucide from "../../../base-components/Lucide";
import Button from "../../../base-components/Button";
import { Menu, Close } from "@mui/icons-material";
import General from "./General/general";

function SettingsPage() {
  useEffect(() => {
    document.body.style.backgroundColor = "white";

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);
  const [activeTab, setActiveTab] = useState("general");
  const handleTabChange = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
    setIsCollapsed(true);
  };

  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto min-h-scren">
      <div className="flex items-center justify-between top-0 w-full p-4">
        <Link to="/manager" className="text-lg font-bold">
          <Lucide icon={"X"} />
        </Link>
        <h1 className="text-xl font-bold ml-20">Settings</h1>
        <div
          onClick={() => {}}
          className="text-lg font-bold text-white bg-primary"
        ></div>
        <div className="sm:hidden ml-6">
          <Button
            variant="instagram"
            type="button"
            className="border-none cursor-pointer rounded-full shadow-none"
            style={{ backgroundColor: "transparent", color: "black" }}
            onClick={toggleCollapse}
          >
            {isCollapsed ? <Menu /> : <Close />}
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-y-auto">
        {/* Left Nav for Mobile */}
        <div
          className={`fixed inset-0 z-40 transition-transform transform ${
            isCollapsed ? "-translate-x-full" : "translate-x-0"
          } sm:hidden`}
        >
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={toggleCollapse}
          ></div>
          <div className="relative bg-white w-64 h-full p-4 flex flex-col space-y-3">
            <Button
              variant="instagram"
              type="button"
              className={`border-none min-w-[120px] cursor-pointer rounded-full px-6 ${
                activeTab === "general"
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => handleTabChange("general")}
            >
              General Settings
            </Button>
            <Button
              variant="instagram"
              type="button"
              className={`border-none min-w-[120px] cursor-pointer rounded-full px-6 ${
                activeTab === "till"
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => handleTabChange("till")}
            >
              Till Settings
            </Button>
          </div>
        </div>

        {/* Left Nav for Desktop */}
        <div className="hidden sm:flex flex-col space-y-3 w-64 p-4 overflow-y-auto">
          <Button
            variant="instagram"
            type="button"
            className={`border-none min-w-[120px] sm:w-40 cursor-pointer rounded-full px-6 ${
              activeTab === "general"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handleTabChange("general")}
          >
            General Settings
          </Button>
          <Button
            variant="instagram"
            type="button"
            className={`border-none min-w-[120px] sm:w-40 cursor-pointer rounded-full px-6 ${
              activeTab === "till"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handleTabChange("till")}
          >
            Till Settings
          </Button>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-4 overflow-x-auto overflow-y-auto min-h-screen">
          {activeTab === "general" && <General />}
          {activeTab === "till" && (
            <div className="md:flex justify-center items-center flex-col">
              <div className="flex flex-row">
                <div className="md:flex flex-col mr-4">Till Settings</div>
                Content for Till Settings
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
