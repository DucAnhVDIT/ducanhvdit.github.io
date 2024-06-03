import React from "react";

interface BottomButtonsProps {
  activeStep: number;
  steps: string[];
  handleNext: () => void;
  handleBack: () => void;
  handleClose: () => void;
}

const BottomButtons: React.FC<BottomButtonsProps> = ({
  activeStep,
  steps,
  handleNext,
  handleBack,
  handleClose,
}) => {
  return (
    <div className="block sm:hidden fixed bottom-0 left-0 w-full bg-white p-4 flex-col  shadow-md z-10">
      <div className="flex flex-col space-y-2">
        <button
          disabled={activeStep === 0}
          className={`btn btn-primary w-full ${
            activeStep === 0 ? "btn-disabled" : ""
          }`}
          onClick={handleBack}
        >
          Previous
        </button>
        <button
          disabled={activeStep === steps.length - 1}
          className={`btn btn-primary w-full ${
            activeStep === steps.length - 1 ? "btn-disabled" : ""
          }`}
          onClick={handleNext}
        >
          Next step
        </button>
      </div>
    </div>
  );
};

export default BottomButtons;
