import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Lucide from "../../../base-components/Lucide";
import Button from "../../../base-components/Button";
import { Menu, Close } from "@mui/icons-material";
import General from "./General/general";
import TillSettingHome from "./TillSetting";
import TimeSettingHome from "./TimeSetting";

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
    <div className="min-h-screen flex flex-col translate-x-[50px] animate-[0.4s_ease-in-out_0.1s_intro-menu] animate-fill-mode-forwards animate-delay">
      <div className="flex items-center justify-between top-0 w-full p-4">
        <Link to="/manager" className="text-lg font-bold">
          <Lucide icon={"X"} />
        </Link>
        <h1 className="text-xl font-bold ml-20">Settings</h1>
        <div></div>
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
            <button
              className={`w-full py-2 px-3 rounded-full text-left ${
                activeTab === "general"
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => handleTabChange("general")}
            >
              General Settings
            </button>
            <button
              className={`w-full py-2 px-4 rounded-full text-left ${
                activeTab === "till"
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => handleTabChange("till")}
            >
              Till Settings
            </button>
            <button
              className={`w-full py-2 px-4 rounded-full text-left ${
                activeTab === "time"
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => handleTabChange("time")}
            >
              Time Settings
            </button>
            <button
              className={`w-full py-2 px-4 rounded-full text-left ${
                activeTab === "card"
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => handleTabChange("card")}
            >
              Card Configuration
            </button>
            <button
              className={`w-full py-2 px-4 rounded-full text-left ${
                activeTab === "booking"
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => handleTabChange("booking")}
            >
              Booking Configuration
            </button>
            <button
              className={`w-full py-2 px-4 rounded-full text-left ${
                activeTab === "sync"
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => handleTabChange("sync")}
            >
              Sync System
            </button>
            <button
              className={`w-full py-2 px-4 rounded-full text-left ${
                activeTab === "update"
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => handleTabChange("update")}
            >
              Update
            </button>
            <button
              className={`w-full py-2 px-4 rounded-full text-left ${
                activeTab === "reset"
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => handleTabChange("reset")}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Left Nav for Desktop */}
        <div className="hidden sm:flex flex-col space-y-3 w-64 p-4">
          <button
            className={`w-full py-2 px-3 rounded-full text-left ${
              activeTab === "general"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handleTabChange("general")}
          >
            General Settings
          </button>
          <button
            className={`w-full py-2 px-4 rounded-full text-left ${
              activeTab === "till"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handleTabChange("till")}
          >
            Till Settings
          </button>
          <button
            className={`w-full py-2 px-4 rounded-full text-left ${
              activeTab === "time"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handleTabChange("time")}
          >
            Time Settings
          </button>
          <button
            className={`w-full py-2 px-4 rounded-full text-left ${
              activeTab === "card"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handleTabChange("card")}
          >
            Card Configuration
          </button>
          <button
            className={`w-full py-2 px-4 rounded-full text-left ${
              activeTab === "booking"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handleTabChange("booking")}
          >
            Booking Configuration
          </button>
          <button
            className={`w-full py-2 px-4 rounded-full text-left ${
              activeTab === "sync"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handleTabChange("sync")}
          >
            Sync System
          </button>
          <button
            className={`w-full py-2 px-4 rounded-full text-left ${
              activeTab === "update"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handleTabChange("update")}
          >
            Update
          </button>
          <button
            className={`w-full py-2 px-4 rounded-full text-left ${
              activeTab === "reset"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handleTabChange("reset")}
          >
            Reset
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-4 overflow-x-auto overflow-y-auto min-h-screen">
          {activeTab === "general" && <General />}
          {activeTab === "till" && <TillSettingHome />}
          {activeTab === "time" && <TimeSettingHome />}
          {activeTab === "card" && <div>Card Configuration Content</div>}
          {activeTab === "booking" && <div>Booking Configuration Content</div>}
          {activeTab === "sync" && <div>Sync System Content</div>}
          {activeTab === "update" && <div>Update Content</div>}
          {activeTab === "reset" && <div>Reset Content</div>}
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
