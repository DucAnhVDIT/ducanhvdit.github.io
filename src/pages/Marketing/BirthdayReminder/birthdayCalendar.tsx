import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import './calendarStyles.css'

const BirthdayCalendar = () => {
  const events = [
    { title: "Alice's Birthday", date: "2024-06-10" },
    { title: "Bob's Birthday", date: "2024-06-15" },
    { title: "Charlie's Birthday", date: "2024-06-20" },
    { title: "Diana's Birthday", date: "2024-06-25" },
  ];

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto" 
        contentHeight="auto"
        aspectRatio={1.5}
        dayMaxEventRows={2}
        eventDisplay="block"
      />
    </div>
  );
};

export default BirthdayCalendar;
