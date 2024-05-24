import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  BarElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";
import "chart.js/auto";

Chart.register(BarElement, LinearScale, Title, CategoryScale);

const servicesData = [
  { staffName: "Staff 1", date: "23/05/2024", service: "GEL ON HANDS", price: 20.0 },
  { staffName: "Staff 1", date: "23/05/2024", service: "GEL ON FEET", price: 22.0 },
  { staffName: "Staff 2", date: "23/05/2024", service: "GEL ON HANDS", price: 18.0 },
  { staffName: "Staff 2", date: "23/05/2024", service: "GEL ON FEET", price: 25.0 },
];

const total = servicesData.reduce((acc, item) => acc + item.price, 0);

const categoryData = {
  labels: ["GEL ON HANDS", "GEL ON FEET"],
  datasets: [
    {
      label: "Service Total (£)",
      data: [40, 47],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const staffComparisonData = {
  labels: ["Staff 1", "Staff 2"],
  datasets: [
    {
      label: "Staff Comparison (£)",
      data: [
        servicesData.filter(item => item.staffName === "Staff 1").reduce((acc, item) => acc + item.price, 0),
        servicesData.filter(item => item.staffName === "Staff 2").reduce((acc, item) => acc + item.price, 0),
      ],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

function StaffServicePerformance() {
  return (
    <div className="p-6 w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Staff Service Details</h1>
      </div>
      <div className="mb-6">
        <div className="flex justify-between">
          <span>From: 23/05/2024</span>
          <span>To: 23/05/2024</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full border rounded-md">
          <thead className="text-black">
            <tr>
              <th>Staff Name</th>
              <th>Date</th>
              <th>Services</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {servicesData.map((service, index) => (
              <tr key={index}>
                <td>{service.staffName}</td>
                <td>{service.date}</td>
                <td>{service.service}</td>
                <td>£{service.price.toFixed(2)}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={3} className="text-right font-bold">Total:</td>
              <td className="font-bold">£{total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <div className="lg:col-span-1">
          <div className="card border rounded-md border-slate-500/60 p-5">
            <h2 className="card-title">Service Totals by Category</h2>
            <Bar
              data={categoryData}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
              }}
            />
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="card border rounded-md border-slate-500/60 p-5">
            <h2 className="card-title">Service Totals by Staff</h2>
            <Bar
              data={staffComparisonData}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffServicePerformance;
