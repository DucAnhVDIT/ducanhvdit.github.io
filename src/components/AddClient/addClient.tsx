import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Lucide from '../../base-components/Lucide';
import Button from '../../base-components/Button';
import { FormInput, FormLabel, FormTextarea } from '../../base-components/Form';
import Toastify from 'toastify-js';
import { CheckboxToggle } from 'react-rainbow-components';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/dark.css';
import Dropzone, { DropzoneElement } from "../../base-components/Dropzone"; 
import { logError, logSuccess } from '../../constant/log-error';
import customerRepository from '../../repositories/customerRepository';

const AddClient = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [yearOfBirth, setYearOfBirth] = useState('');
    const [note, setNote] = useState('');
    const [allowSMS, setAllowSMS] = useState(false);
    const [allowEmail, setAllowEmail] = useState(false);
    const [allowMarketingNotification, setAllowMarketingNotification] = useState(false);

        const addNewClient = () => {

            if (!mobileNumber) {
                logError('Phone number is required');
                return;
            }
    
            const requestBody = {
              FirstName: firstName,
              LastName: lastName,
              Mobile: mobileNumber,
              Email: email,
              DateOfBirth: dateOfBirth || null,
              EmailConsent: true,
              SMSConsent: true,
            };
          
            customerRepository.addCustomer(requestBody).then(response => {
                logSuccess('Client added successfully');
                setFirstName("")
                setLastName("")
                setEmail("")
                setMobileNumber("")
              })
              .catch(error => {
                logError('Error adding client: ' + `${error}`);
              });
          };


    return (
        <div>
            <div className="flex items-center justify-between top-0 w-full p-4 bg-white shadow">
                    <Link to="/clients" className="text-lg font-bold">
                        <Lucide icon={'X'}></Lucide>
                    </Link>
                    <h1 className="text-xl font-bold">Add Client</h1>
                    <Button onClick={addNewClient} className="text-lg font-bold text-white bg-primary">Save</Button>
            </div>
            <div className=' md:flex h-full items-start justify-center bg-white shadow'>
                {/* Begin Basic Info */}
                <div className='border-2 border-black md:w-1/3 p-5 pr-10 m-5 rounded-2xl'>
                    <h1 className='text-2xl mb-2 font-bold'>Basic Information</h1>
                    <form className="validate-form" >
                        <div className="input-form flex flex-row w-full">
                            <div className='flex flex-col justify-between w-full mr-4'>
                                <FormLabel
                                    htmlFor="validation-form-1"
                                    className="flex flex-col w-full sm:flex-row"
                                >
                                First Name
                                </FormLabel>
                                <FormInput
                                    id="validation-form-1"
                                    type="text"
                                    name="name"
                                    placeholder="Enter First Name"
                                    className="w-full"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className='flex flex-col w-full'>
                                <FormLabel
                                    htmlFor="validation-form-1"
                                    className="flex flex-col w-full sm:flex-row"
                                >
                                Last Name
                                </FormLabel>
                                <FormInput
                                    id="validation-form-1"
                                    type="text"
                                    name="name"
                                    placeholder="Enter Last Name"
                                    className="w-full"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="input-form flex flex-row w-full mt-3">
                            <div className='flex flex-col justify-between w-full mr-4'>
                                <FormLabel
                                    htmlFor="validation-form-1"
                                    className="flex flex-col w-full sm:flex-row"
                                >
                                Email
                                </FormLabel>
                                <FormInput
                                    id="validation-form-1"
                                    type="email"
                                    name="name"
                                    placeholder="Enter Email"
                                    className="w-full"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className='flex flex-col w-full'>
                                <FormLabel
                                    htmlFor="validation-form-1"
                                    className="flex flex-col w-full sm:flex-row"
                                >
                                Phone Number
                                </FormLabel>
                                <FormInput
                                    id="validation-form-1"
                                    type="number"
                                    name="name"
                                    placeholder="Enter Phone Number"
                                    className="w-full"
                                    value={mobileNumber}
                                    onChange={(e) => setMobileNumber(e.target.value)}
                                />
                            </div>
                        </div>
                      <div className="mt-3 input-form w-full">
                        <FormLabel
                          htmlFor="validation-form-4"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Birth Date
                        </FormLabel>
                        <Flatpickr
                            className='w-full rounded-xl'
                            options={{
                                altInput: true,
                                altFormat: "F j, Y",
                                dateFormat: "Y-m-d",
                            }}
                            placeholder="Choose Birth Date"
                        />
                      </div>
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-6"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Notes
                        </FormLabel>
                        <FormTextarea
                         
                          id="validation-form-6"
                          name="comment"
                          
                          placeholder="Type your notes here..."
                        ></FormTextarea>
                      </div>
                    </form>
                </div>
                {/* End Basic Info */}
                
                <div className='md:w-1/3'>
                     {/* Begin Consent Info */}
                    <div className="p-4 flex flex-col border-2 border-black rounded-2xl m-5 ">
                        <h2 className="text-2xl font-bold mb-3">Consent Info</h2>
                        <CheckboxToggle
                            label="Allow SMS"
                            value={allowSMS}
                            className='mb-2'
                            onChange={(event) => setAllowSMS(event.target.checked)}
                        />
                        <CheckboxToggle
                            label="Allow Email"
                            value={allowEmail}
                            className='mb-2'
                            onChange={(event) => setAllowEmail(event.target.checked)}
                        />
                        <CheckboxToggle
                            label="Allow Marketing Notification"
                            value={allowMarketingNotification}
                            className='mb-2'
                            onChange={(event) => setAllowMarketingNotification(event.target.checked)}
                        />
                    </div>
                     {/* End Consent Info */}

                      {/* Begin Consent Form */}
                      <div className="p-4 flex flex-col border-2 border-black rounded-2xl m-5 ">
                      <h2 className="text-2xl font-bold mb-3">Consent Form</h2>
                      <Dropzone
                        // getRef={(el) => {
                        //     dropzoneSingleRef.current = el;
                        // }}
                        options={{
                            url: "https://httpbin.org/post",
                            thumbnailWidth: 150,
                            maxFilesize: 0.5,
                            maxFiles: 1,
                            headers: { "My-Awesome-Header": "header value" },
                        }}
                        className="dropzone"
                        >
                        <div className="text-lg font-medium">
                            Drop files here or click to upload.
                        </div>
                    </Dropzone>
                    </div>
                      {/* End Consent Form */}
                </div>
            </div>
        </div>
    );
};

export default AddClient;