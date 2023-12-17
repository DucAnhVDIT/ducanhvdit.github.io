import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Lucide from '../../base-components/Lucide';
import Button from '../../base-components/Button';
import { FormInput, FormLabel, FormTextarea } from '../../base-components/Form';
import Toastify from 'toastify-js';
import { CheckboxToggle } from 'react-rainbow-components';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css'; 

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here
    };


    return (
        <div>
            <div className="flex items-center justify-between top-0 w-full p-4 bg-white shadow">
                    <Link to="/" className="text-lg font-bold">
                        <Lucide icon={'X'}></Lucide>
                    </Link>
                    <h1 className="text-xl font-bold">Add Client</h1>
                    <Button className="text-lg font-bold">Save</Button>
            </div>
            <div className=' md:flex h-full items-start justify-center bg-white shadow'>
                {/* Begin Basic Info */}
                <div className='border-2 md:w-1/3 p-5 pr-10 m-5 rounded-2xl'>
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
                                    type="text"
                                    name="name"
                                    placeholder="Enter Email"
                                    className="w-full"
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
                                    type="text"
                                    name="name"
                                    placeholder="Enter Phone Number"
                                    className="w-full"
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
                            className='w-full rounded-3xl'
                            options={{
                                altInput: true,
                                altFormat: "F j, Y",
                                dateFormat: "Y-m-d",
                            }}
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
                
                {/* Begin Consent Info */}
                <div className="md:w-1/5 p-4 flex flex-col border-2 rounded-2xl m-5 ">
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
                    {/* Other Consent Info fields */}
                </div>
            </div>
        </div>
    );
};

export default AddClient;