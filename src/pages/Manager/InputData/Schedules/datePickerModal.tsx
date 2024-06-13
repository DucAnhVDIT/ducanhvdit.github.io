import React, { useState } from "react";
import Flatpickr from "react-flatpickr";

interface DatePickerModalProps {
  show: boolean;
  onClose: () => void;
  onDateSelect: (date: Date) => void;
  setIsCollapsed: (collapsed: boolean) => void;
}

const DatePickerModal: React.FC<DatePickerModalProps> = ({ show, onClose, onDateSelect, setIsCollapsed }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (dates: Date[]) => {
    if (dates.length > 0) {
      setSelectedDate(dates[0]);
    }
  };

  const handleConfirm = () => {
    if (selectedDate) {
      onDateSelect(selectedDate);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-xl mb-4">Select Date</h2>
        <div className="mb-4">
          <Flatpickr
            value={selectedDate || new Date()}
            onChange={handleDateChange}
            options={{
              altInput: true,
              altFormat: "F j, Y",
              dateFormat: "Y-m-d",
            }}
            className="w-full rounded-xl p-2 text-white"
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
