import React from "react";
import {
  FormInput,
  FormLabel,
  FormSelect,
} from "../../../../base-components/Form";

function SettingsForm() {
  return (
    <form className="validate-form flex flex-col w-full max-w-5xl mx-auto m-3">
      <div className="input-form grid w-full gap-4 md:grid-cols-2">
        <div className="flex flex-col">
          <FormLabel htmlFor="company-name">Alert Stock Num</FormLabel>
          <FormInput
            id="company-name"
            type="text"
            name="company-name"
            placeholder="VDIT Solutions"
            className="w-full"
            value={"10"}
          />
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="address-1">Barcode length</FormLabel>
          <FormInput
            id="address-1"
            type="text"
            name="address-1"
            placeholder=""
            className="w-full"
            value={"10"}
          />
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="address-2">Country Barcode Code</FormLabel>
          <FormInput
            id="address-2"
            type="text"
            name="address-2"
            placeholder=""
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="city">Factory Code</FormLabel>
          <FormInput
            id="city"
            type="text"
            name="city"
            placeholder=""
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="postcode">T Show Change</FormLabel>
          <FormInput
            id="postcode"
            type="text"
            name="postcode"
            placeholder=""
            className="w-full"
            value={"5"}
          />
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="country">T LogOut</FormLabel>
          <FormInput
            id="country"
            type="text"
            name="country"
            placeholder=""
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="telephone">Maximum Day For Exchange</FormLabel>
          <FormInput
            id="telephone"
            type="text"
            name="telephone"
            placeholder=""
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="fax">Maximum Day For Refund</FormLabel>
          <FormInput
            id="fax"
            type="text"
            name="fax"
            placeholder=""
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="website">Num Of Receipt 1</FormLabel>
          <FormInput
            id="website"
            type="text"
            name="website"
            placeholder=""
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="email">Num Of Receipt 2</FormLabel>
          <FormInput
            id="email"
            type="text"
            name="email"
            placeholder=""
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="company-no">Slot Of Time</FormLabel>
          <FormInput
            id="company-no"
            type="text"
            name="company-no"
            placeholder=""
            className="w-full"
            value={"15"}
          />
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="vat-no">Length Of Gift Card (month)</FormLabel>
          <FormInput
            id="vat-no"
            type="text"
            name="vat-no"
            placeholder=""
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="vat">Birthday Reminder Before (day)</FormLabel>
          <FormInput
            id="vat"
            type="text"
            name="vat"
            placeholder=""
            className="w-full"
          />
        </div>
        <div className="flex flex-col ">
          <FormLabel htmlFor="note">Send Text Payment To</FormLabel>
          <textarea
            id="note"
            className="w-full h-32 px-4 py-2 border rounded focus:border-primary outline-none"
            placeholder=""
          />
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="vat">Tel Country Code</FormLabel>
          <FormInput
            id="vat"
            type="text"
            name="vat"
            placeholder=""
            className="w-full"
            value={"44"}
          />
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="currency">Currency</FormLabel>
          <FormSelect id="currency" className="w-full">
            <option value="GBP">Stirling Pound (£)</option>
            <option value="USD">US Dollar ($)</option>
          </FormSelect>
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="payment-company">Payment Company</FormLabel>
          <FormSelect id="payment-company" className="w-full">
            <option value="payment-sense">Payment Sense</option>
            <option value="paypal">PayPal</option>
          </FormSelect>
        </div>
        <div className="flex flex-col w-full">
          <FormLabel htmlFor="appointment-sort">Appointment Sort by</FormLabel>
          <FormSelect id="appointment-sort" className="w-full">
            <option value="default">Default</option>
            <option value="name">Name</option>
          </FormSelect>
        </div>
        <div className="flex flex-col w-full">
          <FormLabel htmlFor="points-to-money">Points to Money</FormLabel>
          <FormInput id="points-to-money" type="text" placeholder="1" className="w-full" />
        </div>
      </div>
      <button className="btn sm:w-32 w-[90px] px-6 bg-primary text-white mt-3 self-end">
        Save
      </button>
    </form>
  );
}

export default SettingsForm;
