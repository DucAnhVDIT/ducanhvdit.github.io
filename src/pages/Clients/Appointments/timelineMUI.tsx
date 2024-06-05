import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "../../../base-components/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedCustomer } from "../../../stores/customerSlide";
import "./styles.css";
import { Box, useMediaQuery } from "@mui/material";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import { useNavigate } from "react-router-dom";
import { addToBill, clearBill, clearItem } from "../../../stores/billSlice";
import { RootState } from "../../../stores/store";
import { setRebook, setAppToRebook } from "../../../stores/rebookSlide";

interface TimelineMUIProps {}

export default function TimelineMUI() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const appointmentToRebook = useSelector(
    (state: RootState) => state.rebook.appointmentToRebook
  );
  const selectedCustomer = useSelector(selectSelectedCustomer);
  const rebook = useSelector((state: RootState) => state.rebook.rebook);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  let statusColor;

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const navigate = useNavigate();

  const handlePayBtn = (appointment: React.SetStateAction<null>) => {
    setSelectedAppointment(appointment);
    dispatch(clearBill());
    dispatch(addToBill(appointment));
    navigate("/purchase", {
      state: {
        appointment,
        selectedCustomer,
      },
    });
  };

  const handleRebookBtn = (appointment: React.SetStateAction<null>) => {
    dispatch(setRebook(true));
    setSelectedAppointment(appointment);
    dispatch(setAppToRebook(appointment));
    navigate("/", {
      state: {
        selectedCustomer,
      },
    });

    setSelectedAppointment(null);
  };


  const handleButtonClick = (appointment: any) => {
    if (appointment.StatusName === "Confirmed") {
      handlePayBtn(appointment);
    } else {
      handleRebookBtn(appointment);
    }
  };

  const appointmentsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalAppointments =
    selectedCustomer?.Customer?.Appointments?.length || 0;
  const totalPages = Math.ceil(totalAppointments / appointmentsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginatedAppointments = selectedCustomer?.Customer?.Appointments?.slice(
    (currentPage - 1) * appointmentsPerPage,
    currentPage * appointmentsPerPage
  );
  return (
    <div className="flex justify-center p-4 md:border md:rounded-md md:border-slate-500/60 w-full min-h-screen">
      {loading ? (
        <span className="loading loading-ring loading-lg"></span>
      ) : (
        <div className="w-full max-w-4xl overflow-x-auto overflow-y-auto max-h-screen">
          <Timeline>
            {selectedCustomer?.Customer?.Appointments?.length > 0 ? (
               selectedCustomer.Customer.Appointments.map((appointment: any, id: any) => (
                <TimelineItem key={id}>
                  <TimelineSeparator>
                    <TimelineDot style={{ backgroundColor: "#1E40AF" }}>
                      <CalendarTodayIcon style={{ fontSize: "20px" }} />
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: "12px", px: 2 }}>
                    <Card className="appointment-card">
                      <CardContent>
                        <div className="flex justify-between items-center">
                          <h5 className="text-sm sm:text-lg">
                            {formatDate(appointment.CreateBookingOn)}
                          </h5>
                          <h5
                            className={`status font-semibold sm:text-lg text-sm  ${
                              appointment.StatusName === "Canceled" ||
                              appointment.StatusName === "No Show"
                                ? "text-red-500"
                                : "text-[#1E40AF]"
                            }`}
                          >
                            {appointment.StatusName}
                          </h5>
                        </div>
                        <p className="mt-4 font-semibold text-lg">
                          {appointment.ServiceName} - {appointment.StaffName}
                        </p>
                        <div className="flex justify-between mt-5">
                          <Button
                            variant="primary"
                            type="button"
                            className="w-32 mt-2"
                            onClick={() => handleButtonClick(appointment)}
                          >
                            {appointment.StatusName === "Confirmed"
                              ? "Pay"
                              : "Rebook"}
                          </Button>
                          <h1 className="font-bold text-2xl text-left mt-2">
                            £{appointment.Price}
                          </h1>
                        </div>
                      </CardContent>
                    </Card>
                  </TimelineContent>
                </TimelineItem>
              ))
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "16px",
                  marginBottom: "16px",
                  width: "100%",
                  minHeight: "150px",
                  textAlign: "center",
                }}
              >
                <EventBusyIcon style={{ marginRight: "8px" }} />
                <div>No appointments</div>
              </Box>
            )}
          </Timeline>

          {/* {totalPages > 1 && (
            <div className="flex justify-center mt-4">
              <div className="join grid grid-cols-3">
                <button
                  className="join-item btn bg-primary text-white"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className="join-item btn bg-primary text-white">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="join-item btn bg-primary text-white"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          )} */}
        </div>
      )}
    </div>
  );
}
