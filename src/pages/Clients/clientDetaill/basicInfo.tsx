import React from 'react'
import FormLabel from '../../../base-components/Form/FormLabel'
import FormInput from '../../../base-components/Form/FormInput'
import Flatpickr from 'react-flatpickr';
import { useSelector } from 'react-redux';
import { selectSelectedCustomer } from '../../../stores/customerSlide';


interface BasicInfoProps {
    selectedCustomer : any
}

function BasicInfo({selectedCustomer} : BasicInfoProps) {
  return (
    <div className='md:flex h-full items-start justify-center'>
        <div className='border-2 border-black p-5 pr-10 m-5 rounded-2xl' style={{ height: '400px', width:'450px' }}>
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
                                    defaultValue={selectedCustomer.Customer.FirstName}
                                    readOnly
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
                                        defaultValue={selectedCustomer.Customer.LastName}
                                        readOnly
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
                                        defaultValue={selectedCustomer.Customer.Email}
                                        readOnly
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
                        </form>
                    </div>
    </div>
  )
}

export default BasicInfo