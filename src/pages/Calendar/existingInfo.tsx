
import { Menu, Slideover } from "../../base-components/Headless";
import Button from "../../base-components/Button";
import Lucide from "../../base-components/Lucide";
import 'flatpickr/dist/themes/dark.css';
import 'react-datepicker/dist/react-datepicker.css';
import React, { Key, useState } from 'react'
import ServiceCard from "../../components/ServiceCard";
import CustomerCard from "../../components/CustomerCard";
import { useSelector, useDispatch } from 'react-redux';
import { deleteAppointment, updateStatus } from '../../stores/appoinmentSlice';
import axios from "axios";
import { toast } from "react-toastify";
import calendarRepository from "../../repositories/calendarRepository";
import { logError, logSuccess } from "../../constant/log-error";
import StatusButtons from "../../components/StatusButton";
import { addService, deleteService, resetSelectedServices  } from "../../stores/serviceListSlice";
import { FormInput } from "../../base-components/Form";


interface SlideOverPanelProps {
  isOpen: boolean;
  onClose: () => void;
  appointmentData: any, 
  handleAppoinmentChange: (value: boolean) => void;
}


function ExistingInfo({ isOpen, onClose, appointmentData, handleAppoinmentChange }: SlideOverPanelProps) {

  const dispatch = useDispatch();

  const scheduleData = useSelector((state: any) => state.scheduleData);
  const selectedServices = useSelector((state: any) => state.serviceListState.selectedServices);
  const singleCustomerAppointment = useSelector((state: any) => state.appointment.singleCustomerAppointment);

  const [isServiceSlideoverOpen, setServiceSlideoverOpen] = useState(false)
  const [searchValueService, setSearchValueService] = useState("");

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

    const appointmentsToUpdate = singleCustomerAppointment[appointmentData.CustomerID]?.map((appointment: any) => ({
      ID: appointment.ID,
      StatusID: statusId
    }));
  
    console.log("thong tin cuoc hen can update", appointmentsToUpdate);
  
    if (!appointmentsToUpdate || appointmentsToUpdate.length === 0) {
      logError('No appointments to update');
      return;
    }
  
    Promise.all(appointmentsToUpdate.map((appointmentToUpdate: any) => {
      return calendarRepository.updateAppointment(appointmentToUpdate);
    })).then((responses) => {
      const allSuccess = responses.every((res) => res.status === 200);
  
      if (allSuccess) {
        onClose();
        logSuccess('Updated status');
  
        appointmentsToUpdate.forEach((appointmentToUpdate: any) => {
          dispatch(updateStatus({
            customerID: appointmentData.CustomerID,
            statusId: appointmentToUpdate.StatusID,
            color: appointmentData.Colour,
          }));
        });
  
        handleAppoinmentChange(prev => !prev);
      } else {
        logError('Some appointments failed to update');
      }
    }).catch(err => {
      console.log(err);
      logError('Failed to update appointments');
    });
  }
  

  const handleServiceDelete = (selectedService: any) => {
    dispatch(deleteService(selectedService.ProductID));
    console.log("deleted")
  };

  const closeServicesList = () => {
    setServiceSlideoverOpen(false)
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
                      {/* <div
                          style={{
                              backgroundColor: (appointmentData.Colour), // Replace with your color extraction logic
                              padding: '20px',
                              borderRadius:"20px"
                          }}
                          className="flex justify-between p-0"
                      >
                          <h1 className="text-2xl text-white">{appointmentData.StatusName}</h1>
                          <StatusButtons selectedStatus={appointmentData.StatusID} onSelectStatus={handleChangeStatus} />
                      </div> */}

                     
                        <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y rounded-lg w-full relative">
                        <div
                          className="col-span-12 sm:col-span-4 2xl:col-span-3 box zoom-in"
                        >
                          <div
                              style={{
                                  backgroundColor: (appointmentData.Colour), // Replace with your color extraction logic
                                  padding: '20px',
                                  borderRadius:"20px"
                              }}
                              className="flex justify-between p-0"
                          >
                              <h1 className="text-2xl text-white mt-1">{appointmentData.StatusName}</h1>
                              <StatusButtons selectedStatus={appointmentData.StatusID} onSelectStatus={handleChangeStatus} />
                          </div>
                        </div>
                      </div>


                    {/* <p>{`Customer Name: ${appointmentData.CustomerName !== null ? appointmentData.CustomerName : 'null'}`}</p> */}

                    <div className="">

                      {/* <p>{`Customer Name: ${appointmentData.ServiceName !== null ? appointmentData.ServiceName : 'null'}`}</p>
                      <p>{`Customer Name: ${appointmentData.Duration !== null ? appointmentData.Duration : 'null'}`}</p> */}

                      <CustomerCard customer={appointmentData} onClick={() => {}}/>

                      {/* <ServiceCard
                            service={singleCustomerAppointment}
                            onSelect={handleServiceDelete}
                      /> */}
                      <div>
                      {singleCustomerAppointment[appointmentData.CustomerID]?.map((appointment: any) => (
                        <div key={appointment.ID}>
                          <ServiceCard key={appointment.ID} service={appointment} onSelect={handleServiceDelete} />
                        </div>
                      ))}
                    </div>

                      
                      <div className="items-center justify-center text-center border-none shadow-none">
                          <Button onClick={() => {}} className="items-center justify-center text-center border-none shadow-none">
                            <Lucide
                              icon="PlusCircle"
                                className="text-primary text-lg round mr-1"
                            />
                          <h1>Add more services</h1>
                        </Button>
                      </div>

                      {/* Begin Service List */}
                    {isServiceSlideoverOpen && (
                    <Slideover open={isServiceSlideoverOpen} onClose={closeServicesList}>
                        <Slideover.Panel>
                        <Slideover.Title className="p-5">
                            <h2 className="mr-auto font-bold text-2xl">
                            Search service
                            </h2>
                            <Button className="border-none shadow-none" onClick={closeServicesList}>
                              <Lucide icon="ArrowLeft"/>
                            </Button>
                        </Slideover.Title>
                        <Slideover.Description className="text-center">
                            <div className="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
                            <div className="relative text-slate-500">
                                <FormInput
                                type="text"
                                className="mb-2 w-full h-12 !bg-gray-300 !box focus:ring-primary focus:border-primary"
                                placeholder="Search by service name"
                                value={searchValueService}
                                onChange={(e) => setSearchValueService(e.target.value)}
                                />
                                {searchValueService ? (
                                <Lucide
                                    icon="XCircle"
                                    className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3 cursor-pointer"
                                    onClick={() => setSearchValueService("")}
                                />
                                ) : (
                                <Lucide
                                    icon="Search"
                                    className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
                                />
                                )}
                            </div>
                            </div>
                            {/* {serviceData && serviceData
                            .filter((service: { ProductName: string }) =>
                                service.ProductName.toLowerCase().includes(searchValueService.toLowerCase())
                            )
                            .map((service: { ProductID: string }) => (
                                <ServiceCard key={service.ProductID} service={service} onSelect={handleServiceSelect}/>
                            ))} */}
                        </Slideover.Description>
                        </Slideover.Panel>
                    </Slideover>
                    )}

                    {/* End Service List */}



                    
                    {/* {selectedServices && selectedServices.map((selectedService: { ProductID: Key | null | undefined; }) => (
                        <ServiceCard
                            key={selectedService.ProductID}
                            service={selectedService}
                            onSelect={handleServiceDelete}
                        />
                    ))} */}
                    </div>
                  </Slideover.Description>
                  {/* END: Slide Over Body */}
                  {/* BEGIN: Slide Over Footer */}
                  <Slideover.Footer>
                    <Button className=" bg-red-600 text-white" onClick={handleDeleteAppointment}>
                      Delete
                    </Button>
                    <Button className=" bg-primary text-white ml-3" onClick={()=>{}}>
                      Submit
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