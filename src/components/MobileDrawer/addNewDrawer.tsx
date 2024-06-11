import { Drawer, Paper } from "@mui/material";
import React, { Key, useState } from "react";
import Lucide from "../../base-components/Lucide";
import Button from "../../base-components/Button";
import customerRepository from "../../repositories/customerRepository";
import ServiceCard from "../ServiceCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import {
  addService,
  deleteService,
  resetSelectedServices,
} from "../../stores/serviceListSlice";
import FormInput from "../../base-components/Form/FormInput";
import CustomerCard from "../CustomerCard";
import FormLabel from "../../base-components/Form/FormLabel";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/dark.css";
import {
  selectNotes,
  setCompanyNotes,
  setCustomerNotes,
} from "../../stores/notesSlide";
import calendarRepository from "../../repositories/calendarRepository";
import moment from "moment";
import { logError } from "../../constant/log-error";

interface AddNewDrawerProps {
  serviceData: any;
  selectedTime: any;
  date: any;
  showAppointmentToast: any;
  fetchAppoinmentApiData: (date: Date | undefined) => Promise<any>;
  resourceID: any;
  handleAppoinmentChange: (value: boolean) => void;
  addNewDrawerOpen: any;
  setAddNewDrawerOpen: (value: boolean) => void;
}

