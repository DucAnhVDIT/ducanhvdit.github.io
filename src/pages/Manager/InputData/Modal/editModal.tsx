import React, { useState, useEffect } from 'react';

interface EditModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (categoryId: number, newName: string) => void;
  categoryId: number;
  initialName: string;
}

const EditModal: React.FC<EditModalProps> = ({ show, onClose, onSave, categoryId, initialName }) => {
  const [name, setName] = useState(initialName);

  useEffect(() => {
    setName(initialName);
  }, [initialName]);

  const handleSave = () => {
    onSave(categoryId, name);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Category</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="btn bg-primary text-white px-4 py-2 rounded-md shadow-md w-full sm:w-auto"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
