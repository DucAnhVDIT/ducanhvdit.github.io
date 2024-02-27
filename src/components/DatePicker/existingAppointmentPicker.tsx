
import { Calendar } from 'lucide-react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/dark.css';
import Lucide from '../../base-components/Lucide';
import Button from '../../base-components/Button';
import { useEffect, useRef, useState } from 'react';



interface ExistingDatePickerProps {
  date: Date;
  goToDate: (date: Date) => void;
}

const ExistingDatePicker: React.FC<ExistingDatePickerProps> = ({ date, goToDate }) => {
  const [flatpickrValue, setFlatpickrValue] = useState(date);
  
  const handleDateChange = (dates: Date[]) => {
    goToDate(dates[0]);
    setFlatpickrValue(dates[0]);
  };
  

  const flatpickrRef = useRef<Flatpickr | null>(null);

  const handleIconClick = () => {
    // Open/close Flatpickr when the icon is clicked
    flatpickrRef.current?.flatpickr.open();
  };



  return (
    <div className='flex flex-row'>
      <Button className='flex flex-row w-full zoom-in'>
        <Flatpickr
          ref={flatpickrRef}
          value={flatpickrValue}
          onChange={handleDateChange}
          options={{ dateFormat: 'D j F, Y' }}
          className="pl-4 border-none bg-white text-lg rounded-md text-black focus:outline-none focus:ring-2 focus:ring-transparent focus:border-transparent"
        />
        <Lucide
          icon="ChevronDown"
          className="w-6 h-6 text-black text-sm mt-1 mr-3 cursor-pointer"
          onClick={handleIconClick}
        />
      </Button>
    </div>
  );
};

export default ExistingDatePicker;