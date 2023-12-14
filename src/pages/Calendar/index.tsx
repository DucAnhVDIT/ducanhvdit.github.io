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
import { FaSleigh } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SlideOverPanel from "../../components/SlideOver";




function Main() {
  const [date, setDate] = useState(new Date());
  const [slotSlideoverPreview, setSlotSlideoverPreview] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const calendarRef = useRef<FullCalendar | null>(null);
  const [counter, setCounter] = useState<number | undefined>(undefined);
  const [isFloatingActionVisible, setFloatingActionVisible] = useState(false);
  const [floatingActionPosition, setFloatingActionPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [resourceTitle, setResourceTitle] = useState("");
  const [resourceID, setResourceID] = useState("");
  
  const handleSlotClicked = (info: any) => {
  
    const rect = info.jsEvent.target.getBoundingClientRect();
    const position = {
      x: rect.left,
      y: rect.top,
    };
  
    const startTime = moment(info.start).format('HH:mm');
    setDate(info.start);
    setFloatingActionVisible(true);
    setSelectedTime(startTime);
    setFloatingActionPosition(position);
    console.log(position);
    const staffTitle = info.resource.title;
    const staffID = info.resource.id;
    setResourceTitle(staffTitle)
    setResourceID(staffID)
  };
  

  const handlePlusClick = () => {
    setFloatingActionVisible(false);
    setSlotSlideoverPreview(true)
  }

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

  const handleEventClick  = (info: { event: any; }) => {
    setSlotSlideoverPreview(true)
  }

  const fetchApiData = async () => {
      try {
        const apiResponse = await fetch('https://beautyapi.vdit.co.uk/v1/GetAppointments', {
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

        const apiData = await apiResponse.json();
        console.log('API Response:', apiData);
      } catch (error) {
        // console.error('Error fetching the API:', error.message);
      }
    };

  useEffect(() => {
    fetchApiData();
  }, []);
  

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
    slotDuration:"00:15",
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
    longPressDelay:1,
    eventClick: handleEventClick,
    resources: [
      { id: 'a', title: 'Staff 1' },
      { id: 'b', title: 'Staff 2'},
      { id: 'c', title: 'Staff 3' },
      { id: 'd', title: 'Staff 4' },
      { id: 'e', title: 'Staff 5' }
    ],
    select: handleSlotClicked
  }
  
  const handleDateChange = (selectedDate: Date) => {
    setDate(selectedDate);
    // Use calendarRef to access FullCalendar instance and navigate to the selected date
    if (calendarRef.current) {
      calendarRef.current.getApi().gotoDate(selectedDate);
      // setDate(selectedDate)
    }
  };

  const nextDay = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().next();
      const currentDate = calendarRef.current.getApi().view.currentStart;
      setDate(currentDate);
      console.log(currentDate)
      fetchApiData()
    }
  };


  const prevDay = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().prev();
      const currentDate = calendarRef.current.getApi().view.currentStart;
      setDate(currentDate);
    }
  };

  const closeModal = () => {
    setSlotSlideoverPreview(false)
  }

  const handleOpen = () => {
    setSlotSlideoverPreview(true);
  };

  const handleClose = () => {
    setSlotSlideoverPreview(false);
  };

  return (
    <div className="full-calendar">
      {/* BEGIN: Input Group */}
      <PreviewComponent className="mt-5 intro-y bg-transparent">
            {({ toggle }) => (
              <>
                <div className="p-5 bg-transparent">
                <Preview>
                    {/* <WeekDayPicker
                      id="weekday-picker-1"
                      value={day}
                      onChange={handleOnChange}
                      className=" text-center mb-4"
                    /> */}
                    <div className="flex items-center justify-evenly w-fit mx-auto bg-transparent rounded-3x ">
                      <Button className="p-2 bg-transparens border-none shadow-none" onClick={prevDay}>
                        <Lucide icon="ChevronLeft" className="text-black" />
                      </Button>
                      {/* <Application theme={theme}> */}
                        <DatePicker
                            valueAlignment = "center"
                            placeholder ="Date"
                            value={date}
                            id="main-date-picker"
                            formatStyle="large"
                            icon={<Lucide icon="Calendar" className="text-black" />}
                            onChange={handleDateChange}
                            borderRadius="semi-rounded"
                        />
                      {/* </Application> */}
                      <Button className="p-1 bg-transparent border-none shadow-none ml-1" onClick={nextDay}>
                        <Lucide icon="ChevronRight" className="text-black" />
                      </Button>
                    </div>
                  </Preview>
                </div>
              </>
            )}
      </PreviewComponent>

      {/* <Slideover
        open={slotSlideoverPreview}
        onClose={() => {
          setSlotSlideoverPreview(false);
        }}
      >
        <Slideover.Panel>
          <div className="flex flex-row justify-between">
              <Slideover.Title className="p-5">
                <h2 className="mr-auto text-base font-medium">Booking Information</h2>
              </Slideover.Title>
              <Button className="p-5 bg-transparent border-none shadow-none" onClick={closeModal}>
                <Lucide icon="X" className="text-black" />
              </Button>
          </div>
        </Slideover.Panel>
        <Slideover.Panel>
          <div className="flex flex-row justify-between">
              <Slideover.Title className="p-5">
                <h2 className="mr-auto text-base font-medium">Booking Information</h2>
              </Slideover.Title>
              <Button className="p-5 bg-transparent border-none shadow-none" onClick={closeModal}>
                <Lucide icon="X" className="text-black" />
              </Button>
          </div>
          <Slideover.Description>
            <form >
            <Input
                id="first-name"
                type="text"
                placeholder="First Name"
                className="mb-3"
                borderRadius="semi-rounded"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
             <Input
                id="last-name"
                type="text"
                placeholder="Last Name"
                className="mb-3"
                borderRadius="semi-rounded"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
              <Input
                id="mobile"
                type="text"
                placeholder="Mobile"
                className="mb-3"
                borderRadius="semi-rounded"
              />
              <Input
                id="email"
                type="email"
                placeholder="Email"
                className="mb-3"
                borderRadius="semi-rounded"
              />
              <Input
                id="staff"
                type="text"
                placeholder="Staff"
                className="mb-3"
                borderRadius="semi-rounded"
                value={resourceTitle}
                // onChange={(e) => setFormData({ ...formData, resourceID: e.target.value })}
              />
              <h1 className=" text-base mb-2">Services</h1>
              <Picklist
                id="service"
                placeholder="Services"
                className="mb-3"
                borderRadius="semi-rounded"
              />
              <CounterInput
                id="Deposit"
                placeholder="Deposit"
                className="mb-3"
                value={counter}
                onChange={setCounter}
                borderRadius="semi-rounded"
              />

              <h1 className=" text-base mb-2">Date Time</h1>
              <div className="flex flex-row">
                <DatePicker
                  valueAlignment="center"
                  placeholder="Date"
                  value={date}
                  formatStyle="large"
                  icon={<Lucide icon="Calendar" className="text-black" />}
                  onChange={handleDateChange}
                  className="mb-3 mr-2"
                  borderRadius="semi-rounded"
                />
                  <Input
                    valueAlignment="center"
                    id="time"
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    borderRadius="semi-rounded"
                  />
              </div>

              <Textarea
                  id="guess-note"
                  rows={3}
                  placeholder="Guess Note"
                  className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto mb-2"
                  borderRadius="semi-rounded"
              />
              <Textarea
                  id="company-note"
                  rows={3}
                  placeholder="Company Note"
                  className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto mb-2"
                  borderRadius="semi-rounded"
              />
              <RequireLocks />

              <h1 className=" text-base mb-2">Status</h1>
              <AppointmentStatus />
              <div className="flex justify-center items-center mt-4 mb-7">
                <Button onClick={handleFormSubmit} type="submit" className=" bg-primary text-white p-3 m-4 w-24" > Submit</Button>
                <Button onClick={handleCancel} className=" bg-red-500 text-white p-3 m-4 w-24" > Cancel</Button>
              </div>
            </form>
          </Slideover.Description>
        </Slideover.Panel>
      </Slideover> */}

      <FullCalendar {...options} ref={calendarRef} select={handleSlotClicked}/>

      {slotSlideoverPreview && (<SlideOverPanel isOpen={slotSlideoverPreview} onClose={handleClose}/>)}

      
      {isFloatingActionVisible && (
        <FloatingActionButtons onPlusClick={handlePlusClick} position={floatingActionPosition} />
      )}
      <ToastContainer />
      {/* <Dialog
        open={basicModalPreview}
        onClose={() => {
          setBasicModalPreview(false);y
        }}
        className="flex items-center justify-center w-10"
      >
        <Dialog.Panel className="p-10 text-center w-4" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <a
          onClick={(event: React.MouseEvent) => {
            event.preventDefault();
            setBasicModalPreview(false);
          }}
          className="absolute top-0 right-0 mt-3 mr-3"
            href="#"
          >
            <Lucide icon="X" className="w-8 h-8 text-slate-400" />
          </a>
        </Dialog.Panel>
      </Dialog> */}
      
    </div>
    
  );
}



export default Main;

