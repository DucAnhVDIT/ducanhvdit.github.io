import React from "react";
import { FormInput, FormLabel } from "../../../../base-components/Form";

function CompanyInfo() {
  return (
    <form className="validate-form flex flex-col w-full max-w-5xl mx-auto m-3">
      <div className="input-form grid w-full gap-4 md:grid-cols-2">
        <div className="flex flex-col">
          <FormLabel htmlFor="company-name">Company name</FormLabel>
          <FormInput
            id="company-name"
            type="text"
            name="company-name"
            placeholder="VDIT Solutions"
            className="w-full"
            readOnly
          />
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="address-1">Address 1</FormLabel>
          <FormInput
            id="address-1"
            type="text"
            name="address-1"
            placeholder=""
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="address-2">Address 2</FormLabel>
          <FormInput
            id="address-2"
            type="text"
            name="address-2"
            placeholder=""
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="city">City</FormLabel>
          <FormInput
            id="city"
            type="text"
            name="city"
            placeholder=""
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="postcode">Postcode</FormLabel>
          <FormInput
            id="postcode"
            type="text"
            name="postcode"
            placeholder=""
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="postcode-2">Postcode</FormLabel>
          <FormInput
            id="postcode-2"
            type="text"
            name="postcode-2"
            placeholder=""
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="country">Country</FormLabel>
          <FormInput
            id="country"
            type="text"
            name="country"
            placeholder=""
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="telephone">Telephone</FormLabel>
          <FormInput
            id="telephone"
            type="text"
            name="telephone"
            placeholder=""
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="fax">Fax</FormLabel>
          <FormInput
            id="fax"
            type="text"
            name="fax"
            placeholder=""
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="website">Website</FormLabel>
          <FormInput
            id="website"
            type="text"
            name="website"
            placeholder=""
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="email">Email</FormLabel>
          <FormInput
            id="email"
            type="text"
            name="email"
            placeholder=""
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="company-no">Company No</FormLabel>
          <FormInput
            id="company-no"
            type="text"
            name="company-no"
            placeholder=""
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="vat-no">VAT No</FormLabel>
          <FormInput
            id="vat-no"
            type="text"
            name="vat-no"
            placeholder=""
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="vat">VAT</FormLabel>
          <FormInput
            id="vat"
            type="text"
            name="vat"
            placeholder=""
            className="w-full"
          />
        </div>
        <div className="flex flex-col md:col-span-2">
          <FormLabel htmlFor="vat-included">VAT Included</FormLabel>
          <div className="form-control">
            <label className="label cursor-pointer">
              <input
                id="vat-included"
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-primary"
              />
            </label>
          </div>
        </div>
        <div className="flex flex-col md:col-span-2">
          <FormLabel htmlFor="note">Note</FormLabel>
          <textarea
            id="note"
            className="w-full h-32 px-4 py-2 border rounded focus:border-primary outline-none"
            placeholder="Thank you"
          />
        </div>
      </div>
      <button className="btn sm:w-32 w-[90px] px-6 bg-primary text-white mt-3 self-end">
        Save
      </button>
    </form>
  );
}

export default CompanyInfo;
