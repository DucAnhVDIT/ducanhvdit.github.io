import React, { useState } from 'react';

interface StatusButtonsProps {
    selectedStatus: number; 
    onSelectStatus: (statusId: number) => void;
  }

const StatusButtons: React.FC<StatusButtonsProps> = ({ selectedStatus, onSelectStatus }) => {
  const statusOptions = [
    { id: 0, label: 'Not Confirmed' },
    { id: 1, label: 'Confirmed' },
    { id: 2, label: 'Left Message' },
    { id: 3, label: 'No Answer' },
    { id: 4, label: 'Wrong Number' },
    { id: 5, label: 'Late' },
    { id: 6, label: 'Canceled' },
    { id: 7, label: 'No Show' },
    { id: 8, label: 'Arrive' },
    { id: 9, label: 'Served' },
    { id: 10, label: 'Done' },
    { id: 11, label: 'Canceled2' },
  ];

  return (
    <div>
      <select
        value={selectedStatus}
        onChange={(e) => onSelectStatus(Number(e.target.value))}
      >
        {statusOptions.map((status) => (
          <option key={status.id} value={status.id}>
            {status.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StatusButtons