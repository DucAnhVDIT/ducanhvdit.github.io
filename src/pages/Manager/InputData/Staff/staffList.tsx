import React, { useEffect, useState } from "react";
import calendarRepository from "../../../../repositories/calendarRepository";
import { MoreVertical, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

function StaffList() {
  const [date, setDate] = useState(new Date());
  const [staffData, setStaffData] = useState<any[]>([]);
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStaffApiData();
  }, []);

  const fetchStaffApiData = async () => {
    try {
      const res = await calendarRepository.getStaff(
        Math.floor(date.getTime() / 1000)
      );
      setStaffData(res.data.Staffs);
    } catch (error) {
      console.error(error);
    }
  };

  const getInitials = (name: string) => {
    if (!name) return "";
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("");
    return initials.toUpperCase();
  };

  const renderAvatar = (staff: any) => {
    if (staff.Logo) {
      return (
        <img src={staff.Logo} alt="avatar" className="rounded-full w-10 h-10" />
      );
    }
    return (
      <div className="bg-primary rounded-full w-10 h-10 flex items-center justify-center text-white text-xl">
        {getInitials(staff.StaffName)}
      </div>
    );
  };

  const handleDropdownToggle = (index: number) => {
    setDropdownVisible(dropdownVisible === index ? null : index);
  };

  const handleAddStaff = () => {
    navigate("/manager/inputdata/add-new-staff"); 
  };

  return (
    <div className="p-6 w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Staff List</h1>
        <button className="btn btn-primary flex items-center" onClick={handleAddStaff} >
          <Plus size={20} className="mr-2"/>
          Add Staff
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className=" text-black">
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffData.map((staff: any, index: number) => (
              <tr key={staff.Id}>
                <td className="flex items-center space-x-3 py-4">
                  {renderAvatar(staff)}
                  <span className="font-bold text-xl">{staff.StaffName}</span>
                </td>
                <td className="py-4">
                  <span className="text-blue-500">{staff.Email}</span>
                  {staff.Phone && <div>{staff.Phone}</div>}
                </td>

                <td className="py-4">
                  <div className="relative">
                    <button
                      className="btn bg-primary"
                      onClick={() => handleDropdownToggle(index)}
                    >
                      <MoreVertical size={20} />
                    </button>
                    {dropdownVisible === index && (
                      <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
                        <div className="py-1">
                          <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
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
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StaffList;
