import React from 'react';
import Select from 'react-select';

interface SelectViewProps {
  switchToDay: () => void;
  switchToWeek: () => void;
}

const SelectView: React.FC<SelectViewProps> = ({ switchToWeek, switchToDay }) => {
  const options = [
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
  ];

  const handleChange = (selectedOption: any) => {
    const selectedValue = selectedOption.value;

    switch (selectedValue) {
      case 'day':
        switchToDay();
        break;
      case 'week':
        switchToWeek();
        break;
      default:
        // Do nothing
    }
  };

  return (
    <Select
      className='intro-y'
      options={options}
      value={null}
      onChange={handleChange}
      isSearchable={false}
      menuPortalTarget={document.body}
      placeholder="View"
      styles={{
        control: (provided) => ({
          ...provided,
          border: '0',
          boxShadow: 'none',
          width: '130px',
          backgroundColor: '#1E40AF',
          color: 'white',
          borderRadius: '9999px',
          paddingLeft: '10px',
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? 'var(--primary-light)' : 'white',
          color: state.isSelected ? 'grey' : 'var(--text-color)',
          ':hover': {
            backgroundColor: 'lightgrey',
          },
        }),
        placeholder: (provided: any) => ({
          ...provided,
          color: 'white',
          fontSize: 15,
        }),
        dropdownIndicator: (provided) => ({
          ...provided,
          color: 'white',
          // paddingRight: "20px"
        }),
        indicatorSeparator: () => ({
          display: 'none',
        }),
        singleValue: (provided, state) => ({
          ...provided,
          color: 'white',
        }),
        menuPortal: (base) => ({ ...base, zIndex: 9999, width: '130px' }),
      }}
    />
  );
};

export default SelectView;
