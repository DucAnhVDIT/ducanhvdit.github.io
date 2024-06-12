import React, { Key, useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Paper,
} from "@mui/material";
import Button from "../../base-components/Button";
import StatusButtons from "../StatusButton";
import CustomerCard from "../CustomerCard";
import ExistingDatePicker from "../DatePicker/existingAppointmentPicker";
import ServiceCard from "../ServiceCard";
import Lucide from "../../base-components/Lucide";
import calendarRepository from "../../repositories/calendarRepository";
import { logError, logSuccess } from "../../constant/log-error";
import { deleteAppointment, updateStatus } from "../../stores/appoinmentSlice";
import { useDispatch, useSelector } from "react-redux";
import { addService, deleteService } from "../../stores/serviceListSlice";
import FormInput from "../../base-components/Form/FormInput";
import FormLabel from "../../base-components/Form/FormLabel";
import Slideover from "../../base-components/Headless/Slideover";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/dark.css";
import { StaffMember } from "../../types/staff";
import StaffSelector from "../SelectStaffButton/staffSelector";

interface ExistingDrawerProps {
  setDrawerIsOpen: (value: boolean) => void;
  drawerIsOpen: any;
  appointmentData: any;
  handleDateChange: (value: Date) => void;
  handleAppoinmentChange: (value: boolean) => void;
  fetchAppoinmentApiData: (value: Date) => void;
  serviceData: any;
  staffData: StaffMember[];
}

