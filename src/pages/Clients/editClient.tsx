import React, { useEffect, useState } from "react";
import { Flip, ToastContainer } from "react-toastify";
import Button from "../../base-components/Button";
import Notes from "./Note/notes";
import TimelineMUI from "./appointments/timelineMUI";
import Forms from "./forms/forms";
import customerRepository from "../../repositories/customerRepository";
import { useSelector } from "react-redux";
import { selectSelectedCustomer } from "../../stores/customerSlide";
import Lucide from "../../base-components/Lucide";
import { Link } from "react-router-dom";
import StatsGrid from "./Overview/statGrid";
import ClientDetail from "./ClientDetail";
import { Menu, Close } from "@mui/icons-material";

const EditClient = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "white";
    return () => {
      document.body.style.backgroundColor = ""; // Reset background color when component unmounts
    };
  }, []);
  const [activeTab, setActiveTab] = useState("overview");


  const selectedCustomer = useSelector(selectSelectedCustomer);

  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const handleTabChange = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
    setIsCollapsed(true);
  };
  

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex items-center justify-between top-0 w-full p-4">
        <Link to="/clients" className="text-lg font-bold">
          <Lucide icon={"X"}></Lucide>
        </Link>
        <h1 className="text-xl font-bold ml-20">Edit client</h1>
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
                activeTab === "overview"
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => handleTabChange("overview")}
            >
              Overview
            </button>
            <button
              className={`w-full py-2 px-4 rounded-full text-left ${
                activeTab === "customer-detail"
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => handleTabChange("customer-detail")}
            >
              Customer Detail
            </button>
            <button
              className={`w-full py-2 px-4 rounded-full text-left ${
                activeTab === "appointments"
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => handleTabChange("appointments")}
            >
              Appointments
            </button>
            <button
              className={`w-full py-2 px-4 rounded-full text-left ${
                activeTab === "notes"
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => handleTabChange("notes")}
            >
              Notes
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
          </div>
        </div>

        {/* Left Nav for Desktop */}
        <div className="hidden sm:flex flex-col space-y-3 w-64 p-4">
          <button
            className={`w-full py-2 px-3 rounded-full text-left ${
              activeTab === "overview"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handleTabChange("overview")}
          >
            Overview
          </button>
          <button
            className={`w-full py-2 px-4 rounded-full text-left ${
              activeTab === "customer-detail"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handleTabChange("customer-detail")}
          >
            Customer Detail
          </button>
          <button
            className={`w-full py-2 px-4 rounded-full text-left ${
              activeTab === "appointments"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handleTabChange("appointments")}
          >
            Appointments
          </button>
          <button
            className={`w-full py-2 px-4 rounded-full text-left ${
              activeTab === "notes"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handleTabChange("notes")}
          >
            Notes
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
        </div>

        <div className="flex-1 p-4 overflow-x-auto overflow-y-auto min-h-screen">
          {activeTab === "overview" && <StatsGrid />}

          {activeTab === "client-detail" && (
            // <div className="flex flex-col justify-center items-center md:flex-row md:flex-wrap">
            //   <div className="w-full md:w-1/2 p-2">
            //     {selectedCustomer && (
            //       <div className="flex flex-col space-y-4">
            //         <BasicInfo selectedCustomer={selectedCustomer} />
            //         <ContactNum selectedCustomer={selectedCustomer} />
            //       </div>
            //     )}
            //   </div>
            //   <div className="w-full md:w-1/2 p-2">
            //     <Addresses />
            //     <NotiConsent selectedCustomer={selectedCustomer} />
            //     <Other selectedCustomer={selectedCustomer} />
            //   </div>
            // </div>

            <ClientDetail />
          )}

          {activeTab === "notes" && (
            <div className="flex justify-center">
              <Notes />
            </div>
          )}

          {activeTab === "appointments" && (
            <div className="flex justify-center">
              {selectedCustomer && <TimelineMUI />}
              {/* <Timelines /> */}
            </div>
          )}

          {activeTab === "forms" && (
            <>
              <Forms />
            </>
          )}
        </div>
      
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme="colored"
          pauseOnHover
          transition={Flip}
        />

        {/* Content Area */}
      </div>
    </div>
  );
};

export default EditClient;
