import React, { PureComponent } from 'react'
import Button from '../../base-components/Button'
import Lucide from '../../base-components/Lucide'

export class ServiceCard extends PureComponent {
  render() {
    return (
      <div>
       <Button className="border-none bg-transparent w-full shadow-none mt-3 -z-10">
        <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y rounded-lg w-full">
            <div
            className="col-span-12 p-1 cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in"
            style={{ borderRight: '7px solid #1E40AF' }}
            >
            <div className="p-1 flex justify-between">
                {/* Left side: Name and price */}
                <div className="flex flex-row">
                    <div className="p-2">
                    <h1 className="text-base">Pedicure</h1>
                    <h1 className="text-base">£20</h1>
                    {/* <h2>Leave empty for walk-ins</h2> */}
                    </div>
                </div>

                {/* Right side: Duration */}
                <div className="p-2">
                    <h1 className='text-base'>1h</h1>
                </div>
                </div>
            </div>
        </div>
        </Button>
      </div>
    )
  }
}

export default ServiceCard