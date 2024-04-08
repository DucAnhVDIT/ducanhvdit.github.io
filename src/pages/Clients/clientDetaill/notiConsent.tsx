import React from 'react'
import { CheckboxToggle } from 'react-rainbow-components'
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

interface NotiConsentProps {
    selectedCustomer: any
}

function NotiConsent({selectedCustomer}:NotiConsentProps) {
    console.log("hahahaha", selectedCustomer?.Customer.SMSConsent)
  return (
    <div>
        <div className="p-4 flex flex-col border-2 border-black rounded-2xl mt-5 ml-5"style={{width:'450px' }} >
                                <div className='flex justify-between'>
                                    <h1 className='text-2xl mb-2 font-bold'>Consent Info</h1>
                                    <IconButton size="large" >
                                        <EditIcon className='text-black' />
                                    </IconButton>
                                </div>
                                <CheckboxToggle
                                    label="Allow SMS"
                                    value={selectedCustomer?.Customer.SMSConsent}
                                    className='mb-2'
                                    // onChange={(event) => setAllowSMS(event.target.checked)}
                                />
                                <CheckboxToggle
                                    label="Allow Email"
                                    value={selectedCustomer?.Customer.EmailConsent}
                                    className='mb-2'
                                    // onChange={(event) => setAllowEmail(event.target.checked)}
                                />
                                <CheckboxToggle
                                    label="Allow Marketing Notification"
                                    // value={allowMarketingNotification}
                                    className='mb-2'
                                    // onChange={(event) => setAllowMarketingNotification(event.target.checked)}
                                />
                            </div>
    </div>
  )
}

export default NotiConsent