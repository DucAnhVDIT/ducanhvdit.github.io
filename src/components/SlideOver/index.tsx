
import { Menu, Slideover } from "../../base-components/Headless";
import {
    FormLabel,
    FormInput,
    FormSelect,
  } from "../../base-components/Form";
import Button from "../../base-components/Button";
import Lucide from "../../base-components/Lucide";
import { Key, useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import 'flatpickr/dist/themes/dark.css';
import 'react-datepicker/dist/react-datepicker.css';
import ServiceCard from "../ServiceCard";
import CustomerCard from "../CustomerCard";
import React from "react";
import axios from 'axios';
import calendarRepository from "../../repositories/calendarRepository";
import { useNavigate } from 'react-router-dom';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/dark.css';
import Dropzone from "dropzone";
import { CheckboxToggle } from "react-rainbow-components";
import { Phone } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addService, deleteService, resetSelectedServices  } from "../../stores/serviceListSlice";
import { RootState } from "../../stores/store";
import moment from "moment";
import { setScheduleData } from '../../stores/appoinmentSlice';




//   const [headerFooterSlideoverPreview, setHeaderFooterSlideoverPreview] = useState(false);
  interface SlideOverPanelProps {
    isOpen: boolean;
    onClose: () => void;
    serviceData: any;
    selectedTime : any;
    date: any;
    showAppointmentToast :any;
    fetchAppoinmentApiData: (date: Date | undefined) => Promise<any>;
    resourceID : any,
    handleAppoinmentChange: (value: boolean) => void;
  }
