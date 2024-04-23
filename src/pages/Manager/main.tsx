import React from "react";
import GeneralSettings from "./generalSettings";

function ManagerMain() {
  return (
    <div>
      <div className="p-7 flex flex-col opacity-0 translate-x-[50px] animate-[0.4s_ease-in-out_0.1s_intro-menu] animate-fill-mode-forwards animate-delay">
        <div className="flex justify-between">
            <GeneralSettings />
        </div>

        <div className="flex justify-between mt-10">

        </div>
      </div>
    </div>
  );
}

export default ManagerMain;
