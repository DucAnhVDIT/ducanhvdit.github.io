import React from "react";
import "./styltes.css";
import { Link } from "react-router-dom";
import Lucide from "../../../../../base-components/Lucide";

interface AddStaffProgressProps {
  activeStep: number;
  steps: string[];
  handleNext: () => void;
  handleBack: () => void;
}

const AddStaffProgress: React.FC<AddStaffProgressProps> = ({
  activeStep,
  steps,
  handleNext,
  handleBack,
}) => {
  const progress = ((activeStep + 1) / steps.length) * 100;

  return (
    <header className="sticky top-0 p-4 flex items-center justify-between w-full z-10">
      <Link to="/manager/inputdata/staff" className="text-lg font-bold mr-5">
        <Lucide icon={"X"} />
      </Link>
      <button
        disabled={activeStep === 0}
        className={`btn btn-primary mr-4 ${
          activeStep === 0 ? "btn-disabled" : ""
        }`}
        onClick={handleBack}
      >
        Previous
      </button>
      <div className="flex-1 text-center">
        <div className="text-sm text-gray-500">{`Step ${activeStep + 1} of ${
          steps.length
        }`}</div>
        <div className="text-xl font-semibold">{steps[activeStep]}</div>
      </div>
      <button
        disabled={activeStep === steps.length - 1}
        className={`btn btn-primary ml-4 ${
          activeStep === steps.length - 1 ? "btn-disabled" : ""
        }`}
        onClick={handleNext}
      >
        Next step
      </button>
      <div
        className="absolute bottom-0 left-0 h-1 bg-primary"
        style={{ width: `${progress}%` }}
      ></div>
    </header>
  );
};

export default AddStaffProgress;
