import React from 'react'
import FormLabel from '../../../../base-components/Form/FormLabel'
import FormInput from '../../../../base-components/Form/FormInput'
import FormSelect from '../../../../base-components/Form/FormSelect'

function EmailSetting() {
  return (
    <form className="validate-form flex flex-col w-full max-w-5xl mx-auto m-3">
      <div className="input-form grid w-full gap-4 md:grid-cols-2">
        <div className="flex flex-col">
          <FormLabel htmlFor="company-name">Name</FormLabel>
          <FormInput
            id="company-name"
            type="text"
            name="company-name"
            placeholder=""
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="company-name">Email</FormLabel>
          <FormInput
            id="company-name"
            type="text"
            name="company-name"
            placeholder=""
            className="w-full"
          />
        </div>
        <div className="flex flex-col w-full">
          <FormLabel htmlFor="appointment-sort">Account Type</FormLabel>
          <FormSelect id="appointment-sort" className="w-full">
            <option value="default">Gmail</option>
            <option value="name">Yahoo</option>
            <option value="name">Hotmail</option>
            <option value="name">AIM</option>
            <option value="name">Inbox</option>
            <option value="name">Other</option>
          </FormSelect>
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="company-name">SMTPServer</FormLabel>
          <FormInput
            id="company-name"
            type="text"
            name="company-name"
            placeholder=""
            className="w-full"
          />
        </div>
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
          <FormLabel htmlFor="company-name">Password</FormLabel>
          <FormInput
            id="company-name"
            type="password"
            name="company-name"
            placeholder=""
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="company-name">Port</FormLabel>
          <FormInput
            id="company-name"
            type="text"
            name="company-name"
            placeholder=""
            className="w-full"
            value={"587"}
          />
        </div>
        <div className="flex flex-col">
          <FormLabel htmlFor="vat-included">Enable SSL</FormLabel>
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
      </div>
      <button className="btn sm:w-32 w-[90px] px-6 bg-primary text-white mt-3 self-end">
        Save
      </button>
    </form>
  )
}

export default EmailSetting