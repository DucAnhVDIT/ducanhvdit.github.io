// CustomDatePicker.tsx
import { Calendar } from 'lucide-react';
import Flatpickr from 'react-flatpickr';

interface CustomDatePickerProps {
  date: Date;
  goToDate: (date: Date) => void;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ date, goToDate }) => {
  const handleDateChange = (dates: Date[]) => {
    goToDate(dates[0]);
  };

  return (
    <div className="relative">
      <Flatpickr
        value={date}
        onChange={handleDateChange}
        options={{ dateFormat: 'D, j F Y' }}
        className="pl-4w-64 border-none bg-primary text-sm rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <Calendar className="absolute right-1 top-1/2 transform -translate-y-1/2 text-white w-4 h-4" />
    </div>
  );
};

export default CustomDatePicker;