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
import { FaComment, FaEnvelope, FaStar } from "react-icons/fa";
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
import AppointmentPopup from "../../components/Modal";
import BlockTimePopup from "../../components/Modal/blockTime";
import ExistingDrawer from "../../components/MobileDrawer/existingDrawer";
import AddNewDrawer from "../../components/MobileDrawer/addNewDrawer";
import ReactTooltip from 'react-tooltip';

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
  const [SlotClickModal, setSlotClickModal] = useState(false);
  const [selectAddNew, setSelectAddNew] = useState(false)
  const [selectedSlotInfo, setSelectedSlotInfo] = useState<any | null>(null);
  const [blockTimePop, setBlockTimePop] = useState<any | null>(null);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [addNewDrawerOpen, setAddNewDrawerOpen] = useState(false);


  
  const scheduleData = useSelector((state: any) => state.appointment.scheduleData);
  const singleCustomerAppointment = useSelector((state: any) => state.appointment.singleCustomerAppointment);
  const dispatch = useDispatch();

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchAppoinmentApiData(date);
    }, 2000); // Poll every 3 seconds
    fetchAppoinmentApiData(date); 
    console.log(scheduleData)
    // return () => clearInterval(intervalId); 
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
    setAddNewDrawerOpen(true)
  };
  // const blockTimeClicked = () => {
  //   setBlockTimePop(true)
  //   setSlotClickModal(false)
  // }

  // const addNewAppointment = async () => {
  //   if (selectedSlotInfo) {
  //     setSlotClickModal(false)
  //     const startTime = moment(selectedSlotInfo.start).format('HH:mm');
  //     setDate(selectedSlotInfo.start);
  //     setSelectedTime(startTime);
  //     const staffTitle = selectedSlotInfo.resource.title;
  //     const staffID = selectedSlotInfo.resource.id;
  //     setResourceTitle(staffTitle);
  //     setResourceID(staffID);

  //     fetchServiceApiData(staffID);
  //     setSlotSlideoverPreview(true);
  //   }
  // };

  const handleEventClick = async (info: { event: any }) => {
    try {
      const appointmentID = info.event.extendedProps.ID;
      fetchServiceApiData(info.event.extendedProps.resourceId)
      await calendarRepository.getSingleAppointment(appointmentID).then((res: any) => {
        setSelectedAppointment(res.data.Appointment);
        setExistingInformationSlide(true);
        setDrawerIsOpen(true)
      })
    } catch (error) {
      // console.error('Error fetching appointment information:', error.message);
    }
  };

  const fetchAppoinmentApiData = async (date: { getTime: () => number } | undefined): Promise<any[]> => {
    try {
      const data = date ? Math.floor(date.getTime() / 1000) : null;
      const res = await calendarRepository.getAppointment(data);
      const appointmentsArray = res.data.Appointments || [];
  
      if (appointmentsArray.length > 0) {
        const appointmentsByCustomer: Record<string, any[]> = {};
  
        appointmentsArray.forEach((appointment: any) => {
          const customerID = appointment.CustomerID;
  
          if (!appointmentsByCustomer[customerID]) {
            appointmentsByCustomer[customerID] = [];
          }
  
          const previousAppointments = appointmentsByCustomer[customerID];
          let isSeparateAppointment = true;
  
          if (!existingInformationSlide) {
            for (const lastAppointment of previousAppointments.reverse()) {
              const timeDifference = appointment.StartTime - lastAppointment.EndTime;
  
              const timeThreshold = 60 * 30;
  
              if (timeDifference <= timeThreshold) {
                lastAppointment.EndTime = appointment.EndTime;
                lastAppointment.Services.push(...appointment.Services);
                isSeparateAppointment = false;
                break;
              }
            }
          }
  
          if (isSeparateAppointment) {
            appointmentsByCustomer[customerID].push(appointment);
          }
        });
        // console.log('Fetching appointments...');
        dispatch(setScheduleData(appointmentsArray));
        if (!existingInformationSlide && !drawerIsOpen) {
          dispatch(setAppointmentToCustomer(appointmentsByCustomer));
        }
        // console.log("Thong tin cuoc hen by ID", appointmentsByCustomer);
        // console.log(appointmentsArray);

        // Return the appointmentsArray or the processed data if needed
        return appointmentsArray;
      } else {
        // If there are no appointments, return an empty array or handle accordingly
        return [];
      }
    } catch (error) {
      console.error('Error fetching the API:', (error as Error).message);
      
      // If there's an error, throw it to indicate a failure in fetching data
      throw error;
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
    timeZone:'local',
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
  ? scheduleData.map((appointment: any) => {
      const customerName = (appointment as { CustomerName: string }).CustomerName;
      const serviceName = (appointment as { ServiceName: string }).ServiceName;
      const companyNotes = (appointment as { CompanyNotes: string }).CompanyNotes;
      const customerNote = (appointment as { CustomerNote: string }).CustomerNote;
      const startTime = (appointment as { StartTime: Date }).StartTime;
      const endTime = (appointment as { EndTime: Date }).EndTime;
      const staffID = (appointment as { StaffID: string }).StaffID;
      const colour = (appointment as { Colour: string }).Colour;
      const ID = (appointment as { ID: string }).ID;
      const firstName = (appointment as { FirstName: string }).FirstName;
      const lastName = (appointment as { LastName: string }).LastName;
      const mobile = (appointment as { Mobile: string }).Mobile;
      const duration = (appointment as { Duration: any }).Duration;
      const bookDate = (appointment as { BookDate: Date }).BookDate;
      const serviceID = (appointment as { ServiceID: string }).ServiceID;
      const isFirstBooking = (appointment as { IsFirstBooking: boolean }).IsFirstBooking;
      const isWebBooking = (appointment as { IsWebBooking: boolean }).IsWebBooking;

      // Construct the title
      let title = `${customerName} - ${serviceName}`;
      if (companyNotes && companyNotes !== 'null') {
        title += ` / ${companyNotes}`;

      }

      // Add customer note to title if available
      if (customerNote && customerNote !== 'null') {
        title += ` / ${customerNote}`;
      } 

      return {
        title,
        start: startTime,
        end: endTime,
        resourceId: staffID,
        color: colour,
        extendedProps: {
          ID,
          resourceId: staffID,
          firstName,
          lastName,
          Mobile: mobile,
          Duration: duration,
          bookDate,
          serviceName,
          serviceID,
          IsFirstBooking: isFirstBooking,
          IsWebBooking: isWebBooking,
          CompanyNotes: companyNotes,
          CustomerNote: customerNote ,
        },
      };
    })
  : [],
  eventDidMount: ({ el, event }) => {
    const iconContainer = document.createElement('div');
    iconContainer.classList.add('event-icon-container');
  
    const isFirstBooking = event.extendedProps?.IsFirstBooking;
    const hasCompanyNotes = event.extendedProps?.CompanyNotes;
    const hasCustomerNote = event.extendedProps?.CustomerNote;
  
    if (isFirstBooking) {
      const StarIconComponent = FaStar;
      const starIcon = document.createElement('div');
      starIcon.style.marginRight = '5px'; // Add margin between icons
      ReactDOM.render(<StarIconComponent size={15} />, starIcon);
      iconContainer.appendChild(starIcon);
    }

    
  
    if (hasCompanyNotes || hasCustomerNote) {
      const CommentIconComponent = FaComment;
      const commentIcon = document.createElement('div');
      commentIcon.style.marginRight = '5px';
      ReactDOM.render(<CommentIconComponent size={15} />, commentIcon);
      iconContainer.appendChild(commentIcon);
    }
  
    el.appendChild(iconContainer);
  },
  
  
    selectLongPressDelay:500,
    eventClick: handleEventClick,
    eventOverlap:false,
    eventDrop: function (info) {
      if (info.event.extendedProps.requirelock) {
        alert("This appointment is locked, unable to make any changes.");
        info.revert();
      } else {
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
          CustomerNote: info.event.extendedProps.customerNote,
          CompanyNotes: info.event.extendedProps.companyNotes
        };
    
        // Make the updateAppointment API call
        calendarRepository.updateAppointment(appointmentData)
          .then(response => {
            if (response.status === 200) {
              logSuccess('Appointment rescheduled successfully');
              fetchAppoinmentApiData(date)
            } else {
              logError('Error updating appointment. Please try again.');
              info.revert();
            }
          })
          .catch(error => {
            logError('An unexpected error occurred. Please try again later.');
            info.revert();
          })

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
          CustomerNote: info.event.extendedProps.companyNotes,
          CompanyNotes: info.event.extendedProps.customerNote,
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
      {/* Mobile Select Staff and View */}

      <div className="flex mt-3 justify-between sm:hidden">
        <div className="">
            <SelectStaff staffData={staffData} selectedStaff={selectedStaff} handleStaffChange={handleStaffChange} />   
        </div>

        <div className="">
          <SelectView  switchToWeek={switchToWeek} switchToDay={switchToDay} />
        </div>
      </div>

      {/* Mobile Select Staff and View */}

      <div className="flex flex-col sm:flex-row mt-3 mb-3 justify-between">
        <div className="hidden sm:block">
          <SelectStaff staffData={staffData} selectedStaff={selectedStaff} handleStaffChange={handleStaffChange} />   
        </div>
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
        <div className="hidden sm:block">
          <SelectView  switchToWeek={switchToWeek} switchToDay={switchToDay} />
        </div>
        
      </div>

      {}
      
      <FullCalendar {...options} ref={calendarRef} select={handleSlotClicked}/>


      {slotSlideoverPreview && (<SlideOverPanel setAddNewDrawerOpen={setAddNewDrawerOpen} handleAppoinmentChange={handleAppoinmentChange}  resourceID={resourceID} date={date} fetchAppoinmentApiData={fetchAppoinmentApiData} showAppointmentToast={showAppointmentToast} isOpen={slotSlideoverPreview} onClose={handleClose} serviceData={serviceData} selectedTime={selectedTime} />)}
      {existingInformationSlide && (<ExistingInfo setDrawerIsOpen={setDrawerIsOpen} fetchAppoinmentApiData={fetchAppoinmentApiData} handleDateChange={handleDateChange} handleAppoinmentChange={handleAppoinmentChange}  isOpen={existingInformationSlide} onClose={handleCloseEventSlide} appointmentData={selectedAppointment} serviceData={serviceData}/>)}
      {drawerIsOpen && (<ExistingDrawer  fetchAppoinmentApiData={fetchAppoinmentApiData} drawerIsOpen={drawerIsOpen} setDrawerIsOpen={setDrawerIsOpen} appointmentData={selectedAppointment} handleAppoinmentChange={handleAppoinmentChange} handleDateChange={handleDateChange} serviceData={serviceData} />)}
      {addNewDrawerOpen && (<AddNewDrawer addNewDrawerOpen={addNewDrawerOpen} setAddNewDrawerOpen={setAddNewDrawerOpen}  handleAppoinmentChange={handleAppoinmentChange}  resourceID={resourceID} date={date} fetchAppoinmentApiData={fetchAppoinmentApiData} showAppointmentToast={showAppointmentToast}  serviceData={serviceData} selectedTime={selectedTime} />)}
      {/* {SlotClickModal && (<AppointmentPopup selectedSlotInfo={selectedSlotInfo} slotClickModal={SlotClickModal} setSlotClickModal={setSlotClickModal} addNewAppointment={addNewAppointment} blockTimeClicked={blockTimeClicked} />)}
      {blockTimePop && (<BlockTimePopup blockTimePop={blockTimePop} setBlockTimePop={setBlockTimePop} />)} */}
      
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

