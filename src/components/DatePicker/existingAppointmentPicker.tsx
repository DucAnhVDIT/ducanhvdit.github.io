import { Calendar } from "lucide-react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/dark.css";
import Lucide from "../../base-components/Lucide";
import Button from "../../base-components/Button";
import { useEffect, useRef, useState } from "react";
import "flatpickr/dist/l10n/default";
import moment from "moment";

interface ExistingDatePickerProps {
  date: Date;
  goToDate: (date: Date) => void;
  // updateChangeDateBody: (newDate: Date, newStartTime: Date) => void;
  updateBookDate: (newDate: string, newDateTime: string) => void;
  updateStartTime: (newStartTime: string) => void;
  startTime: Date;
  fetchAppoinmentApiData: (value: Date) => void;
}

const ExistingDatePicker: React.FC<ExistingDatePickerProps> = ({
  date,
  goToDate,
  // updateChangeDateBody,
  updateBookDate,
  updateStartTime,
  startTime,
  fetchAppoinmentApiData,
}) => {
  const [flatpickrValue, setFlatpickrValue] = useState(date);
  const [startTimeDD, setStartTimeDD] = useState(new Date(startTime));
  const [timeInputValue, setTimeInputValue] = useState("");

  useEffect(() => {
    // Format the time from startTimeDD and set it as the initial input value
    const formattedTime = startTimeDD.toTimeString().split(" ")[0];
    setTimeInputValue(formattedTime);
  }, [startTimeDD]);

  const handleTimeInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = event.target.value;
    const [hours, minutes] = newTime.split(':');
    const updatedStartTime = new Date(startTimeDD);
    updatedStartTime.setHours(parseInt(hours), parseInt(minutes));

    setStartTimeDD(updatedStartTime);

    const newDateTime = moment(updatedStartTime).format("YYYY-MM-DDTHH:mm:ssZ");
    console.log(newDateTime);
    updateStartTime(newDateTime);
  };

  const handleDateChange = (dates: Date[]) => {
    const selectedDate = dates[0];
    const hours = startTimeDD.getHours();
    const minutes = startTimeDD.getMinutes();
    const seconds = startTimeDD.getSeconds();

    const updatedStartTime = new Date(selectedDate);
    updatedStartTime.setHours(hours, minutes, seconds);
    setStartTimeDD(updatedStartTime);
    goToDate(selectedDate);
    const formattedDate = moment(selectedDate).format("YYYY-MM-DDTHH:mm:ss");
    updateBookDate(formattedDate, moment(updatedStartTime).format());
    // setFlatpickrValue(startTimeDD);
    fetchAppoinmentApiData(selectedDate);
  };

  const flatpickrRef = useRef<Flatpickr | null>(null);

  const handleIconClickCalendar = () => {
    // Open/close Flatpickr when the icon is clicked
    flatpickrRef.current?.flatpickr.open();
  };

  return (
    <div className="flex flex-row">
      <Button className="flex flex-row w-full zoom-in mr-3">
        <Flatpickr
          ref={flatpickrRef}
          value={flatpickrValue}
          onChange={handleDateChange}
          options={{ dateFormat: "D j M Y" }}
          className="w-48 pl-4 border-none bg-white text-lg rounded-md text-black focus:outline-none focus:ring-2 focus:ring-transparent focus:border-transparent"
        />
        <Lucide
          icon="ChevronDown"
          className="w-6 h-6 text-black text-sm mt-1 mr-3 cursor-pointer"
          onClick={handleIconClickCalendar}
        />
      </Button>

      <input
        type="time"
        value={moment(startTimeDD).format("HH:mm")}
        onChange={handleTimeInputChange}
        className=" w-48 xl:w-56 pl-4 font-medium border-gray-200 bg-white text-lg rounded-md text-black focus:outline-none focus:ring-2 focus:ring-transparent focus:border-transparent"
      />
    </div>
  );
};

export default ExistingDatePicker;
