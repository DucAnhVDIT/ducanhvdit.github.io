import React from "react";
import FormInput from "../../../base-components/Form/FormInput";
import FormLabel from "../../../base-components/Form/FormLabel";
import FormSelect from "../../../base-components/Form/FormSelect";
import Flatpickr from "react-flatpickr";

function Address() {
  return (
    <form className="validate-form flex flex-col w-full max-w-5xl mx-auto m-3">
      <div className="input-form grid w-full gap-4 md:grid-cols-2">
        <div className="flex flex-col">
          <FormLabel htmlFor="company-name">Address</FormLabel>
          <FormInput
            id="company-name"
            type="text"
            name="company-name"
            placeholder=""
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="address-1">Apt./Suite</FormLabel>
          <FormInput
            id="address-1"
            type="text"
            name="address-1"
            placeholder=""
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="address-1">District</FormLabel>
          <FormInput
            id="address-1"
            type="text"
            name="address-1"
            placeholder=""
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="address-1">City</FormLabel>
          <FormInput
            id="address-1"
            type="text"
            name="address-1"
            placeholder=""
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="address-1">County</FormLabel>
          <FormInput
            id="address-1"
            type="text"
            name="address-1"
            placeholder=""
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="address-1">State</FormLabel>
          <FormInput
            id="address-1"
            type="text"
            name="address-1"
            placeholder=""
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="address-1">Postcode</FormLabel>
          <FormInput
            id="address-1"
            type="text"
            name="address-1"
            placeholder=""
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="address-1">Country</FormLabel>
          <FormInput
            id="address-1"
            type="text"
            name="address-1"
            placeholder=""
            className="w-full"
          />
        </div>
      </div>
      <button className="btn sm:w-32 w-[90px] px-6 bg-primary text-white mt-5 self-end">
        Save
      </button>
    </form>
  );
}

export default Address;
