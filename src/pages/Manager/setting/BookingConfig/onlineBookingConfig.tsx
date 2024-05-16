import React from 'react';
import FormLabel from '../../../../base-components/Form/FormLabel'; 
import FormInput from '../../../../base-components/Form/FormInput'; 

const OnlineBookingConfiguration = () => {
  return (
    <div className="p-6 rounded-md w-full max-w-4xl mx-auto space-y-6">
      <div className="border p-4 rounded-md space-y-4">
        <div className="mb-4">
          <FormLabel htmlFor="id">ID</FormLabel>
          <FormInput id="id" name="id" placeholder="" />
        </div>
        <div className="mb-4">
          <FormLabel htmlFor="groupId">GroupID</FormLabel>
          <FormInput id="groupId" name="groupId" placeholder="" />
        </div>
        <div className="mb-4">
          <FormLabel htmlFor="apiKey">ApiKey</FormLabel>
          <FormInput id="apiKey" name="apiKey" placeholder="" />
        </div>
        <div className="mb-4">
          <FormLabel htmlFor="hostName">HostName</FormLabel>
          <FormInput id="hostName" name="hostName" placeholder="" />
        </div>
        <div className="mb-4">
          <FormLabel htmlFor="googleApiLive">Google API Live</FormLabel>
          <FormInput id="googleApiLive" name="googleApiLive" placeholder="" />
        </div>
        <div className="mb-4">
          <FormLabel htmlFor="googleApiTest">Google API Test</FormLabel>
          <FormInput id="googleApiTest" name="googleApiTest" placeholder="" />
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="googleLiveStatus"
            className="form-checkbox h-5 w-5 text-primary rounded mr-2"
          />
          <FormLabel htmlFor="googleLiveStatus" className="select-none">
            Google Live Status
          </FormLabel>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="notActivate"
            className="form-checkbox h-5 w-5 text-primary rounded mr-2"
          />
          <FormLabel htmlFor="notActivate" className="select-none">
            Not Activate
          </FormLabel>
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

export default OnlineBookingConfiguration;
