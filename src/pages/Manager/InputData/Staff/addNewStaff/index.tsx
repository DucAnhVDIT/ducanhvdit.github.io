import React, { useEffect, useState } from "react";
import AddStaffProgress from "./addStaffProgress";
import AddStaffProgress2 from "./addStaffProgress2";

const steps = ["Personal Information", "Address", "Complete"];

const AddStaffSteps: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  useEffect(() => {
    document.body.style.backgroundColor = "white";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AddStaffProgress
        activeStep={activeStep}
        steps={steps}
        handleNext={handleNext}
        handleBack={handleBack}
      />
    </div>
  );
};

export default AddStaffSteps;
