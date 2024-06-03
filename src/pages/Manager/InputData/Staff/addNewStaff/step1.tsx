import React from "react";
import FormLabel from "../../../../../base-components/Form/FormLabel";
import FormInput from "../../../../../base-components/Form/FormInput";

function Step1() {
  return (
    <div className="flex justify-center">
      <div className="w-full md:w-3/4 p-4 rounded-lg md:border md:rounded-md md:border-slate-500/60">
        <div className="mt-3">
          <FormLabel htmlFor="firstName">First name *</FormLabel>
          <FormInput
            id="firstName"
            name="firstName"
            placeholder="First name"
            className="w-full"
          />
        </div>
        <div className="mt-3">
          <FormLabel htmlFor="lastName">Last name</FormLabel>
          <FormInput
            id="lastName"
            name="lastName"
            placeholder="Last name"
            className="w-full"
          />
        </div>
        <div className="mt-3">
          <FormLabel htmlFor="email">Email *</FormLabel>
          <FormInput
            id="email"
            name="email"
            placeholder="Email"
            type="email"
            className="w-full"
          />
        </div>
        <div className="mt-3">
          <FormLabel htmlFor="phone">Phone number</FormLabel>
          <FormInput
            id="phone"
            name="phone"
            placeholder="Phone number"
            type="tel"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default Step1;
