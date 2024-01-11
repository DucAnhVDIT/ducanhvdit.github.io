import React, { PureComponent } from 'react'
import Button from '../../base-components/Button'
import Lucide from '../../base-components/Lucide'


// interface ServiceCardProps {
//     service: {
//       ProductID: string;
//       ProductName?: string;
//       Price?: number;
//       // Add other properties as needed
//     };
//   }
  
export const ServiceCard = ({ service }: { service: any }) => {
    // console.log(service.Services.CategoryName);
    // if (!service) {
    //   return null;
    //   console.log("None") // or render a loading state or handle the case when data is not available
    // }
  
    return (
      <div>
        <Button className="border-none bg-transparent w-full shadow-none mt-3 -z-10">
          <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y rounded-lg w-full border-2 border-1E40AF">
            <div
              className="col-span-12 p-1 cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in"
              style={{ borderRight: '7px solid #1E40AF' }}
            >
              <div className="p-1 flex justify-between items-start">
                <div className="flex flex-start">
                  <div className="p-2">
                    <h1 className="text-base">{`${service.ProductName || 'Loading...'}`}</h1>
                    {/* <h2>Leave empty for walk-ins</h2> */}
                  </div>
                </div>
                {/* <div className='p-2'>
                    <h1 className="text-sm">{`${service.Duration || 'Loading...'} mins`}</h1>
                </div> */}
                <div className="p-2">
                  <h1 className="text-base">{`£${service.Price !== undefined ? service.Price : 'Loading...'}`}</h1>
                </div>
              </div>
            </div>
          </div>
        </Button>
      </div>
    );
  };
  
  
  
  

export default ServiceCard