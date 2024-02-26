
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
    <div className="relative inline-block">
    {/* <select
      value={selectedStatus}
      placeholder='Change status'
      onChange={(e) => onSelectStatus(Number(e.target.value))}
      className="block appearance-none w-full bg-white border border-gray-300 rounded-md py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-primary focus:ring focus:ring-primary"
    >
      <option value="" disabled hidden>Change status</option>
      {statusOptions.map((status) => (
        <option key={status.id} value={status.id} className="bg-white text-gray-800">
          {status.label}
        </option>
      ))}
    </select> */}

    <Select
          value={null}
          options={statusOptions}
          placeholder="Change status"
          onChange={(selectedOption) => onSelectStatus(selectedOption?.value ?? 0)}
          styles={{
            control: (provided) => ({
              ...provided,
              border:'none',
              backgroundColor: 'var(--primary)',
              // paddingRight: '8px', // Adjust the paddingRight to reduce space
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
          }}
          isSearchable={false}
        />

  </div>

  );
};

export default StatusButtons