function ExistingDrawer({
  drawerIsOpen,
  setDrawerIsOpen,
  appointmentData,
  handleAppoinmentChange,
  handleDateChange,
  fetchAppoinmentApiData,
  serviceData,
  staffData,
}: ExistingDrawerProps) {
  const [activeTab, setActiveTab] = useState("info");
  const dispatch = useDispatch();
  const singleCustomerAppointment = useSelector(
    (state: any) => state.appointment.singleCustomerAppointment
  );
  const selectedServices = useSelector(
    (state: any) => state.serviceListState.selectedServices
  );
  const [isServiceSlideoverOpen, setServiceSlideoverOpen] = useState(false);
  const [searchValueService, setSearchValueService] = useState("");
  const [updateCustomerSlideOpen, setUpdateCustomerSlide] = useState(false);
  const [showStaffSelector, setShowStaffSelector] = useState(false);

  const handleTabChange = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  const handleChangeStatus = (statusId: number) => {
    const appointmentsToUpdate = singleCustomerAppointment[
      appointmentData.CustomerID
    ]?.map((appointment: any) => ({
      ID: appointment.ID,
      StatusID: statusId,
    }));

    if (!appointmentsToUpdate || appointmentsToUpdate.length === 0) {
      logError("No appointments to update");
      return;
    }

    Promise.all(
      appointmentsToUpdate.map((appointmentToUpdate: any) => {
        return calendarRepository.updateAppointment(appointmentToUpdate);
      })
    )
      .then((responses) => {
        const allSuccess = responses.every((res) => res.status === 200);

        if (allSuccess) {
          setDrawerIsOpen(false);
          logSuccess("Updated status");

          appointmentsToUpdate.forEach((appointmentToUpdate: any) => {
            dispatch(
              updateStatus({
                customerID: appointmentData.CustomerID,
                statusId: appointmentToUpdate.StatusID,
                color: appointmentData.Colour,
              })
            );
          });
          handleAppoinmentChange(true);
        } else {
          logError("Some appointments failed to update");
        }
      })
      .catch((err) => {
        console.log(err);
        logError("Failed to update appointments");
      });
  };

  const [changeDateBody, setChangeDateBody] = useState({
    ID: appointmentData.ID,
    FirstName: appointmentData.FirstName,
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

  const updateBookDate = (newDate: string, newDateTime: string) => {
    setChangeDateBody((prev) => ({
      ...prev,
      BookDate: newDate,
      StartTime: newDateTime,
    }));
  };

  const updateStartTime = (newStartTime: string) => {
    setChangeDateBody((prev) => ({
      ...prev,
      StartTime: newStartTime,
    }));
  };

  const handleUpdateBookingDate = () => {
    calendarRepository
      .updateAppointment(changeDateBody)
      .then((res) => {
        if (res.data) {
          logSuccess("Appointment rescheduled successfully");
          handleAppoinmentChange(true);
          setDrawerIsOpen(false);
        } else {
          logError("Error updating appointment. Slot not available");
        }
      })
      .catch((error) => {
        logError("An unexpected error occurred. Please try again later.");
      });
  };

  const handleServiceDelete = (selectedService: any) => {
    dispatch(deleteService(selectedService.ProductID));
    console.log("deleted");
  };

  const handleServiceSelect = (selectedService: { ProductID: any }) => {
    dispatch(addService(selectedService));
    setServiceSlideoverOpen(false);
  };

  const handleCloseUpdateCustomer = () => {
    setUpdateCustomerSlide(false);
  };

  const handleDeleteAppointment = () => {
    const appointmentId = appointmentData.ID;
    dispatch(deleteAppointment(appointmentId));

    const deleteAppointmentBody = {
      ID: appointmentData.ID,
      StatusID: 6,
    };
    calendarRepository
      .updateAppointment(deleteAppointmentBody)
      .then((res) => {
        if (res.status === 200) {
          console.log("Deleted appointment");
          setDrawerIsOpen(false);
          logSuccess("Deleted appointment");
        } else {
          logError("Can not delete appointment");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateStaff = (newStaffId: string) => {
    setChangeDateBody((prev) => ({
      ...prev,
      StaffID: newStaffId,
    }));
  };

  return (
    <div>
      <Drawer
        className="sm:hidden"
        anchor="bottom"
        open={drawerIsOpen}
        onClose={() => {
          setDrawerIsOpen(false);
        }}
        ModalProps={{ keepMounted: true }}
      >
        <Paper
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div className="m-3">
            <div className="flex">
              <h1 className="mr-auto font-bold text-2xl">Edit Appoinment</h1>
              {/* <StaffSelector
                staffList={staffData}
                currentStaffId={changeDateBody.StaffID}
                onSelectStaff={(staffId: string) => {
                  updateStaff(staffId);
                  setShowStaffSelector(false);
                }}
              /> */}
              <Button
                className="border-none shadow-none"
                onClick={() => setDrawerIsOpen(false)}
              >
                <Lucide icon="ArrowLeft" />
              </Button>
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-start mb-5 mt-3">
              <Button
                variant="instagram"
                type="button"
                className={` w-28 border-none cursor-pointer rounded-full ${
                  activeTab === "info"
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
                onClick={() => handleTabChange("info")}
              >
                Info
              </Button>
              <Button
                variant="instagram"
                type="button"
                className={`w-28 border-none cursor-pointer ml-3 rounded-full ${
                  activeTab === "notes"
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
                onClick={() => handleTabChange("notes")}
              >
                Notes
              </Button>
            </div>

            {activeTab === "info" && (
              <>
                <div
                  style={{
                    backgroundColor: appointmentData.Colour, // Replace with your color extraction logic
                    padding: "20px",
                    borderRadius: "20px",
                  }}
                  className="flex justify-between p-0"
                >
                  <h1 className="text-2xl text-white mt-1">
                    {appointmentData.StatusName}
                  </h1>
                  <StatusButtons
                    selectedStatus={appointmentData.StatusID}
                    onSelectStatus={handleChangeStatus}
                  />
                </div>

                <CustomerCard
                  customer={appointmentData}
                  onClick={() => {
                    setUpdateCustomerSlide(true);
                  }}
                />

                <div className="mt-3 w-full">
                  <ExistingDatePicker
                    date={new Date(appointmentData.BookDate)}
                    goToDate={handleDateChange}
                    updateBookDate={updateBookDate}
                    updateStartTime={updateStartTime}
                    startTime={changeDateBody.StartTime}
                    fetchAppoinmentApiData={fetchAppoinmentApiData}
                  />
                </div>

                {/* {singleCustomerAppointment[appointmentData.CustomerID]?.map((appointment: any) => (
                            <div key={appointment.ID}>
                              <ServiceCard key={appointment.ID} service={appointment} onSelect={handleServiceDelete} />
                            </div>
                          ))} */}
                <ServiceCard
                  key={appointmentData.ID}
                  service={appointmentData}
                  onSelect={handleServiceDelete}
                />
                <StaffSelector
                  staffList={staffData}
                  currentStaffId={changeDateBody.StaffID}
                  onSelectStaff={(staffId: string) => {
                    updateStaff(staffId);
                    setShowStaffSelector(false);
                  }}
                />
                {selectedServices &&
                  selectedServices.map(
                    (selectedService: {
                      ProductID: Key | null | undefined;
                    }) => (
                      <ServiceCard
                        key={selectedService.ProductID}
                        service={selectedService}
                        onSelect={handleServiceDelete}
                      />
                    )
                  )}

                {/* <div className="items-center justify-center text-center border-none shadow-none">
                            <Button onClick={() => setServiceSlideoverOpen(true) } className="items-center justify-center text-center border-none shadow-none">
                              <Lucide
                                icon="PlusCircle"
                                  className="text-primary text-lg round mr-1"
                              />
                            <h1>Add more services</h1>
                          </Button>
                        </div>       */}
              </>
            )}

            {isServiceSlideoverOpen && (
              <div className="m-3">
                <Drawer
                  className=" z-30"
                  anchor="bottom"
                  open={isServiceSlideoverOpen}
                  onClose={() => setServiceSlideoverOpen(false)}
                >
                  <Paper
                    sx={{
                      height: "100vh",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div className="flex m-3">
                      <h2 className="mr-auto font-bold text-2xl">
                        Search service
                      </h2>
                      <Button
                        className="border-none shadow-none"
                        onClick={() => setServiceSlideoverOpen(false)}
                      >
                        <Lucide icon="ArrowLeft" />
                      </Button>
                    </div>

                    <div
                      className="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0"
                      style={{ overflowY: "auto", flex: 1 }}
                    >
                      <div
                        className="relative text-slate-500 m-3"
                        style={{
                          position: "sticky",
                          top: 0,
                          zIndex: 1,
                          background: "#fff",
                        }}
                      >
                        <FormInput
                          type="text"
                          className="mb-2 w-full h-12 !bg-gray-300 !box focus:ring-primary focus:border-primary"
                          placeholder="Search by service name"
                          value={searchValueService}
                          onChange={(e) =>
                            setSearchValueService(e.target.value)
                          }
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
                      <div className="m-3 overflow-auto">
                        {serviceData &&
                          serviceData
                            .filter((service: { ProductName: string }) =>
                              service.ProductName.toLowerCase().includes(
                                searchValueService.toLowerCase()
                              )
                            )
                            .map((service: { ProductID: string }) => (
                              <ServiceCard
                                key={service.ProductID}
                                service={service}
                                onSelect={handleServiceSelect}
                              />
                            ))}
                      </div>
                    </div>
                  </Paper>
                </Drawer>
              </div>
            )}

            {activeTab === "notes" && (
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

            {updateCustomerSlideOpen && (
              <Drawer
                className=" z-40"
                anchor="bottom"
                open={updateCustomerSlideOpen}
                onClose={() => setUpdateCustomerSlide(false)}
              >
                <Paper
                  sx={{
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div className="flex m-3">
                    <h2 className="mr-auto font-bold text-2xl">
                      Update Client
                    </h2>
                    <Button
                      className="border-none shadow-none"
                      onClick={handleCloseUpdateCustomer}
                    >
                      <Lucide icon="ArrowLeft" />
                    </Button>
                  </div>

                  <div className="m-3">
                    <div className="input-form flex flex-col w-full">
                      <div className="flex flex-col justify-between w-full mr-4">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          First Name
                        </FormLabel>
                        <FormInput
                          id="validation-form-1"
                          type="text"
                          name="name"
                          placeholder="Enter First Name"
                          className="w-full"
                          value={appointmentData.CustomerName}
                          //  onChange={(event) => setFirstName(event.target.value)}
                        />
                      </div>
                      <div className="flex flex-col w-full mt-2">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Last Name
                        </FormLabel>
                        <FormInput
                          id="validation-form-1"
                          type="text"
                          name="name"
                          placeholder="Enter Last Name"
                          className="w-full"
                          //  value={lastName}
                          //  onChange={(event) => setLastName(event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="input-form flex flex-col w-full mt-3">
                      <div className="flex flex-col justify-between w-full mr-4">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Email
                        </FormLabel>
                        <FormInput
                          id="validation-form-1"
                          type="email"
                          name="name"
                          placeholder="Enter Email"
                          className="w-full"
                          value={appointmentData.Email}
                          //  onChange={(event) => setEmail(event.target.value)}
                        />
                      </div>
                      <div className="flex flex-col w-full mt-2">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Phone Number
                        </FormLabel>
                        <FormInput
                          id="validation-form-1"
                          type="number"
                          name="name"
                          placeholder="Enter Phone Number"
                          className="w-full"
                          value={appointmentData.Mobile}
                          //  onChange={(event) => setMobileNumber(event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="mt-3 input-form w-full">
                      <FormLabel
                        htmlFor="validation-form-4"
                        className="flex flex-col w-full sm:flex-row"
                      >
                        Birth Date
                      </FormLabel>
                      <Flatpickr
                        className="w-full rounded-xl"
                        options={{
                          altInput: true,
                          altFormat: "F j, Y",
                          dateFormat: "Y-m-d",
                        }}
                        placeholder="Choose Birth Date"
                      />
                    </div>
                  </div>
                  <div className="mt-auto p-3 flex justify-end">
                    <Button
                      variant="primary"
                      type="button"
                      className="w-32"
                      // onClick={handleAddNewClient}
                    >
                      Update
                    </Button>
                  </div>
                </Paper>
              </Drawer>
            )}
          </div>

          <div className="mt-auto p-3 flex justify-end">
            <Button
              className=" w-32 px-6 bg-red-600 text-white"
              onClick={handleDeleteAppointment}
            >
              Delete
            </Button>
            <Button
              className=" w-32  px-6 bg-primary text-white ml-3"
              onClick={handleUpdateBookingDate}
            >
              Submit
            </Button>
            {/* <Button
              className=" w-32  px-6 bg-primary text-white ml-3"
              onClick={() => {}}
            >
              Pay
            </Button> */}
          </div>
        </Paper>
      </Drawer>
    </div>
  );
}

export default ExistingDrawer;
