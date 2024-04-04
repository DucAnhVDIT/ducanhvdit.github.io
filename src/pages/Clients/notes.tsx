import React from 'react'

function Notes() {
  return (
    <div className='w-[60%]'>
                        {/* Company Notes */}
                        <div className="">
                          <p className="text-lg font-semibold mb-2">Company Notes</p>
                          <textarea
                            className="w-full h-32 px-4 py-2 border rounded focus:border-primary outline-none"
                            // value={companyNotes}
                            // onChange={handleCompanyNotesChange}
                            placeholder="Enter company notes here..."
                          />
                        </div>
                    
                        {/* Customer Notes */}
                        <div className="mt-3">
                          <p className="text-lg font-semibold mb-2">Customer Notes</p>
                          <textarea
                            className="w-full h-32 px-4 py-2 border rounded focus:border-primary outline-none"
                            // value={customerNotes}
                            // onChange={handleCustomerNotesChange}
                            placeholder="Enter customer notes here..."
                          />
                        </div>
    </div>
  )
}

export default Notes