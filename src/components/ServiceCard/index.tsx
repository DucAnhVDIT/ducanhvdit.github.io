import React from 'react';
import Button from '../../base-components/Button';
import Lucide from '../../base-components/Lucide';

const ServiceCard = ({ service }: { service: any }) => {
  return (
    <div>
      <Button className="border-none bg-transparent w-full shadow-none">
        <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y rounded-lg w-full border-2 border-1E40AF">
          <div
            className="col-span-12 p-1 cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in"
            style={{ borderRight: '7px solid #1E40AF' }}
          >
            <div className="p-1 flex justify-between items-start">
              <div className="flex flex-start">
                <div className="p-2 flex flex-col">
                  <h1 className="text-sm leading-tight text-left">{`${service.ProductName || 'Loading...'}`}</h1>
                  <h1 className="text-xs item text-left text-silver">{`${service.Duration || 'Loading...'} mins`}</h1>
                  <h1 className="text-xs item text-left text-silver">{`${service.Description || ''} `}</h1>
                </div>
              </div>
              <div className="p-2">
                <h1 className="text-sm">{`£${service.Price !== undefined ? service.Price : 'Loading...'}`}</h1>
              </div>
            </div>
          </div>
        </div>
      </Button>
    </div>
  );
};

export default ServiceCard;
