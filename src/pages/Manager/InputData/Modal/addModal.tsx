import React, { useState } from 'react';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onAddCategory: (name: string, color: string, description: string) => void;
  onAddService: (name: string, duration: string, description: string) => void;
  isAddingCategory: boolean;
}

const AddModal: React.FC<ModalProps> = ({ show, onClose, onAddCategory, onAddService, isAddingCategory }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#ffffff');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');

  const handleAdd = () => {
    if (isAddingCategory) {
      onAddCategory(name, color, description);
    } else {
      onAddService(name, duration, description);
    }
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {isAddingCategory ? 'New Category' : 'New Service'}
          </h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">{isAddingCategory ? 'Category Name' : 'Service Name'}</label>
          <input
            type="text"
            placeholder={isAddingCategory ? 'e.g. Hair Services' : 'e.g. Haircut'}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>
        {isAddingCategory ? (
          <div className="mb-4">
            <label className="block text-gray-700">Appointment Color</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
        ) : (
          <div className="mb-4">
            <label className="block text-gray-700">Duration</label>
            <input
              type="text"
              placeholder="e.g. 30 mins"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            rows={4}
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleAdd}
            className="btn bg-primary text-white px-4 py-2 rounded-md shadow-md w-full sm:w-auto"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
