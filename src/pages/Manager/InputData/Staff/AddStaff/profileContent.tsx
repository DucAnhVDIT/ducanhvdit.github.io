import React from "react";
import FormLabel from "../../../../../base-components/Form/FormLabel";
import FormInput from "../../../../../base-components/Form/FormInput";

function ProfileContent() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-6">Profile</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <FormLabel htmlFor="firstName">First name *</FormLabel>
          <FormInput
            id="firstName"
            name="firstName"
            placeholder="First name"
            className="w-full"
          />
        </div>
        <div>
          <FormLabel htmlFor="lastName">Last name</FormLabel>
          <FormInput
            id="lastName"
            name="lastName"
            placeholder="Last name"
            className="w-full"
          />
        </div>
        <div>
          <FormLabel htmlFor="email">Email *</FormLabel>
          <FormInput
            id="email"
            name="email"
            placeholder="Email"
            type="email"
            className="w-full"
          />
        </div>
        <div>
          <FormLabel htmlFor="phone">Phone number</FormLabel>
          <FormInput
            id="phone"
            name="phone"
            placeholder="Phone number"
            type="tel"
            className="w-full"
          />
        </div>
        <div>
          <FormLabel htmlFor="joinDate">Join on</FormLabel>
          <FormInput
            id="joinDate"
            name="joinDate"
            type="date"
            className="w-full"
          />
        </div>
        <div>
          <FormLabel htmlFor="leaveDate">Leaving on</FormLabel>
          <FormInput
            id="leaveDate"
            name="leaveDate"
            type="date"
            className="w-full"
          />
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="notAvailableOnlineBooking"
            className="form-checkbox h-5 w-5 text-primary rounded mr-2"
          />
          <FormLabel
            htmlFor="notAvailableOnlineBooking"
            className="select-none"
          >
            Not available online booking
          </FormLabel>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="activate"
            className="form-checkbox h-5 w-5 text-primary rounded mr-2"
            defaultChecked
          />
          <FormLabel htmlFor="activate" className="select-none">
            Activate
          </FormLabel>
        </div>
      </div>
      <div className="mt-6">
        <FormLabel>Calendar color</FormLabel>
        <div className="flex space-x-2 mt-2">
          {[
            "bg-pink-300",
            "bg-purple-300",
            "bg-blue-300",
            "bg-teal-300",
            "bg-green-300",
            "bg-yellow-300",
            "bg-orange-300",
          ].map((color) => (
            <button
              key={color}
              className={`${color} w-8 h-8 rounded-full focus:outline-none`}
            ></button>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <FormLabel htmlFor="jobTitle">Job title</FormLabel>
        <FormInput
          id="jobTitle"
          name="jobTitle"
          placeholder="Job title"
          className="w-full"
        />
      </div>
    </div>
  );
}

export default ProfileContent;
