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
import {
  useState,
  useRef,
  SetStateAction,
  useEffect,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  useCallback,
} from "react";
import Button from "../../base-components/Button";
import Lucide from "../../base-components/Lucide";
import moment from "moment";
import { FaComment, FaEnvelope, FaStar } from "react-icons/fa";
import {
  Flip,
  ToastContainer,
  ToastContentProps,
  Zoom,
  toast,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SlideOverPanel from "./sideSlide";
import CustomDatePicker from "../../components/DatePicker";
import ExistingInfo from "./existingInfo";
import "./styles.css";
import ReactDOM from "react-dom";
import calendarRepository from "../../repositories/calendarRepository";
import { useSelector, useDispatch } from "react-redux";
import {
  setScheduleData,
  setAppointmentToCustomer,
} from "../../stores/appoinmentSlice";
import {
  setRebook,
  resetAppToRebook,
  setRebookDate,
} from "../../stores/rebookSlide";
import eposRepository from "../../repositories/eposRepository";
import { logError, logSuccess } from "../../constant/log-error";
import Select from "react-select";
import SelectStaff from "../../components/SelectStaffButton";
import React from "react";
import SelectView from "../../components/SelectViewButton";
import ExistingDrawer from "../../components/MobileDrawer/existingDrawer";
import AddNewDrawer from "../../components/MobileDrawer/addNewDrawer";

import { useLocation } from "react-router-dom";
import { Appointment } from "../../types/appointment";
import { RootState } from "../../stores/store";
import { setSelectedCustomer } from "../../stores/customerSlide";
import OptionsSelect from "../../components/SelectOptionsButton";
import {
  Clock,
  Settings,
  Sliders,
  RefreshCw,
  RotateCw,
  CalendarCheck,
  X,
  SlidersHorizontal,
} from "lucide-react";
import { BusinessHours } from "../../types/businessHours";
import SelectViewMobile from "../../components/SelectViewButton/selectViewMobile";

import { StaffMember } from "../../types/staff";
import Box from "@mui/material/Box";
import SelectStaffMobile from "../../components/SelectStaffButton/selectStaffMobile";

function Main() {
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(true);
  const [date, setDate] = useState(new Date());
  // const date = useSelector((state:any) => state.date.value);
  const [slotSlideoverPreview, setSlotSlideoverPreview] = useState(false);
  const [existingInformationSlide, setExistingInformationSlide] =
    useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const calendarRef = useRef<FullCalendar | null>(null);
  const [resourceTitle, setResourceTitle] = useState("");
  const [resourceID, setResourceID] = useState("");
  const [staffData, setStaffData] = useState<StaffMember[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [serviceData, setServiceData] = useState(null);
  const [businessHours, setBusinessHours] = useState<BusinessHours[]>([]);
  const [slotMinTime, setSlotMinTime] = useState("09:00:00");
  const [slotMaxTime, setSlotMaxTime] = useState("19:00:00");
  const [viewMode, setViewMode] = useState("allDay");

  const [appoinmentChange, setAppointmentChange] = useState<boolean>(false);
  const [selectedStaff, setSelectedStaff] = React.useState<string | null>(null);
  const [SlotClickModal, setSlotClickModal] = useState(false);
  const [selectAddNew, setSelectAddNew] = useState(false);
  const [selectedSlotInfo, setSelectedSlotInfo] = useState<any | null>(null);
  const [blockTimePop, setBlockTimePop] = useState<any | null>(null);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [addNewDrawerOpen, setAddNewDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const { selectedCustomer } = location.state || {};

  const scheduleData = useSelector(
    (state: any) => state.appointment.scheduleData
  );
  const singleCustomerAppointment = useSelector(
    (state: any) => state.appointment.singleCustomerAppointment
  );
  const rebook = useSelector((state: RootState) => state.rebook.rebook);
  const rebookDate = useSelector((state: RootState) => state.rebook.date);

  const formatRebookDate = moment(rebookDate).format();
  const appToRebook = useSelector(
    (state: RootState) => state.rebook.appointmentToRebook
  );
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAppoinmentApiData(date);
    fetchBusinessHours(date);
  }, [appoinmentChange, rebookDate]);

  const handleAppoinmentChange = (
    value: boolean | ((prevState: boolean) => boolean)
  ) => {
    setAppointmentChange((prev) => !prev);
  };

  const handleStaffChange = (selectedOption: any) => {
    const selectedStaffId = selectedOption.value;
    setSelectedStaff(selectedStaffId);
    // toggleModal()
  };

  useEffect(() => {
    // console.log('Selected Staff:', selectedStaff);
    // ... rest of the useEffect logic
  }, [selectedStaff, staffData, scheduleData]);

  useEffect(() => {
    fetchStaffApiData();
  }, []);

  function calculateEndTime(startTime: string, duration: number): string {
    const startMoment = moment(startTime, "HH:mm");
    const endMoment = startMoment.clone().add(duration, "minutes");
    return endMoment.format("HH:mm");
  }

  const handleRebookFromHistory = async (info: any) => {
    const startTime = moment(info.start).format("HH:mm");
    setSelectedTime(startTime);
    const staffTitle = info.resource.title;
    const staffID = info.resource.id;
    setResourceTitle(staffTitle);
    setResourceID(staffID);

    const serviceEndTime = calculateEndTime(startTime, appToRebook.Duration);

    const newAppointmentRequest = {
      FirstName: selectedCustomer?.Customer.FirstName || "",
      LastName: selectedCustomer?.Customer.LastName || "",
      Mobile: selectedCustomer?.Customer.Mobile || "",
      Email: selectedCustomer?.Customer.Email || "",
      Appointments: [
        {
          BookDate: formatRebookDate,
          StartTime: startTime,
          EndTime: serviceEndTime,
          ServiceID: appToRebook.ServiceID,
          StaffID: staffID,
          Deposit: 0,
          Islocked: false,
          CustomerNote: appToRebook.CustomerNotes,
          CompanyNote: appToRebook.CompanyNote,
        },
      ],
    };

    try {
      const res = await calendarRepository.addAppointment(
        newAppointmentRequest
      );
      showAppointmentToast("Appointment added successfully");
      setAppointmentChange(true);
      setTimeout(() => {
        dispatch(setRebook(false));
      }, 2000);
      dispatch(resetAppToRebook());
    } catch (error) {
      console.error("Error adding appointment:", error);
      showAppointmentToast("Error adding appointment", "error");
    }

    console.log("Rebook from history");
  };

  const handleSlotClicked = async (info: any) => {
    const startTime = moment(info.start).format("HH:mm");
    setDate(info.start);
    setSelectedTime(startTime);
    console.log("slot duoc chon", info.start);
    const staffTitle = info.resource.title;
    const staffID = info.resource.id;
    setResourceTitle(staffTitle);
    setResourceID(staffID);
    fetchServiceApiData(staffID);
    setSlotSlideoverPreview(true);
    setAddNewDrawerOpen(true);
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
      if (appointmentID === 0) {
        return;
      }
      await calendarRepository
        .getSingleAppointment(appointmentID)
        .then((res: any) => {
          setSelectedAppointment(res.data.Appointment);
          setExistingInformationSlide(true);
          setDrawerIsOpen(true);
          dispatch(setSelectedCustomer(res.data.Appointment.CustomerID));
        });
    } catch (error) {
      // console.error('Error fetching appointment information:', error.message);
    }
  };

  const fetchAppoinmentApiData = async (
    date: { getTime: () => number } | undefined
  ): Promise<void> => {
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
          let isConsecutive = false;

          for (const lastAppointment of previousAppointments.reverse()) {
            const timeDifference =
              appointment.StartTime - lastAppointment.EndTime;
            const timeThreshold = 60 * 30;

            if (timeDifference <= timeThreshold) {
              lastAppointment.EndTime = appointment.EndTime;
              lastAppointment.Services.push(...appointment.Services);
              isConsecutive = true;
              break;
            }
          }

          if (!isConsecutive) {
            appointmentsByCustomer[customerID].push(appointment);
          }

          // console.log("cuoc hen cua tung khach", appointmentsByCustomer);
        });

        dispatch(setScheduleData(appointmentsArray));
        dispatch(setAppointmentToCustomer(appointmentsByCustomer));
      } else {
        dispatch(setScheduleData([]));
        dispatch(setAppointmentToCustomer({}));
      }

      // function hasMultipleServices(appointments: string | any[]) {
      //   return appointments.length > 1;
      // }

      // function groupAppointmentsByID(appointments: any[]) {
      //   const groupedAppointmentsByID: { [key: number]: any[] } = {};

      //   appointments.forEach((appointment) => {
      //     if (!groupedAppointmentsByID[appointment.CustomerID]) {
      //       groupedAppointmentsByID[appointment.CustomerID] = [];
      //     }
      //     groupedAppointmentsByID[appointment.CustomerID].push(appointment);
      //   });

      //   return groupedAppointmentsByID;
      // }

      // function groupConsecutiveAppointments(groupedAppointmentsByID: {
      //   [key: number]: any[];
      // }) {
      //   const groupedAppointmentsByTime: { [key: number]: any[] } = {};

      //   for (const id in groupedAppointmentsByID) {
      //     const appointments = groupedAppointmentsByID[id];
      //     let currentGroup: any[] = [];

      //     // Sort appointments by start time
      //     appointments.sort(
      //       (a, b) =>
      //         new Date(a.StartTime).getTime() - new Date(b.StartTime).getTime()
      //     );

      //     appointments.forEach((appointment: any, index: any) => {
      //       // If it's the first appointment or the current start time is consecutive with the previous end time
      //       if (
      //         currentGroup.length === 0 ||
      //         new Date(appointment.StartTime).getTime() ===
      //           new Date(
      //             currentGroup[currentGroup.length - 1].EndTime
      //           ).getTime()
      //       ) {
      //         currentGroup.push(appointment);
      //       } else {
      //         // Start a new group
      //         if (!groupedAppointmentsByTime[id]) {
      //           groupedAppointmentsByTime[id] = [];
      //         }
      //         groupedAppointmentsByTime[id].push(currentGroup);
      //         currentGroup = [appointment];
      //       }

      //       // If it's the last appointment, push the current group
      //       if (index === appointments.length - 1) {
      //         if (!groupedAppointmentsByTime[id]) {
      //           groupedAppointmentsByTime[id] = [];
      //         }
      //         groupedAppointmentsByTime[id].push(currentGroup);
      //       }
      //     });
      //   }

      //   return groupedAppointmentsByTime;
      // }

      // // First group appointments by ID
      // const groupedAppointmentsByID = groupAppointmentsByID(appointmentsArray);

      // // Then group by start time
      // const groupedAppointmentsByTime = groupConsecutiveAppointments(
      //   groupedAppointmentsByID
      // );

      
      setTimeout(setLoading, 1000)

      // dispatch(setScheduleData(appointmentsArray));
      // dispatch(setAppointmentToCustomer(groupedAppointmentsByTime));
    } catch (error) {
      console.error("Error fetching the API:", (error as Error).message);
      // Handle the error, e.g., show an error message to the user
    }
  };

  const fetchStaffApiData = async () => {
    try {
      await calendarRepository
        .getStaff(Math.floor(date.getTime() / 1000))
        .then((res: any) => {
          setStaffData(res.data.Staffs);
          console.log(res.data.Staffs);
        });
    } catch (error) {
      // console.error('Error fetching the API:', error.message);
    }
  };

  const fetchBusinessHours = async (date: Date) => {
    try {
      const timestamp = Math.floor(date.getTime() / 1000);
      const res = await calendarRepository.GetBusinessHours(timestamp);
      const businessHour = res.data.BusinessHour;

      if (businessHour) {
        setBusinessHours(businessHour);
        setSlotMinTime(businessHour.FromTime);
        setSlotMaxTime(businessHour.ToTime);
      } else {
        setBusinessHours([]);
        setSlotMinTime("");
        setSlotMaxTime("");
      }
    } catch (error) {}
  };
  const updateCalendarView = () => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      switch (viewMode) {
        case "morning":
          const morningEndTime = `${Math.min(
            parseInt(slotMinTime.split(":")[0], 10) + 3,
            parseInt(slotMaxTime.split(":")[0], 10)
          )}:00:00`;
          calendarApi.setOption("slotMinTime", slotMinTime);
          calendarApi.setOption("slotMaxTime", morningEndTime);
          break;
        case "afternoon":
          const afternoonStartTime = `${Math.max(
            parseInt(slotMaxTime.split(":")[0], 10) - 3,
            parseInt(slotMinTime.split(":")[0], 10)
          )}:00:00`;
          calendarApi.setOption("slotMinTime", afternoonStartTime);
          calendarApi.setOption("slotMaxTime", slotMaxTime);
          break;
        default:
          calendarApi.setOption("slotMinTime", slotMinTime);
          calendarApi.setOption("slotMaxTime", slotMaxTime);
      }
    }
  };

  useEffect(() => {
    updateCalendarView();
  }, [slotMinTime, slotMaxTime, viewMode]);

  const fetchServiceApiData = async (staffID: string) => {
    try {
      await eposRepository.getServices(staffID).then((res: any) => {
        setServiceData(res.data.Services);
      });
    } catch (error) {
      // console.error('Error fetching the API:', error.message);
    }
  };

  const showAppointmentToast = (
    message:
      | string
      | number
      | boolean
      | ReactElement<any, string | JSXElementConstructor<any>>
      | Iterable<ReactNode>
      | ((props: ToastContentProps<unknown>) => ReactNode)
      | null
      | undefined,
    type: "success" | "error" | "warning" = "success"
  ) => {
    if (type === "success") {
      toast.success(message);
    } else if (type === "error") {
      toast.error(message);
    } else if (type === "warning") {
      toast.warning(message);
    } else {
      // Default to success if an invalid type is provided
      toast.success(message);
    }
  };

  const selectHandler = rebook ? handleRebookFromHistory : handleSlotClicked;

  const bookingCount = () => {
    const acc: Record<string, number> = {};
    scheduleData.forEach((booking: { StaffID: number; ID: number }) => {
      if (booking.ID !== 0) {
        const staffID = String(booking.StaffID);
        if (!acc[staffID]) {
          acc[staffID] = 0;
        }
        acc[staffID]++;
      }
    });
    return acc;
  };

  const bookingCounts = bookingCount();

  const options: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
      resourceTimeGridPlugin,
    ],
    droppable: true,
    headerToolbar: false,
    timeZone: "local",
    initialView: "resourceTimeGridDay",
    views: {
      resourceTimeGridTwoDay: {
        type: "resourceTimeGrid",
        duration: { days: 1 },
      },
    },
    slotDuration: "00:10",
    selectOverlap: false,
    eventTimeFormat: {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    },
    slotLabelFormat: {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    },
    eventResourceEditable: true,
    refetchResourcesOnNavigate: true,
    allDaySlot: false,
    navLinks: true,
    editable: true,
    dayMaxEvents: true,
    schedulerLicenseKey: "GPL-My-Project-Is-Open-Source",
    slotMinTime,
    slotMaxTime,
    contentHeight: "auto",
    selectable: true,
    nowIndicator: true,
    events: scheduleData
      ? scheduleData.map((appointment: any) => {
          const {
            CustomerName: customerName,
            ServiceName: serviceName,
            CompanyNotes: companyNotes,
            CustomerNote: customerNote,
            StartTime: startTime,
            EndTime: endTime,
            StaffID: staffID,
            Colour: colour,
            ID,
            FirstName: firstName,
            LastName: lastName,
            Mobile: mobile,
            Duration: duration,
            BookDate: bookDate,
            ServiceID: serviceID,
            IsFirstBooking: isFirstBooking,
            IsWebBooking: isWebBooking,
          } = appointment;

          let title = `${serviceName}`;
          if (customerName && customerName !== "null") {
            title = `${customerName} - ${serviceName}`;
          }
          if (companyNotes && companyNotes !== "null") {
            title += ` / ${companyNotes}`;
          }
          if (customerNote && customerNote !== "null") {
            title += ` / ${customerNote}`;
          }

          const eventColor = colour && colour !== "null" ? colour : "#B0BEC5";

          return {
            title,
            start: startTime,
            end: endTime,
            resourceId: staffID,
            color: eventColor,
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
              CustomerNote: customerNote,
            },
          };
        })
      : [],

    eventDidMount: ({ el, event }) => {
      const iconContainer = document.createElement("div");
      iconContainer.classList.add("event-icon-container");

      const isFirstBooking = event.extendedProps?.IsFirstBooking;
      const hasCompanyNotes = event.extendedProps?.CompanyNotes;
      const hasCustomerNote = event.extendedProps?.CustomerNote;

      if (isFirstBooking) {
        const StarIconComponent = FaStar;
        const starIcon = document.createElement("div");
        starIcon.style.marginRight = "5px"; // Add margin between icons
        ReactDOM.render(<StarIconComponent size={15} />, starIcon);
        iconContainer.appendChild(starIcon);
      }

      if (hasCompanyNotes || hasCustomerNote) {
        const CommentIconComponent = FaComment;
        const commentIcon = document.createElement("div");
        commentIcon.style.marginRight = "5px";
        ReactDOM.render(<CommentIconComponent size={15} />, commentIcon);
        iconContainer.appendChild(commentIcon);
      }

      el.appendChild(iconContainer);
    },

    selectLongPressDelay: 500,
    eventClick: handleEventClick,
    eventOverlap: false,
    eventDrop: function (info) {
      console.log("1", info.event.extendedProps);
      console.log("note của tiệm", info.event.extendedProps);
      if (info.event.extendedProps.requirelock) {
        alert("This appointment is locked, unable to make any changes.");
        info.revert();
      } else {
        const appointmentData = {
          ID: info.event.extendedProps.ID,
          FirstName: info.event.extendedProps.firstName,
          LastName: info.event.extendedProps.lastName,
          Mobile: info.event.extendedProps.Mobile,
          Email: info.event.extendedProps.Email,
          BookDate: info.event.extendedProps.bookDate,
          StartTime: moment(info.event.start).format(),
          ServiceID: info.event.extendedProps.serviceID,
          StaffID: info.newResource
            ? info.newResource._resource.id
            : info.event.extendedProps.resourceId,
          Islocked: false,
          CustomerNote: info.event.extendedProps.CustomerNote,
          CompanyNotes: info.event.extendedProps.CompanyNotes,
        };

        // Make the updateAppointment API call
        calendarRepository
          .updateAppointment(appointmentData)
          .then((response) => {
            if (response.status === 200) {
              logSuccess("Appointment rescheduled successfully");
              fetchAppoinmentApiData(date);
            } else {
              logError("Error updating appointment. Please try again.");
              info.revert();
            }
          })
          .catch((error) => {
            logError("An unexpected error occurred. Please try again later.");
            info.revert();
          });
      }
    },

    eventResize: function (info) {
      // if (!confirm("Are you sure you want to change?")) {
      //   info.revert();
      // } else {
      console.log("2", info.event.extendedProps);
      if (info.event.extendedProps.requirelock) {
        alert("This appointment is locked, unable to make any changes.");
        info.revert();
      }

      const newStartTime = moment(info.event.start).format();
      const newEndTime = moment(info.event.end).format();

      const startTimeMoment = moment(newStartTime);
      const endTimeMoment = moment(newEndTime);

      // Calculate duration in minutes using Moment.js
      const newDurationInMinutes = endTimeMoment.diff(
        startTimeMoment,
        "minutes"
      );

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
        CustomerNote: info.event.extendedProps.CustomerNote,
        CompanyNotes: info.event.extendedProps.CompanyNotes,
        Duration: newDurationInMinutes,
      };
      calendarRepository
        .updateAppointment(appointmentData)
        .then((response) => {
          if (response.status === 200) {
            logSuccess("Appointment updated successfully");
            fetchAppoinmentApiData(date);
          } else {
            logError("Error updating appointment. Please try again.");
          }
        })
        .catch((error) => {
          logError("An unexpected error occurred. Please try again later.");
        });
      // }
    },

    resources: staffData
      ? staffData
          .filter((staff) => {
            const staffID = staff.StaffID;
            return !selectedStaff || staffID === selectedStaff;
          })
          .map((staff) => {
            const staffID = staff.StaffID;
            const bookingNum = bookingCounts[staffID] || 0;
            return {
              id: staffID,
              title: `${staff.StaffName} (${bookingNum})`,
              staffColor: staff.StaffColour || "",
            };
          })
      : [],
    resourcesInitiallyExpanded: false,

    select: selectHandler,
  };

  const updateSlotLabelFormat = (format: any) => {
    calendarRef.current?.getApi().setOption("slotLabelFormat", format);
  };

  const updateEventTimeFormat = (format: any) => {
    calendarRef.current?.getApi().setOption("eventTimeFormat", format);
  };

  const updateSlotDuration = (duration: string) => {
    calendarRef.current?.getApi().setOption("slotDuration", duration);
  };

  const set12HourFormat = () => {
    updateSlotLabelFormat({ hour: "2-digit", minute: "2-digit", hour12: true });
    updateEventTimeFormat({ hour: "2-digit", minute: "2-digit", hour12: true });
  };

  const set24HourFormat = () => {
    updateSlotLabelFormat({
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    updateEventTimeFormat({
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const set15MinSlot = () => {
    updateSlotDuration("00:15");
  };

  const set30MinSlot = () => {
    updateSlotDuration("00:30");
  };

  const resetToInitialSettings = () => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.setOption("slotDuration", options.slotDuration);
      calendarApi.setOption("slotLabelFormat", options.slotLabelFormat);
      calendarApi.setOption("eventTimeFormat", options.eventTimeFormat);
    }
  };

  const showMorning = () => {
    setViewMode("morning");
  };

  const showAfternoon = () => {
    setViewMode("afternoon");
  };

  const showAllDay = () => {
    setViewMode("allDay");
  };

  const handleDateChange = (date: Date) => {
    setDate(date);
    if (calendarRef.current) {
      calendarRef.current.getApi().gotoDate(date);
    }
    dispatch(setRebookDate(date));
    fetchAppoinmentApiData(date);
    fetchBusinessHours(date);
    setViewMode("allDay");
  };

  const switchToWeek = () => {
    calendarRef.current?.getApi().changeView("resourceTimeGridWeek");
  };

  const switchToDay = () => {
    calendarRef.current?.getApi().changeView("resourceTimeGridDay");
  };

  const nextDay = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().next();
      const currentDate = calendarRef.current.getApi().view.currentStart;
      setDate(currentDate);
      dispatch(setRebookDate(currentDate));
      fetchAppoinmentApiData(currentDate);
      fetchBusinessHours(currentDate);
      setViewMode("allDay");
    }
  };

  const prevDay = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().prev();
      const currentDate = calendarRef.current.getApi().view.currentStart;
      setDate(currentDate);
      dispatch(setRebookDate(currentDate));
      fetchAppoinmentApiData(currentDate);
      fetchBusinessHours(currentDate);
      setViewMode("allDay");
    }
  };

  const todayDate = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().today();
      const currentDate = calendarRef.current.getApi().view.currentStart;
      setDate(currentDate);
      dispatch(setRebookDate(currentDate));
      fetchAppoinmentApiData(currentDate);
      fetchBusinessHours(currentDate);
      setViewMode("allDay");
    }
  };

  const closeModal = () => {
    setSlotSlideoverPreview(false);
  };

  const handleClose = () => {
    setSlotSlideoverPreview(false);
  };

  const handleCloseEventSlide = () => {
    setExistingInformationSlide(false);
  };

  useEffect(() => {
    if (rebook) {
      toast.warning("Select time to rebook", {
        position: "bottom-right",
        autoClose: false,
        closeButton: false,
        closeOnClick: false,
        onClose: () => {},
      });
    }
  }, [rebook]);

  useEffect(() => {
    if (!rebook) {
      toast.dismiss();
    }
  }, [rebook]);

  const countTotalApp = () => {
    let total = 0;
    scheduleData.forEach((app: { ID: number }) => {
      if (app.ID !== 0) {
        total += 1;
      }
    });
    return total;
  };

  const calendarOptions = [
    {
      value: "12Hour",
      label: "12 Hour Format",
      action: set12HourFormat,
      icon: <Clock size={16} />,
    },
    {
      value: "24Hour",
      label: "24 Hour Format",
      action: set24HourFormat,
      icon: <Clock size={16} />,
    },
    {
      value: "15Min",
      label: "15 Minute Slot",
      action: set15MinSlot,
      icon: <Sliders size={16} />,
    },
    {
      value: "30Min",
      label: "30 Minute Slot",
      action: set30MinSlot,
      icon: <Sliders size={16} />,
    },
    {
      value: "reset",
      label: "Reset",
      action: resetToInitialSettings,
      icon: <RefreshCw size={16} />,
    },
  ];

  return (
    <>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={400}
        >
          <span className="loading loading-ring loading-lg"></span>
        </Box>
      ) : (
        <div className="full-calendar">
          {/* Mobile Select Staff and View */}

          <div className=" mt-3 justify-between hidden">
            <div className="">
              <SelectStaff
                staffData={staffData}
                selectedStaff={selectedStaff}
                handleStaffChange={handleStaffChange}
              />
            </div>

            <div className="">
              <SelectView
                switchToWeek={switchToWeek}
                switchToDay={switchToDay}
                showAllDay={showAllDay}
                showMorning={showMorning}
                showAfternoon={showAfternoon}
              />
            </div>
          </div>

          <div className="fixed bottom-4 right-4 sm:hidden z-50">
            <button
              onClick={toggleModal}
              className="bg-primary text-white p-4 rounded-full shadow-lg focus:outline-none"
            >
              <SlidersHorizontal className="w-6 h-6" />
            </button>
          </div>
          {isModalOpen && (
            <div className="relative">
              {isModalOpen && (
                <div className="fixed bottom-20 right-4 flex flex-col items-center space-y-4 z-50 sm:hidden">
                  <div className="bg-slate-300 p-2 rounded-full shadow-lg">
                    <SelectStaffMobile
                      staffData={staffData}
                      selectedStaff={selectedStaff}
                      handleStaffChange={handleStaffChange}
                    />
                  </div>
                  <div className="bg-slate-300 p-2 rounded-full shadow-lg">
                    <SelectViewMobile
                      switchToWeek={switchToWeek}
                      switchToDay={switchToDay}
                      showAllDay={showAllDay}
                      showMorning={showMorning}
                      showAfternoon={showAfternoon}
                    />
                  </div>
                  <div className="bg-slate-300 p-2 rounded-full shadow-lg">
                    <OptionsSelect options={calendarOptions} />
                  </div>
                </div>
              )}
            </div>
          )}
          {/* Mobile Select Staff and View */}

          <div className="flex flex-col sm:flex-row mt-3 mb-3 justify-between">
            <div className="hidden sm:flex items-center space-x-4 rounded-full">
              <SelectStaff
                staffData={staffData}
                selectedStaff={selectedStaff}
                handleStaffChange={handleStaffChange}
              />
            </div>
            {/* BEGIN: Input Group */}
            <PreviewComponent className="intro-y bg-transparent">
              {({ toggle }) => (
                <>
                  <div className="">
                    <Preview>
                      <div className="flex items-center justify-evenly w-full md:w-fit mx-auto bg-primary rounded-full p-0.5 overflow-x-auto md:ml-24">
                        <div className="flex items-center space-x-2  p-2 rounded-full sm:hidden">
                          <CalendarCheck className="w-5 h-5 text-white" />
                          <span className="text-md text-white">
                            {countTotalApp()}
                          </span>
                        </div>
                        <div className="border-r border-white h-4 sm:h-6 mx-1 sm:mx-2 sm:hidden"></div>
                        <Button
                          className="text-sm sm:text-base text-white border-none shadow-none"
                          onClick={prevDay}
                        >
                          <Lucide
                            icon="ChevronLeft"
                            className="w-4 h-4 sm:w-6 sm:h-6"
                          />
                        </Button>
                        <div className="border-r border-white h-4 sm:h-6 mx-1 sm:mx-2"></div>
                        <Button
                          className="text-sm font-normal bg-primary text-white border-none shadow-none"
                          onClick={todayDate}
                        >
                          Today
                        </Button>
                        <div className="border-r border-white h-4 sm:h-6 mx-1 sm:mx-2"></div>
                        <CustomDatePicker
                          date={date}
                          goToDate={handleDateChange}
                        />
                        <div className="border-r border-white h-4 sm:h-6 mx-1 sm:mx-2"></div>
                        <Button
                          className="text-xs sm:text-base text-white border-none shadow-none"
                          onClick={nextDay}
                        >
                          <Lucide
                            icon="ChevronRight"
                            className="w-4 h-4 sm:w-6 sm:h-6"
                          />
                        </Button>
                      </div>
                    </Preview>
                  </div>
                </>
              )}
            </PreviewComponent>
            <div className="hidden sm:flex gap-2">
              <div className="flex items-center space-x-2  p-2 rounded-full">
                <CalendarCheck className="w-5 h-5" />
                <span className="text-lg">{countTotalApp()}</span>
              </div>
              <OptionsSelect options={calendarOptions} />
              <SelectView
                switchToWeek={switchToWeek}
                switchToDay={switchToDay}
                showAllDay={showAllDay}
                showMorning={showMorning}
                showAfternoon={showAfternoon}
              />
            </div>
          </div>

          {/* <div className=" bg-gray-100 rounded">
          <div className="flex justify-between items-center mb-4">
            <OptionsSelect options={calendarOptions} />
          </div>
        </div> */}

          <FullCalendar {...options} ref={calendarRef} select={selectHandler} />

          {slotSlideoverPreview && (
            <SlideOverPanel
              setAddNewDrawerOpen={setAddNewDrawerOpen}
              handleAppoinmentChange={handleAppoinmentChange}
              resourceID={resourceID}
              date={date}
              fetchAppoinmentApiData={fetchAppoinmentApiData}
              showAppointmentToast={showAppointmentToast}
              isOpen={slotSlideoverPreview}
              onClose={handleClose}
              serviceData={serviceData}
              selectedTime={selectedTime}
              appointmentFromHistory={appToRebook}
            />
          )}
          {existingInformationSlide && (
            <ExistingInfo
              setDrawerIsOpen={setDrawerIsOpen}
              fetchAppoinmentApiData={fetchAppoinmentApiData}
              handleDateChange={handleDateChange}
              handleAppoinmentChange={handleAppoinmentChange}
              isOpen={existingInformationSlide}
              onClose={handleCloseEventSlide}
              appointmentData={selectedAppointment}
              serviceData={serviceData}
              staffData={staffData}
            />
          )}
          {drawerIsOpen && (
            <ExistingDrawer
              fetchAppoinmentApiData={fetchAppoinmentApiData}
              drawerIsOpen={drawerIsOpen}
              setDrawerIsOpen={setDrawerIsOpen}
              appointmentData={selectedAppointment}
              handleAppoinmentChange={handleAppoinmentChange}
              handleDateChange={handleDateChange}
              serviceData={serviceData}
              staffData={staffData}
            />
          )}
          {addNewDrawerOpen && (
            <AddNewDrawer
              addNewDrawerOpen={addNewDrawerOpen}
              setAddNewDrawerOpen={setAddNewDrawerOpen}
              handleAppoinmentChange={handleAppoinmentChange}
              resourceID={resourceID}
              date={date}
              fetchAppoinmentApiData={fetchAppoinmentApiData}
              showAppointmentToast={showAppointmentToast}
              serviceData={serviceData}
              selectedTime={selectedTime}
            />
          )}
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
      )}
    </>
  );
}

export default Main;
