import React from 'react';
import Button from '../../base-components/Button';
import Lucide from '../../base-components/Lucide';

interface CustomerCardProps {
  customer: any;
  onClick: () => void;
}


const CustomerCard: React.FC<CustomerCardProps> = ({ customer, onClick }) => {
  // Replace these placeholder values with the actual data you have
  // Function to get the initials from the customer name
  const getInitials = (name: string | null | undefined) => {
    if (!name) {
      return ''; // Handle null or undefined case
    }
  
    const names = name.split(' ');
    return names.map((name: string) => name[0]).join('');
  };

  const borderColor = customer.CustomerCardID || customer.CustomerName ? '#00A36D' : '#1E40AF';
  const backgroundColor = customer.CustomerCardID ? 'bg-[#00A36D]' : 'bg-primary';

  return (
    <div>
      <Button className=" mt-3 p-0 border-none bg-transparent w-full shadow-none" onClick={onClick}>
        <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y rounded-lg w-full">
          <div
            className="col-span-12 cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in border-2 border-gray-400 "
            style={{ borderRight: `7px solid ${borderColor}` }}
          >
            <div className="p-1 flex justify-between items-start">
            <div className="flex flex-start justify-between items-center">
                {/* Circle logo on the right with initial */}
                <div className="p-2 ml-auto">
                <div className={`w-10 h-10 rounded-full overflow-hidden flex items-center justify-center text-white bg-primary ${backgroundColor}`}>
                    {/* Display the initial in the center of the circle */}
                    <span className="text-lg">{getInitials(customer.FirstName || customer.CustomerName)}</span>
                    </div>
                </div>

                {/* Customer details on the right (moved to the far right) */}
                <div className="p-1 ml-3 flex flex-col items-start">
                    <h1 className="text-lg font-bold">{customer.FirstName || customer.CustomerName} <span>- {customer.Mobile}</span></h1>
                    <div className='flex flex-row justify-between'>
                      {/* <p className="text-xs">{customer.Mobile}</p> */}
                      <p className="text-xs">{customer.Email}</p>
                    </div>
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
