import React, { useState } from 'react';
import Dialog from '../../base-components/Headless/Dialog';
import Button from '../../base-components/Button';
import Lucide from "../../base-components/Lucide";
import FormLabel from '../../base-components/Form/FormLabel';
import FormInput from '../../base-components/Form/FormInput';

interface BlockTimePopupProps {
    blockTimePop: any
    setBlockTimePop: (value : boolean) => void
}

const BlockTimePopup = ({blockTimePop, setBlockTimePop}: BlockTimePopupProps) => {
    return (
        <>
            <Dialog
                open={blockTimePop}
                onClose={() => {
                    setBlockTimePop(false)
                }}
            >
           <Dialog.Panel className="p-6 flex flex-col  relative my-48">
                <div className="absolute top-2 right-2">
                    <Button onClick={() => {
                    setBlockTimePop(false);
                    }} className='border-none shadow-none p-0'>
                    <Lucide icon="X" className="w-8 h-8 text-slate-400" />
                    </Button>
                </div>

                <div className="mt-4">
                    {/* Input field for block time title */}
                    <FormLabel
                        htmlFor="validation-form-1"
                        className="flex flex-col w-full sm:flex-row"
                    >
                        Title
                    </FormLabel>
                    <FormInput
                        id="validation-form-1"
                        type="text"
                        name="name"
                        placeholder="Enter title"
                        className="w-full"
                    />

                    {/* Input field for block time duration */}
                    <FormLabel
                        htmlFor="validation-form-1"
                        className="flex flex-col w-full sm:flex-row mt-2"
                    >
                        Duration
                    </FormLabel>
                    <FormInput
                        id="validation-form-1"
                        type="number"
                        name="name"
                        placeholder="Enter duration"
                        className="w-full"
                    />
                </div>
                <div className='flex justify-end mt-3'>
                    <Button onClick={() => {}} className='w-32 px-6 bg-primary text-white ml-3'>
                        Add
                    </Button>
                </div>
                </Dialog.Panel>



            </Dialog>

        </>
    );
};

export default BlockTimePopup