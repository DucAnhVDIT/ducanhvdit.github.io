import { Drawer, Paper } from '@mui/material';
import React, { Key, useState } from 'react'
import Lucide from '../../base-components/Lucide';
import Button from '../../base-components/Button';
import customerRepository from '../../repositories/customerRepository';
import ServiceCard from '../ServiceCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores/store';
import { addService, deleteService } from '../../stores/serviceListSlice';
import FormInput from '../../base-components/Form/FormInput';
import CustomerCard from '../CustomerCard';


interface AddNewDrawerProps {
    serviceData: any;
    selectedTime : any;
    date: any;
    showAppointmentToast :any;
    fetchAppoinmentApiData: (date: Date | undefined) => Promise<any>;
    resourceID : any,
    handleAppoinmentChange: (value: boolean) => void;
    addNewDrawerOpen: any
    setAddNewDrawerOpen: (value: boolean) => void;
}

function AddNewDrawer({addNewDrawerOpen,setAddNewDrawerOpen, handleAppoinmentChange, serviceData, selectedTime, showAppointmentToast, date, resourceID }: AddNewDrawerProps) {
    const [activeTab, setActiveTab] = useState('info');

    const [selectedCustomer, setSelectedCustomer] = React.useState<any>(null);
    const [customersList, setCustomersList] = useState<any>([]);

    const [isServiceSlideoverOpen, setServiceSlideoverOpen] = useState(false)
    const [isClienSlideoverOpen, setClienSlideoverOpen] = useState(false);

    const [searchValueService, setSearchValueService] = useState("");
    const [selectedServiceIDs, setSelectedServiceIDs] = useState<any[]>([]);
    const [searchValueClient, setSearchValueClient] = useState("");

    const [visibleCustomers, setVisibleCustomers] = useState(10);
    const totalCustomers = customersList?.Customers?.length || 0;
    const selectedServices = useSelector((state: RootState) => state.serviceListState.selectedServices);
    const dispatch = useDispatch()

    const handleTabChange = (tab: React.SetStateAction<string>) => {
        setActiveTab(tab);
    };

    const fetchClientList = async () => {
        try {
            await customerRepository.getCustomer().then((res: any) => {
                if (res.data !== null) {
                    setCustomersList(res.data);
                }
            })
        } catch (error) {
        }
    };

    const openSearchClient = async () => {
        setSelectedCustomer(null);
        setClienSlideoverOpen(true);
        await fetchClientList();
    }

    const getInitials = (name: string | null | undefined) => {
        if (!name) {
          return ''; 
        }
      
        const names = name.split(' ');
        return names.map((name: string) => name[0]).join('');
    };

    const openServicesList =() => {
        setServiceSlideoverOpen(true)
    }
    
    const handleServiceDelete = (selectedService: any) => {
        dispatch(deleteService(selectedService.ProductID));
        console.log("deleted")
    };

    const handleServiceSelect = (selectedService: { ProductID: any; }) => {
        dispatch(addService(selectedService))
        setSelectedServiceIDs((prevSelectedServiceIDs) => [...prevSelectedServiceIDs, selectedService.ProductID]);
        setServiceSlideoverOpen(false);
    };

    const handleOpenAddClient = () => {
        // setAddCustomerSlideOpen(true)
        setClienSlideoverOpen(false)
    }


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

    const selectCustomer = (customer: any) => {
            // Set the selected customer when a customer is clicked
            // console.log('selected customer', customer)
     
        setSelectedCustomer(customer);
            // Close the search client slideover if needed
        setClienSlideoverOpen(false);
    }
    
    return (
    <div>
        <Drawer
            className="sm:hidden"
            anchor="bottom"
            open={addNewDrawerOpen}
            onClose={()=>{setAddNewDrawerOpen(false)}}
            ModalProps={{ keepMounted: true }}
        >
           <Paper
             sx={{
                height: '100vh', 
                display: 'flex',
                flexDirection: 'column',
            }}
           >
            <div className='m-3'>
                <div className='flex'>
                    <h1 className="mr-auto font-bold text-2xl">
                    New Appoinment
                    </h1>
                    <Button className="border-none shadow-none" onClick={() => setAddNewDrawerOpen(false)}>
                        <Lucide icon="ArrowLeft"/>
                    </Button>
                </div>

                 {/* Tab Navigation */}
                <div className="flex justify-start mb-5 mt-3">
                    <Button
                        variant="instagram"
                        type="button"
                    className={`border-none w-28 cursor-pointer rounded-full px-8 ${activeTab === 'info' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'}`}
                    onClick={() => handleTabChange('info')}
                >
                    Info
                </Button>
                <Button
                    variant="instagram"
                    type="button"
                    className={`w-28 border-none cursor-pointer ml-3 rounded-full px-8 ${activeTab === 'notes' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'}`}
                    onClick={() => handleTabChange('notes')}
                >
                    Notes
                </Button>

            </div>

            {activeTab === 'info' && (
                    <>
                       {/* Begin Add Client Button */}
                       <div className=" border-none bg-transparent shadow-none" onClick={openSearchClient}>
                           <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y  rounded-lg w-full ">
                               <div
                               className="col-span-12 selection:cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in border-2 border-gray-400"
                               >
                               <div className="p-3">
                                   <div className="flex">
                                   {selectedCustomer && selectedCustomer.FirstName ? (
                                   <div className="w-14 h-14 rounded-full p-2 bg-primary text-white flex items-center justify-center">
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
                       </div>

                       {/* Begin Add Services */}
                       <div className="border-none bg-transparent w-full shadow-none mt-3 -z-10" onClick={openServicesList}>
                           <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y rounded-lg w-full">
                               <div
                               className="col-span-12 p-1 cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in border-2 border-gray-400"
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
                       </div>
                       <div className="selected-services">
                       {selectedServices && selectedServices.map((selectedService: { ProductID: Key | null | undefined; }) => (
                           <ServiceCard
                               key={selectedService.ProductID}
                               service={selectedService}
                               onSelect={handleServiceDelete}
                           />
                       ))}
                       </div>
                        {/* End Add Services */}

                        {/* Begin Service List */}
                         <Drawer
                            className=' z-30' anchor="bottom" open={isServiceSlideoverOpen} onClose={() => setServiceSlideoverOpen(false)}
                         >
                            <Paper
                                sx={{
                                    height: '100vh', 
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <div className='m-3'>
                                    <div className='flex'>
                                        <h2 className="mr-auto font-bold text-2xl">
                                                Search service
                                        </h2>
                                        <Button className="border-none shadow-none" onClick={() => setServiceSlideoverOpen(false)}>
                                            <Lucide icon="ArrowLeft"/>
                                        </Button>
                                    </div>

                                    <div className="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
                                        <div className="relative text-slate-500">
                                            <FormInput
                                            type="text"
                                            className="mb-2 w-full h-12 !bg-gray-300 !box focus:ring-primary focus:border-primary"
                                            placeholder="Search by se name"
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
                                    {serviceData && serviceData
                                    .filter((service: { ProductName: string }) =>
                                        service.ProductName.toLowerCase().includes(searchValueService.toLowerCase())
                                    )
                                    .map((service: { ProductID: string }) => (
                                        <ServiceCard key={service.ProductID} service={service} onSelect={handleServiceSelect}/>
                                    ))}
                                </div>
                                </Paper>
                         </Drawer>
                        {/* End Service List */}
                        
                        {/* Begin Client List */}
                        <Drawer
                            className=' z-30' anchor="bottom" open={isClienSlideoverOpen} onClose={() => setClienSlideoverOpen(false)}
                         >
                            <Paper
                                sx={{
                                    height: '100vh', 
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <div className='m-3'>
                                    <div className='flex'>
                                        <h2 className="mr-auto font-bold text-2xl">
                                            Search client
                                        </h2>
                                        <Button className="border-none shadow-none" onClick={() => setClienSlideoverOpen(false)}>
                                            <Lucide icon="ArrowLeft"/>
                                        </Button>
                                    </div>

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
                                       <div className="items-center justify-center text-center border-none shadow-none">
                                           <Button onClick={handleOpenAddClient} className="items-center justify-center text-center border-none shadow-none">
                                           <Lucide
                                               icon="PlusCircle"
                                               className="text-primary text-lg round mr-1"
                                           />
                                           <h1>Add new client</h1>
                                           </Button>
                                       </div>
   
                                       {filteredCustomers.slice(0, visibleCustomers).map((customer: { CustomerID: Key | null | undefined; }) => (
                                           <CustomerCard key={customer.CustomerID} customer={customer} onClick={() => selectCustomer(customer) } />
                                       ))}
   
                                       {visibleCustomers < totalCustomers && (
                                           <button onClick={loadMoreCustomers} className=" mt-2 text-primary cursor-pointer">
                                           Load More
                                           </button>
                                       )}
   
                                   </div>
                                </div>
                                </Paper>
                         </Drawer>
                        {/* End Client List */}

                </>)}
            </div>

            
           </Paper>
        </Drawer>
    </div>
  )
}

export default AddNewDrawer