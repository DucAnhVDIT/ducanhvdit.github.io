import React, { useState } from 'react';
import Dialog from '../../base-components/Headless/Dialog';
import Button from '../../base-components/Button';
import Lucide from "../../base-components/Lucide";
import BlockTimePopup from './blockTime';

interface AppointmentPopupProps {
    slotClickModal: any
    setSlotClickModal: (value : boolean) => void
    addNewAppointment: (info: any) => Promise<void>
    selectedSlotInfo : any
    blockTimeClicked: () => void
}

const AppointmentPopup = ({slotClickModal, setSlotClickModal, addNewAppointment, selectedSlotInfo, blockTimeClicked}: AppointmentPopupProps) => {
    return (
        <>
            <Dialog
                open={slotClickModal}
                onClose={() => {
                    setSlotClickModal(false);
                }}
            >
           <Dialog.Panel className="p-6 flex flex-col items-center justify-center relative my-48">
                <div className="absolute top-2 right-2">
                    <Button onClick={() => {
                        setSlotClickModal(false)
                    }} className='border-none shadow-none p-0'>
                        <Lucide icon="X" className="w-8 h-8 text-slate-400" />
                    </Button>
                </div>

                <div className="absolute top-2 left-2 text-xl text-black font-bold">
                    {selectedSlotInfo && (
                    <span>{`${selectedSlotInfo.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}</span>
                    )}
                </div>

                <div className="mt-4">
                    <Button onClick={addNewAppointment} className='w-32 px-6 bg-primary text-white ml-3'>Add New Appointment</Button>
                    <Button onClick={blockTimeClicked} className='w-32 px-6 bg-primary text-white ml-3'>Add Block Time</Button>
                </div>
            </Dialog.Panel>


            </Dialog>

        </>
    );
};

export default AppointmentPopup