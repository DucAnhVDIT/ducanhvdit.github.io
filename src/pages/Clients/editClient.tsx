import React, { useEffect, useState } from "react";
import { Flip, ToastContainer } from "react-toastify";
import Button from "../../base-components/Button";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormLabel from "../../base-components/Form/FormLabel";
import FormInput from "../../base-components/Form/FormInput";
import FormTextarea from "../../base-components/Form/FormTextarea";
import Flatpickr from "react-flatpickr";
import { CheckboxToggle } from "react-rainbow-components";
import BasicInfo from "./clientDetail/basicInfo";
import Addresses from "./clientDetail/addresses";
import NotiConsent from "./clientDetail/notiConsent";
import Other from "./clientDetail/other";
import ContactNum from "./clientDetail/contactNum";
import Notes from "./notes";
import Timelines from "./appointments/timelines";
import TimelineMUI from "./appointments/timelineMUI";
import Forms from "./forms/forms";
import customerRepository from "../../repositories/customerRepository";
import { useSelector } from "react-redux";
import { selectSelectedCustomer } from "../../stores/customerSlide";
import Lucide from "../../base-components/Lucide";
import { Link } from "react-router-dom";

const EditClient = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "white";
    return () => {
      document.body.style.backgroundColor = ""; // Reset background color when component unmounts
    };
  }, []);
  const [activeTab, setActiveTab] = useState("overview");
  const handleTabChange = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  const selectedCustomer = useSelector(selectSelectedCustomer);

  useEffect(() => {
    console.log(selectedCustomer);
  });

  const numOfCancelled = selectedCustomer?.Customer?.Appointments?.filter(
    (appointment: { StatusID: number }) => appointment.StatusID === 6
  ).length;
  const numOfNoShow = selectedCustomer?.Customer?.Appointments?.filter(
    (appointment: { StatusID: number }) => appointment.StatusID === 7
  ).length;

  return (
    <div
      className="mt-3 bg-white opacity-0 translate-x-[50px] animate-[0.4s_ease-in-out_0.1s_intro-menu] animate-fill-mode-forwards animate-delay rounded-lg"
      style={{ height: "1000px" }}
    >
      <div className="flex items-center justify-between top-0 w-full p-4">
        <Link to="/clients" className="text-lg font-bold">
          <Lucide icon={"X"}></Lucide>
        </Link>
        <h1 className="text-xl font-bold">Edit client</h1>
        <div
          onClick={() => {}}
          className="text-lg font-bold text-white bg-primary"
        ></div>
      </div>

      <div className="flex justify-center mb-5">
        <div className="mt-4 flex overflow-x-auto space-x-3">
          <button
            className={`min-w-max py-2 px-4 ${
              activeTab === "overview"
                ? "border-b-2 border-primary text-black"
                : "text-gray-600"
            }`}
            onClick={() => handleTabChange("overview")}
          >
            Overview
          </button>
          <button
            className={`min-w-max py-2 px-4 ${
              activeTab === "client-detail"
                ? "border-b-2 border-primary text-black"
                : "text-gray-600"
            }`}
            onClick={() => handleTabChange("client-detail")}
          >
            Client Detail
          </button>
          <button
            className={`min-w-max py-2 px-4 ${
              activeTab === "appointments"
                ? "border-b-2 border-primary text-black"
                : "text-gray-600"
            }`}
            onClick={() => handleTabChange("appointments")}
          >
            Appointments
          </button>
          <button
            className={`min-w-max py-2 px-4 ${
              activeTab === "notes"
                ? "border-b-2 border-primary text-black"
                : "text-gray-600"
            }`}
            onClick={() => handleTabChange("notes")}
          >
            Notes
          </button>
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
          {/* <IconButton>
                    <ArrowBackIcon/>
                </IconButton> */}
        </div>
      </div>

      {activeTab === "overview" && (
        <div>
          <div className="md:flex h-full items-start justify-center">
            <div className="md:w-1/5 p-4 flex flex-col border-2 border-slate-500/60 rounded-2xl m-5">
              <div className="flex-row flex justify-between">
                <h1 className="text-2xl font-bold mb-3">Total spent</h1>
                <Tooltip title="Amount customer spent">
                  <IconButton>
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </div>
              <h1 className="text-2xl font-bold mb-3">£0</h1>
            </div>
            <div className="md:w-1/5 p-4 flex flex-col border-2 border-slate-500/60 rounded-2xl m-5">
              <div className="flex-row flex justify-between">
                <h1 className="text-2xl font-bold mb-3">Appointments</h1>
                <Tooltip title="Number of booked appointments">
                  <IconButton>
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </div>
              <h1 className="text-2xl font-bold mb-3">
                {selectedCustomer?.Customer.Appointments?.length || 0}
              </h1>
            </div>
          </div>
          <div className="md:flex h-full items-start justify-center">
            <div className="md:w-1/5 p-4 flex flex-col border-2 border-slate-500/60 rounded-2xl m-5">
              <div className="flex-row flex justify-between">
                <h1 className="text-2xl font-bold mb-3">Cancelled</h1>
                <Tooltip title="Number of cancelled appointments">
                  <IconButton>
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </div>
              <h1 className="text-2xl font-bold mb-3">{numOfCancelled}</h1>
            </div>
            <div className="md:w-1/5 p-4 flex flex-col border-2 border-slate-500/60 rounded-2xl m-5">
              <div className="flex-row flex justify-between">
                <h1 className="text-2xl font-bold mb-3">No show</h1>
                <Tooltip title="Number of no show appointments">
                  <IconButton>
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </div>
              <h1 className="text-2xl font-bold mb-3">{numOfNoShow}</h1>
            </div>
          </div>
        </div>
      )}

      {activeTab === "client-detail" && (
        <>
          <div className="md:flex justify-center items-center flex-col">
            <div className="flex flex-row">
              <div className="md:flex flex-col mr-4">
                {selectedCustomer && (
                  <div className="md:flex flex-col mr-4">
                    <BasicInfo selectedCustomer={selectedCustomer} />
                    <ContactNum selectedCustomer={selectedCustomer} />
                  </div>
                )}
              </div>
              <div className="md:flex flex-col">
                <Addresses />
                <NotiConsent selectedCustomer={selectedCustomer} />
                <Other selectedCustomer={selectedCustomer} />
              </div>
            </div>
          </div>
        </>
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
    </div>
  );
};

export default EditClient;
