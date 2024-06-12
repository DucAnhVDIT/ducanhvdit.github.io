import React, { useState } from "react";
import { ChevronDown, User } from "lucide-react";

interface StaffMember {
  StaffID: string;
  StaffName: string;
}

interface StaffSelectorProps {
  staffList: StaffMember[];
  currentStaffId: string;
  onSelectStaff: (staffId: string) => void;
}

const StaffSelector: React.FC<StaffSelectorProps> = ({
  staffList,
  currentStaffId,
  onSelectStaff,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentStaff = staffList.find(
    (staff) => staff.StaffID === currentStaffId
  );

  return (
    // <div className="relative inline-block text-left">
    //   <button
    //     type="button"
    //     className="inline-flex justify-between w-full rounded-md border border-gray-200 shadow-sm px-4 py-2 bg-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
    //     onClick={() => setIsDropdownOpen(!isDropdownOpen)}
    //   >
    //     <User size={18} className="mr-2"/>
    //     {currentStaff ? `${currentStaff.StaffName}` : 'Select Staff'}
    //     <ChevronDown className="-mr-1 ml-2 h-5 w-5" />
    //   </button>

    //   {isDropdownOpen && (
    //     <div className="z-50 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 max-h-60 overflow-auto">
    //       <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
    //         {staffList.map((staff) => (
    //           <button
    //             key={staff.StaffID}
    //             onClick={() => {
    //               onSelectStaff(staff.StaffID);
    //               setIsDropdownOpen(false);
    //             }}
    //             className={`w-full px-4 py-2 text-left text-sm cursor-pointer ${
    //               staff.StaffID === currentStaffId ? 'bg-slate-100 text-black' : 'text-gray-700 hover:bg-gray-100'
    //             }`}
    //             role="menuitem"
    //           >
    //             {staff.StaffName}
    //           </button>
    //         ))}
    //       </div>
    //     </div>
    //   )}
    // </div>

    <div className="relative inline-block text-left w-full mt-3">
      <button
        type="button"
        className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-6 py-4 bg-white text-lg font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className="flex justify-between">
          <div className="flex">
            <User size={18} className="mr-2 mt-1" />
            {currentStaff ? `Staff: ${currentStaff.StaffName}` : "Select Staff"}
          </div>
        </div>
        <ChevronDown className="-mr-1 ml-2 h-5 w-5" />
      </button>

      {isDropdownOpen && (
        <div className="absolute z-10 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 max-h-60 overflow-auto">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {staffList.map((staff) => (
              <button
                key={staff.StaffID}
                onClick={() => {
                  onSelectStaff(staff.StaffID);
                  setIsDropdownOpen(false);
                }}
                className={`w-full px-4 py-2 text-left text-lg cursor-pointer ${
                  staff.StaffID === currentStaffId
                    ? "bg-gray-200 text-black"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                role="menuitem"
              >
                {staff.StaffName}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffSelector;
