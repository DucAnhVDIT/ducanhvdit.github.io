import React, { Key, useState } from 'react'
import { Drawer, List, ListItem, ListItemButton, ListItemText, Divider, Paper } from '@mui/material';
import Button from '../../base-components/Button';
import StatusButtons from '../StatusButton';
import CustomerCard from '../CustomerCard';
import ExistingDatePicker from '../DatePicker/existingAppointmentPicker';
import ServiceCard from '../ServiceCard';
import Lucide from '../../base-components/Lucide';
import calendarRepository from '../../repositories/calendarRepository';
import { logError, logSuccess } from '../../constant/log-error';
import { updateStatus } from '../../stores/appoinmentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { deleteService } from '../../stores/serviceListSlice';


interface ExistingDrawerProps {
    setDrawerIsOpen: (value: boolean) => void;
    drawerIsOpen: any
    appointmentData: any,
    handleDateChange: (value: Date) => void;
    handleAppoinmentChange: (value: boolean) => void;
    fetchAppoinmentApiData: (value: Date) => void
}

function ExistingDrawer({drawerIsOpen, setDrawerIsOpen, appointmentData, handleAppoinmentChange, handleDateChange, fetchAppoinmentApiData}: ExistingDrawerProps) {

    const [activeTab, setActiveTab] = useState('info');
    const [isServiceSlideoverOpen, setServiceSlideoverOpen] = useState(false)
    const dispatch = useDispatch();
    const singleCustomerAppointment = useSelector((state: any) => state.appointment.singleCustomerAppointment);
    const selectedServices = useSelector((state: any) => state.serviceListState.selectedServices);

    const handleTabChange = (tab: React.SetStateAction<string>) => {
        setActiveTab(tab);
    };

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
            setDrawerIsOpen(false);
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

      const handleServiceDelete = (selectedService: any) => {
        dispatch(deleteService(selectedService.ProductID));
        console.log("deleted")
      };
      

  return (
    <div>
        <Drawer
            className="sm:hidden"
            anchor="bottom"
            open={drawerIsOpen}
            onClose={()=>{setDrawerIsOpen(false)}}
            ModalProps={{ keepMounted: true }}
            >
             <Paper
                sx={{
                height: '100vh', // Set the height to cover the whole screen
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between', // Adjust as needed
                }}
            >

             <div className='m-3'>
                <div className='flex'>
                    <h1 className="mr-auto font-bold text-2xl">
                    Edit Appoinment
                    </h1>
                    <Button className="border-none shadow-none" onClick={() => setDrawerIsOpen(false)}>
                        <Lucide icon="ArrowLeft"/>
                    </Button>
                </div>

               {/* Tab Navigation */}
               <div className="flex justify-start mb-5 mt-3">
                        <Button
                            variant="outline-secondary"
                            type="button"
                            className={` w-28 cursor-pointer rounded-full ${activeTab === 'info' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'}`}
                            onClick={() => handleTabChange('info')}
                        >
                            Info
                        </Button>
                        <Button
                            variant="outline-secondary"
                            type="button"
                            className={`w-28  cursor-pointer ml-3 rounded-full ${activeTab === 'notes' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'}`}
                            onClick={() => handleTabChange('notes')}
                        >
                            Notes
                        </Button>

                    </div>

                    {activeTab === 'info' && (
                        <>
                          
                              <div
                                  style={{
                                      backgroundColor: (appointmentData.Colour), // Replace with your color extraction logic
                                      padding: '20px',
                                      borderRadius:"20px",
                                  }}
                                  className="flex justify-between p-0"
                              >
                                  <h1 className="text-2xl text-white mt-1">{appointmentData.StatusName}</h1>
                                  <StatusButtons selectedStatus={appointmentData.StatusID} onSelectStatus={handleChangeStatus} />
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
                </div>
            </Paper>
        </Drawer>

    </div>
  )
}

export default ExistingDrawer
