import React from "react";
import Select from "react-select";

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
    { value: "day", label: "Day" },
    { value: "week", label: "Week" },
    { value: "morning", label: "Morning" },
    { value: "afternoon", label: "Afternoon" },
    { value: "allday", label: "All day" },
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

  return (
    <Select
      className="intro-y"
      options={options}
      value={null}
      onChange={handleChange}
      isSearchable={false}
      menuPortalTarget={document.body}
      placeholder="View"
      styles={{
        control: (provided) => ({
          ...provided,
          border: "0",
          boxShadow: "none",
          width: "130px",
          backgroundColor: "#1E40AF",
          color: "white",
          borderRadius: "9999px",
          paddingLeft: "10px",
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? "var(--primary-light)" : "white",
          color: state.isSelected ? "grey" : "var(--text-color)",
          ":hover": {
            backgroundColor: "lightgrey",
          },
        }),
        placeholder: (provided: any) => ({
          ...provided,
          color: "white",
          fontSize: 15,
        }),
        dropdownIndicator: (provided) => ({
          ...provided,
          color: "white",
          // paddingRight: "20px"
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