function AddNewDrawer({
  addNewDrawerOpen,
  setAddNewDrawerOpen,
  handleAppoinmentChange,
  serviceData,
  selectedTime,
  showAppointmentToast,
  date,
  resourceID,
}: AddNewDrawerProps) {
  const [activeTab, setActiveTab] = useState("info");

  const [selectedCustomer, setSelectedCustomer] = React.useState<any>(null);
  const [customersList, setCustomersList] = useState<any>([]);

  const [isServiceSlideoverOpen, setServiceSlideoverOpen] = useState(false);
  const [isClienSlideoverOpen, setClienSlideoverOpen] = useState(false);

  const [searchValueService, setSearchValueService] = useState("");
  const [selectedServiceIDs, setSelectedServiceIDs] = useState<any[]>([]);
  const [searchValueClient, setSearchValueClient] = useState("");

  const [isAddCustomerSlideOpen, setAddCustomerSlideOpen] = useState(false);

  const [visibleCustomers, setVisibleCustomers] = useState(10);
  const totalCustomers = customersList?.Customers?.length || 0;

  const { companyNotes, customerNotes } = useSelector(selectNotes);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const selectedServices = useSelector(
    (state: RootState) => state.serviceListState.selectedServices
  );
  const dispatch = useDispatch();

  const handleTabChange = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  const fetchClientList = async () => {
    try {
      await customerRepository.getCustomer().then((res: any) => {
        if (res.data !== null) {
          setCustomersList(res.data);
        }
      });
    } catch (error) {}
  };

  const handleCompanyNotesChange = (event: { target: { value: any } }) => {
    dispatch(setCompanyNotes(event.target.value));
  };

  const handleCustomerNotesChange = (event: { target: { value: any } }) => {
    dispatch(setCustomerNotes(event.target.value));
  };

  const calculateTotal = () => {
    if (!selectedServices || selectedServices.length === 0) {
      return 0; // Return 0 if selectedServices is null, undefined, or empty
    }
    return selectedServices.reduce((total: any, service: { Price: any }) => {
      const price = service.Price || 0; // Default to 0 if Price is null or undefined
      return total + price;
    }, 0);
  };

  const openSearchClient = async () => {
    setSelectedCustomer(null);
    setClienSlideoverOpen(true);
    await fetchClientList();
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) {
      return "";
    }

    const names = name.split(" ");
    return names.map((name: string) => name[0]).join("");
  };

  const openServicesList = () => {
    setServiceSlideoverOpen(true);
  };

  const handleServiceDelete = (selectedService: any) => {
    dispatch(deleteService(selectedService.ProductID));
    console.log("deleted");
  };

  const handleServiceSelect = (selectedService: { ProductID: any }) => {
    dispatch(addService(selectedService));
    setSelectedServiceIDs((prevSelectedServiceIDs) => [
      ...prevSelectedServiceIDs,
      selectedService.ProductID,
    ]);
    setServiceSlideoverOpen(false);
  };

  const handleOpenAddClient = () => {
    setAddCustomerSlideOpen(true);
    // setClienSlideoverOpen(false);
  };

  const closeSlideOver = () => {
    dispatch(resetSelectedServices());
    setAddNewDrawerOpen(false);
  };

  const loadMoreCustomers = () => {
    // Increase the number of visible customers by 10 or until reaching the total number of customers
    setVisibleCustomers((prevVisible) =>
      Math.min(prevVisible + 10, totalCustomers)
    );
  };

  const filteredCustomers = customersList?.Customers
    ? customersList.Customers.filter(
        (customer: { FirstName: string; LastName: string; Mobile: string }) => {
          const firstName = customer.FirstName || "";
          const lastName = customer.LastName || "";
          const mobile = customer.Mobile || "";

          return (
            firstName.toLowerCase().includes(searchValueClient.toLowerCase()) ||
            lastName.toLowerCase().includes(searchValueClient.toLowerCase()) ||
            mobile.toLowerCase().includes(searchValueClient.toLowerCase())
          );
        }
      )
    : [];

  const selectCustomer = (customer: any) => {
    // Set the selected customer when a customer is clicked
    // console.log('selected customer', customer)

    setSelectedCustomer(customer);
    // Close the search client slideover if needed
    setClienSlideoverOpen(false);
  };

  const newAppointmentRequest = {
    FirstName: selectedCustomer?.FirstName || "",
    LastName: selectedCustomer?.LastName || "",
    Mobile: selectedCustomer?.Mobile || "",
    Email: selectedCustomer?.Email || "",
    Appointments: [] as Appointment[],
  };
  interface Appointment {
    BookDate: string;
    StartTime: string;
    EndTime: string;
    ServiceID: string;
    StaffID: string;
    Deposit: number;
    Islocked: boolean;
    CustomerNote: string;
    CompanyNote: string;
  }
  let previousEndTime = selectedTime;

  selectedServices.forEach((service: { Duration: any; ProductID: any }) => {
    // Calculate end time based on start time and service duration
    const serviceEndTime = calculateEndTime(previousEndTime, service.Duration);

    const newAppointment: Appointment = {
      BookDate: date,
      StartTime: previousEndTime, // Use the end time of the previous service
      EndTime: serviceEndTime,
      ServiceID: service.ProductID,
      StaffID: resourceID,
      Deposit: 0,
      Islocked: false,
      CustomerNote: customerNotes,
      CompanyNote: companyNotes,
    };

    newAppointmentRequest.Appointments.push(newAppointment);

    // Update previousEndTime for the next iteration
    previousEndTime = serviceEndTime;
  });

  // Function to calculate end time based on start time and duration
  function calculateEndTime(startTime: string, duration: number): string {
    const startMoment = moment(startTime, "HH:mm");
    const endMoment = startMoment.clone().add(duration, "minutes");
    return endMoment.format("HH:mm");
  }

  const handleAddNewClient = () => {
    if (!mobileNumber) {
      // Show toast for missing phone number
      console.log("trong add new drawer");
      showAppointmentToast("Phone number is required", "error");
      return;
    }

    const requestBody = {
      FirstName: firstName,
      LastName: lastName,
      Mobile: mobileNumber,
      Email: email,
      DateOfBirth: dateOfBirth || null,
      EmailConsent: true,
      SMSConsent: true,
    };

    customerRepository
      .addCustomer(requestBody)
      .then((response) => {
        setSelectedCustomer(response.data);
        // Show success toast
        showAppointmentToast("Client added successfully");
        setAddCustomerSlideOpen(false);
        setFirstName("");
        setLastName("");
        setEmail("");
        setMobileNumber("");
      })
      .catch((error) => {
        logError("Error adding client: " + `${error}`);
        // Handle error
      });
  };

  const handleAddNewAppointment = () => {
    if (!selectedServices || selectedServices.length === 0) {
      // No services selected, show warning and return
      showAppointmentToast("Please select at least one service", "warning");
      return;
    }

    if (!selectedCustomer || selectedCustomer.length === 0) {
      // No services selected, show warning and return
      const walkInCustomer = {
        FirstName: "Walk-in",
      };
      setSelectedCustomer(walkInCustomer);
    }

    calendarRepository
      .addAppointment(newAppointmentRequest)
      .then((res) => {
        showAppointmentToast("Appointment added successfully");
        handleAppoinmentChange(true);
        setAddCustomerSlideOpen(false);
        dispatch(resetSelectedServices());
      })
      .catch((error) => {
        console.error("Error adding appointment:", error);
        showAppointmentToast("Error adding appointment", "error");
      });

    setAddNewDrawerOpen(false);
  };

  return (
    <div>
      <Drawer
        className="sm:hidden"
        anchor="bottom"
        open={addNewDrawerOpen}
        onClose={() => {
          setAddNewDrawerOpen(false);
        }}
        ModalProps={{ keepMounted: true }}
      >
        <Paper
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="m-3">
            <div className="flex">
              <h1 className="mr-auto font-bold text-2xl">New Appoinment</h1>
              <Button
                className="border-none shadow-none"
                onClick={() => setAddNewDrawerOpen(false)}
              >
                <Lucide icon="ArrowLeft" />
              </Button>
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-start mb-5 mt-3">
              <Button
                variant="instagram"
                type="button"
                className={`border-none w-28 cursor-pointer rounded-full px-8 ${
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
                className={`w-28 border-none cursor-pointer ml-3 rounded-full px-8 ${
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
                {/* Begin Add Client Button */}
                <div
                  className=" border-none bg-transparent shadow-none"
                  onClick={openSearchClient}
                >
                  <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y  rounded-lg w-full ">
                    <div className="col-span-12 selection:cursor-pointer sm:col-span-4 2xl:col-span-3 box hover:bg-gray-100 border-2 border-gray-400">
                      <div className="p-3">
                        <div className="flex">
                          {selectedCustomer && selectedCustomer.FirstName ? (
                            <div className="w-14 h-14 rounded-full p-2 bg-primary text-white flex items-center justify-center">
                              <span className="text-lg">
                                {getInitials(selectedCustomer.FirstName)}
                              </span>
                            </div>
                          ) : (
                            <Lucide
                              icon="User"
                              className="w-14 h-14 rounded-full p-3 bg-primary text-white"
                            />
                          )}
                          <div
                            className={`${
                              selectedCustomer ? "mt-2 ml-3" : "mt-4 ml-3"
                            }`}
                          >
                            <h1 className="text-lg text-left">
                              {selectedCustomer
                                ? selectedCustomer.FirstName
                                : "Select a client"}
                            </h1>
                            <h1 className="text-sm">
                              {selectedCustomer ? selectedCustomer.Mobile : ""}
                            </h1>
                          </div>
                          <div className="ml-auto">
                            <Button className="border-none shadow-none cursor-pointer ">
                              {selectedCustomer &&
                              selectedCustomer.FirstName ? (
                                <Lucide
                                  icon="Edit"
                                  className="w-12 h-12 p-3 text-primary text-lg"
                                />
                              ) : (
                                <Lucide
                                  icon="Plus"
                                  className="w-12 h-12 p-3 text-primary text-lg"
                                />
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Begin Add Services */}
                <div
                  className="border-none bg-transparent w-full shadow-none mt-3 -z-10"
                  onClick={openServicesList}
                >
                  <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y rounded-lg w-full">
                    <div className="col-span-12 p-1 cursor-pointer sm:col-span-4 2xl:col-span-3 box hover:bg-gray-100 border-2 border-gray-400">
                      <div className="p-1">
                        <div className="flex">
                          <div className=" mt-4 ml-3">
                            <h1 className="text-lg">Add services</h1>
                            {/* <h2>Leave empty for walkins</h2> */}
                          </div>
                          <div className="ml-auto">
                            <Button className="border-none shadow-none cursor-pointer ">
                              <Lucide
                                icon="ChevronRight"
                                className="w-12 h-12 p-3 text-primary text-lg"
                              />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="selected-services">
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
                </div>
                {/* End Add Services */}

                {/* Begin Service List */}
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
                    }}
                  >
                    <div className="m-3">
                      <div className="flex">
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

                      <div className="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
                        <div className="relative text-slate-500">
                          <FormInput
                            type="text"
                            className="mb-2 w-full h-12 !bg-gray-300 !box focus:ring-primary focus:border-primary"
                            placeholder="Search by se name"
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
                      </div>
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
                  </Paper>
                </Drawer>
                {/* End Service List */}

                {/* Begin Client List */}
                <Drawer
                  className=" z-30"
                  anchor="bottom"
                  open={isClienSlideoverOpen}
                  onClose={() => setClienSlideoverOpen(false)}
                >
                  <Paper
                    sx={{
                      height: "100vh",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div className="m-3">
                      <div className="flex">
                        <h2 className="mr-auto font-bold text-2xl">
                          Search client
                        </h2>
                        <Button
                          className="border-none shadow-none"
                          onClick={() => setClienSlideoverOpen(false)}
                        >
                          <Lucide icon="ArrowLeft" />
                        </Button>
                      </div>

                      <div className="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
                        <div className="relative text-slate-500">
                          <FormInput
                            type="text"
                            className="w-full h-12 !bg-gray-300 !box focus:ring-primary focus:border-primary"
                            placeholder="Search by client name"
                            value={searchValueClient}
                            onChange={(e) =>
                              setSearchValueClient(e.target.value)
                            }
                          />
                          {searchValueClient ? (
                            <Lucide
                              icon="XCircle"
                              className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3 cursor-pointer"
                              onClick={() => setSearchValueClient("")}
                            />
                          ) : (
                            <Lucide
                              icon="Search"
                              className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
                            />
                          )}
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="items-center justify-center text-center border-none shadow-none">
                          <Button
                            onClick={handleOpenAddClient}
                            className="items-center justify-center text-center border-none shadow-none"
                          >
                            <Lucide
                              icon="PlusCircle"
                              className="text-primary text-lg round mr-1"
                            />
                            <h1>Add new client</h1>
                          </Button>
                        </div>

                        {filteredCustomers
                          .slice(0, visibleCustomers)
                          .map(
                            (customer: {
                              CustomerID: Key | null | undefined;
                            }) => (
                              <CustomerCard
                                key={customer.CustomerID}
                                customer={customer}
                                onClick={() => selectCustomer(customer)}
                              />
                            )
                          )}

                        {visibleCustomers < totalCustomers && (
                          <button
                            onClick={loadMoreCustomers}
                            className=" mt-2 text-primary cursor-pointer"
                          >
                            Load More
                          </button>
                        )}
                      </div>
                    </div>

                    {isAddCustomerSlideOpen && (
                      <Drawer
                        className=" z-50"
                        anchor="bottom"
                        open={isAddCustomerSlideOpen}
                        onClose={() => setAddCustomerSlideOpen(false)}
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
                              Add Client
                            </h2>
                            <Button
                              className="border-none shadow-none"
                              onClick={() => setAddCustomerSlideOpen(false)}
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
                                  value={firstName}
                                  onChange={(event) =>
                                    setFirstName(event.target.value)
                                  }
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
                                  value={lastName}
                                  onChange={(event) =>
                                    setLastName(event.target.value)
                                  }
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
                                  value={email}
                                  onChange={(event) =>
                                    setEmail(event.target.value)
                                  }
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
                                  value={mobileNumber}
                                  onChange={(event) =>
                                    setMobileNumber(event.target.value)
                                  }
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
                              onClick={handleAddNewClient}
                            >
                              Add
                            </Button>
                          </div>
                        </Paper>
                      </Drawer>
                    )}
                  </Paper>
                </Drawer>
                {/* End Client List */}
              </>
            )}

            {activeTab === "notes" && (
              <div className="flex flex-col">
                {/* Company Notes */}
                <div className="">
                  <p className="text-lg font-semibold mb-2">Company Notes</p>
                  <textarea
                    className="w-full h-32 px-4 py-2 border rounded focus:border-primary outline-none"
                    value={companyNotes}
                    onChange={handleCompanyNotesChange}
                    placeholder="Enter company notes here..."
                  />
                </div>

                {/* Customer Notes */}
                <div className="mt-3">
                  <p className="text-lg font-semibold mb-2">Customer Notes</p>
                  <textarea
                    className="w-full h-32 px-4 py-2 border rounded focus:border-primary outline-none"
                    value={customerNotes}
                    onChange={handleCustomerNotesChange}
                    placeholder="Enter customer notes here..."
                  />
                </div>
              </div>
            )}
          </div>
          <div className="mt-auto p-3 flex flex-col justify-end">
            <div className="flex flex-row justify-between mb-9">
              <h1 className="text-2xl"> Total</h1>
              <h1 className="text-xl">{`£${calculateTotal()}`}</h1>
            </div>

            <div className="flex justify-between">
              <Button
                variant="instagram"
                type="button"
                onClick={closeSlideOver}
                className=" border-none w-32  px-6 bg-gray-400 text-white ml-3"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="button"
                className="w-32"
                onClick={handleAddNewAppointment}
              >
                Add
              </Button>
            </div>
          </div>
        </Paper>
      </Drawer>
    </div>
  );
}

export default AddNewDrawer;
