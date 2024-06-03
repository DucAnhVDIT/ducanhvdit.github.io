import React, { useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import ScheduleTable from "../../Schedules/schedule";
import LottieAnimation from "../../../../../components/Lottie";
import { Step1FormData, step1Schema } from "../../../../../constant/validationSchema"; // Adjust the import path as needed
import { zodResolver } from "@hookform/resolvers/zod";
import AddStaffProgress from "./addStaffProgress";
import Step1 from "./step1";
import BottomButtons from "./bottomButtons";

const steps = [
  "Personal Information",
  "Staff Service",
  "Staff Schedule",
  "Complete",
];

const AddStaffSteps: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [step1Data, setStep1Data] = useState<Step1FormData | null>(null);

  const step1Form = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
  });

  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = "white";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const handleNext = (data?: Step1FormData) => {
    if (activeStep === 0 && data) {
      setStep1Data(data);
    }

    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else if (activeStep === steps.length - 1) {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    console.log("Form submitted", step1Data);
  };

  const handleNextButtonClick = () => {
    if (activeStep === 0) {
      step1Form.handleSubmit(handleNext)();
    } else if (activeStep === 2) {
      step1Form.handleSubmit(handleNext)();
    } else {
      handleNext();
    }
  };

  useEffect(() => {
    if (activeStep === 3 && submitted) {
      const timer = setTimeout(() => {
        navigate("/manager/inputdate/staff");
      }, 3000); 

      return () => clearTimeout(timer);
    }
  }, [activeStep, submitted, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <AddStaffProgress
        activeStep={activeStep}
        steps={steps}
        handleNext={handleNextButtonClick}
        handleBack={handleBack}
      />
      <div className="flex-1 flex justify-center mt-10">
        {activeStep === 3 ? (
          <div className="flex flex-col items-center">
            <LottieAnimation />
            <h1 className="text-xl font-semibold">Add staff completed</h1>
          </div>
        ) : (
          <div className="w-[80%]">
            {activeStep === 0 && <Step1 onSubmit={handleNext} form={step1Form} />}
            {activeStep === 1 && <div>Staff Service Component</div>}
            {activeStep === 2 && <ScheduleTable />}
            {activeStep === 3 && <div>Complete</div>}
          </div>
        )}
      </div>
      <BottomButtons
        activeStep={activeStep}
        steps={steps}
        handleNext={handleNextButtonClick}
        handleBack={handleBack}
        handleClose={() => {}}
      />
    </div>
  );
};

export default AddStaffSteps;
