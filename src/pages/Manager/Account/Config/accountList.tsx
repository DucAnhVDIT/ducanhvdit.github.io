// src/AccountList.js
import React from "react";

function AccountList() {
  return (
    <div className="overflow-x-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Account List</h1>
        <button className="btn btn-primary sm:relative sm:bottom-0 sm:left-0">
          Add Account
        </button>
      </div>
      <table className="table w-full">
        <thead className="text-black">
          <tr>
            <th>Account</th>
            <th>Display Name</th>
            <th>Level</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-200">
            <td>1</td>
            <td>Administrator</td>
            <td>Manager</td>
            <td></td>
          </tr>
          <tr className="hover:bg-gray-200">
            <td>2</td>
            <td>Staff</td>
            <td>User</td>
            <td>Staff</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AccountList;
