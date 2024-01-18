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
import { useState, useRef, SetStateAction, useEffect } from "react";
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SlideOverPanel from "../../components/SlideOver";
import DatePickerMUI from "../../components/DatePicker";
import CustomDatePicker from "../../components/DatePicker";
import ExistingInfo from "../../components/ExistingInfo";
import "./styles.css"
import ReactDOM from "react-dom";
import calendarRepository from "../../repositories/calendarRepository";





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
  const [scheduleData, setScheduleData] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [serviceData, setServiceData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const appointmentsData = await fetchAppoinmentApiData(date);
      setScheduleData(appointmentsData.Appointments);
    };
  
    fetchData();
  }, []); // Run this effect once when the component mounts
  
  // Effect to log scheduleData changes
  useEffect(() => {
    console.log("Updated Schedule Data:", scheduleData);
    console.log(staffData)
  }, [scheduleData]);
  
  // Effect to fetch staff data
  useEffect(() => {
    fetchStaffApiData();
    // fetchClientList();
  }, []);



  
  const handleSlotClicked = async (info: any) => {
    const startTime = moment(info.start).format('HH:mm');
    setDate(info.start);
    setSelectedTime(startTime);
    const staffTitle = info.resource.title;
    const staffID = info.resource.id;
    setResourceTitle(staffTitle);
    setResourceID(staffID);
  
    const data = await fetchServiceApiData(staffID);
    console.log('Data from API:', data);
    setServiceData(data);
    // Open the slideover preview
    setSlotSlideoverPreview(true);
  };


  
  

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    service: '',
    deposit: 0,
    date: null,
    time: '',
    guessNote: '',
    companyNote: '',
    locks: [], 
    status: '', 
    resourceID:''
  });

  // const handleModifyDateOnBooking = (info) => {

  // }

  const handleFormSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    const startDateTime = date;
    const endDateTime = new Date(startDateTime);
    endDateTime.setHours(endDateTime.getHours() + 1);
    // Create the event object
    const event = {
      title: `${formData.firstName} ${formData.lastName}`,
      start: startDateTime,
      end: endDateTime,
      resourceId: resourceID,
      // description: `Service: ${formData.service}\nDeposit: ${formData.deposit}\nGuess Note: ${formData.guessNote}\nCompany Note: ${formData.companyNote}`,
    };

    // Use the addEvent API to add the event to the calendar
    if (calendarRef.current) {
      // Use the addEvent method to add the event to the calendar
      calendarRef.current.getApi().addEvent(event);
    }
    console.log(event)

    toast.success('Booking added successfully!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2400,
    });

    // Reset the form data after submission (optional)
    setFormData({
      firstName: '',
      lastName: '',
      mobile: '',
      email: '',
      service: '',
      deposit: 0,
      date: null,
      time: '',
      guessNote: '',
      companyNote: '',
      locks: [],
      status: '',
      resourceID:''
    });
    setSlotSlideoverPreview(false)
  };

  const handleCancel = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setSlotSlideoverPreview(false)
  }

  const handleEventClick = async (info: { event: any }) => {
    try {
      const appointmentID = info.event.extendedProps.ID; // Replace 'id' with the actual property name
      const apiResponse = await fetch('https://beautyapi.vdit.co.uk/v1/GetAppointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa('testvdit:testvdit')}`,
        },
        body: JSON.stringify({
          "business_id": "20160908110055249272",
          "id": appointmentID,
        }),
      });
  
      if (!apiResponse.ok) {
        throw new Error(`HTTP error! Status: ${apiResponse.status}`);
      }
  
      const appointmentData = await apiResponse.json();
      setSelectedAppointment(appointmentData);
      setExistingInformationSlide(true);
      console.log(appointmentData)
    } catch (error) {
      // console.error('Error fetching appointment information:', error.message);
    }
  };

  const fetchAppoinmentApiData = async (date: { getTime: () => number; } | undefined) => {
      try {
        const data = date ? Math.floor(date.getTime() / 1000) : null
        
        calendarRepository.getAppointment(data).then((res) => console.log(res.data))


        const apiResponse = await fetch('https://beautyapi.vdit.co.uk/v1/GetAppointments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${btoa('testvdit:testvdit')}`,
          },
          body: JSON.stringify({
            "business_id": "20160908110055249272",
            "date": date ? Math.floor(date.getTime() / 1000) : null,
          }),
        });

        if (!apiResponse.ok) {
          throw new Error(`HTTP error! Status: ${apiResponse.status}`);
        }

        const appointmentsData = await apiResponse.json();
        console.log('API Response:', appointmentsData.Appointments);
        const appointmentsArray = appointmentsData.Appointments || [];

        // Update the state only if the array is not empty
        if (appointmentsArray.length > 0) {
          setScheduleData(appointmentsArray);
        }
        return appointmentsData

      } catch (error) {
        console.error('Error fetching the API:', (error as Error).message);
        return null;
      }
    };

  const fetchStaffApiData = async () => {
      try {
        const apiResponse = await fetch('https://beautyapi.vdit.co.uk/v1/GetStaff', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${btoa('testvdit:testvdit')}`,
          },
          body: JSON.stringify({
            "business_id": "20160908110055249272",
            "date": Math.floor(date.getTime() / 1000),
          }),
        });

        if (!apiResponse.ok) {
          throw new Error(`HTTP error! Status: ${apiResponse.status}`);
        }

        const staffData = await apiResponse.json();
        // console.log('API Response:', staffData);
        setStaffData(staffData.Staffs);
      } catch (error) {
        // console.error('Error fetching the API:', error.message);
      }
    };

    // const fetchClientList = async () => {
    //   try {
    //     const apiResponse = await fetch('https://beautyapi.vdit.co.uk/v1/GetCustomers', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Basic ${btoa('testvdit:testvdit')}`,
    //       },
    //       body: JSON.stringify({
    //         "business_id": "20180918154802018866",
    //       }),
    //     });

    //     if (!apiResponse.ok) {
    //       throw new Error(`HTTP error! Status: ${apiResponse.status}`);
    //     }

    //     const CustomersList = await apiResponse.json();
    //     console.log(CustomersList);

    //   } catch (error) {
    //     // console.error('Error fetching the API:', error.message);
    //   }
    // };
  

  const fetchServiceApiData = async (staffID: string) => {
      try {
        const apiResponse = await fetch('https://beautyapi.vdit.co.uk/v1/GetServices', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${btoa('testvdit:testvdit')}`,
          },
          body: JSON.stringify({
            "business_id": "20160908110055249272",
            "StaffID": staffID,
          }),
        });
    
        if (!apiResponse.ok) {
          throw new Error(`HTTP error! Status: ${apiResponse.status}`);
        }
    
        const responseData = await apiResponse.json();
        console.log(responseData);

        return responseData
    
        // Update your state or perform any other action with the service data
    
      } catch (error) {
        // console.error('Error fetching the API:', error.message);
      }
    };




  // Take all the data from the Api and add it to the calendar

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
    ? scheduleData.map((appointment) => ({
        title: `${(appointment as { CustomerName: string }).CustomerName} - ${(appointment as { ServiceName: string }).ServiceName}`,
        start: (appointment as { StartTime: Date }).StartTime,
        end: (appointment as { EndTime: Date }).EndTime,
        resourceId: (appointment as { StaffID: string }).StaffID,
        color: (appointment as { Colour: string }).Colour,
        extendedProps: {
          ID: (appointment as { ID: string }).ID,
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


        // ...

        // const root = createRoot(document.getElementById('root'));
        // root.render(<IconComponent size={15} />, iconContainer);
        ReactDOM.render(<IconComponent size={15} />, iconContainer);
      }
      el.appendChild(iconContainer);
    },
    longPressDelay:1,
    eventClick: handleEventClick,
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

      {slotSlideoverPreview && (<SlideOverPanel  isOpen={slotSlideoverPreview} onClose={handleClose} serviceData={serviceData}/>)}
      {existingInformationSlide && (<ExistingInfo  isOpen={existingInformationSlide} onClose={handleCloseEventSlide} appointmentData={selectedAppointment}/>)}
      <ToastContainer />
      
    </div>
    
  );
}



export default Main;

