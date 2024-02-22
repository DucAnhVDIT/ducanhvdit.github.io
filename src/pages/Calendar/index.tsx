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
  Source,
  Highlight,
} from "../../base-components/PreviewComponent";
import { useState, useRef, SetStateAction, useEffect, JSXElementConstructor, ReactElement, ReactNode, useCallback } from "react";
import { DatePicker, ButtonGroupPicker, ButtonOption, Input, ButtonMenu, Picklist, CounterInput, Textarea, WeekDayPicker, CheckboxToggle, Application } from 'react-rainbow-components';
import Button from "../../base-components/Button";
import Lucide from "../../base-components/Lucide";
import { Menu, Slideover, Dialog } from "../../base-components/Headless";
import {
  FormLabel,
  FormSwitch,
  FormInput,
  FormSelect,
} from "../../base-components/Form";
import moment from 'moment';
import dayjs from "dayjs";
import RequireLocks from "../../components/RequireLocks";
import AppointmentStatus from "../../components/Status";
import FloatingActionButtons from "../../components/FloatingButtons";
import TippyContent from "../../base-components/TippyContent";
import { FaSleigh, FaStar } from "react-icons/fa";
import { Flip, ToastContainer, ToastContentProps, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SlideOverPanel from "./sideSlide";
import DatePickerMUI from "../../components/DatePicker";
import CustomDatePicker from "../../components/DatePicker";
import ExistingInfo from "../../components/ExistingInfo";
import "./styles.css"
import ReactDOM from "react-dom";
import calendarRepository from "../../repositories/calendarRepository";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setScheduleData } from '../../stores/appoinmentSlice';
import eposRepository from "../../repositories/eposRepository";
import { logError, logSuccess } from "../../constant/log-error";



interface Staff {
  StaffID: number;
  StaffName: string;
  StaffColour: string | null;
}

