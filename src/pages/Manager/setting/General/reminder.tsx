import React from "react";
import FormLabel from "../../../../base-components/Form/FormLabel";
import FormInput from "../../../../base-components/Form/FormInput";
import FormSelect from "../../../../base-components/Form/FormSelect";

function Reminder() {
  return (
    <form className="validate-form flex flex-col p-6 max-w-screen-md mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex items-center space-x-4">
          <FormLabel htmlFor="reminder-before" className="whitespace-nowrap">
            Reminder before
          </FormLabel>
          <FormInput
            id="reminder-before"
            type="number"
            min="1"
            placeholder="1"
            className="w-20"
          />
          <FormSelect id="reminder-unit" className="w-32">
            <option value="day">Hour</option>
            <option value="day">Day</option>
            <option value="week">Week</option>
          </FormSelect>
        </div>
        <div className="flex items-center space-x-4">
          <label className="label cursor-pointer">
            <span className="label-text">Email</span>
            <input
              id="email"
              type="checkbox"
              defaultChecked
              className="checkbox checkbox-primary"
            />
          </label>
          <label className="label cursor-pointer">
            <span className="label-text">SMS</span>
            <input
              id="sms"
              type="checkbox"
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

export default Reminder;
