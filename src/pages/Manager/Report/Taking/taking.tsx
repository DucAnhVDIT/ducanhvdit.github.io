import React from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  BarElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";
import "chart.js/auto";

Chart.register(
  LineElement,
  BarElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale
);

const fakeSalesData = {
  labels: [
    "01/05/2024",
    "02/05/2024",
    "03/05/2024",
    "04/05/2024",
    "05/05/2024",
    "06/05/2024",
    "07/05/2024",
  ],
  datasets: [
    {
      label: "Daily Sales (£)",
      data: [500, 700, 800, 600, 900, 700, 850],
      borderColor: "rgb(75, 192, 192)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      fill: false,
    },
    {
      label: "Online Deposits (£)",
      data: [100, 150, 200, 130, 180, 160, 175],
      borderColor: "rgb(54, 162, 235)",
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      fill: false,
    },
  ],
};

const categoryData = {
  labels: [
    "Refund",
    "Cash",
    "Card",
    "Bank TF",
    "Tips",
    "Voucher",
    "Discount",
    "Online Deposit",
    "Credit",
    "Gift Card",
  ],
  datasets: [
    {
      label: "Category Total (£)",
      data: [50, 200, 300, 150, 100, 75, 25, 180, 230, 90],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(199, 199, 199, 0.2)",
        "rgba(83, 102, 255, 0.2)",
        "rgba(40, 159, 64, 0.2)",
        "rgba(255, 206, 10, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(199, 199, 199, 1)",
        "rgba(83, 102, 255, 1)",
        "rgba(40, 159, 64, 1)",
        "rgba(255, 206, 10, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const appointmentsData = {
  labels: [
    "01/05/2024",
    "02/05/2024",
    "03/05/2024",
    "04/05/2024",
    "05/05/2024",
    "06/05/2024",
    "07/05/2024",
    "08/05/2024",
    "09/05/2024",
    "10/05/2024",
    "11/05/2024",
    "12/05/2024",
    "13/05/2024",
    "14/05/2024",
    "15/05/2024",
    "16/05/2024",
    "17/05/2024",
    "18/05/2024",
    "19/05/2024",
    "20/05/2024",
    "21/05/2024",
    "22/05/2024",
    "23/05/2024",
  ],
  datasets: [
    {
      label: "Appointments",
      data: [
        0, 0, 1, 0, 0, 2, 0, 0, 3, 1, 2, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1,
      ],
      borderColor: "rgb(75, 192, 192)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      fill: false,
    },
  ],
};

function Taking() {
  return (
    <div className="p-6 w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Daily Taking Report</h1>
      </div>

      {/* Total */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-1">
          <div className="card border rounded-md border-slate-500/60 p-4 mb-5">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">Net Totals</h2>
                <a href="#report" className="text-blue-500 font-medium">
                  View report
                </a>
              </div>
              <div className="text-4xl font-bold mb-2">£1000.00</div>
              <div className="text-gray-500 mb-3">vs comp period</div>
              <ul className="space-y-2">
                {[
                  { label: "Sub Totals", amount: "£900.00", change: "0%" },
                  { label: "Tax", amount: "£60.00", change: "0%" },
                  { label: "Cash", amount: "£200.00", change: "0%" },
                  { label: "Card", amount: "£160.00", change: "0%" },
                  { label: "Bank TF", amount: "£90.00", change: "0%" },
                  { label: "Tips", amount: "£80.00", change: "0%" },
                  { label: "Voucher", amount: "£60.00", change: "0%" },
                  { label: "Discount", amount: "£20.00", change: "0%" },
                  { label: "Deposit", amount: "£30.00", change: "0%" },
                ].map((item) => (
                  <li
                    key={item.label}
                    className="flex justify-between items-center"
                  >
                    <span>{item.label}</span>
                    <div className="flex items-center space-x-2">
                      <span>{item.amount}</span>
                      <div className="text-gray-400">{item.change}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* Total */}

        {/* Total Chart */}

        <div className="lg:col-span-2">
          <div className="card border rounded-md border-slate-500/60 p-5">
            <h2 className="card-title">Sales by category</h2>
            <Bar
              data={categoryData}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
              }}
            />
          </div>
        </div>

        {/* Total Chart */}
        
        {/* Appointment */}
        <div className="lg:col-span-1">
          <div className="card border rounded-md border-slate-500/60 p-4 mb-5">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">Appointments</h2>
                <a href="#report" className="text-blue-500 font-medium">
                  View report
                </a>
              </div>
              <div className="text-4xl font-bold mb-2">8</div>
              <div className="text-gray-500 mb-4">vs comp period</div>
              <ul className="space-y-2">
                {[
                  { label: "Not completed", amount: "8", change: "166.7%" },
                  { label: "Completed", amount: "0", change: "0%" },
                  { label: "No shows", amount: "0", change: "0%" },
                  { label: "Cancelled", amount: "0", change: "0%" },
                ].map((item) => (
                  <li
                    key={item.label}
                    className="flex justify-between items-center"
                  >
                    <span>{item.label}</span>
                    <div className="flex items-center space-x-2">
                      <span>{item.amount}</span>
                      <div className="text-gray-400">{item.change}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* Appointment */}

        {/* Appointment Chart */}
        <div className="lg:col-span-2">
          <div className="card border rounded-md border-slate-500/60 p-4">
            <h2 className="card-title">Appointments overtime</h2>
            <Line
              data={appointmentsData}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
              }}
            />
          </div>
        </div>

        {/* Appointment Chart */}
      </div>
    </div>
  );
}

export default Taking;
