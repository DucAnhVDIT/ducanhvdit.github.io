import React from "react";

function Notes() {
  return (
    <div className="w-full md:border md:rounded-md md:border-slate-500/60 p-10 flex flex-col items-center">
      <div className="w-full flex flex-col md:flex-row md:space-x-4">
        {/* Company Notes */}
        <div className="w-full md:w-1/2">
          <p className="text-lg font-semibold mb-2">Company Notes</p>
          <textarea
            className="w-full h-32 px-4 py-2 border rounded focus:border-primary outline-none"
            // value={companyNotes}
            // onChange={handleCompanyNotesChange}
            placeholder="Enter company notes here..."
          />
        </div>

        {/* Customer Notes */}
        <div className="w-full md:w-1/2 mt-3 md:mt-0">
          <p className="text-lg font-semibold mb-2">Customer Notes</p>
          <textarea
            className="w-full h-32 px-4 py-2 border rounded focus:border-primary outline-none"
            // value={customerNotes}
            // onChange={handleCustomerNotesChange}
            placeholder="Enter customer notes here..."
          />
        </div>
      </div>
    </div>
  );
}

export default Notes;