function SlideOverPanel({ handleAppoinmentChange, isOpen, onClose, serviceData, selectedTime, showAppointmentToast, date, resourceID  }: SlideOverPanelProps) {
    const [isSecondSlideoverOpen, setSecondSlideoverOpen] = useState(false);
    const [isServiceSlideoverOpen, setServiceSlideoverOpen] = useState(false)
    const [isAddCustomerSlideOpen, setAddCustomerSlideOpen] = useState(false)
    const [searchValueClient, setSearchValueClient] = useState("");
    const [searchValueService, setSearchValueService] = useState("");
    const [customersList, setCustomersList] = useState<any>([]);
    const [selectedCustomer, setSelectedCustomer] = React.useState<any>(null);

    // const [selectedServices, setSelectedServices] = React.useState<any>(null);
    const [selectedServiceIDs, setSelectedServiceIDs] = useState<any[]>([]);
    const [visibleCustomers, setVisibleCustomers] = useState(10); // Number of customers to display
    const totalCustomers = customersList?.Customers?.length || 0;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');

    const dispatch = useDispatch()
    const selectedServices = useSelector((state: RootState) => state.serviceListState.selectedServices);
    const scheduleData = useSelector((state: any) => state.appointment.scheduleData);

    const loadMoreCustomers = () => {
        // Increase the number of visible customers by 10 or until reaching the total number of customers
        setVisibleCustomers((prevVisible) => Math.min(prevVisible + 10, totalCustomers));
      };
    
      const filteredCustomers = customersList?.Customers
        ? customersList.Customers.filter((customer: { FirstName: string; LastName: string; Mobile: string; }) => {
            const firstName = customer.FirstName || '';
            const lastName = customer.LastName || '';
            const mobile = customer.Mobile || '';
    
            return (
              firstName.toLowerCase().includes(searchValueClient.toLowerCase()) ||
              lastName.toLowerCase().includes(searchValueClient.toLowerCase()) ||
              mobile.toLowerCase().includes(searchValueClient.toLowerCase())
            );
          })
        : [];
    // Function to handle service selection
    const handleServiceSelect = (selectedService: { ProductID: any; }) => {
        // setSelectedServices((prevSelected: any) => [...(prevSelected || []), selectedService]);
        dispatch(addService(selectedService))

        setSelectedServiceIDs((prevSelectedServiceIDs) => [...prevSelectedServiceIDs, selectedService.ProductID]);
        setServiceSlideoverOpen(false);
    };

    const handleServiceDelete = (selectedService: any) => {
        dispatch(deleteService(selectedService.ProductID));
        console.log("deleted")
    };

    useEffect(() => {
        console.log(selectedServices);
      }, [selectedServices]);
    
    
    const calculateTotal = () => {
        if (!selectedServices || selectedServices.length === 0) {
          return 0; // Return 0 if selectedServices is null, undefined, or empty
        }
      
        return selectedServices.reduce((total: any, service: { Price: any; }) => {
          const price = service.Price || 0; // Default to 0 if Price is null or undefined
          return total + price;
        }, 0);
      };
      
      
    const openSearchClient = async () => {
        // Reset the selected customer when opening the search client
        setSelectedCustomer(null);
        setSecondSlideoverOpen(true);
        await fetchClientList();
    }

    const selectCustomer = (customer: any) => {
        // Set the selected customer when a customer is clicked
        console.log('selected customer', customer)
 
        setSelectedCustomer(customer);
        // Close the search client slideover if needed
        setSecondSlideoverOpen(false);
    }

    const closeSearchClient = () => {
        setSecondSlideoverOpen(false)
    }

    const openServicesList =() => {
        setServiceSlideoverOpen(true)
    }
    
    const closeServicesList = () => {
        setServiceSlideoverOpen(false)
    }

    const fetchClientList = async () => {
        try {
          const apiResponse = await fetch('https://beautyapi.vdit.co.uk/v1/GetCustomers', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${btoa('testvdit:testvdit')}`,
            },
            body: JSON.stringify({
              "business_id": "20160908110055249272",
            }),
          });
      
          if (!apiResponse.ok) {
            throw new Error(`HTTP error! Status: ${apiResponse.status}`);
          }
      
          const responseData = await apiResponse.json();

          
          if (responseData.Customers) {
            setCustomersList(responseData);
            // console.log('Customers List:', responseData.Customers);
            // console.log(customersList)
          } else {
            console.error('Error: Customers property not found in API response.');
          }
      
        } catch (error) {
        //   console.error('Error fetching the API:', error.message);
        }
      };
      
      const getInitials = (name: string | null | undefined) => {
        if (!name) {
          return ''; // Handle null or undefined case
        }
      
        const names = name.split(' ');
        return names.map((name: string) => name[0]).join('');
      };


      const newAppointmentRequest = {
        "business_id": "20160908110055249272",
        "FirstName": selectedCustomer?.FirstName || "",
        "LastName": selectedCustomer?.LastName || "",
        "Mobile": selectedCustomer?.Mobile || "",
        "Email": selectedCustomer?.Email || "",
        "Appointments": [] as Appointment[],

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
        CompanyNote: null;
    }
        let previousEndTime = selectedTime; 

        selectedServices.forEach((service: { Duration: any; ProductID: any; }) => {
            // Calculate end time based on start time and service duration
            const serviceEndTime = calculateEndTime(previousEndTime, service.Duration);

            const newAppointment : Appointment = {
                "BookDate": date,
                "StartTime": previousEndTime, // Use the end time of the previous service
                "EndTime": serviceEndTime,
                "ServiceID": service.ProductID,
                "StaffID": resourceID,
                "Deposit": 0,
                "Islocked": false,
                "CustomerNote": "",
                "CompanyNote": null,
            };

            newAppointmentRequest.Appointments.push(newAppointment);

            // Update previousEndTime for the next iteration
            previousEndTime = serviceEndTime;
        });

        // Function to calculate end time based on start time and duration
        function calculateEndTime(startTime: string, duration: number): string {
            const startMoment = moment(startTime, 'HH:mm');
            const endMoment = startMoment.clone().add(duration, 'minutes');
            return endMoment.format('HH:mm');
        }
            

        const handleAddNewAppointment = () => {
            if (!selectedServices || selectedServices.length === 0) {
              // No services selected, show warning and return
              showAppointmentToast('Please select at least one service', 'warning');
              return;
            }
          
            if (!selectedCustomer || selectedCustomer.length === 0) {
              // No services selected, show warning and return
              showAppointmentToast('Please select a client', 'warning');
              return;
            }
          
          
            calendarRepository.addAppointment(newAppointmentRequest)
              .then((res) => {
                console.log(res);
                showAppointmentToast('Appointment added successfully');
                handleAppoinmentChange(true);
                onClose();
                dispatch(resetSelectedServices());
              })
              .catch((error) => {
                console.error('Error adding appointment:', error);
                showAppointmentToast('Error adding appointment', 'error');
              });
          
            setSecondSlideoverOpen(false);
          };
          

      const handleOpenAddClient = () => {
        setAddCustomerSlideOpen(true)
        setSecondSlideoverOpen(false)
      }

      const handleCloseAddCustomer = () => {
        setAddCustomerSlideOpen(false)
        setSecondSlideoverOpen(true)
      }

      const handleAddNewClient = () => {

        if (!mobileNumber) {
            // Show toast for missing phone number
            showAppointmentToast('Phone number is required', 'error');
            return;
          }


        const requestBody = {
          "business_id": "20160908110055249272",
          "FirstName": firstName,
          "LastName": lastName,
          "Mobile": mobileNumber,
          "Email": email,
          "DateOfBirth": dateOfBirth || null,
          "EmailConsent": true,
          "SMSConsent": true,
        };
      
        const apiURL = "https://beautyapi.vdit.co.uk/v1/AddCustomer";
      
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa('testvdit:testvdit')}`
        };
      
        axios.post(apiURL, requestBody, { headers })
          .then(response => {
            console.log(response.data); // Handle success response
            setSelectedCustomer(response.data);

            // Show success toast
            showAppointmentToast('Client added successfully');
            setAddCustomerSlideOpen(false)
            setFirstName("")
            setLastName("")
            setEmail("")
            setMobileNumber("")
          })
          .catch(error => {
            console.error('Error adding client:', error);
            // Handle error
          });
      };

  return (
    <div>
          <Slideover
              staticBackdrop
              open={isOpen}
              onClose={onClose}
          >
              {/* BEGIN: Slide Over Header */}
              <Slideover.Panel>
                  <Button
                      onClick={(event: React.MouseEvent) => {
                          event.preventDefault();
                          onClose()
                      } }
                      className="absolute w-14 h-14 top-0 left-0 right-auto mt-4 -ml-16 bg-white rounded-full"
                  >
                      <Lucide icon="X" className="w-8 h-8 text-black" />
                  </Button>
                  <Slideover.Title>
                      <h1 className="mr-auto font-bold text-2xl">
                          New Appoinment
                      </h1>
                      <Menu className="sm:hidden">
                          <Menu.Button
                              as="a"
                              className="block w-5 h-5"
                              href="#"
                          >
                              <Lucide
                                  icon="MoreHorizontal"
                                  className="w-5 h-5 text-slate-500" />
                          </Menu.Button>
                          <Menu.Items className="w-40">
                              <Menu.Item>
                                  <Lucide icon="File" className="w-4 h-4 mr-2" />
                                  Download Docs
                              </Menu.Item>
                          </Menu.Items>
                      </Menu>
                  </Slideover.Title>
                  {/* END: Slide Over Header */}
                  {/* BEGIN: Slide Over Body */}
                  <Slideover.Description>

                    {/* Begin Add Client Button */}
                    <Button className="border-none bg-transparent w-full shadow-none" onClick={openSearchClient}>
                        <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y border-2 border-black rounded-lg w-full ">
                            <div
                            className="col-span-12 p-1 cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in"
                            >
                            <div className="p-3">
                                <div className="flex">
                                {selectedCustomer && selectedCustomer.FirstName ? (
                                <div className="w-14 h-14 rounded-full p-3 bg-primary text-white flex items-center justify-center">
                                    <span className="text-lg">{getInitials(selectedCustomer.FirstName)}</span>
                                </div>
                                ) : (
                                <Lucide icon="User" className="w-14 h-14 rounded-full p-3 bg-primary text-white" />
                                )}
                                <div className={`${selectedCustomer ? 'mt-2 ml-3' : 'mt-4 ml-3'}`}>
                                    <h1 className="text-lg text-left">{selectedCustomer ? selectedCustomer.FirstName : 'Select a client'}</h1>
                                    <h1 className="text-sm">{selectedCustomer ? selectedCustomer.Mobile : ''}</h1>
                                </div>
                                    <div className="ml-auto">
                                    <Button className="border-none shadow-none cursor-pointer ">
                                        {selectedCustomer && selectedCustomer.FirstName ? (
                                        <Lucide icon="Edit" className="w-12 h-12 p-3 text-primary text-lg" />
                                        ) : (
                                        <Lucide icon="Plus" className="w-12 h-12 p-3 text-primary text-lg" />
                                        )}
                                    </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </Button>
                    
                    {/* Begin Add Services */}
                    <Button className="border-none bg-transparent w-full shadow-none mt-3 -z-10" onClick={openServicesList}>
                        <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y rounded-lg w-full border-2 border-1E40AF">
                            <div
                            className="col-span-12 p-1 cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in"
                            >
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
                    </Button>

                    <div className="selected-services">
                    <div className="selected-services">
                    {selectedServices && selectedServices.map((selectedService: { ProductID: Key | null | undefined; }) => (
                        <ServiceCard
                            key={selectedService.ProductID}
                            service={selectedService}
                            onSelect={handleServiceDelete}
                        />
                    ))}
                    </div>

                    </div>
                    {/* End Add Services */}
                      
                    {/* Begin Service List */}
                    {isServiceSlideoverOpen && (
                    <Slideover open={isServiceSlideoverOpen} onClose={closeServicesList}>
                        <Slideover.Panel>
                        <Slideover.Title className="p-5">
                            <h2 className="mr-auto font-bold text-2xl">
                            Search service
                            </h2>
                            <Button className="border-none shadow-none" onClick={closeServicesList}>
                                    <Lucide icon="ArrowLeft"/>
                            </Button>
                        </Slideover.Title>
                        <Slideover.Description className="text-center">
                            <div className="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
                            <div className="relative text-slate-500">
                                <FormInput
                                type="text"
                                className="mb-2 w-full h-12 !bg-gray-300 !box focus:ring-primary focus:border-primary"
                                placeholder="Search by service name"
                                value={searchValueService}
                                onChange={(e) => setSearchValueService(e.target.value)}
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
                            {serviceData.Services && serviceData.Services
                            .filter((service: { ProductName: string }) =>
                                service.ProductName.toLowerCase().startsWith(searchValueService.toLowerCase())
                            )
                            .slice(0, 5) // Display only the first 5 results
                            .map((service: { ProductID: string }) => (
                                <ServiceCard key={service.ProductID} service={service} onSelect={handleServiceSelect}/>
                            ))}
                        </Slideover.Description>
                        </Slideover.Panel>
                    </Slideover>
                    )}

                    {/* End Service List */}                     

                    {isSecondSlideoverOpen && (
                        <Slideover open={isSecondSlideoverOpen} onClose={closeSearchClient}>
                        <Slideover.Panel>
                            <Slideover.Title className="p-5">
                                <h2 className="mr-auto font-bold text-2xl">
                                    Search Client
                                </h2>
                                <Button className="border-none shadow-none" onClick={closeSearchClient}>
                                    <Lucide icon="ArrowLeft"/>
                                </Button>
                            </Slideover.Title>
                            <Slideover.Description className="text-center">
                                <div className="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
                                    <div className="relative text-slate-500">
                                    <FormInput
                                        type="text"
                                        className="w-full h-12 !bg-gray-300 !box focus:ring-primary focus:border-primary"
                                        placeholder="Search by client name"
                                        value={searchValueClient}
                                        onChange={(e) => setSearchValueClient(e.target.value)}
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
                                    <Button className="items-center justify-center text-center border-none shadow-none">
                                        <Button onClick={handleOpenAddClient} className="items-center justify-center text-center border-none shadow-none">
                                        <Lucide
                                            icon="PlusCircle"
                                            className="text-primary text-lg round mr-1"
                                        />
                                        <h1>Add new client</h1>
                                        </Button>
                                    </Button>

                                    {/* Display the list of customers based on search criteria */}
                                    {filteredCustomers.slice(0, visibleCustomers).map((customer: { CustomerID: Key | null | undefined; }) => (
                                        <CustomerCard key={customer.CustomerID} customer={customer} onClick={() => selectCustomer(customer)} />
                                    ))}

                                    {visibleCustomers < totalCustomers && (
                                        <button onClick={loadMoreCustomers} className=" mt-2 text-primary cursor-pointer">
                                        Load More
                                        </button>
                                    )}

                                </div>
                                </Slideover.Description>

                        </Slideover.Panel>
                    </Slideover>
                    )}

                    {/* Begin Add Customer */}
                    {isAddCustomerSlideOpen && (
                        <Slideover open={isAddCustomerSlideOpen} onClose={handleCloseAddCustomer}>
                        <Slideover.Panel>
                            <Slideover.Title className="p-5">
                                <h2 className="mr-auto font-bold text-2xl">
                                    Add Client
                                </h2>
                                <Button className="border-none shadow-none" onClick={handleCloseAddCustomer}>
                                    <Lucide icon="ArrowLeft"/>
                                </Button>
                            </Slideover.Title>
                            <Slideover.Description className="text-center">
                                <div className="input-form flex flex-col w-full">
                                    <div className='flex flex-col justify-between w-full mr-4'>
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
                                            onChange={(event) => setFirstName(event.target.value)}
                                        />
                                    </div>
                                    <div className='flex flex-col w-full mt-2'>
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
                                            onChange={(event) => setLastName(event.target.value)}
                                        />
                                    </div>                                
                                </div>
                                <div className="input-form flex flex-col w-full mt-3">
                                    <div className='flex flex-col justify-between w-full mr-4'>
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
                                            onChange={(event) => setEmail(event.target.value)}
                                        />
                                    </div>
                                    <div className='flex flex-col w-full mt-2'>
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
                                            onChange={(event) => setMobileNumber(event.target.value)}                                        />
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
                                                className='w-full rounded-xl'
                                                options={{
                                                    altInput: true,
                                                    altFormat: "F j, Y",
                                                    dateFormat: "Y-m-d",
                                                }}
                                                placeholder="Choose Birth Date"
                                            />
                                        </div>
                                        <div className='md:w-1/3'>

                            </div>                        
                            </Slideover.Description>
                            <Slideover.Footer>
                                <Button
                                    variant="primary"
                                    type="button"
                                    className="w-32"
                                    onClick={handleAddNewClient}
                                >
                                    Add
                                </Button>
                            </Slideover.Footer>
                        </Slideover.Panel>
                        </Slideover>
                    )}
                    {/* End Add Customer */}
                    <div className="flex flex-row mt-5">
                       
                    </div>
                  </Slideover.Description>
                  {/* END: Slide Over Body */}
                  {/* BEGIN: Slide Over Footer */}
                  <Slideover.Footer>
                    <div className="flex flex-row justify-between mb-9">
                        <h1 className="text-2xl"> Total</h1>
                        <h1 className="text-xl">{`£${calculateTotal()}`}</h1>
                    </div>
                      <Button
                          variant="outline-secondary"
                          type="button"
                          onClick={() => {
                            onClose() }}
                          className="w-32 mr-3"
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
                  </Slideover.Footer>
              </Slideover.Panel>
              {/* END: Slide Over Footer */}
          </Slideover>
          {/* END: Slide Over Content */}
    </div>
  )
}

export default SlideOverPanel

function showAppointmentToast(arg0: string, arg1: string) {
    throw new Error("Function not implemented.");
}
