import React from 'react'
import { CheckboxToggle } from 'react-rainbow-components'

function Other() {
  return (
    <div>
        <div className="p-4 flex flex-col border-2 border-black rounded-2xl mt-12 ml-5 " style={{width:'450px' }}>
                                <h2 className="text-2xl font-bold mb-3">Other</h2>
                                <CheckboxToggle
                                    label="VIP"
                                    // value={allowSMS}
                                    className='mb-2'
                                    // onChange={(event) => setAllowSMS(event.target.checked)}
                                />
                                <CheckboxToggle
                                    label="Block Online"
                                    // value={allowEmail}
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

export default Other