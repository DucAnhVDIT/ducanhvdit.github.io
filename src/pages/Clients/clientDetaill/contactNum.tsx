import React from 'react'
import FormLabel from '../../../base-components/Form/FormLabel'
import FormInput from '../../../base-components/Form/FormInput'
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';



interface ContactProps {
    selectedCustomer : any
}


function ContactNum({selectedCustomer}: ContactProps) {
  return (
    <div className='md:flex h-full items-start justify-center'>
        <div className='border-2 border-black p-5 pr-10 m-5 rounded-2xl' style={{ height: '400px', width:'450px' }}>
                    <div className='flex justify-between'>
                        <h1 className='text-2xl mb-2 font-bold'>Contact</h1>
                        <IconButton size="small" >
                                <EditIcon className='text-black' />
                        </IconButton>
                    </div>
                    <form className="validate-form" >
                        <div className="input-form flex flex-row w-full">
                            <div className='flex flex-col justify-between w-full mr-4'>
                                <FormLabel
                                    htmlFor="validation-form-1"
                                    className="flex flex-col w-full sm:flex-row"
                                >
                                Home Phone
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
                                    Work Phone
                                    </FormLabel>
                                    <FormInput
                                        id="validation-form-1"
                                        type="text"
                                        name="name"
                                        placeholder=""
                                        className="w-full"
                                        // value={lastName}
                                        onChange={() =>{}}
                                    />
                                </div>
                            </div>
                            <div className="input-form flex flex-row w-full mt-3">
                                <div className='flex flex-col justify-between w-full mr-4'>
                                    <FormLabel
                                        htmlFor="validation-form-1"
                                        className="flex flex-col w-full sm:flex-row"
                                    >
                                    Emergency Contact Number
                                    </FormLabel>
                                    <FormInput
                                        id="validation-form-1"
                                        type="email"
                                        name="name"
                                        placeholder=""
                                        className="w-full"
                                        // value={email}
                                        onChange={() =>{}}
                                        readOnly
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
                                        placeholder=""
                                        className="w-full"
                                        defaultValue={selectedCustomer.Customer.Mobile}
                                        onChange={() =>{}}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
    </div>
  )
}

export default ContactNum