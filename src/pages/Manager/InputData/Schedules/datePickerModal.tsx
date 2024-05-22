import React, { useState } from "react";
import Flatpickr from "react-flatpickr";

const DatePickerModal = ({ show, onClose, onDateSelect, setIsCollapsed }:any) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date: React.SetStateAction<Date>) => {
    setSelectedDate(date);
  };

  const handleConfirm = () => {
    onDateSelect(selectedDate);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-xl mb-4">Select Date</h2>
        <div className="mb-4 text-white">
          <Flatpickr
            value={selectedDate}
            // onChange={handleDateChange}
            options={{
              altInput: true,
              altFormat: "F j, Y",
              dateFormat: "Y-m-d",
            }}
            className="w-full rounded-xl p-2"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button className="btn btn-outline text-black" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatePickerModal;
