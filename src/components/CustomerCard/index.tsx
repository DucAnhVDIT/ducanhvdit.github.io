import React from 'react';
import Button from '../../base-components/Button';
import Lucide from '../../base-components/Lucide';

const CustomerCard = ({ customer }: { customer: any }) => {
  // Replace these placeholder values with the actual data you have
  // Function to get the initials from the customer name
  const getInitials = (name: string | null | undefined) => {
    if (!name) {
      return ''; // Handle null or undefined case
    }
  
    const names = name.split(' ');
    return names.map((name: string) => name[0]).join('');
  };
  
  return (
    <div>
      <Button className="border-none bg-transparent w-full shadow-none mt-3 -z-10">
        <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y rounded-lg w-full border-2 border-1E40AF">
          <div
            className="col-span-12 p-1 cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in"
            style={{ borderRight: '7px solid #1E40AF' }}
          >
            <div className="p-1 flex justify-between items-start">
            <div className="flex flex-start justify-between items-center">
                {/* Circle logo on the right with initial */}
                <div className="p-2 ml-auto">
                    <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center">
                    {/* Display the initial in the center of the circle */}
                    <span className="text-xl font-bold">{getInitials(customer.FirstName)}</span>
                    </div>
                </div>

                {/* Customer details on the right (moved to the far right) */}
                <div className="p-2 ml-auto flex flex-col items-start">
                    <h1 className="text-lg font-bold">{customer.FirstName}</h1>
                    <p className="text-sm">{customer.Mobile}</p>
                    <p className="text-sm">{customer.Email}</p>
                </div>
                </div>
            </div>
          </div>
        </div>
      </Button>
    </div>
  );
};

export default CustomerCard;
