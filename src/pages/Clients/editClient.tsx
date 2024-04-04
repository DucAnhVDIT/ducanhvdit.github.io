import React, { useState } from 'react';
import { Flip, ToastContainer } from 'react-toastify';
import Button from '../../base-components/Button';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

const EditClient = () => {

    const [activeTab, setActiveTab] = useState('overview');
    const handleTabChange = (tab: React.SetStateAction<string>) => {
        setActiveTab(tab);
    };

    return (
        <div className='mt-3'>
            <div className="flex justify-center mb-5">
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
            
            </div>

            {activeTab === 'overview' && (
                <div>
                    <div className='md:flex h-full items-start justify-center bg-white shadow'>
                        <div className="md:w-1/5 p-4 flex flex-col border-2 border-black rounded-2xl m-5">
                            <div className="flex-row flex justify-between">
                                <h1 className='text-2xl font-bold mb-3'>Total spent</h1>
                                <Tooltip title="Amount customer spent">
                                    <IconButton>
                                        <InfoIcon />
                                    </IconButton>   
                                </Tooltip>
                            </div>
                            <h1 className='text-2xl font-bold mb-3'>£30</h1>
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
                            <h1 className='text-2xl font-bold mb-3'>15</h1>
                        </div>
                    </div>
                    <div className='md:flex h-full items-start justify-center bg-white shadow'>
                    <div className="md:w-1/5 p-4 flex flex-col border-2 border-black rounded-2xl m-5">
                        <div className="flex-row flex justify-between">
                            <h1 className='text-2xl font-bold mb-3'>Cancelled</h1>
                            <Tooltip title="Number of cancelled appointments">
                                <IconButton>
                                    <InfoIcon />
                                </IconButton>   
                            </Tooltip>
                        </div>
                        <h1 className='text-2xl font-bold mb-3'>2</h1>
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
                        <h1 className='text-2xl font-bold mb-3'>1</h1>
                    </div>
                </div>
            </div>
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