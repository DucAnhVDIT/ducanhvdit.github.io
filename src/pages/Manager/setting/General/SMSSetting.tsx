import React from "react";
import FormLabel from "../../../../base-components/Form/FormLabel";
import FormInput from "../../../../base-components/Form/FormInput";

function SMSSetting() {
  return (
    <form className="validate-form flex flex-col w-full max-w-5xl mx-auto m-3">
      <div className="input-form grid w-full gap-4 md:grid-cols-2">
      <div className="flex flex-col">
          <FormLabel htmlFor="company-name">UserName</FormLabel>
          <FormInput
            id="company-name"
            type="text"
            name="company-name"
            placeholder=""
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="company-name">Sender</FormLabel>
          <FormInput
            id="company-name"
            type="text"
            name="company-name"
            placeholder=""
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="company-name">Password</FormLabel>
          <FormInput
            id="company-name"
            type="password"
            name="company-name"
            placeholder=""
            className="w-full"
          />
        </div>
      </div>
      <button className="btn sm:w-32 w-[90px] px-6 bg-primary text-white mt-3 self-end">
        Save
      </button>
    </form>
  );
}

export default SMSSetting;
