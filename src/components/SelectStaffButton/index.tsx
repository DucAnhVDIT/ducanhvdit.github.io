import React from "react";
import Select from "react-select";

interface SelectStaffProps {
  staffData: any;
  selectedStaff: any;
  handleStaffChange: (selectedOption: any) => void;
}

const SelectStaff: React.FC<SelectStaffProps> = ({
  staffData,
  selectedStaff,
  handleStaffChange,
}) => {
  const options = [
    { value: "", label: "All Staff" },
    ...staffData.map((staff: { StaffID: any; StaffName: any }) => ({
      value: String(staff.StaffID),
      label: staff.StaffName,
    })),
  ];

  return (
    <Select
      className="intro-y"
      options={options}
      value={options.find((option) => option.value === selectedStaff)}
      onChange={handleStaffChange}
      isSearchable={false}
      menuPortalTarget={document.body}
      placeholder="Staff"
      styles={{
        control: (provided) => ({
          ...provided,
          border: "0",
          boxShadow: "none",
          width: "130px",
          backgroundColor: "#DEE5ED",
          color: "#9BA9BE",
          paddingLeft: "10px",
          borderRadius: "9999px",
        }),
        option: (provided, state) => ({
          ...provided,
          borderBottom: state.label === "All Staff" ? "1px solid grey" : "none", // Add border to "All Staff"
          backgroundColor: state.isSelected ? "var(--primary-light)" : "white",
          color: state.isSelected ? "grey" : "var(--text-color)",
          ":hover": {
            backgroundColor: "lightgrey",
            cursor: "pointer",
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
          // paddingRight: "20px"
        }),
        indicatorSeparator: () => ({
          display: "none",
        }),
        singleValue: (provided, state) => ({
          ...provided,
          color: "black",
        }),
        menuPortal: (base) => ({
          ...base,
          zIndex: 9999,
          width: "130px",
          padding: "0px",
        }),
      }}
    />
  );
};

export default SelectStaff;
