import React from "react";
import "daisyui";
import { Info } from "lucide-react";
import { useSelector } from "react-redux";
import { selectSelectedCustomer } from "../../../stores/customerSlide";

const StatCard = ({ title, value }: any) => (
  <div className="bg-white border-slate-500/60 border rounded-lg p-4 flex items-center justify-between">
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
    <div className="tooltip" data-tip="Information about this stat">
      <Info />
    </div>
  </div>
);

const StatsGrid = () => {
  const selectedCustomer = useSelector(selectSelectedCustomer);
  const numOfCancelled = selectedCustomer?.Customer?.Appointments?.filter(
    (appointment: { StatusID: number }) => appointment.StatusID === 6
  ).length;
  const numOfNoShow = selectedCustomer?.Customer?.Appointments?.filter(
    (appointment: { StatusID: number }) => appointment.StatusID === 7
  ).length;

  return (
    <div className="flex justify-center md:flex items-center flex-col md:border md:rounded-md md:border-slate-500/60 w-full overflow-y-auto p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 w-full max-w-4xl">
        <StatCard title="Total spent" value="£0" />
        <StatCard
          title="Appointments"
          value={selectedCustomer?.Customer.Appointments?.length || 0}
        />
        <StatCard title="Cancelled" value={numOfCancelled} />
        <StatCard title="No show" value={numOfNoShow} />
      </div>
    </div>
  );
};

export default StatsGrid;
