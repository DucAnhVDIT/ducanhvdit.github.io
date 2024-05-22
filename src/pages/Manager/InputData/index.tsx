import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Lucide from "../../../base-components/Lucide";
import Button from "../../../base-components/Button";
import { Menu, Close } from "@mui/icons-material";
import ServicesHome from "./Services";
import StaffHome from "./Staff";
import DatePickerModal from "./Schedules/datePickerModal";
import Schedule from "./Schedules/schedule";
import ScheduleHome from "./Schedules";

function InputDataPage() {
  useEffect(() => {
    document.body.style.backgroundColor = "white";

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);
  const [activeTab, setActiveTab] = useState("services");
  const [showModal, setShowModal] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleTabChange = (tab: React.SetStateAction<string>) => {
    if (tab === "schedules") {
      setShowModal(true);
    } else {
      setActiveTab(tab);
      setIsCollapsed(true);
    }
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setShowModal(false);
    setActiveTab("schedules");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setActiveTab("services");
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="min-h-screen flex flex-col ">
      <div className="flex items-center justify-between top-0 w-full p-4">
        <Link to="/manager" className="text-lg font-bold">
          <Lucide icon={"X"} />
        </Link>
        <h1 className="text-xl font-bold ml-20">Input Data</h1>
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
                activeTab === "services"
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => handleTabChange("services")}
            >
              Services
            </button>
            <button
              className={`w-full py-2 px-4 rounded-full text-left ${
                activeTab === "staff"
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => handleTabChange("staff")}
            >
              Staff
            </button>
            <button
              className={`w-full py-2 px-4 rounded-full text-left ${
                activeTab === "schedules"
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => handleTabChange("schedules")}
            >
              Schedules
            </button>
            <button
              className={`w-full py-2 px-4 rounded-full text-left ${
                activeTab === "customers"
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => handleTabChange("customers")}
            >
              Customers
            </button>
            <button
              className={`w-full py-2 px-4 rounded-full text-left ${
                activeTab === "forms"
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => handleTabChange("forms")}
            >
              Forms
            </button>
            <button
              className={`w-full py-2 px-4 rounded-full text-left ${
                activeTab === "status"
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => handleTabChange("status")}
            >
              Status
            </button>
          </div>
        </div>

        {/* Left Nav for Desktop */}
        <div className="hidden sm:flex flex-col space-y-3 w-64 p-4">
          <button
            className={`w-full py-2 px-3 rounded-full text-left ${
              activeTab === "services"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handleTabChange("services")}
          >
            Services
          </button>
          <button
            className={`w-full py-2 px-4 rounded-full text-left ${
              activeTab === "staff"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handleTabChange("staff")}
          >
            Staff
          </button>
          <button
            className={`w-full py-2 px-4 rounded-full text-left ${
              activeTab === "schedules"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handleTabChange("schedules")}
          >
            Schedules
          </button>
          <button
            className={`w-full py-2 px-4 rounded-full text-left ${
              activeTab === "customers"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handleTabChange("customers")}
          >
            Customers
          </button>
          <button
            className={`w-full py-2 px-4 rounded-full text-left ${
              activeTab === "forms"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handleTabChange("forms")}
          >
            Forms
          </button>
          <button
            className={`w-full py-2 px-4 rounded-full text-left ${
              activeTab === "status"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handleTabChange("status")}
          >
            Status
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-x-auto overflow-y-auto min-h-screen">
          {activeTab === "services" && <ServicesHome />}
          {activeTab === "staff" && <StaffHome />}
          {activeTab === "schedules" && selectedDate && <ScheduleHome />}
        </div>

        <DatePickerModal show={showModal} onClose={handleCloseModal} onDateSelect={handleDateSelect} setIsCollapsed={setIsCollapsed} />
      </div>
    </div>
  );
}

export default InputDataPage;
