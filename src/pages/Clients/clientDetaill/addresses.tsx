import React from 'react'
import FormLabel from '../../../base-components/Form/FormLabel'
import FormInput from '../../../base-components/Form/FormInput'

function Addresses() {
  return (
    <div>
         <div className='border-2 border-black  p-5 pr-10 m-5 rounded-2xl' style={{ height: '400px', width:'450px' }}>
                    <h1 className='text-2xl mb-2 font-bold'>Addresses</h1>
                    <form className="validate-form" >
                        <div className="input-form flex flex-row w-full">
                            <div className='flex flex-col justify-between w-full mr-4'>
                                <FormLabel
                                    htmlFor="validation-form-1"
                                    className="flex flex-col w-full sm:flex-row"
                                >
                                Address
                                </FormLabel>
                                <FormInput
                                    id="validation-form-1"
                                    type="text"
                                    name="name"
                                    placeholder=""
                                    className="w-full"
                                    // value={firstName}
                                    // onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className='flex flex-col w-full'>
                                    <FormLabel
                                        htmlFor="validation-form-1"
                                        className="flex flex-col w-full sm:flex-row"
                                    >
                                    Apt./Suite
                                    </FormLabel>
                                    <FormInput
                                        id="validation-form-1"
                                        type="text"
                                        name="name"
                                        placeholder=""
                                        className="w-full"
                                        // value={lastName}
                                        // onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="input-form flex flex-col w-full mt-3">
                                <div className='flex flex-row'>
                                    <div className='flex flex-col justify-between w-full mr-4'>
                                        <FormLabel
                                            htmlFor="validation-form-1"
                                            className="flex flex-col w-full sm:flex-row"
                                        >
                                        District
                                        </FormLabel>
                                        <FormInput
                                            id="validation-form-1"
                                            type="email"
                                            name="name"
                                            placeholder=""
                                            className="w-full"
                                            // value={email}
                                            // onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className='flex flex-col w-full'>
                                        <FormLabel
                                            htmlFor="validation-form-1"
                                            className="flex flex-col w-full sm:flex-row"
                                        >
                                        City
                                        </FormLabel>
                                        <FormInput
                                            id="validation-form-1"
                                            type="text"
                                            name="name"
                                            placeholder=""
                                            className="w-full"
                                            // value={mobileNumber}
                                            // onChange={(e) => setMobileNumber(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-row mt-3'>

                                    <div className='flex flex-col w-full'>
                                        <FormLabel
                                            htmlFor="validation-form-1"
                                            className="flex flex-col w-full sm:flex-row"
                                        >
                                        County
                                        </FormLabel>
                                        <FormInput
                                            id="validation-form-1"
                                            type="text"
                                            name="name"
                                            placeholder=""
                                            className="w-full"
                                            // value={mobileNumber}
                                            // onChange={(e) => setMobileNumber(e.target.value)}
                                        />
                                    </div>
                                    <div className='flex flex-col w-full ml-3'>
                                        <FormLabel
                                            htmlFor="validation-form-1"
                                            className="flex flex-col w-full sm:flex-row"
                                        >
                                        State
                                        </FormLabel>
                                        <FormInput
                                            id="validation-form-1"
                                            type="text"
                                            name="name"
                                            placeholder=""
                                            className="w-full"
                                            // value={mobileNumber}
                                            // onChange={(e) => setMobileNumber(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-row mt-3'>
                                    <div className='flex flex-col w-full'>
                                        <FormLabel
                                            htmlFor="validation-form-1"
                                            className="flex flex-col w-full sm:flex-row"
                                        >
                                        Postcode
                                        </FormLabel>
                                        <FormInput
                                            id="validation-form-1"
                                            type="text"
                                            name="name"
                                            placeholder=""
                                            className="w-full"
                                            // value={mobileNumber}
                                            // onChange={(e) => setMobileNumber(e.target.value)}
                                        />
                                    </div>
                                    <div className='flex flex-col w-full ml-3'>
                                        <FormLabel
                                            htmlFor="validation-form-1"
                                            className="flex flex-col w-full sm:flex-row"
                                        >
                                        Country
                                        </FormLabel>
                                        <FormInput
                                            id="validation-form-1"
                                            type="text"
                                            name="name"
                                            placeholder=""
                                            className="w-full"
                                            // value={mobileNumber}
                                            // onChange={(e) => setMobileNumber(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                        {/* End Addresses */}
                    </div>
    </div>
  )
}

export default Addresses