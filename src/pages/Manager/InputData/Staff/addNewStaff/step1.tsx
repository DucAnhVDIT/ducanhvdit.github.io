import React from "react";
import { useForm, SubmitHandler, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1Schema, Step1FormData } from "../../../../../constant/validationSchema"; // Adjust the import path as needed
import FormLabel from "../../../../../base-components/Form/FormLabel";
import FormInput from "../../../../../base-components/Form/FormInput";

interface Step1Props {
  onSubmit: (data: Step1FormData) => void;
  form: UseFormReturn<Step1FormData>;
}

const Step1: React.FC<Step1Props> = ({ onSubmit, form }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmitHandler: SubmitHandler<Step1FormData> = (data) => {
    onSubmit(data);
  };

  return (
    <div className="flex justify-center">
      <div className="w-full md:w-3/4 p-4 rounded-lg md:border md:rounded-md md:border-slate-500/60">
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="mt-3">
            <FormLabel htmlFor="firstName">First name *</FormLabel>
            <FormInput
              id="firstName"
              {...register("firstName")}
              placeholder="First name"
              className="w-full"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>
          <div className="mt-3">
            <FormLabel htmlFor="lastName">Last name</FormLabel>
            <FormInput
              id="lastName"
              {...register("lastName")}
              placeholder="Last name"
              className="w-full"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>
          <div className="mt-3">
            <FormLabel htmlFor="email">Email *</FormLabel>
            <FormInput
              id="email"
              {...register("email")}
              placeholder="Email"
              type="email"
              className="w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="mt-3">
            <FormLabel htmlFor="phone">Phone number</FormLabel>
            <FormInput
              id="phone"
              {...register("phone")}
              placeholder="Phone number"
              type="tel"
              className="w-full"
            />
          </div>
          <button type="submit" className="hidden">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Step1;
