
  import { Menu, Slideover } from "../../base-components/Headless";
  import {
    FormLabel,
    FormInput,
    FormSelect,
  } from "../../base-components/Form";
  import Button from "../../base-components/Button";
  import Lucide from "../../base-components/Lucide";
  import { Key, useEffect, useState } from "react";

import DatePickerMUI from "../DatePicker";
import CustomDatePicker from "../DatePicker";
import { Link } from 'react-router-dom';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/dark.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ServiceCard from "../ServiceCard";
import CustomerCard from "../CustomerCard";
import React from "react";
import axios from 'axios';
import calendarRepository from "../../repositories/calendarRepository";




//   const [headerFooterSlideoverPreview, setHeaderFooterSlideoverPreview] = useState(false);
  interface SlideOverPanelProps {
    isOpen: boolean;
    onClose: () => void;
    serviceData: any;
    selectedTime : any;
  }
function SlideOverPanel({ isOpen, onClose, serviceData, selectedTime }: SlideOverPanelProps) {
    const [isSecondSlideoverOpen, setSecondSlideoverOpen] = useState(false);
    const [isServiceSlideoverOpen, setServiceSlideoverOpen] = useState(false)
    const [searchValueClient, setSearchValueClient] = useState("");
    const [searchValueService, setSearchValueService] = useState("");
    const [customersList, setCustomersList] = useState<any>([]);
    const [selectedCustomer, setSelectedCustomer] = React.useState<any>(null);

    const [selectedServices, setSelectedServices] = React.useState<{ ProductID?: any; ProductName?: any; Price?: number }[]>([]);

    const [visibleCustomers, setVisibleCustomers] = useState(10); // Number of customers to display
    const totalCustomers = customersList?.Customers?.length || 0;

    // const axios = require('axios');

    console.log(serviceData)
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
        // Check if the service is already selected
        // const isServiceSelected = selectedServices.some(service => service.ProductID === selectedService.ProductID);

        // Add or remove the service based on its current selection state
        // if (isServiceSelected) {
        //     setSelectedServices(prevSelected => prevSelected.filter(service => service.ProductID !== selectedService.ProductID));
        //     setServiceSlideoverOpen(false);
        // } else {
            setSelectedServices(prevSelected => [...prevSelected, selectedService]);
            setServiceSlideoverOpen(false);
        
    };

    const calculateTotal = () => {
        return selectedServices.reduce((total, service) => total + (service.Price || 0), 0);
      };

    const openSearchClient = async () => {
        // Reset the selected customer when opening the search client
        setSelectedCustomer(null);
        setSecondSlideoverOpen(true);
        await fetchClientList();
    }

    const selectCustomer = (customer: any) => {
        // Set the selected customer when a customer is clicked
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
            console.log('Customers List:', responseData.Customers);
            console.log(customersList)
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
      
      const apiUrl = 'https://beautyapi.vdit.co.uk/v1/AddNewAppointment';
      
      const newAppointmentRequest = {
            "business_id": "20160908110055249272",
            "FirstName": selectedCustomer?.FirstName || "",
            "LastName": selectedCustomer?.LastName || "",
            "Mobile": selectedCustomer?.Phone || "",
            "Email": selectedCustomer?.Email || "",
                "Appointments": [
                {
                    "BookDate": new Date(), 
                    "StartTime": selectedTime,
                    // "ServiceID": selectedServices.ProductID,
                    "ServiceID": 64,
                    "StaffID": 13,
                    "Deposit": 0,
                    "Islocked": false,
                    "CustomerNote": "",
                    "CompanyNote": null
                }
            ]
      };

      console.log(selectedTime)


      const handleAddNewAppointment = () => {
        console.log('click add')
        // if (!selectedCustomer) {
        //     console.error('Selected customer is null.');
        //     return;
        //   }
        calendarRepository.addAppointment(newAppointmentRequest)
        .then((res) => console.log(res))
        setSecondSlideoverOpen(false);
      }

    

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

                    {/* End Add Client Button */}

                    {/* Begin DatePicker */}
                    {/* <div className=" flex flex-row items-center w-full border-none shadow-none pl-12">
                        <Flatpickr
                            value={new Date()}
                            options={{ dateFormat: 'D j F, Y' }}
                            className="pl-4 w-58 mt-3 border-none bg-transparent text-lg rounded-md text-black focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        {/* Time Picker */}
                        {/* <DatePicker
                            onChange={() => {}}
                            selected={new Date()}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            dateFormat="h:mm aa"
                            className="pl-4 w-28 items-center mt-3 border-none bg-transparent text-lg rounded-md text-black focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div> */}
                    {/* End DatePicker */}
                    
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
                        {selectedServices.map((selectedService) => (
                        <ServiceCard
                            key={selectedService.ProductID}
                            service={selectedService}
                            onSelect={() => {}}
                        />
                        ))}
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
                                    <Link to={'/clients/add'}>
                                        <Button className="items-center justify-center text-center border-none shadow-none">
                                        <Lucide
                                            icon="PlusCircle"
                                            className="text-primary text-lg round mr-1"
                                        />
                                        <h1>Add new client</h1>
                                        </Button>
                                    </Link>
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