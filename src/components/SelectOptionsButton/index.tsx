import React, { useState } from 'react';
import Select from 'react-select';
import { Clock, Settings, Sliders, RefreshCw, RotateCw } from 'lucide-react';

interface Option {
  value: string;
  label: string;
  action: () => void;
  icon: JSX.Element;
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

  const customSingleValue = ({ data }: any) => (
    <div className="flex items-center">
      {data.icon}
      <span className="ml-2">{data.label}</span>
    </div>
  );

  const customOption = (props: any) => {
    const { data, innerRef, innerProps } = props;
    return (
      <div ref={innerRef} {...innerProps} className="flex items-center p-2">
        {data.icon}
        <span className="ml-2">{data.label}</span>
      </div>
    );
  };

  return (
    <Select
      className="intro-y"
      options={options}
      value={selectedOption}
      onChange={handleChange}
      isSearchable={false}
      placeholder="Options"
      components={{ SingleValue: customSingleValue, Option: customOption }}
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
