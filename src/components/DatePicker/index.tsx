// CustomDatePicker.tsx
import { Calendar } from 'lucide-react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/dark.css';
import { useRef } from 'react';

import Lucide from '../../base-components/Lucide';
import Button from '../../base-components/Button';


interface CustomDatePickerProps {
  date: Date;
  goToDate: (date: Date) => void;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ date, goToDate }) => {
  const handleDateChange = (dates: Date[]) => {
    goToDate(dates[0]);
  };

  const flatpickrRef = useRef<Flatpickr | null>(null);

  const handleIconClick = () => {
    // Open/close Flatpickr when the icon is clicked
    flatpickrRef.current?.flatpickr.open();
  };

  return (
    <div className='flex flex-row'>
      <Button className='flex flex-row w-full border-none shadow-none p-0'>
        <Flatpickr
          ref={flatpickrRef}
          value={date}
          onChange={handleDateChange}
          options={{ dateFormat: 'D j M Y' }}
          className=" w-32 font-normal p-0 cursor-pointer pl-4 border-none bg-primary text-sm rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <Lucide
          icon="Calendar"
          className="w-4 h-4 text-white text-sm mr-3 cursor-pointer"
          onClick={handleIconClick}
        />
      </Button>
    </div>
  );
};

export default CustomDatePicker;