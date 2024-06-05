import React from "react";

function SideBar() {
  const upcomingBirthdays = [
    { name: "Alice", date: "June 10, 2024" },
    { name: "Bob", date: "June 15, 2024" },
    { name: "Charlie", date: "June 20, 2024" },
    { name: "Diana", date: "June 25, 2024" },
  ];

  return (
    <div className="w-full max-w-xs p-4 bg-white shadow-md rounded-lg mb-4">
      <h2 className="text-lg font-bold mb-2">Upcoming Birthdays</h2>
      <ul>
        {upcomingBirthdays.map((birthday, index) => (
          <li key={index} className="mb-1">
            {birthday.name} - {birthday.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
