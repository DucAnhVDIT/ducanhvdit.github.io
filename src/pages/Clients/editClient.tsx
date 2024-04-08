import React, { useEffect, useState } from 'react';
import { Flip, ToastContainer } from 'react-toastify';
import Button from '../../base-components/Button';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FormLabel from '../../base-components/Form/FormLabel';
import FormInput from '../../base-components/Form/FormInput';
import FormTextarea from '../../base-components/Form/FormTextarea';
import Flatpickr from 'react-flatpickr';
import { CheckboxToggle } from 'react-rainbow-components';
import BasicInfo from './clientDetaill/basicInfo';
import Addresses from './clientDetaill/addresses';
import NotiConsent from './clientDetaill/notiConsent';
import Other from './clientDetaill/other';
import ContactNum from './clientDetaill/contactNum';
import Notes from './notes';
import Timelines from './appointments/timelines';
import TimelineMUI from './appointments/timelineMUI';
import Forms from './forms/forms';
import customerRepository from '../../repositories/customerRepository';
import { useSelector } from 'react-redux';
import { selectSelectedCustomer } from '../../stores/customerSlide';

const EditClient = () => {

    const [activeTab, setActiveTab] = useState('overview');
    const handleTabChange = (tab: React.SetStateAction<string>) => {
        setActiveTab(tab);
    };

    const selectedCustomer = useSelector(selectSelectedCustomer);

    useEffect(() => {
        console.log(selectedCustomer)
    })

    const numOfCancelled = selectedCustomer?.Customer?.Appointments?.filter((appointment: { StatusID: number; }) => appointment.StatusID === 6).length;
    const numOfNoShow = selectedCustomer?.Customer?.Appointments?.filter((appointment: { StatusID: number; }) => appointment.StatusID === 7).length;


    return (
        <div className='mt-3 bg-white' style={{height:'1000px' }}>
            <div className="flex justify-center mb-5">
                <div className='mt-4'>
                    <Button
                        variant="instagram"
                        type="button"
                        className={`border-none w-40 cursor-pointer rounded-full px-6 ${activeTab === 'overview' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'}`}
                        onClick={() => handleTabChange('overview')}
                    >
                        Overview
                    </Button>
                    <Button
                        variant="instagram"
                        type="button"
                        className={`w-40 border-none cursor-pointer ml-3 rounded-full px-6 ${activeTab === 'client-detail' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'}`}
                        onClick={() => handleTabChange('client-detail')}
                    >
                        Client detail
                    </Button>
                    <Button
                        variant="instagram"
                        type="button"
                        className={`w-40 border-none cursor-pointer ml-3 rounded-full px-6 ${activeTab === 'appointments' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'}`}
                        onClick={() => handleTabChange('appointments')}
                    >
                        Appointments
                    </Button>
                    <Button
                        variant="instagram"
                        type="button"
                        className={`w-40 border-none cursor-pointer ml-3 rounded-full px-6 ${activeTab === 'notes' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'}`}
                        onClick={() => handleTabChange('notes')}
                    >
                        Notes
                    </Button>
                    <Button
                        variant="instagram"
                        type="button"
                        className={`w-40 border-none cursor-pointer ml-3 rounded-full px-6 ${activeTab === 'forms' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'}`}
                        onClick={() => handleTabChange('forms')}
                    >
                        Forms
                    </Button>
                    {/* <IconButton>
                        <ArrowBackIcon/>
                    </IconButton> */}
                </div>
            </div>

            {activeTab === 'overview' && (
                <div>
                    <div className='md:flex h-full items-start justify-center'>
                        <div className="md:w-1/5 p-4 flex flex-col border-2 border-black rounded-2xl m-5">
                            <div className="flex-row flex justify-between">
                                <h1 className='text-2xl font-bold mb-3'>Total spent</h1>
                                <Tooltip title="Amount customer spent">
                                    <IconButton>
                                        <InfoIcon />
                                    </IconButton>   
                                </Tooltip>
                            </div>
                            <h1 className='text-2xl font-bold mb-3'>£0</h1>
                        </div>
                        <div className="md:w-1/5 p-4 flex flex-col border-2 border-black rounded-2xl m-5">
                            <div className="flex-row flex justify-between">
                                <h1 className='text-2xl font-bold mb-3'>Appointments</h1>
                                <Tooltip title="Number of booked appointments">
                                    <IconButton>
                                        <InfoIcon />
                                    </IconButton>   
                                </Tooltip>
                            </div>
                            <h1 className='text-2xl font-bold mb-3'>{selectedCustomer?.Customer.Appointments?.length || 0}</h1>
                        </div>
                    </div>
                    <div className='md:flex h-full items-start justify-center'>
                    <div className="md:w-1/5 p-4 flex flex-col border-2 border-black rounded-2xl m-5">
                        <div className="flex-row flex justify-between">
                            <h1 className='text-2xl font-bold mb-3'>Cancelled</h1>
                            <Tooltip title="Number of cancelled appointments">
                                <IconButton>
                                    <InfoIcon />
                                </IconButton>   
                            </Tooltip>
                        </div>
                        <h1 className='text-2xl font-bold mb-3'>{numOfCancelled}</h1>
                    </div>
                    <div className="md:w-1/5 p-4 flex flex-col border-2 border-black rounded-2xl m-5">
                    <div className="flex-row flex justify-between">
                            <h1 className='text-2xl font-bold mb-3'>No show</h1>
                            <Tooltip title="Number of no show appointments">
                                <IconButton>
                                    <InfoIcon />
                                </IconButton>   
                            </Tooltip>
                        </div>
                        <h1 className='text-2xl font-bold mb-3'>{numOfNoShow}</h1>
                    </div>
                </div>
            </div>
            )}

            {activeTab === 'client-detail' && (
    
                <>
                <div className='md:flex justify-center items-center flex-col'>
                    <div className='flex flex-row'>
                        <div className='md:flex flex-col mr-4'>
                        {selectedCustomer && (
                            <div className='md:flex flex-col mr-4'>
                                <BasicInfo selectedCustomer={selectedCustomer} />
                                <ContactNum selectedCustomer={selectedCustomer}  />
                            </div>
                        )}
                        </div>
                        <div className='md:flex flex-col'>
                            <Addresses />
                            <NotiConsent selectedCustomer={selectedCustomer} />
                            <Other />
                        </div>
                    </div>
                </div>
            </>
            )}

            {activeTab === 'notes' && (
                <div className='flex justify-center'>
                    <Notes />
                </div>
            )}

            {activeTab === 'appointments' && (
                <div className='flex justify-center'>
                    {selectedCustomer && (
                        <TimelineMUI/>
                    )}
                    {/* <Timelines /> */}
                </div>
            )}

            {activeTab === 'forms' && (
                <>
                    <Forms />
                </>
            )}


            
            <ToastContainer
                position="top-center" 
                autoClose={3000} 
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                theme="colored"
                pauseOnHover
                transition={Flip}
            />
        </div>
    );
};

export default EditClient;