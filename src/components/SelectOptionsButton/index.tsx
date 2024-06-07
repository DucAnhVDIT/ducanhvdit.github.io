import React, { useState } from 'react';
import Select from 'react-select';

interface Option {
  value: string;
  label: string;
  action: () => void;
}

interface OptionsSelectProps {
  options: Option[];
}

const OptionsSelect: React.FC<OptionsSelectProps> = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState<null | Option>(null);

  const handleChange = (option: Option | null) => {
    if (option?.action) {
      option.action();
    }
    setSelectedOption(null); 
  };

  return (
    <Select
      className="intro-y"
      options={options}
      value={selectedOption} 
      onChange={handleChange}
      isSearchable={false}
      placeholder="Options"
      menuPortalTarget={document.body}
      styles={{
        control: (provided) => ({
          ...provided,
          border: '0',
          boxShadow: 'none',
          width: '130px',
          backgroundColor: '#1E40AF',
          color: 'white',
          paddingLeft: '10px',
          borderRadius: "9999px"
        }),
        option: (provided, state) => ({
          ...provided,
          borderBottom: state.label === 'All Staff' ? '1px solid grey' : 'none',
          backgroundColor: state.isSelected ? 'var(--primary-light)' : 'white',
          color: state.isSelected ? 'grey' : 'var(--text-color)',
          ':hover': {
            backgroundColor: 'lightgrey',
          },
        }),
        placeholder: (provided) => ({
          ...provided,
          color: 'white',
          fontSize: 15,
        }),
        dropdownIndicator: (provided) => ({
          ...provided,
          color: 'white',
        }),
        indicatorSeparator: () => ({
          display: 'none',
        }),
        singleValue: (provided) => ({
          ...provided,
          color: 'white',
        }),
        menuPortal: base => ({ ...base, zIndex: 9999, width: "150px", padding: "0px" })
      }}
    />
  );
};

export default OptionsSelect;
