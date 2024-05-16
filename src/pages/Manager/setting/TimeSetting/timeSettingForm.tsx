import React from "react";
import { Plus } from "lucide-react";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const times = [
  "12:00am",
  "1:00am",
  "2:00am",
  "3:00am",
  "4:00am",
  "5:00am",
  "6:00am",
  "7:00am",
  "8:00am",
  "9:00am",
  "10:00am",
  "11:00am",
  "12:00pm",
  "1:00pm",
  "2:00pm",
  "3:00pm",
  "4:00pm",
  "5:00pm",
  "6:00pm",
  "7:00pm",
  "8:00pm",
  "9:00pm",
  "10:00pm",
  "11:00pm",
];

const OpeningHours = () => {
  return (
    <div className="p-4 rounded-md w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Opening hours</h2>
      {daysOfWeek.map((day) => (
        <div key={day} className="flex flex-col md:flex-row items-center mb-10 md:space-x-4">
          <div className="flex items-center w-full md:w-1/4 mb-2 md:mb-0">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-primary rounded mr-2"
              defaultChecked={day !== "Sunday"}
            />
            <span className={`flex-grow ${day === "Sunday" && "text-gray-500"}`}>
              {day}
            </span>
          </div>
          {day !== "Sunday" ? (
            <div className="flex items-center space-x-2 w-full md:w-3/4">
              <select className="border rounded-md p-1 w-full md:flex-grow">
                {times.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              <span className="mx-1">-</span>
              <select className="border rounded-md p-1 w-full md:flex-grow">
                {times.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <span className="text-gray-500 ml-2">Closed</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default OpeningHours;
