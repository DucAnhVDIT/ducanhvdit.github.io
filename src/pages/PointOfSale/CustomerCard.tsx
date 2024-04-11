import React from 'react';
import Button from '../../base-components/Button';
import Lucide from "../../base-components/Lucide";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedCustomer } from "../../stores/customerSlide";

interface CustomerCardProps {
  customer: any;
  onClick: () => void;
}


const CustomerCard: React.FC<CustomerCardProps> = ({ customer, onClick }) => {

  const selectedCustomer = useSelector(selectSelectedCustomer);
  const customerData = customer || selectedCustomer;

  const getInitials = (name: string | null | undefined) => {
    if (!name) {
      return ''; 
    }
  
    const names = name.split(' ');
    return names.map((name: string) => name[0]).join('');
  };

  const borderColor = customerData.CustomerCardID ? '#00A36D' : '#1E40AF';
  const backgroundColor = customerData.CustomerCardID ? 'bg-[#00A36D]' : 'bg-primary';

  return (
    <div>
      <Button className="px-0 py-1 border-none bg-transparent w-full shadow-none" onClick={onClick}>
        <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y rounded-lg w-full border-2 border-1E40AF">
          <div
            className="col-span-12 cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in"
            style={{ borderRight: `7px solid ${borderColor}` }}
          >
            {customerData.FirstName !== '' && customerData.Mobile !== 0 ?
              (
                <div className="p-1 flex justify-between items-start">
                  <div className="flex flex-start justify-between items-center">
                      {/* Circle logo on the right with initial */}
                    <div className="p-1 ml-auto">
                      <div className={`w-10 h-10 rounded-full overflow-hidden flex items-center justify-center text-white bg-primary ${backgroundColor}`}>
                        {/* Display the initial in the center of the circle */}
                        <span className="text-lg">{getInitials(customerData.FirstName)}</span>
                      </div>
                    </div>
                    {/* Customer details on the right (moved to the far right) */}
                    <div className="p-1 ml-3 flex flex-col items-start">
                      <h1 className="text-sm font-bold">{customerData.FirstName} <span>- {customerData.Mobile}</span></h1>
                      <div className='flex flex-row justify-between'>
                        {/* <p className="text-xs">{customer.Mobile}</p> */}
                        <p className="text-xs">{customerData.Email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-1 flex justify-between items-start">
                  <div className="flex flex-start justify-between items-center">
                    <div className="p-1 ml-auto flex">
                      <div className={`w-10 h-10 rounded-full overflow-hidden flex items-center justify-center`}>
                        <Lucide
                          icon="UserPlus"
                          className="w-7 h-7 text-slate-500 cursor-pointer"
                        />
                      </div>
                      <div className="p-1 ml-3 flex flex-col items-start">
                        <h1 className="text-sm font-bold">Add Client</h1>
                        <div className='flex flex-row justify-between'>
                          <p className="text-xs">Leave empty for walk-ins</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
            
          </div>
        </div>
      </Button>
    </div>
  );
};

export default CustomerCard;
