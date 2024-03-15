
import React, { useState } from 'react';
import Select from 'react-select';

interface StatusButtonsProps {
    selectedStatus: number; 
    onSelectStatus: (statusId: number) => void;
  }

const StatusButtons: React.FC<StatusButtonsProps> = ({ selectedStatus, onSelectStatus }) => {
  const statusOptions = [
    { value: 1, label: 'Confirmed' },
    { value: 5, label: 'Late' },
    { value: 6, label: 'Canceled' },
    { value: 7, label: 'No Show' },
    { value: 8, label: 'Arrive' },
    { value: 9, label: 'Served' },
    { value: 10, label: 'Done' },
  ];

  return (
    <div>
    <Select
          value={null}
          options={statusOptions}
          placeholder="Change status"
          onChange={(selectedOption) => onSelectStatus(selectedOption?.value ?? 0)}
          menuPortalTarget={document.body} 
          styles={{
            control: (provided) => ({
              ...provided,
              border:'0',
              boxShadow: 'none',
              backgroundColor: 'var(--primary)',
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isSelected ? 'var(--primary-light)' : 'white',
              color: state.isSelected ? 'grey' : 'var(--text-color)',
              ':hover': {
                backgroundColor: 'lightgrey', 
              },
              zIndex: 2
            }),
            placeholder: (provided: any) => ({
              ...provided,
              color: 'white',
              fontSize:16
            }),
            dropdownIndicator: (provided) => ({
              ...provided,
              color: 'white',
              // paddingRight: "20px"
            }),
            indicatorSeparator: () => ({
              display: 'none', 
            }),
            menuPortal: base => ({ ...base, zIndex: 9999 })
          }}
          isSearchable={false}
        />
   </div>

  );
};

export default StatusButtons