import React from "react";

const ScheduleTable = () => {
  const scheduleData = [
    {
      name: "Staff 1",
      hours: "52h",
      schedule: [
        "10am - 7pm",
        "10am - 7pm",
        "10am - 7pm",
        "10am - 7pm",
        "10am - 7pm",
        "10am - 5pm",
        "",
      ],
    },
    {
      name: "Staff 2",
      hours: "50h",
      schedule: [
        "10am - 7pm",
        "10am - 7pm",
        "10am - 7pm",
        "10am - 7pm",
        "10am - 7pm",
        "10am - 5pm",
        "",
      ],
    },
    {
      name: "Staff 3",
      hours: "48h",
      schedule: [
        "10am - 7pm",
        "10am - 7pm",
        "10am - 7pm",
        "10am - 7pm",
        "10am - 7pm",
        "10am - 5pm",
        "",
      ],
    },
  ];

  const daysOfWeek = [
    "Mon, 20 May",
    "Tue, 21 May",
    "Wed, 22 May",
    "Thu, 23 May",
    "Fri, 24 May",
    "Sat, 25 May",
    "Sun, 26 May",
  ];

  return (
    <div className="overflow-x-auto p-4 w-full">
      <table className="hidden md:table table-auto w-full border rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-4">Employee</th>
            {daysOfWeek.map((day, idx) => (
              <th key={idx} className="p-4">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {scheduleData.map((staff, idx) => (
            <tr key={idx} className="bg-white even:bg-gray-50">
              <td className="p-4">{staff.name}</td>
              {staff.schedule.map((time, timeIdx) => (
                <td key={timeIdx} className="p-4">
                  <div
                    className={`rounded-lg py-2 px-4 ${
                      time ? "bg-blue-100" : ""
                    }`}
                  >
                    {time}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="md:hidden">
        {scheduleData.map((staff, idx) => (
          <div key={idx} className="mb-4 border rounded-lg p-4">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-lg font-bold text-gray-700">
                {staff.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="ml-4">
                <div className="text-lg font-bold">{staff.name}</div>
                <div className="text-gray-500">{staff.hours}</div>
              </div>
            </div>
            {daysOfWeek.map((day, dayIdx) => (
              <div
                key={dayIdx}
                className="flex justify-between items-center py-2 border-t"
              >
                <div>{day}</div>
                <div
                  className={`rounded-lg py-2 px-4 ${
                    staff.schedule[dayIdx] ? "bg-blue-100" : ""
                  }`}
                >
                  {staff.schedule[dayIdx]}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleTable;
