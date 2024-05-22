import React from 'react';

const ScheduleTable = () => {
  const scheduleData = [
    { name: "Staff 1", schedule: ["10am - 7pm", "10am - 7pm", "10am - 7pm", "10am - 7pm", "10am - 7pm", "10am - 5pm", ""] },
    { name: "Staff 2", schedule: ["10am - 7pm", "10am - 7pm", "10am - 7pm", "10am - 7pm", "10am - 7pm", "10am - 5pm", ""] },
    { name: "Staff 3", schedule: ["10am - 7pm", "10am - 7pm", "10am - 7pm", "10am - 7pm", "10am - 7pm", "10am - 5pm", ""] }
  ];

  return (
    <div className="overflow-x-auto p-10 w-full">
      <table className="table w-full border">
        <thead className='text-black'>
          <tr>
            <th>Employee</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
            <th>Sun</th>
          </tr>
        </thead>
        <tbody>
          {scheduleData.map((staff, idx) => (
            <tr key={idx}>
              <td>{staff.name}</td>
              {staff.schedule.map((time, timeIdx) => (
                <td key={timeIdx} className="p-2">
                  <div className={`rounded-lg py-2 px-3 ${time ? 'bg-blue-100' : ''}`}>
                    {time}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;
