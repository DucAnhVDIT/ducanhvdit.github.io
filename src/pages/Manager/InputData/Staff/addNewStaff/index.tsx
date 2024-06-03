import React, { useEffect, useState } from "react";
import AddStaffProgress from "./addStaffProgress";
import step1 from "./step1";
import BottomButtons from "./bottomButtons";
import Step1 from "./step1";

const steps = [
  "Personal Information",
  "Staff Service",
  "Staff Schedule",
  "Complete",
];

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
      <div className="flex-1 p-6">
        <div className="p-6 rounded-lg ">
          {activeStep === 0 && <Step1 />}
        </div>
      </div>
      <BottomButtons
        activeStep={activeStep}
        steps={steps}
        handleNext={handleNext}
        handleBack={handleBack}
        handleClose={() => {}}
      />
    </div>
  );
};

export default AddStaffSteps;
