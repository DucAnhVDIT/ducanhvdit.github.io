import React, { useState } from "react";
import { Plus } from "lucide-react";
import Modal from "../Modal/addModal";
import ServiceCat from "./serviceCat";

const ServicesHome: React.FC = () => {
  const [activeTab, setActiveTab] = useState("service-cat");
  const [showModal, setShowModal] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleAddButtonClick = () => {
    setShowModal(true);
  };

  const handleAddCategory = (
    name: string,
    color: string,
    description: string
  ) => {
    console.log("Category added:", { name, color, description });
  };

  const handleAddService = (
    name: string,
    duration: string,
    description: string
  ) => {
    console.log("Service added:", { name, duration, description });
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="flex flex-col w-full overflow-x-auto no-scrollbar">
        <div className="flex mb-5 w-full px-4 space-x-3">
          <button
            className={`min-w-max py-2 px-4 ${
              activeTab === "service-cat"
                ? "border-b-2 border-primary text-black"
                : "text-gray-600"
            }`}
            onClick={() => handleTabChange("service-cat")}
          >
            Service Categories
          </button>
          <button
            className={`min-w-max py-2 px-4 ${
              activeTab === "service-list"
                ? "border-b-2 border-primary text-black"
                : "text-gray-600"
            }`}
            onClick={() => handleTabChange("service-list")}
          >
            Services List
          </button>
        </div>

        <div className="flex justify-end mb-6">
          <button
            onClick={handleAddButtonClick}
            className="btn sm:w-32 w-[90px] bg-primary text-white"
          >
            Add
          </button>
        </div>

        <div className="flex-1 mt-4 md:flex justify-center items-center flex-col md:border md:rounded-md md:border-slate-500/60 w-full overflow-y-auto">
          {activeTab === "service-cat" && <ServiceCat />}
          {activeTab === "service-list" && <div>Service</div>}
        </div>
      </div>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onAddCategory={handleAddCategory}
        onAddService={handleAddService}
        isAddingCategory={activeTab === "service-cat"}
      />
    </div>
  );
};

export default ServicesHome;
