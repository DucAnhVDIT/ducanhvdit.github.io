import React, { useEffect, useState } from "react";
import calendarRepository from "../../../../repositories/calendarRepository";

interface BusinessHour {
  FromTime: string;
  ToTime: string;
  ID: number;
  Status: string | null;
  business_id: string;
  DayofWeekID: number;
}

const daysOfWeek = [
  { name: "Monday", id: 2 },
  { name: "Tuesday", id: 3 },
  { name: "Wednesday", id: 4 },
  { name: "Thursday", id: 5 },
  { name: "Friday", id: 6 },
  { name: "Saturday", id: 7 },
  { name: "Sunday", id: 1 },
];

const OpeningHours: React.FC = () => {
  const [businessHours, setBusinessHours] = useState<BusinessHour[]>([]);

  useEffect(() => {
    fetchBusinessHours();
  }, []);

  const fetchBusinessHours = async () => {
    try {
      const res = await calendarRepository.GetBusinessHours(0);
      setBusinessHours(res.data.BusinessHours);
    } catch (error) {
      console.error("Failed to fetch business hours", error);
    }
  };

  const handleTimeChange = (dayId: number, field: 'FromTime' | 'ToTime', value: string) => {
    setBusinessHours((prevHours) =>
      prevHours.map((hour) =>
        hour.DayofWeekID === dayId ? { ...hour, [field]: value } : hour
      )
    );
  };

  const handleCheckboxChange = (dayId: number, checked: boolean) => {
    setBusinessHours((prevHours) =>
      prevHours.map((hour) =>
        hour.DayofWeekID === dayId ? { ...hour, FromTime: checked ? "09:00:00" : "", ToTime: checked ? "17:00:00" : "" } : hour
      )
    );
  };

  const getDayHours = (dayId: number) => {
    const hours = businessHours.find((item) => item.DayofWeekID === dayId);
    return hours ? { from: hours.FromTime, to: hours.ToTime } : { from: "", to: "" };
  };

  return (
    <div className="p-4 rounded-md w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Opening hours</h2>
      {daysOfWeek.map((day) => {
        const dayHours = getDayHours(day.id);
        const isClosed = dayHours.from === "" && dayHours.to === "";
        return (
          <div key={day.name} className="flex flex-col md:flex-row items-center mb-10 md:space-x-4">
            <div className="flex items-center w-full md:w-1/4 mb-2 md:mb-0">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-primary rounded mr-2"
                checked={!isClosed}
                onChange={(e) => handleCheckboxChange(day.id, e.target.checked)}
              />
              <span className={`flex-grow ${isClosed && "text-gray-500"}`}>
                {day.name}
              </span>
            </div>
            {!isClosed ? (
              <div className="flex items-center space-x-2 w-full md:w-3/4">
                <input
                  type="time"
                  className="border rounded-md p-1 w-full md:flex-grow"
                  value={dayHours.from}
                  onChange={(e) => handleTimeChange(day.id, 'FromTime', e.target.value)}
                />
                <span className="mx-1">-</span>
                <input
                  type="time"
                  className="border rounded-md p-1 w-full md:flex-grow"
                  value={dayHours.to}
                  onChange={(e) => handleTimeChange(day.id, 'ToTime', e.target.value)}
                />
              </div>
            ) : (
              <span className="text-gray-500 ml-2">Closed</span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default OpeningHours;
