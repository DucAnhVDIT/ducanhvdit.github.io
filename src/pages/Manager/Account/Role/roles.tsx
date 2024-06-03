import React from "react";

function Roles() {
  return (
    <div className="overflow-x-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Roles List</h1>
        <button className="btn btn-primary sm:relative sm:bottom-0 sm:left-0">
          Add Role
        </button>
      </div>
      <table className="table w-full">
        <thead className="text-black">
          <tr>
            <th>Roles Name</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-200">
            <td>Staff</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Roles;
