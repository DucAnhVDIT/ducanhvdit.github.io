
import { Calendar } from 'lucide-react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/dark.css';
import Lucide from '../../base-components/Lucide';
import Button from '../../base-components/Button';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'flatpickr/dist/l10n/default';


interface ExistingDatePickerProps {
  date: Date;
  goToDate: (date: Date) => void;
  updateChangeDateBody: (newDate: Date, newStartTime: Date) => void;
  startTime : Date,
  fetchAppoinmentApiData: (value: Date) => void;
}

const ExistingDatePicker: React.FC<ExistingDatePickerProps> = ({ date, goToDate, updateChangeDateBody, startTime, fetchAppoinmentApiData }) => {
  const [flatpickrValue, setFlatpickrValue] = useState(date);
  const dispatch = useDispatch();
  // const selectedDate = useSelector((state: any) => state.date.selectedDate);
  
  const startTimeDD = new Date(startTime);

  const handleDateChange = (dates: Date[]) => {
    const selectedDate = dates[0];

    const existingTime = startTimeDD.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const updatedStartTime = new Date(selectedDate.toDateString() + ' ' + existingTime);
  
    goToDate(selectedDate);
    updateChangeDateBody(selectedDate, updatedStartTime)
    setFlatpickrValue(selectedDate);
    fetchAppoinmentApiData(selectedDate)
  };
  
  
  const defaultTime = new Date();
    defaultTime.setHours(13, 45);
    
    const options = {
      enableTime: true,
      noCalendar: true,
      dateFormat: "H:i",
      defaultDate: startTimeDD,
    };


  const flatpickrRef = useRef<Flatpickr | null>(null);

  const handleIconClick = () => {
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
          options={{ dateFormat: 'D j M Y' }}
          className=" w-48 pl-4 border-none bg-white text-lg rounded-md text-black focus:outline-none focus:ring-2 focus:ring-transparent focus:border-transparent"
        />
        <Lucide
          icon="ChevronDown"
          className="w-6 h-6 text-black text-sm mt-1 mr-3 cursor-pointer"
          onClick={handleIconClick}
        />
      </Button>

      <Button className='flex flex-row w-full zoom-in'>
        <Flatpickr 
          className="border-none w-20 bg-white text-lg rounded-md text-black focus:outline-none focus:ring-2 focus:ring-transparent focus:border-transparent" 
          options={options} 
        />
        <Lucide
          icon="ChevronDown"
          className="w-6 h-6 text-black text-sm mt-1 mr-3 cursor-pointer"
          // onClick={handleIconClick}
        />
      </Button>

    </div>
  );
};

export default ExistingDatePicker;