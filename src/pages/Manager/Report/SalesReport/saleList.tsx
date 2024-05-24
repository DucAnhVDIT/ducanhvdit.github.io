import React from "react";

type Sale = {
  order: number;
  date: string;
  subTotal: string;
  discount: string;
  extraDisc: string;
  voucher: string;
  deposit: string;
  giftCard: string;
  tax: string;
  total: string;
  cash: string;
  card: string;
  bankTF: string;
  credit: string;
  tip: string;
  customer: string;
  account: number;
  salesRefund: string;
  note: string;
};

const salesData: Sale[] = [
  {
    order: 45,
    date: "16/05/2024",
    subTotal: "£40.00",
    discount: "£0.00",
    extraDisc: "£0.00",
    voucher: "£0.00",
    deposit: "£0.00",
    giftCard: "£0.00",
    tax: "£6.67",
    total: "£40.00",
    cash: "£40.00",
    card: "£0.00",
    bankTF: "£0.00",
    credit: "£0.00",
    tip: "£0.00",
    customer: "",
    account: 1,
    salesRefund: "Sales",
    note: "",
  },
  {
    order: 46,
    date: "23/05/2024",
    subTotal: "£42.00",
    discount: "£0.00",
    extraDisc: "£0.00",
    voucher: "£0.00",
    deposit: "£0.00",
    giftCard: "£0.00",
    tax: "£7.00",
    total: "£42.00",
    cash: "£0.00",
    card: "£42.00",
    bankTF: "£0.00",
    credit: "£0.00",
    tip: "£0.00",
    customer: "qwdqwd",
    account: 1,
    salesRefund: "Sales",
    note: "",
  },
];

const SaleList: React.FC = () => {
  const calculateTotal = (field: keyof Sale) => {
    return salesData
      .reduce((acc, sale) => {
        const value = sale[field];
        const numericValue =
          typeof value === "string"
            ? parseFloat(value.replace("£", ""))
            : value;
        return acc + numericValue;
      }, 0)
      .toFixed(2);
  };
  return (
    <div className="min-w-full overflow-x-auto p-4">
      <table className="table w-full">
        <thead className="text-black">
          <tr>
            <th>Order</th>
            <th>Date</th>
            <th>Sub Total</th>
            <th>Discount</th>
            <th>Extra Disc</th>
            <th>Voucher</th>
            <th>Deposit</th>
            <th>Gift Card</th>
            <th>Tax</th>
            <th>Total</th>
            <th>Cash</th>
            <th>Card</th>
            <th>Bank TF</th>
            <th>Credit</th>
            <th>Tip</th>
            <th>Customer</th>
            <th>Account</th>
            <th>Sales/Refund</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((sale, index) => (
            <tr key={index}>
              <td>{sale.order}</td>
              <td>{sale.date}</td>
              <td>{sale.subTotal}</td>
              <td>{sale.discount}</td>
              <td>{sale.extraDisc}</td>
              <td>{sale.voucher}</td>
              <td>{sale.deposit}</td>
              <td>{sale.giftCard}</td>
              <td>{sale.tax}</td>
              <td>{sale.total}</td>
              <td>{sale.cash}</td>
              <td>{sale.card}</td>
              <td>{sale.bankTF}</td>
              <td>{sale.credit}</td>
              <td>{sale.tip}</td>
              <td>{sale.customer}</td>
              <td>{sale.account}</td>
              <td>{sale.salesRefund}</td>
              <td>{sale.note}</td>
            </tr>
          ))}
          <tr className="font-bold">
            <td colSpan={2}>Total</td>
            <td>{`£${calculateTotal("subTotal")}`}</td>
            <td>{`£${calculateTotal("discount")}`}</td>
            <td>{`£${calculateTotal("extraDisc")}`}</td>
            <td>{`£${calculateTotal("voucher")}`}</td>
            <td>{`£${calculateTotal("deposit")}`}</td>
            <td>{`£${calculateTotal("giftCard")}`}</td>
            <td>{`£${calculateTotal("tax")}`}</td>
            <td>{`£${calculateTotal("total")}`}</td>
            <td>{`£${calculateTotal("cash")}`}</td>
            <td>{`£${calculateTotal("card")}`}</td>
            <td>{`£${calculateTotal("bankTF")}`}</td>
            <td>{`£${calculateTotal("credit")}`}</td>
            <td>{`£${calculateTotal("tip")}`}</td>
            <td colSpan={4}></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SaleList;
