import "@fullcalendar/react/dist/vdom";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import { CalendarOptions } from "@fullcalendar/common";
import {
  PreviewComponent,
  Preview,
} from "../../base-components/PreviewComponent";
import { useState, useRef, SetStateAction, useEffect, JSXElementConstructor, ReactElement, ReactNode, useCallback } from "react";
import Button from "../../base-components/Button";
import Lucide from "../../base-components/Lucide";
import moment from 'moment';
import { FaSleigh, FaStar } from "react-icons/fa";
import { Flip, ToastContainer, ToastContentProps, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SlideOverPanel from "./sideSlide";
import CustomDatePicker from "../../components/DatePicker";
import ExistingInfo from "./existingInfo";
import "./styles.css"
import ReactDOM from "react-dom";
import calendarRepository from "../../repositories/calendarRepository";
import { useSelector, useDispatch } from 'react-redux';
import { setScheduleData, setAppointmentToCustomer } from '../../stores/appoinmentSlice';
import eposRepository from "../../repositories/eposRepository";
import { logError, logSuccess } from "../../constant/log-error";
import Select from 'react-select';
import SelectStaff from "../../components/SelectStaffButton";
import React from "react";
import SelectView from "../../components/SelectViewButton";

function Main() {
  const [date, setDate] = useState(new Date());
  const [slotSlideoverPreview, setSlotSlideoverPreview] = useState(false);
  const [existingInformationSlide, setExistingInformationSlide] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const calendarRef = useRef<FullCalendar | null>(null);
  const [resourceTitle, setResourceTitle] = useState("");
  const [resourceID, setResourceID] = useState("");
  const [staffData, setStaffData] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [serviceData, setServiceData] = useState(null);
  const [appoinmentChange, setAppointmentChange] = useState<boolean>(false)
  const [selectedStaff, setSelectedStaff] = React.useState<string | null>(null);
  
  const scheduleData = useSelector((state: any) => state.appointment.scheduleData);
  const singleCustomerAppointment = useSelector((state: any) => state.appointment.singleCustomerAppointment);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAppoinmentApiData(date);
  }, [appoinmentChange]);

  const handleAppoinmentChange = (value: boolean | ((prevState: boolean) => boolean)) => {
    setAppointmentChange((prev) => !prev);
  };

  
  const handleStaffChange = (selectedOption: any) => {
    const selectedStaffId = selectedOption.value;
    setSelectedStaff(selectedStaffId);
  };
  
  useEffect(() => {
    // console.log('Selected Staff:', selectedStaff);
    // ... rest of the useEffect logic
  }, [selectedStaff, staffData, scheduleData]);
  

  useEffect(() => {
    fetchStaffApiData();
  }, []);
  
  const handleSlotClicked = async (info: any) => {
    const startTime = moment(info.start).format('HH:mm');
    setDate(info.start);
    setSelectedTime(startTime);
    const staffTitle = info.resource.title;
    const staffID = info.resource.id;
    setResourceTitle(staffTitle);
    setResourceID(staffID);
  
    fetchServiceApiData(staffID);
    setSlotSlideoverPreview(true);
  };

  const handleEventClick = async (info: { event: any }) => {
    try {
      const appointmentID = info.event.extendedProps.ID;
      fetchServiceApiData(info.event.extendedProps.resourceId)
      await calendarRepository.getSingleAppointment(appointmentID).then((res: any) => {
        setSelectedAppointment(res.data.Appointment);
        setExistingInformationSlide(true);
      })
    } catch (error) {
      // console.error('Error fetching appointment information:', error.message);
    }
  };

  const fetchAppoinmentApiData = async (date: { getTime: () => number; } | undefined) => {
    try {
      const data = date ? Math.floor(date.getTime() / 1000) : null;
      const res = await calendarRepository.getAppointment(data);
      const appointmentsArray = res.data.Appointments || [];
  
      if (appointmentsArray.length > 0) {
        // Organize appointments by customerID
        const appointmentsByCustomer: Record<string, any[]> = {};
  
        appointmentsArray.forEach((appointment: any) => {
          const customerID = appointment.CustomerID;
  
          if (!appointmentsByCustomer[customerID]) {
            appointmentsByCustomer[customerID] = [];
          }
  
          const previousAppointments = appointmentsByCustomer[customerID];
          let isSeparateAppointment = true;
  
          // Only perform mapping if existingInformationSlide is false
          if (!existingInformationSlide) {
            // Iterate through previous appointments
            for (const lastAppointment of previousAppointments.reverse()) {
              const timeDifference = appointment.StartTime - lastAppointment.EndTime;
  
              // If the time difference is within the threshold, consider it part of the same appointment
              const timeThreshold = 60 * 30; // Adjust this threshold as needed (e.g., 30 minutes)
              if (timeDifference <= timeThreshold) {
                lastAppointment.EndTime = appointment.EndTime; // Update the end time
                lastAppointment.Services.push(...appointment.Services); // Combine services
                isSeparateAppointment = false;
                break; // Exit the loop if combined with a previous appointment
              }
            }
          }
  
          if (isSeparateAppointment) {
            appointmentsByCustomer[customerID].push(appointment);
          }
        });
  
        // setScheduleData(appointmentsArray);
        dispatch(setScheduleData(appointmentsArray));
        if (!existingInformationSlide) {
          dispatch(setAppointmentToCustomer(appointmentsByCustomer));
        }
        console.log("Thong tin cuoc hen by ID", appointmentsByCustomer);
        console.log(appointmentsArray);
      }
    } catch (error) {
      console.error('Error fetching the API:', (error as Error).message);
      return null;
    }
  };
  

  const fetchStaffApiData = async () => {
      try {
        await calendarRepository.getStaff(Math.floor(date.getTime() / 1000)).then((res: any) => {
          setStaffData(res.data.Staffs)
          console.log(res.data.Staffs)
        })
      } catch (error) {
        // console.error('Error fetching the API:', error.message);
      }
    }

  const fetchServiceApiData = async (staffID: string) => {
      try {
        await eposRepository.getServices(staffID, 0).then((res: any) => {
          setServiceData(res.data.Services)
        })
       } catch (error) {
        // console.error('Error fetching the API:', error.message);
      }
    };
  
    const showAppointmentToast = (
      message: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ((props: ToastContentProps<unknown>) => ReactNode) | null | undefined,
      type: 'success' | 'error' | 'warning' = 'success'
    ) => {
      if (type === 'success') {
        toast.success(message);
      } else if (type === 'error') {
        toast.error(message);
      } else if (type === 'warning') {
        toast.warning(message);
      } else {
        // Default to success if an invalid type is provided
        toast.success(message);
      }
    };

  const options: CalendarOptions = {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin, resourceTimeGridPlugin],
    droppable: true,
    headerToolbar: false,
    initialView: 'resourceTimeGridDay',
    views: {
        resourceTimeGridTwoDay: {
            type: 'resourceTimeGrid',
            duration: { days: 1 },
        }
    },
    slotDuration:"00:10",
    selectOverlap: false,
    eventTimeFormat: {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    },
    slotLabelFormat: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    },
    eventResourceEditable: true,
    refetchResourcesOnNavigate: true,
    allDaySlot: false,
    navLinks: true,
    editable: true,
    dayMaxEvents: true,
    schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
    slotMinTime: '9:00:00',
    slotMaxTime: '19:00:00',
    contentHeight: 'auto',
    selectable: true,
    nowIndicator:true,
    events: scheduleData
    ? scheduleData
        .map((appointment: any) => ({
          title: `${(appointment as { CustomerName: string }).CustomerName} - ${(appointment as { ServiceName: string }).ServiceName}`,
          start: (appointment as { StartTime: Date }).StartTime,
          end: (appointment as { EndTime: Date }).EndTime,
          resourceId: (appointment as { StaffID: string }).StaffID,
          color: (appointment as { Colour: string }).Colour,
          extendedProps: {
            ID: (appointment as { ID: string }).ID,
            resourceId: (appointment as { StaffID: string }).StaffID,
            firstName : (appointment as { FirstName: string }).FirstName,
            lastName : (appointment as { LastName: string }).LastName,
            Mobile : (appointment as { Mobile: string }).Mobile,
            Duration : (appointment as { Duration: any }).Duration,
            bookDate: (appointment as { BookDate: Date }).BookDate,
            serviceName: (appointment as { ServiceName: string }).ServiceName,
            serviceID: (appointment as { ServiceID: string }).ServiceID,
            IsFirstBooking: (appointment as { IsFirstBooking: boolean }).IsFirstBooking,
            IsWebBooking: (appointment as { IsWebBooking: boolean }).IsWebBooking,
          },
        }))
    : [],
    eventDidMount: ({ el, event }) => {
      const iconContainer = document.createElement('div');
      iconContainer.classList.add('event-icon-container');
  
      const isFirstBooking = event.extendedProps?.IsFirstBooking;
  
      if (isFirstBooking) {
        const IconComponent = FaStar; // Display star icon for first booking
        ReactDOM.render(<IconComponent size={15} />, iconContainer);
      }
      el.appendChild(iconContainer);
    },
    longPressDelay:1,
    eventClick: handleEventClick,
    eventOverlap:false,
    eventDrop: function (info) {
      if (info.event.extendedProps.requirelock) {
        alert("This appointment is locked, unable to make any changes.");
        info.revert();
      } else {
        // Optimistic update
        // const oldStart = new Date(info.event.start.getTime());
        // const oldEnd = info.event.end ? new Date(info.event.end.getTime()) : null;
    
        // info.event.setStart(info.event.start);
        // if (info.event.end) {
        //   info.event.setEnd(info.event.end);
        // }
    
        // Extracting relevant data for the request
        const appointmentData = {
          ID: info.event.extendedProps.ID,
          FirstName: info.event.extendedProps.firstName,
          LastName: info.event.extendedProps.lastName,
          Mobile: info.event.extendedProps.Mobile,
          Email: "",
          BookDate: info.event.extendedProps.bookDate,
          StartTime: info.event.start,
          ServiceID: info.event.extendedProps.serviceID,
          StaffID: info.newResource ? info.newResource._resource.id : info.event.extendedProps.resourceId,
          Islocked: false,
          CustomerNote: "",
          GuestNotes: null,
        };
    
        // Make the updateAppointment API call
        calendarRepository.updateAppointment(appointmentData)
          .then(response => {
            if (response.status === 200) {
              logSuccess('Appointment rescheduled successfully');

              fetchAppoinmentApiData(date)
            } else {
              logError('Error updating appointment. Please try again.');
              // Revert the UI if the API call fails
              info.revert();
            }
          })
          .catch(error => {
            logError('An unexpected error occurred. Please try again later.');
            // Revert the UI if there's an API call error
            info.revert();
          })
          // .finally(() => {
          //   // Reset the UI to the original state if needed (e.g., in case of API call failure)
          //   if (info.revert) {
          //     info.event.setStart(oldStart);
          //     if (oldEnd) {
          //       info.event.setEnd(oldEnd);
          //     }
          //   }
          // });
      }
    },
    
    eventResize: function (info) {
      // if (!confirm("Are you sure you want to change?")) {
      //   info.revert();
      // } else {
        if (info.event.extendedProps.requirelock) {
          alert("This appointment is locked, unable to make any changes.");
          info.revert();
        }

        const newStartTime: any = info.event.start;
        const newEndTime: any = info.event.end;
        const newDurationInMinutes = (newEndTime - newStartTime) / (1000 * 60);

        // Extracting relevant data for the request
        const appointmentData = {
          ID: info.event.extendedProps.ID,
          FirstName: info.event.extendedProps.firstName,
          LastName: info.event.extendedProps.lastName,
          Mobile: info.event.extendedProps.Mobile,
          Email: "",
          BookDate: info.event.extendedProps.bookDate,
          StartTime: newStartTime,
          ServiceID: info.event.extendedProps.serviceID,
          StaffID: info.event.extendedProps.resourceId,
          Islocked: false,
          CustomerNote: "",
          GuestNotes: null,
          Duration: newDurationInMinutes,
        };
        calendarRepository.updateAppointment(appointmentData).then(response => {
          if (response.status === 200) {
            logSuccess('Appointment updated successfully')
            fetchAppoinmentApiData(date)
          } else {
            logError('Error updating appointment. Please try again.')
          }
        })
        .catch(error => {
          logError('An unexpected error occurred. Please try again later.')
        });
      // }
    },
    
    resources: staffData
  ? staffData
      .filter((staff) => {
        const staffID = String((staff as { StaffID: number }).StaffID);
        return !selectedStaff || staffID === selectedStaff;
      })
      .map((staff) => ({
        id: String((staff as { StaffID: number }).StaffID),
        title: (staff as { StaffName: string }).StaffName || '',
        staffColor: (staff as { StaffColour: string }).StaffColour || '',
      }))
  : [],
  resourcesInitiallyExpanded: false,


    select: handleSlotClicked
  }
  const handleDateChange = (date: Date) => {
    setDate(date);
    // Use calendarRef to access FullCalendar instance and navigate to the selected date
    if (calendarRef.current) {
      calendarRef.current.getApi().gotoDate(date);
    }
    fetchAppoinmentApiData(date)
  };

  const switchToWeek = () => {
      calendarRef.current?.getApi().changeView('resourceTimeGridWeek')
  }

  const switchToDay = () => {
    calendarRef.current?.getApi().changeView('resourceTimeGridDay')
  }


  const nextDay = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().next();
      const currentDate = calendarRef.current.getApi().view.currentStart;
      setDate(currentDate);
      fetchAppoinmentApiData(currentDate)
    }
  };

  const prevDay = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().prev();
      const currentDate = calendarRef.current.getApi().view.currentStart;
      setDate(currentDate);
      fetchAppoinmentApiData(currentDate)
    }
  };

  const todayDate = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().today();
      const currentDate = calendarRef.current.getApi().view.currentStart;
      setDate(currentDate);
      fetchAppoinmentApiData(currentDate)
    }
  };

  const closeModal = () => {
    setSlotSlideoverPreview(false)
  }

  const handleClose = () => {
    setSlotSlideoverPreview(false);
  };

  const handleCloseEventSlide = () => {
    setExistingInformationSlide(false);
  };

  return (
    <div  className="full-calendar">
      <div className="flex mt-3 mb-3 justify-between">
        <SelectStaff staffData={staffData} selectedStaff={selectedStaff} handleStaffChange={handleStaffChange} />   
        {/* BEGIN: Input Group */}
        <PreviewComponent className="intro-y bg-transparent">
              {({ toggle }) => (
                <>
                  <div className="">
                  <Preview>
                    <div className="flex items-center justify-evenly w-full md:w-fit mx-auto bg-primary rounded-full p-0.5 overflow-x-auto">
                      <Button className="text-sm sm:text-base text-white border-none shadow-none" onClick={prevDay}>
                        <Lucide icon="ChevronLeft" className="w-4 h-4 sm:w-6 sm:h-6" />
                      </Button>
                      <div className="border-r border-white h-4 sm:h-6 mx-1 sm:mx-2"></div>
                      <Button className="text-sm font-normal bg-primary text-white border-none shadow-none" onClick={todayDate}>
                        Today
                      </Button>
                      <div className="border-r border-white h-4 sm:h-6 mx-1 sm:mx-2"></div>
                      <CustomDatePicker date={date} goToDate={handleDateChange}/>
                      <div className="border-r border-white h-4 sm:h-6 mx-1 sm:mx-2"></div>
                      <Button className="text-xs sm:text-base text-white border-none shadow-none" onClick={nextDay}>
                        <Lucide icon="ChevronRight" className="w-4 h-4 sm:w-6 sm:h-6" />
                      </Button>
                    </div>
                    </Preview>
                  </div>
                </>
              )}
        </PreviewComponent>

        <SelectView  switchToWeek={switchToWeek} switchToDay={switchToDay} />
        
      </div>


      
      <FullCalendar {...options} ref={calendarRef} select={handleSlotClicked}/>


      {slotSlideoverPreview && (<SlideOverPanel handleAppoinmentChange={handleAppoinmentChange}  resourceID={resourceID} date={date} fetchAppoinmentApiData={fetchAppoinmentApiData} showAppointmentToast={showAppointmentToast} isOpen={slotSlideoverPreview} onClose={handleClose} serviceData={serviceData} selectedTime={selectedTime} />)}
      {existingInformationSlide && (<ExistingInfo fetchAppoinmentApiData={fetchAppoinmentApiData} handleDateChange={handleDateChange} handleAppoinmentChange={handleAppoinmentChange}  isOpen={existingInformationSlide} onClose={handleCloseEventSlide} appointmentData={selectedAppointment} serviceData={serviceData}/>)}
      <ToastContainer
        position="top-center" 
        autoClose={3000} 
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="colored"
        pauseOnHover
       transition={Flip}
      />
    </div>
  );
}

export default Main;

