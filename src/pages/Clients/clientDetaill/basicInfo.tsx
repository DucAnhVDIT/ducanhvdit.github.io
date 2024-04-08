import React, { useState, useEffect } from 'react';
import FormLabel from '../../../base-components/Form/FormLabel';
import FormInput from '../../../base-components/Form/FormInput';
import Flatpickr from 'react-flatpickr';
import { useSelector } from 'react-redux';
import { selectSelectedCustomer } from '../../../stores/customerSlide';
import Button from '../../../base-components/Button';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Slideover from '../../../base-components/Headless/Slideover';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { FormSelect } from '../../../base-components/Form';
import Lucide from '../../../base-components/Lucide';

interface BasicInfoProps {
    selectedCustomer: any;
}

function BasicInfo({ selectedCustomer }: BasicInfoProps) {
    const [editInfoSlide, setEditInfoSlide] = useState(false);
    const [gender, setGender] = useState('');
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        setIsDirty(false);
    }, [editInfoSlide]);

    const handleGenderChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setGender(event.target.value as string);
    };

    return (
        <div className='md:flex h-full items-start justify-center'>
            <div className='border-2 border-black p-5 pr-10 m-5 rounded-2xl' style={{ height: '400px', width: '450px' }}>
                <div className='flex justify-between'>
                    <h1 className='text-2xl mb-2 font-bold'>Basic Information</h1>
                    
                    <IconButton
                        size="large"
                        onClick={() => {
                            setEditInfoSlide(true);
                        }}
                    >
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
                        <div className='flex flex-col justify-between w-full'>
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
                    <div className="input-form flex flex-row w-full mt-3">
                        <div className='flex flex-col justify-between w-full'>
                            <FormLabel
                                htmlFor="validation-form-1"
                                className="flex flex-col w-full sm:flex-row"
                            >
                                Gender
                            </FormLabel>
                            <FormSelect
                                disabled
                            >
                                <option value="">None</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </FormSelect>
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
                            disabled
                        />
                    </div>
                </form>
            </div>
            {editInfoSlide && (
                <Slideover
                    onClose={() => {
                        setEditInfoSlide(false);
                    }}
                    open={editInfoSlide}
                >
                    <Slideover.Panel>
                        <Slideover.Title className="font-bold text-2xl p-5 flex justify-between">
                            <h1>Edit basic information</h1>
                            <Button className="border-none shadow-none" onClick={()=>{setEditInfoSlide(false)}}>
                                <Lucide icon="ArrowLeft"/>
                            </Button>
                        </Slideover.Title>
                        <Slideover.Description className="text-center">
                            <form className="validate-form" >
                                <div className="input-form w-full">
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
                                            onChange={() => {
                                                setIsDirty(true)
                                            }}
                                        />
                                    </div>
                                    <div className='flex flex-col w-full mt-1'>
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
                                            onChange={() => {
                                                setIsDirty(true)
                                            }}
                                        />
                                    </div>
                                    <div className='flex flex-col w-full mt-1'>
                                        {/* <FormLabel
                                            htmlFor="validation-form-1"
                                            className="flex flex-col w-full sm:flex-row"
                                        >
                                            Gender
                                        </FormLabel> */}
                                        {/* <FormSelect
                                            defaultValue={selectedCustomer.Customer.Gender}
                                        >
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </FormSelect> */}
                                    </div>
                                </div>
                                <div className="input-form flex flex-row w-full">
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
                                            onChange={() => {
                                                setIsDirty(true)
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="input-form flex flex-row w-full mt-3">
                                    <div className='flex flex-col justify-between w-full'>
                                        <FormLabel
                                            htmlFor="validation-form-1"
                                            className="flex flex-col w-full sm:flex-row"
                                        >
                                            Gender
                                        </FormLabel>
                                        <FormSelect
                                            onChange={() => {
                                                setIsDirty(true)
                                            }}
                                        >
                                            <option value="">None</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </FormSelect>
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
                                        onChange={() => {
                                            setIsDirty(true)
                                        }}
                                    />
                                </div>
                            </form>
                        </Slideover.Description>
                        <Slideover.Footer>
                            <Button
                                variant="outline-secondary"
                                type="button"
                                onClick={() => {
                                    setEditInfoSlide(false)
                                }}
                                className="w-32 mr-3"
                            >
                                Cancel
                            </Button>
                            {isDirty && (
                                    <Button
                                        variant="primary"
                                        type="button"
                                        className="w-32"
                                        onClick={() => {
                                            
                                        }}
                                    >
                                        Save
                                    </Button>
                            )}
                        </Slideover.Footer>
                    </Slideover.Panel>
                </Slideover>
            )}
        </div>
    );
}

export default BasicInfo;
