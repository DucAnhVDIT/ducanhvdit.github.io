import React, { useState } from 'react';
import Select, { components } from 'react-select';
import { Settings } from 'lucide-react';

interface Option {
  value: string;
  label: string;
  action: () => void;
  icon: JSX.Element;
}

interface OptionsSelectProps {
  options: Option[];
}

const customOption = (props: any) => {
  const { data, innerRef, innerProps } = props;
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className="flex items-center p-2 hover:bg-gray-200"
      style={{ cursor: 'pointer' }}
    >
      {data.icon}
      <span className="ml-2">{data.label}</span>
    </div>
  );
};

const customPlaceholder = (props: any) => {
  return (
    <components.Placeholder {...props}>
      <Settings />
    </components.Placeholder>
  );
};

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
      placeholder={<Settings />}
      components={{
        Option: customOption,
        Placeholder: customPlaceholder,
      }}
      menuPortalTarget={document.body}
      styles={{
        control: (provided) => ({
          ...provided,
          border: '0',
          boxShadow: 'none',
          width: '40px',
          height: '40px',
          backgroundColor: "#DEE5ED",
          color: 'white',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0', 
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
          color: 'black',
          fontSize: 15,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0', 
        }),
        dropdownIndicator: () => ({
          display: 'none',
        }),
        indicatorSeparator: () => ({
          display: 'none',
        }),
        singleValue: (provided) => ({
          ...provided,
          display: 'none', 
        }),
        menuPortal: (base) => ({
          ...base,
          zIndex: 9999,
          width: '150px',
          padding: '0px',
        }),
      }}
    />
  );
};

export default OptionsSelect;
