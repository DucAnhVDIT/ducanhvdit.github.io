import React from "react";
import Select from "react-select";
import { Calendar, CalendarRange, Sun, Moon, Infinity } from 'lucide-react';

interface SelectViewProps {
  switchToDay: () => void;
  switchToWeek: () => void;
  showAllDay: () => void;
  showMorning: () => void;
  showAfternoon: () => void;
}

const SelectView: React.FC<SelectViewProps> = ({
  switchToWeek,
  switchToDay,
  showAfternoon,
  showAllDay,
  showMorning,
}) => {
  const options = [
    { value: "day", label: "Day", icon: <Calendar size={16} /> },
    { value: "week", label: "Week", icon: <CalendarRange size={16} /> },
    { value: "morning", label: "Morning", icon: <Sun size={16} /> },
    { value: "afternoon", label: "Afternoon", icon: <Moon size={16} /> },
    { value: "allday", label: "All day", icon: <Infinity size={16} /> },
  ];

  const handleChange = (selectedOption: any) => {
    const selectedValue = selectedOption.value;

    switch (selectedValue) {
      case "day":
        switchToDay();
        break;
      case "week":
        switchToWeek();
        break;
      case "morning":
        showMorning();
        break;
      case "afternoon":
        showAfternoon();
        break;
      case "allday":
        showAllDay();
        break;
      default:
      // Do nothing
    }
  };

  const customSingleValue = ({ data }: any) => (
    <div className="flex items-center">
      {data.icon}
      <span className="ml-2">{data.label}</span>
    </div>
  );

  const customOption = (props: any) => {
    const { data, innerRef, innerProps } = props;
    return (
      <div ref={innerRef} {...innerProps} className="flex items-center p-2 hover:bg-gray-200" style={{ cursor: 'pointer' }}>
        {data.icon}
        <span className="ml-2">{data.label}</span>
      </div>
    );
  };

  return (
    <Select
      className="intro-y"
      options={options}
      value={null}
      onChange={handleChange}
      isSearchable={false}
      menuPortalTarget={document.body}
      placeholder="View"
      components={{ SingleValue: customSingleValue, Option: customOption }}
      styles={{
        control: (provided) => ({
          ...provided,
          border: "0",
          boxShadow: "none",
          width: "130px",
          backgroundColor: "#DEE5ED",
          color: "#9BA9BE",
          borderRadius: "9999px",
          paddingLeft: "10px",
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? "var(--primary-light)" : "white",
          color: state.isSelected ? "grey" : "var(--text-color)",
          ":hover": {
            backgroundColor: "lightgrey",
             cursor: 'pointer'
          },
        }),
        placeholder: (provided: any) => ({
          ...provided,
          color: "black",
          fontSize: 15,
        }),
        dropdownIndicator: (provided) => ({
          ...provided,
          color: "black",
        }),
        indicatorSeparator: () => ({
          display: "none",
        }),
        singleValue: (provided, state) => ({
          ...provided,
          color: "white",
        }),
        menuPortal: (base) => ({ ...base, zIndex: 9999, width: "130px" }),
      }}
    />
  );
};

export default SelectView;
