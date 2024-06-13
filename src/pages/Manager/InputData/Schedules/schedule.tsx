// ScheduleTable.tsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import schedulesRepository from "../../../../repositories/schedulesRepository";
import {
  setScheduleData,
  setDates,
  setLoading,
  setError,
  selectScheduleData,
  selectDates,
  selectLoading,
  selectError,
} from "../../../../stores/scheduleSlice";
import { AppDispatch, RootState } from "../../../../stores/store";

interface ScheduleTableProps {
  selectedDate: Date | null;
}

const ScheduleTable: React.FC<ScheduleTableProps> = ({ selectedDate }) => {
  const dispatch = useDispatch<AppDispatch>();
  const scheduleData = useSelector((state: RootState) =>
    selectScheduleData(state)
  );
  const dates = useSelector((state: RootState) => selectDates(state));
  const loading = useSelector((state: RootState) => selectLoading(state));
  const error = useSelector((state: RootState) => selectError(state));

  useEffect(() => {
    const fetchSchedules = async (date: Date) => {
      const oneWeekAhead = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000); // Add one week
      const payload = {
        business_id: "20160908110055249272",
        f_date: Math.floor(date.getTime() / 1000),
        t_date: Math.floor(oneWeekAhead.getTime() / 1000),
        staffid: 0,
      };

      dispatch(setLoading(true));
      dispatch(setError(null));

      try {
        const response = await schedulesRepository.getSchedules(payload);
        dispatch(setScheduleData(response.data.Schedule));

        // Set dates for the table headers
        const dateArray: string[] = [];
        for (let i = 0; i < 7; i++) {
          const currentDate = new Date(
            date.getTime() + i * 24 * 60 * 60 * 1000
          );
          dateArray.push(currentDate.toLocaleDateString());
        }
        dispatch(setDates(dateArray));
      } catch (error: any) {
        dispatch(setError(error.message || "Failed to fetch schedules"));
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (selectedDate) {
      fetchSchedules(selectedDate);
    }
  }, [selectedDate, dispatch]);

  type GroupedSchedules = {
    [staffID: number]: {
      [date: string]: string | null;
    };
  };

  const groupedSchedules: GroupedSchedules = {};
  scheduleData.forEach((schedule) => {
    if (!groupedSchedules[schedule.StaffID]) {
      groupedSchedules[schedule.StaffID] = {};
    }
    const scheduleDate = new Date(schedule.SheduleDate).toLocaleDateString();
    const formattedTime =
      schedule.StartTime1 && schedule.EndTime1
        ? `${new Date(schedule.StartTime1).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })} - ${new Date(schedule.EndTime1).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}`
        : "-";
    groupedSchedules[schedule.StaffID][scheduleDate] = formattedTime;
  });

  const handleTimeClick = (
    staffID: number,
    date: string,
    time: string | null
  ) => {
    console.log(`Clicked time for Staff ${staffID} on ${date}: ${time}`);
  };

  return (
    <div className="p-4 w-full">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
          {/* Table for larger screens */}
          <div className="hidden md:block overflow-x-auto">
            <table className="table-auto w-full border rounded-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-4">Employee</th>
                  {dates.map((date, idx) => (
                    <th key={idx} className="p-4">
                      {date}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.keys(groupedSchedules).length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center p-4">
                      No schedules available.
                    </td>
                  </tr>
                ) : (
                  Object.keys(groupedSchedules).map((staffID) => (
                    <tr key={staffID} className="bg-white even:bg-gray-50">
                      <td className="p-4">Staff {staffID}</td>
                      {dates.map((date, dateIdx) => (
                        <td key={dateIdx} className="p-4">
                          {groupedSchedules[parseInt(staffID)][date] ? (
                            <button
                              className="rounded-lg py-2 px-4 bg-blue-100"
                              onClick={() =>
                                handleTimeClick(
                                  parseInt(staffID),
                                  date,
                                  groupedSchedules[parseInt(staffID)][date]
                                )
                              }
                            >
                              {groupedSchedules[parseInt(staffID)][date]}
                            </button>
                          ) : (
                            <div className="rounded-lg py-2 px-4">-</div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* List for smaller screens */}
          <div className="block md:hidden">
            {Object.keys(groupedSchedules).length === 0 ? (
              <p className="text-center p-4">No schedules available.</p>
            ) : (
              Object.keys(groupedSchedules).map((staffID) => (
                <div key={staffID} className="mb-4 border rounded-lg p-4">
                  <div className="mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-lg font-bold text-gray-700">
                        {staffID}
                      </div>
                      <div className="ml-4">
                        <div className="text-lg font-bold">Staff {staffID}</div>
                      </div>
                    </div>
                  </div>
                  {dates.map((date, dateIdx) => (
                    <div
                      key={dateIdx}
                      className="py-2 border-t flex justify-between"
                    >
                      <div>{date}</div>
                      <div>
                        {groupedSchedules[parseInt(staffID)][date] ? (
                          <button
                            className="py-2 px-4 bg-blue-100 rounded-lg"
                            onClick={() =>
                              handleTimeClick(
                                parseInt(staffID),
                                date,
                                groupedSchedules[parseInt(staffID)][date]
                              )
                            }
                          >
                            {groupedSchedules[parseInt(staffID)][date]}
                          </button>
                        ) : (
                          <div className="py-2 px-4">-</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ScheduleTable;
