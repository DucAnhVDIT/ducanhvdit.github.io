import React from "react";
import FormLabel from "../../../../base-components/Form/FormLabel";
import FormInput from "../../../../base-components/Form/FormInput";

const PaymentSettings = () => {
  return (
    <div className="p-6 rounded-md w-full max-w-4xl mx-auto space-y-6">
      <div className="border p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-4">Paymentsense/ Dojo</h3>
        <div className="mb-4">
          <FormLabel htmlFor="apiKey">ApiKey</FormLabel>
          <FormInput id="apiKey" name="apiKey" placeholder="" />
        </div>
        <div className="mb-4">
          <FormLabel htmlFor="hostName">HostName</FormLabel>
          <FormInput id="hostName" name="hostName" placeholder="" />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="enablePaymentsense"
            className="form-checkbox h-5 w-5 text-primary rounded mr-2"
          />
          <FormLabel htmlFor="enablePaymentsense">
            Enable Paymentsense/Dojo
          </FormLabel>
        </div>
      </div>

      <div className="border p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-4">Atoa Payment</h3>
        <div className="mb-4">
          <FormLabel htmlFor="token">Token</FormLabel>
          <FormInput id="token" name="token" placeholder="" />
        </div>
        <div className="flex items-center mb-4">
          <input
            type="radio"
            id="live"
            name="environment"
            className="form-radio h-5 w-5 text-primary rounded mr-2"
          />
          <FormLabel htmlFor="live" className="mr-4">
            Live
          </FormLabel>
          <input
            type="radio"
            id="sandbox"
            name="environment"
            className="form-radio h-5 w-5 text-primary rounded mr-2"
          />
          <FormLabel htmlFor="sandbox">Sandbox</FormLabel>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="enableAtoa"
            className="form-checkbox h-5 w-5 text-primary rounded mr-2"
          />
          <FormLabel htmlFor="enableAtoa">Enable Atoa</FormLabel>
        </div>
      </div>

      <div className="border p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-4">DNA Payment</h3>
        <div className="mb-4">
          <FormLabel htmlFor="host">Host</FormLabel>
          <FormInput id="host" name="host" placeholder="" />
        </div>
        <div className="mb-4">
          <FormLabel htmlFor="key">Key</FormLabel>
          <FormInput id="key" name="key" placeholder="" />
        </div>
        <div className="mb-4">
          <FormLabel htmlFor="keyId">Key ID</FormLabel>
          <FormInput id="keyId" name="keyId" placeholder="" />
        </div>
        <div className="mb-4">
          <FormLabel htmlFor="storeId">Store ID</FormLabel>
          <FormInput id="storeId" name="storeId" placeholder="" />
        </div>
        <div className="mb-4">
          <FormLabel htmlFor="merchantId">Merchant ID</FormLabel>
          <FormInput id="merchantId" name="merchantId" placeholder="" />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="enableDNA"
            className="form-checkbox h-5 w-5 text-primary rounded mr-2"
          />
          <FormLabel htmlFor="enableDNA">Enable DNA Payment</FormLabel>
        </div>
      </div>
      <div className="flex justify-end">
        <button className="btn sm:w-32 w-[90px] px-6 bg-primary text-white mt-3">
          Save
        </button>
      </div>
    </div>
  );
};

export default PaymentSettings;
