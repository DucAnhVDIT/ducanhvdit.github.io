// CustomDatePicker.tsx
import { Calendar } from 'lucide-react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/dark.css';
// import './customeTheme.css'

interface CustomDatePickerProps {
  date: Date;
  goToDate: (date: Date) => void;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ date, goToDate }) => {
  const handleDateChange = (dates: Date[]) => {
    goToDate(dates[0]);
  };

  return (
    <div className='flex flex-row'>
      <Flatpickr
        value={date}
        onChange={handleDateChange}
        options={{ dateFormat: 'D j F, Y' }}
        className="pl-4 border-none bg-primary text-sm rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <Calendar className=" text-white w-4 h-4 mt-2.5 mr-1" />
    </div>
  );
};

export default CustomDatePicker;