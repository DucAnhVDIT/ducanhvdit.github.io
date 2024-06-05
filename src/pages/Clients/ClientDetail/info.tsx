import React, { useEffect } from "react";
import FormInput from "../../../base-components/Form/FormInput";
import FormLabel from "../../../base-components/Form/FormLabel";
import FormSelect from "../../../base-components/Form/FormSelect";
import Flatpickr from "react-flatpickr";
import { useSelector } from "react-redux";
import { selectSelectedCustomer } from "../../../stores/customerSlide";


function Info() {
  const selectedCustomer = useSelector(selectSelectedCustomer)
  useEffect(() =>{
    console.log(selectedCustomer)
  })
  return (
    <form className="validate-form flex flex-col w-full max-w-5xl mx-auto m-3">
      <div className="input-form grid w-full gap-4 md:grid-cols-2">
        <div className="flex flex-col">
          <FormLabel htmlFor="first-name">First Name</FormLabel>
          <FormInput
            id="first-name"
            type="text"
            name="first-name"
            placeholder=""
            className="w-full"
            value={selectedCustomer.Customer.FirstName || ""}
          />
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="last-name">Last Name</FormLabel>
          <FormInput
            id="last-name"
            type="text"
            name="last-name"
            placeholder=""
            className="w-full"
            value={selectedCustomer.Customer.LastName || ""}
          />
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="gender">Gender</FormLabel>
          <FormSelect id="gender" name="gender">
            <option value="0">None</option>
            <option value="1">Male</option>
            <option value="2">Female</option>
            <option value="3">Other</option>
          </FormSelect>
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="birth-date">Birth Date</FormLabel>
          <Flatpickr
            id="birth-date"
            className="w-full rounded-xl"
            options={{
              altInput: true,
              altFormat: "F j, Y",
              dateFormat: "Y-m-d",
            }}
            placeholder="Choose Birth Date"
            value={selectedCustomer.Customer.BirthDate || ""}
          />
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="phone-number">Phone Number</FormLabel>
          <FormInput
            id="phone-number"
            type="text"
            name="phone-number"
            placeholder=""
            className="w-full"
            value={selectedCustomer.Customer.Mobile || ""}
          />
        </div>
      </div>
      <div className="flex flex-col md:col-span-2 mt-4">
        <FormLabel>Preferences</FormLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <input
              id="sms-consent"
              type="checkbox"
              defaultChecked={selectedCustomer.Customer.SMSConsent}
              className="checkbox checkbox-primary"
            />
            <label htmlFor="sms-consent" className="ml-2">
              SMS Consent
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="email-consent"
              type="checkbox"
              defaultChecked={selectedCustomer.Customer.EmailConsent}
              className="checkbox checkbox-primary"
            />
            <label htmlFor="email-consent" className="ml-2">
              Email Consent
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="vip"
              type="checkbox"
              defaultChecked={selectedCustomer?.IsVIP}
              className="checkbox checkbox-primary"
            />
            <label htmlFor="vip" className="ml-2">
              VIP
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="block-online"
              type="checkbox"
              defaultChecked={selectedCustomer.Customer.BlockOnlineBooking}
              className="checkbox checkbox-primary"
            />
            <label htmlFor="block-online" className="ml-2">
              Block Online
            </label>
          </div>
        </div>
      </div>
      <button className="btn sm:w-32 w-[90px] px-6 bg-primary text-white mt-5 self-end">
        Save
      </button>
    </form>
  );
}

export default Info;
