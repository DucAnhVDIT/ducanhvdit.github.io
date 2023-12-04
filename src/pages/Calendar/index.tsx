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
import { useState, useRef } from "react";
import { DatePicker, ButtonGroupPicker, ButtonOption, Input, ButtonMenu } from 'react-rainbow-components';
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


function Main() {
  const [date, setDate] = useState(new Date());
  const [slotSlideoverPreview, setSlotSlideoverPreview] = useState(false);
  const [basicModalPreview, setBasicModalPreview] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const calendarRef = useRef<FullCalendar | null>(null);

  const formatDate = dayjs(date).format('DD/MM/YYYY')

  const handleSlotClicked = (info: any) => {
    const startTime = moment(info.start).format('HH:mm'); // Get the start time of the clicked slot
    setDate(info.start);
    setBasicModalPreview(true);
    setSelectedTime(startTime);
  }
  
  const handleAddNewAppointment = () => {
    setBasicModalPreview(false);
    setSlotSlideoverPreview(true)
  }

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
    slotMinTime: '09:00:00',
    slotMaxTime: '19:00:00',
    contentHeight: 'auto',
    selectable: true,
    resources: [
      { id: 'a', title: 'Staff 1' },
      { id: 'b', title: 'Staff 2'},
      { id: 'c', title: 'Staff 3' },
      { id: 'd', title: 'Staff 4' }
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

  const formatDateToDDMMYYYY = (date: moment.MomentInput) => {
    return moment(date).format('DD-MM-YYYY');
  };

  return (
    <div className="full-calendar">
      {/* BEGIN: Input Group */}
      <PreviewComponent className="mt-5 intro-y bg-transparent">
            {({ toggle }) => (
              <>
                <div className="p-5 bg-transparent">
                <Preview>
                    <div className="flex items-center justify-evenly w-fit mx-auto bg-transparent rounded-3x ">
                      <Button className="p-3 bg-transparent border-none shadow-none" onClick={prevDay}>
                        <Lucide icon="ChevronLeft" className="text-black" />
                      </Button>
                      <DatePicker
                          valueAlignment = "center"
                          placeholder ="Date"
                          value={date}
                          id="datePicker-1"
                          formatStyle="large"
                          icon={<Lucide icon="Calendar" className="text-black" />}
                          onChange={handleDateChange}
                      />
                      <Button className="p-1 bg-transparent border-none shadow-none ml-1" onClick={nextDay}>
                        <Lucide icon="ChevronRight" className="text-black" />
                      </Button>
                    </div>
                  </Preview>
                </div>
              </>
            )}
      </PreviewComponent>

      <Slideover
        open={slotSlideoverPreview}
        onClose={() => {
          setSlotSlideoverPreview(false);
        }}
      >
        <Slideover.Panel>
          <div className="flex flex-row justify-between p-5">
              <Slideover.Title className="p-5">
                <h2 className="mr-auto text-base font-medium">Booking Information</h2>
              </Slideover.Title>
              <Button className="p-5 bg-transparent border-none shadow-none" onClick={closeModal}>
                <Lucide icon="X" className="text-black" />
              </Button>
          </div>
          <Slideover.Description>
            <Input
              id=""
              type="text"
              placeholder="First Name"
              className="mb-3"
            />
            <Input
              id=""
              type="text"
              placeholder="Last Name"
              className="mb-3"
            />
            <Input
              id=""
              type="text"
              placeholder="Mobile"
              className="mb-3"
            />
            <Input
              id=""
              type="email"
              placeholder="Email"
              className="mb-3"
            />
            <div className="flex flex-row">
              <DatePicker
                  valueAlignment = "center"
                  placeholder ="Date"
                  value={date}
                  formatStyle="large"
                  icon={<Lucide icon="Calendar" className="text-black" />}
                  onChange={handleDateChange}
                  className="mb-3 mr-2"
                />
                <Input
                  valueAlignment = "center"
                  id=""
                  type="time"
                  value={selectedTime} 
                  onChange={(e) => setSelectedTime(e.target.value)} 
                />
            </div>
          </Slideover.Description>
        </Slideover.Panel>
      </Slideover>
      <FullCalendar {...options} ref={calendarRef}/>
      <Dialog
        open={basicModalPreview}
        onClose={() => {
          setBasicModalPreview(false);
        }}
        className="flex items-center justify-center"
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
          <Button onClick={handleAddNewAppointment}>Add New Appointment</Button>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
}

export default Main;
