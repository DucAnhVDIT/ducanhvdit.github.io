import React, { useState } from "react";
import { MoreVertical, Plus } from "lucide-react";

function FormsTable() {
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);
  const forms = [
    {
      id: 1,
      name: "COVID 19",
      services: "All services",
      request: "Before appointment",
      status: "Inactive",
    },
  ];

  const handleDropdownToggle = (index: number) => {
    setDropdownVisible(dropdownVisible === index ? null : index);
  };

  return (
    <div className="p-6 w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Forms</h1>
        
        <button className="btn btn-primary flex items-center">Add Form</button>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="text-black">
            <tr>
              <th>Form name</th>
              <th>Services</th>
              <th>Request</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {forms.map((form, index) => (
              <tr key={form.id} className="hover:bg-gray-100">
                <td className="font-bold">{form.name}</td>
                <td>{form.services}</td>
                <td>{form.request}</td>
                <td>
                  <span className="badge badge-warning">{form.status}</span>
                </td>
                <td className="relative">
                  <button
                    className="btn bg-primary"
                    onClick={() => handleDropdownToggle(index)}
                  >
                    <MoreVertical size={20} />
                  </button>
                  {dropdownVisible === index && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
                      <div className="py-1">
                        <button
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                          // onClick={() => handleEditStaff(staff)}
                        >
                          Edit
                        </button>
                        <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                          View calendar
                        </button>
                        <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FormsTable;
