import { Calendar } from 'lucide-react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/dark.css';
import Lucide from '../../base-components/Lucide';
import Button from '../../base-components/Button';
import { useEffect, useRef, useState } from 'react';
import 'flatpickr/dist/l10n/default';

interface ExistingDatePickerProps {
  date: Date;
  goToDate: (date: Date) => void;
  updateChangeDateBody: (newDate: Date, newStartTime: Date) => void;
  startTime: Date;
  fetchAppoinmentApiData: (value: Date) => void;
}

const ExistingDatePicker: React.FC<ExistingDatePickerProps> = ({
  date,
  goToDate,
  updateChangeDateBody,
  startTime,
  fetchAppoinmentApiData,
}) => {
  const [flatpickrValue, setFlatpickrValue] = useState(date);
  const [startTimeDD, setStartTimeDD] = useState(new Date(startTime));
  const [timeInputValue, setTimeInputValue] = useState('');

  useEffect(() => {
    // Format the time from startTimeDD and set it as the initial input value
    const formattedTime = startTimeDD.toTimeString().split(' ')[0];
    setTimeInputValue(formattedTime);
  }, [startTimeDD]);

  const handleTimeInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = event.target.value;
    const [hours, minutes] = newTime.split(':');
    const updatedStartTime = new Date(flatpickrValue);
    updatedStartTime.setHours(parseInt(hours, 10), parseInt(minutes, 10));
    
    setStartTimeDD(updatedStartTime);
    console.log(updatedStartTime)
    setTimeInputValue(newTime);
    updateChangeDateBody(flatpickrValue, updatedStartTime);
  };
  

  const handleDateChange = (dates: Date[]) => {
    const selectedDate = dates[0];

    const existingTime = startTimeDD.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const updatedStartTime = new Date(selectedDate.toDateString() + ' ' + existingTime);

    goToDate(selectedDate);
    updateChangeDateBody(selectedDate, updatedStartTime);
    setFlatpickrValue(selectedDate);
    fetchAppoinmentApiData(selectedDate);
  };

  const flatpickrRef = useRef<Flatpickr | null>(null);

  const handleIconClickCalendar = () => {
    // Open/close Flatpickr when the icon is clicked
    flatpickrRef.current?.flatpickr.open();
  };

  return (
    <div className='flex flex-row'>
      <Button className='flex flex-row w-full zoom-in mr-3'>
        <Flatpickr
          ref={flatpickrRef}
          value={flatpickrValue}
          onChange={handleDateChange}
          options={{ dateFormat: 'D j M Y'}}
          className="w-48 pl-4 border-none bg-white text-lg rounded-md text-black focus:outline-none focus:ring-2 focus:ring-transparent focus:border-transparent"
        />
        <Lucide
          icon="ChevronDown"
          className="w-6 h-6 text-black text-sm mt-1 mr-3 cursor-pointer"
          onClick={handleIconClickCalendar}
        />
      </Button>

      <input
        type='time'
        value={timeInputValue}
        onChange={handleTimeInputChange}
        className=" w-48 xl:w-56 pl-4 font-medium border-gray-200 bg-white text-lg rounded-md text-black focus:outline-none focus:ring-2 focus:ring-transparent focus:border-transparent"
        
      />
    </div>
  );
};

export default ExistingDatePicker;
