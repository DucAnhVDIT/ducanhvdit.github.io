import { Users } from "lucide-react";
import React from "react";
import Select, { components } from "react-select";

interface SelectStaffProps {
  staffData: any;
  selectedStaff: any;
  handleStaffChange: (selectedOption: any) => void;
}

const SelectStaffMobile: React.FC<SelectStaffProps> = ({
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

  const customPlaceholder = (props: any) => {
    return (
      <components.Placeholder {...props}>
        <Users size={20} />
      </components.Placeholder>
    );
  };

  const customSingleValue = (props: any) => {
    return (
      <components.SingleValue {...props}>
        <div className="flex items-center">
          <Users size={20} className="mr-2" />
          {props.data.label}
        </div>
      </components.SingleValue>
    );
  };

  return (
    <Select
      className="intro-y"
      options={options}
      value={options.find((option) => option.value === selectedStaff)}
      onChange={handleStaffChange}
      isSearchable={false}
      menuPortalTarget={document.body}
      placeholder="View"
      components={{
        Placeholder: customPlaceholder,
        SingleValue: customSingleValue,
      }}
      styles={{
        control: (provided) => ({
          ...provided,
          border: "0",
          boxShadow: "none",
          width: "40px",
          height: "40px",
          backgroundColor: "#DEE5ED",
          color: "white",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0",
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0",
        }),
        dropdownIndicator: () => ({
          display: "none",
        }),
        indicatorSeparator: () => ({
          display: "none",
        }),
        singleValue: (provided) => ({
          ...provided,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0",
        }),
        menu: (provided) => ({
          ...provided,
          width: "auto",
          minWidth: "150px",
          left: 0, 
        }),
        menuPortal: (base) => ({
          ...base,
          zIndex: 9999,
          width: "auto",
          minWidth: "150px",
          padding: "0px",
        }),
      }}
    />
  );
};

export default SelectStaffMobile;
