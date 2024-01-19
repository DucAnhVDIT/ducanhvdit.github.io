
import { Menu, Slideover } from "../../base-components/Headless";

import Button from "../../base-components/Button";
import Lucide from "../../base-components/Lucide";
import { useState } from "react";

import 'flatpickr/dist/themes/dark.css';

import 'react-datepicker/dist/react-datepicker.css';

import React from 'react'

import ServiceCard from "../ServiceCard";
import CustomerCard from "../CustomerCard";


interface SlideOverPanelProps {
  isOpen: boolean;
  onClose: () => void;
  appointmentData: any, 
}

function ExistingInfo({ isOpen, onClose, appointmentData }: SlideOverPanelProps) {
  console.log('Appointment Data:', appointmentData);
  if (!appointmentData) {
    // Handle the case when appointmentData is null
    return (
      <Slideover open={isOpen} onClose={onClose}>
        <Slideover.Panel>
          <p>No appointment data available.</p>
        </Slideover.Panel>
      </Slideover>
    );
  }
  return (
    <div>
          <Slideover
              staticBackdrop
              open={isOpen}
              onClose={onClose}
          >
              {/* BEGIN: Slide Over Header */}
              <Slideover.Panel>
                  <Button
                      onClick={(event: React.MouseEvent) => {
                          event.preventDefault();
                          onClose()
                      } }
                      className="absolute w-14 h-14 top-0 left-0 right-auto mt-4 -ml-16 bg-white rounded-full"
                  >
                      <Lucide icon="X" className="w-8 h-8 text-black" />
                  </Button>
                  <Slideover.Title>
                      <h1 className="mr-auto font-bold text-2xl">
                          Edit Appoinment
                      </h1>
                  </Slideover.Title>
                  {/* END: Slide Over Header */}
                  {/* BEGIN: Slide Over Body */}
                  <Slideover.Description>
                    <CustomerCard key={appointmentData.CustomerID} customer={appointmentData} onClick={() =>{}} />
                    {/* <ServiceCard key={serviceData.ProductID} service={service} onSelect={handleServiceSelect}/> */}
                    <p>{`Customer Name: ${appointmentData.Appointment.CustomerName !== null ? appointmentData.Appointment.CustomerName : 'null'}`}</p>
                    <p>{`Service Name: ${appointmentData.Appointment.ServiceName !== null ? appointmentData.Appointment.ServiceName : 'null'}`}</p>

                  </Slideover.Description>
                  {/* END: Slide Over Body */}
                  {/* BEGIN: Slide Over Footer */}
                  <Slideover.Footer>
                    Hello
                  </Slideover.Footer>
              </Slideover.Panel>
              {/* END: Slide Over Footer */}
          </Slideover>
          {/* END: Slide Over Content */}
    </div>
  )
}

export default ExistingInfo