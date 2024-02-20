
import { Menu, Slideover } from "../../base-components/Headless";
import Button from "../../base-components/Button";
import Lucide from "../../base-components/Lucide";
import 'flatpickr/dist/themes/dark.css';
import 'react-datepicker/dist/react-datepicker.css';
import React from 'react'
import ServiceCard from "../ServiceCard";
import CustomerCard from "../CustomerCard";
import { useSelector, useDispatch } from 'react-redux';
import { deleteAppointment } from '../../stores/appoinmentSlice';
import axios from "axios";
import { toast } from "react-toastify";


interface SlideOverPanelProps {
  isOpen: boolean;
  onClose: () => void;
  appointmentData: any, 
}


function ExistingInfo({ isOpen, onClose, appointmentData }: SlideOverPanelProps) {

  const dispatch = useDispatch();

  const scheduleData = useSelector((state: any) => state.appointment.scheduleData);

  const handleDeleteAppointment = () => {
    const appointmentId = appointmentData.Appointment.ID;
    dispatch(deleteAppointment(appointmentId));

    console.log(appointmentData.Appointment.StatusID)

    const deleteAppointmentBody = {
      "ID": appointmentData.Appointment.ID,
      "business_id": "20160908110055249272",
      "StatusID": 6
    }

    axios.post("https://beautyapi.vdit.co.uk/v1/UpdateAppointment", deleteAppointmentBody, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa('testvdit:testvdit')}`
      }
    })
    .then(res => {
      if (res.status === 200) {
        console.log("Deleted appointment")
        onClose()
        toast.success('Deleted appointment', {
          position: "top-center",
          autoClose: 3000, // Auto close the toast after 3 seconds
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        console.error("Error updating appointment. Server returned:", res.status, res.statusText);
        toast.error('Can not delete appointment', {
          position: "top-center",
          autoClose: 3000, // Auto close the toast after 3 seconds
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
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
                    <CustomerCard key={appointmentData.CustomerID} customer={appointmentData} onClick={() =>{}} />
                    {/* <ServiceCard key={serviceData.ProductID} service={service} onSelect={handleServiceSelect}/> */}
                    <p>{`Customer Name: ${appointmentData.Appointment.CustomerName !== null ? appointmentData.Appointment.CustomerName : 'null'}`}</p>
                    <p>{`Service Name: ${appointmentData.Appointment.ServiceName !== null ? appointmentData.Appointment.ServiceName : 'null'}`}</p>

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