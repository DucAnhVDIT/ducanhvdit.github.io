import React from "react";
import FormLabel from "../../../../base-components/Form/FormLabel";
import FormInput from "../../../../base-components/Form/FormInput";
import { Search } from "lucide-react";

function TillSettingForm() {
  return (
    <form className="validate-form flex flex-col w-full max-w-5xl mx-auto m-3">
      <div className="input-form grid w-full gap-4 md:grid-cols-2">
        <div className="flex flex-col">
          <FormLabel htmlFor="company-name">Till No</FormLabel>
          <FormInput
            id="company-name"
            type="text"
            name="company-name"
            placeholder=""
            className="w-full"
          />
        </div>
        <div className="flex flex-col relative">
          <FormLabel htmlFor="printer1">Printer 1</FormLabel>
          <div className="relative">
            <FormInput
              id="printer1"
              type="text"
              name="printer1"
              placeholder=""
              className="w-full pr-10"
            />
            <button className="absolute inset-y-0 right-0 flex items-center border-l bg-gray-100 p-3 rounded-md">
              <Search className="text-gray-500" />
            </button>
          </div>
        </div>
        <div className="flex flex-col relative">
          <FormLabel htmlFor="printer2">Printer 2</FormLabel>
          <div className="relative">
            <FormInput
              id="printer2"
              type="text"
              name="printer2"
              placeholder=""
              className="w-full pr-10"
            />
            <button className="absolute inset-y-0 right-0 flex items-center border-l bg-gray-100 p-3 rounded-md">
              <Search className="text-gray-500" />
            </button>
          </div>
        </div>
        <div className="flex flex-col relative">
          <FormLabel htmlFor="barcodePrinter">Barcode Printer</FormLabel>
          <div className="relative">
            <FormInput
              id="barcodePrinter"
              type="text"
              name="barcodePrinter"
              placeholder=""
              className="w-full pr-10"
            />
            <button className="absolute inset-y-0 right-0 flex items-center border-l bg-gray-100 p-3 rounded-md">
              <Search className="text-gray-500" />
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="company-name">Pole Display Port</FormLabel>
          <FormInput
            id="company-name"
            type="password"
            name="company-name"
            placeholder=""
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="company-name">Caller ID Device</FormLabel>
          <FormInput
            id="company-name"
            type="password"
            name="company-name"
            placeholder=""
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="company-name">Caller ID Port</FormLabel>
          <FormInput
            id="company-name"
            type="password"
            name="company-name"
            placeholder=""
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="company-name">TID</FormLabel>
          <FormInput
            id="company-name"
            type="password"
            name="company-name"
            placeholder=""
            className="w-full"
          />
        </div>
      </div>
      <div className="flex flex-col md:col-span-2 mt-2">
        <FormLabel htmlFor="vat-included">Enable Second Screen</FormLabel>
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
        <FormLabel htmlFor="vat-included">Enable Software Keyboard</FormLabel>
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
      <button className="btn sm:w-32 w-[90px] px-6 bg-primary text-white mt-3 self-end">
        Save
      </button>
    </form>
  );
}

export default TillSettingForm;
