import React from "react";

interface Voucher {
  id: number;
  voucherName: string;
  numberIssued: number;
  startDate: string;
  expireDate: string;
  currencyDiscount: string;
  term: string;
  activate: boolean;
}

interface VoucherListProps {
  vouchers: Voucher[];
}

function VoucherList({ vouchers }: VoucherListProps) {
  return (
    <div className="p-6 w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Vouchers</h1>
        <button className="btn btn-primary flex items-center">Add Voucher</button>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="text-black">
            <tr>
              <th>Voucher Name</th>
              <th>Number Issued</th>
              <th>Start Date</th>
              <th>Expire Date</th>
              <th>Currency Discount</th>
              <th>Term</th>
              <th>Activate</th>
            </tr>
          </thead>
          <tbody>
            {vouchers?.map((form) => (
              <tr key={form.id} className="hover:bg-gray-100">
                <td className="font-bold">{form.voucherName}</td>
                <td>{form.numberIssued}</td>
                <td>{form.startDate}</td>
                <td>{form.expireDate}</td>
                <td>{form.currencyDiscount}</td>
                <td>{form.term}</td>
                <td>
                  <input type="checkbox" checked={form.activate} readOnly />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VoucherList;