function Main() {
  const [date, setDate] = useState(new Date());
  const [slotSlideoverPreview, setSlotSlideoverPreview] = useState(false);
  const [existingInformationSlide, setExistingInformationSlide] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const calendarRef = useRef<FullCalendar | null>(null);
  const [counter, setCounter] = useState<number | undefined>(undefined);
  const [resourceTitle, setResourceTitle] = useState("");
  const [resourceID, setResourceID] = useState("");
  const [calendarEvents, setCalendarEvents] = useState<any[]>([]);
  const [staffData, setStaffData] = useState([]);
  // const [scheduleData, setScheduleData] = useState<any[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [serviceData, setServiceData] = useState(null);
  const [appoinmentChange, setAppointmentChange] = useState<boolean>(false)

  const scheduleData = useSelector((state: any) => state.appointment.scheduleData);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAppoinmentApiData(date);  
  }, [appoinmentChange]);

  const handleAppoinmentChange = (value: boolean | ((prevState: boolean) => boolean)) => {
    setAppointmentChange(value);
  };

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

  const handleCancel = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setSlotSlideoverPreview(false)
  }

  const handleEventClick = async (info: { event: any }) => {
    try {
      const appointmentID = info.event.extendedProps.ID; // Replace 'id' with the actual property name
      await calendarRepository.getAppointment(appointmentID).then((res: any) => {
        setSelectedAppointment(res.data);
        setExistingInformationSlide(true);
      })
    } catch (error) {
      // console.error('Error fetching appointment information:', error.message);
    }
  };

  const fetchAppoinmentApiData = async (date: { getTime: () => number; } | undefined) => {
      try {
        const data = date ? Math.floor(date.getTime() / 1000) : null
        await calendarRepository.getAppointment(data).then((res: any) => {
          const appointmentsArray = res.Appointments || [];
          if (appointmentsArray.length > 0) {
            setScheduleData(appointmentsArray);
            dispatch(setScheduleData(appointmentsArray));
          }
        })
      } catch (error) {
        console.error('Error fetching the API:', (error as Error).message);
        return null;
      }
    };

  const fetchStaffApiData = async () => {
      try {
        await calendarRepository.getStaff(Math.floor(date.getTime() / 1000)).then((res: any) => {
          setStaffData(res.data.Staffs)
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
    ? scheduleData.map((appointment: any) => ({
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
    eventDrop: function (info) {

      if (!confirm("Are you sure you want to change?")) {
          info.revert();
      } else {
          if (info.event.extendedProps.requirelock) {
              alert("This appointment is locked, unable to make any changes.");
              info.revert();
          }
  
          // Extracting relevant data for the request
          const appointmentData = {
              ID: info.event.extendedProps.ID,
              business_id: "20160908110055249272",
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
          calendarRepository.updateAppointment(appointmentData).then(response => {
            if (response.status === 200) {
                logSuccess('Appointment rescheduled successfully')
                setAppointmentChange(prev => !prev)
            } else {
                logError('Error updating appointment. Please try again.')
            }
        })
        .catch(error => {
          logError('An unexpected error occurred. Please try again later.')
        });
      }
    },
    eventResize: function (info) {
      if (!confirm("Are you sure you want to change?")) {
        info.revert();
      } else {
        if (info.event.extendedProps.requirelock) {
          alert("This appointment is locked, unable to make any changes.");
          info.revert();
        }

        const newStartTime: any = info.event.start;
        const newEndTime: any = info.event.end;
        const newDurationInMinutes = (newEndTime - newStartTime) / (1000 * 60);

        // Extracting relevant data for the request
        const appointmentData = {
          "ID": info.event.extendedProps.ID,
          "business_id": "20160908110055249272",
          "FirstName": info.event.extendedProps.firstName,
          "LastName": info.event.extendedProps.lastName,
          "Mobile": info.event.extendedProps.Mobile,
          "Email": "",
          "BookDate": info.event.extendedProps.bookDate,
          "StartTime": newStartTime,
          "ServiceID": info.event.extendedProps.serviceID,
          "StaffID": info.event.extendedProps.resourceId,
          "Islocked": false,
          "CustomerNote": "",
          "GuestNotes": null,
          "Duration": newDurationInMinutes,
        };
        calendarRepository.updateAppointment(appointmentData).then(response => {
          if (response.status === 200) {
            logSuccess('Appointment updated successfully')
            setAppointmentChange(prev => !prev)
          } else {
            logError('Error updating appointment. Please try again.')
          }
        })
        .catch(error => {
          logError('An unexpected error occurred. Please try again later.')
        });
      }
    },
    
    resources: staffData
    ? staffData.map((staff) => ({
        id: String((staff as { StaffID: number }).StaffID),
        title: (staff as { StaffName: string }).StaffName || '',
        staffColor: (staff as { StaffColour: string }).StaffColour || '', // Use staff color if available
      }))
    : [],
    select: handleSlotClicked
  }

  const handleDateChange = (date: Date) => {
    setDate(date);
    // Use calendarRef to access FullCalendar instance and navigate to the selected date
    if (calendarRef.current) {
      calendarRef.current.getApi().gotoDate(date);
      // setDate(selectedDate)
    }
    fetchAppoinmentApiData(date)
  };

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
      {/* BEGIN: Input Group */}
      <PreviewComponent className="mt-5 intro-y bg-transparent">
            {({ toggle }) => (
              <>
                <div className="p-5">
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
      
      <FullCalendar {...options} ref={calendarRef} select={handleSlotClicked}/>

      {slotSlideoverPreview && (<SlideOverPanel handleAppoinmentChange={handleAppoinmentChange}  resourceID={resourceID} date={date} fetchAppoinmentApiData={fetchAppoinmentApiData} showAppointmentToast={showAppointmentToast} isOpen={slotSlideoverPreview} onClose={handleClose} serviceData={serviceData} selectedTime={selectedTime} />)}
      {existingInformationSlide && (<ExistingInfo  isOpen={existingInformationSlide} onClose={handleCloseEventSlide} appointmentData={selectedAppointment}/>)}
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

