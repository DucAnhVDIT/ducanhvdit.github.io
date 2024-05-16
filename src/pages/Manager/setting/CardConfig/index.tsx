import React, { useState } from 'react'
import FormLabel from "../../../../base-components/Form/FormLabel";
import FormInput from "../../../../base-components/Form/FormInput";
import PaymentSettings from './paymentSettings';


function CardConfigHome() {
    const [activeTab, setActiveTab] = useState("card");

    const handleTabChange = (tab: React.SetStateAction<string>) => {
      setActiveTab(tab);
    };
  return (
    <div className="flex flex-col w-full overflow-x-auto no-scrollbar">
    <div className="flex mb-5 w-full px-4 space-x-3 ">
      <button
        className={`min-w-max py-2 px-4 ${
          activeTab === "card"
            ? "border-b-2 border-primary text-black"
            : "text-gray-600"
        }`}
        onClick={() => handleTabChange("card")}
      >
        Card Configuration
      </button>
    </div>
    <div className="mt-4 md:flex justify-center items-center flex-col md:border md:rounded-md md:border-slate-500/60 w-full overflow-y-auto">
      {activeTab === "card" && <PaymentSettings />}
    </div>
  </div>
  )
}

export default CardConfigHome