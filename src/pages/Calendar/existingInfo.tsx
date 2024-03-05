
import { Menu, Slideover } from "../../base-components/Headless";
import Button from "../../base-components/Button";
import Lucide from "../../base-components/Lucide";
import 'flatpickr/dist/themes/dark.css';
import 'react-datepicker/dist/react-datepicker.css';
import React, { Key, useEffect, useRef, useState } from 'react'
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
import ExistingDatePicker from "../../components/DatePicker/existingAppointmentPicker";
import { setCompanyNotes, setCustomerNotes, selectNotes } from '../../stores/notesSlide';


interface SlideOverPanelProps {
  isOpen: boolean;
  onClose: () => void;
  appointmentData: any, 
  handleAppoinmentChange: (value: boolean) => void;
  handleDateChange: (value: Date) => void;
  fetchAppoinmentApiData: (value: Date) => void
  serviceData: any
}


function ExistingInfo({ isOpen, onClose, appointmentData, handleAppoinmentChange, handleDateChange, fetchAppoinmentApiData, serviceData }: SlideOverPanelProps) {

  const dispatch = useDispatch();
  const { companyNotes, customerNotes } = useSelector(selectNotes);

  const scheduleData = useSelector((state: any) => state.scheduleData);
  const selectedServices = useSelector((state: any) => state.serviceListState.selectedServices);
  const singleCustomerAppointment = useSelector((state: any) => state.appointment.singleCustomerAppointment);

  const [isServiceSlideoverOpen, setServiceSlideoverOpen] = useState(false)
  const [searchValueService, setSearchValueService] = useState("");
  const [date, setDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState('info');

  const [changeDateBody, setChangeDateBody] = useState({
    ID: appointmentData.ID,
    FirstName: appointmentData.FirstName ,
    LastName: appointmentData.LastName,
    Mobile: appointmentData.Mobile,
    Email: appointmentData.Email,
    BookDate: appointmentData.BookDate,
    StartTime: appointmentData.StartTime,
    ServiceID: appointmentData.ServiceID,
    StaffID: appointmentData.StaffID,
    Islocked: false,
    CustomerNote: "",
    GuestNotes: null,
  });

  const updateChangeDateBody = (newDate: Date, newStartTime: Date) => {
    setChangeDateBody((prev) => ({
      ...prev,
      BookDate: newDate,
      StartTime: newStartTime,
    }));
  };
  
  useEffect(() => {
    console.log("dich vu moi nay",selectedServices)
  },[selectedServices])

  
  
  const handleServiceSelect = (selectedService: { ProductID: any; }) => {

    dispatch(addService(selectedService))
    // setSelectedServiceIDs((prevSelectedServiceIDs) => [...prevSelectedServiceIDs, selectedService.ProductID]);
    setServiceSlideoverOpen(false);
  };

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

  console.log("Note nay cu ", appointmentData.CompanyNotes)

  const handleChangeStatus = (statusId: number) => {

    const appointmentsToUpdate = singleCustomerAppointment[appointmentData.CustomerID]?.map((appointment: any) => ({
      ID: appointment.ID,
      StatusID: statusId
    }));
  
  
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
        handleAppoinmentChange(true);
      } else {
        logError('Some appointments failed to update');
      }
    }).catch(err => {
      console.log(err);
      logError('Failed to update appointments');
    });
  }
  const handleUpdateBookingDate = () => {
    calendarRepository.updateAppointment(changeDateBody).then(response => {
      if (response.status === 200) {
          logSuccess('Appointment rescheduled successfully')
          handleAppoinmentChange(true)
      } else {
          logError('Error updating appointment. Please try again.')
      }
    })
    .catch(error => {
      logError('An unexpected error occurred. Please try again later.')
    });
  }

  const handleServiceDelete = (selectedService: any) => {
    dispatch(deleteService(selectedService.ProductID));
    console.log("deleted")
  };

  const closeServicesList = () => {
    setServiceSlideoverOpen(false)
  }

    const handleTabChange = (tab: React.SetStateAction<string>) => {
        setActiveTab(tab);
    };


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
              className=""
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
                      {/* Tab Navigation */}
                    <div className="flex justify-start mb-5">
                        <Button
                            variant="outline-secondary"
                            type="button"
                            className={`cursor-pointer rounded-full px-8 ${activeTab === 'info' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'}`}
                            onClick={() => handleTabChange('info')}
                        >
                            Info
                        </Button>
                        <Button
                            variant="outline-secondary"
                            type="button"
                            className={`cursor-pointer ml-3 rounded-full px-8 ${activeTab === 'notes' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'}`}
                            onClick={() => handleTabChange('notes')}
                        >
                            Notes
                        </Button>

                    </div>

                      {activeTab === 'info' && (
                        <>
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


                          <CustomerCard customer={appointmentData} onClick={() => {}}/>
                      
                          <div className="mt-3 w-full">
                            <ExistingDatePicker 
                              date={new Date(appointmentData.BookDate)} 
                              goToDate={handleDateChange} 
                              updateChangeDateBody={(newDate, newStartTime) => updateChangeDateBody(newDate, newStartTime)}
                              startTime={appointmentData.StartTime}
                              fetchAppoinmentApiData={fetchAppoinmentApiData}
                            />
                          </div>

                          {singleCustomerAppointment[appointmentData.CustomerID]?.map((appointment: any) => (
                            <div key={appointment.ID}>
                              <ServiceCard key={appointment.ID} service={appointment} onSelect={handleServiceDelete} />
                            </div>
                          ))}
                          {selectedServices && selectedServices.map((selectedService: { ProductID: Key | null | undefined; }) => (
                              <ServiceCard
                                  key={selectedService.ProductID}
                                  service={selectedService}
                                  onSelect={handleServiceDelete}
                              />
                          ))}

                          <div className="items-center justify-center text-center border-none shadow-none">
                            <Button onClick={() => setServiceSlideoverOpen(true)} className="items-center justify-center text-center border-none shadow-none">
                              <Lucide
                                icon="PlusCircle"
                                  className="text-primary text-lg round mr-1"
                              />
                            <h1>Add more services</h1>
                          </Button>
                        </div>      
                          
                        </>
                      )}

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
                        </Slideover.Description>
                        </Slideover.Panel>
                    </Slideover>
                    )}

                  {activeTab === 'notes' && (
                          <div className="flex flex-col">
                          {/* Company Notes */}
                          <div className="">
                            <p className="text-lg font-semibold mb-2">Company Notes</p>
                            <textarea
                              className="w-full h-32 px-4 py-2 border rounded focus:border-primary outline-none"
                              value={appointmentData.CompanyNotes}
                              // onChange={handleCompanyNotesChange}
                              placeholder="Enter company notes here..."
                            />
                          </div>
                      
                          {/* Customer Notes */}
                          <div className="mt-3">
                            <p className="text-lg font-semibold mb-2">Customer Notes</p>
                            <textarea
                              className="w-full h-32 px-4 py-2 border rounded focus:border-primary outline-none"
                              value={appointmentData.CustomerNote}
                              // onChange={handleCustomerNotesChange}
                              placeholder="Enter customer notes here..."
                            />
                          </div>
                        </div>
                      )}                  

                  </Slideover.Description>
                  {/* END: Slide Over Body */}
                  {/* BEGIN: Slide Over Footer */}
                  <Slideover.Footer>
                    <Button className=" px-6 bg-red-600 text-white" onClick={handleDeleteAppointment}>
                      Delete
                    </Button>
                    <Button className=" px-6 bg-primary text-white ml-3" onClick={handleUpdateBookingDate}>
                      Submit
                    </Button>
                    <Button className=" px-6 bg-primary text-white ml-3" onClick={() => {}}>
                      Pay
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