
import { Menu, Slideover } from "../../base-components/Headless";
import Button from "../../base-components/Button";
import Lucide from "../../base-components/Lucide";
import 'flatpickr/dist/themes/dark.css';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useState } from 'react'
import ServiceCard from "../../components/ServiceCard";
import CustomerCard from "../../components/CustomerCard";
import { useSelector, useDispatch } from 'react-redux';
import { deleteAppointment, updateStatus } from '../../stores/appoinmentSlice';
import axios from "axios";
import { toast } from "react-toastify";
import calendarRepository from "../../repositories/calendarRepository";
import { logError, logSuccess } from "../../constant/log-error";
import StatusButtons from "../../components/StatusButton";


interface SlideOverPanelProps {
  isOpen: boolean;
  onClose: () => void;
  appointmentData: any, 
  handleAppoinmentChange: (value: boolean) => void;
}


function ExistingInfo({ isOpen, onClose, appointmentData, handleAppoinmentChange }: SlideOverPanelProps) {

  const dispatch = useDispatch();

  const scheduleData = useSelector((state: any) => state.scheduleData);

  const handleDeleteAppointment = () => {
    const appointmentId = appointmentData.ID;
    dispatch(deleteAppointment(appointmentId));

    const deleteAppointmentBody = {
      ID: appointmentData.ID,
      StatusID: 6
    }
    calendarRepository.updateAppointment(deleteAppointmentBody).then(res => {
      if (res.status === 200) {
        console.log("Deleted appointment")
        onClose()
        logSuccess('Deleted appointment')
      } else {
        logError('Can not delete appointment')
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  const handleChangeStatus = (statusId: number) => {

    const changeStatusBody = {
      ID: appointmentData.ID,
      StatusID: statusId
    }

    calendarRepository.updateAppointment(changeStatusBody).then(res => {
      if (res.status === 200) {
        console.log('API Response after update status', res);
        onClose()
        logSuccess('Updated status')
            dispatch(updateStatus({
                appointmentId: appointmentData.ID,
                statusId,
                color: appointmentData.Colour,
            }));
        handleAppoinmentChange(prev => !prev);
      } else {
        logError('Can not update appointment status')
      }
    })
    .catch(err => {
      console.log(err)
    })

  }


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
                      <div
                          style={{
                              backgroundColor: (appointmentData.Colour), // Replace with your color extraction logic
                              padding: '30px',
                          }}
                          className="flex justify-between p-0"
                      >
                          <h1 className="text-2xl text-white">{appointmentData.StatusName}</h1>
                          <StatusButtons selectedStatus={appointmentData.StatusID} onSelectStatus={handleChangeStatus} />
                      </div>

                    {/* <p>{`Customer Name: ${appointmentData.CustomerName !== null ? appointmentData.CustomerName : 'null'}`}</p> */}
                  </Slideover.Description>
                  {/* END: Slide Over Body */}
                  {/* BEGIN: Slide Over Footer */}
                  <Slideover.Footer>
                    <Button className=" bg-red-600 text-white" onClick={handleDeleteAppointment}>
                      Delete
                    </Button>
                  </Slideover.Footer>
              </Slideover.Panel>
              {/* END: Slide Over Footer */}
          </Slideover>
          {/* END: Slide Over Content */}
    </div>
  )
}

export default ExistingInfo