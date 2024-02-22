import _ from "lodash";
import { useState, useRef, useEffect } from "react";
import fakerData from "../../utils/faker";
import Button from "../../base-components/Button";
import {
  FormInput,
  FormLabel,
  FormSelect,
  FormTextarea,
} from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";
import { Menu, Tab, Dialog } from "../../base-components/Headless";
import eposRepository from "../../repositories/eposRepository";
import { useDispatch, useSelector } from "react-redux";
import { addToBill, clearBill, clearItem } from "../../stores/billSlice";

function Main() {
  const dispatch = useDispatch();

  const [newOrderModal, setNewOrderModal] = useState(false);
  const [addItemModal, setAddItemModal] = useState(false);
  const [staffHidden, setStaffHidden] = useState(false)
  const [listHidden, setListHidden] = useState(true)
  const [categoryHidden, setCategoryHidden] = useState(true)
  const [serviceHidden, setServiceHidden] = useState(true)

  const [searchValue, setSearchValue] = useState("");
  
  const [staffs, setStaff] = useState<any>([])
  const [servicesCategory, setServicesCategory] = useState<any>([])
  const [services, setServices] = useState<any>([])
  const [fullServices, setFullServices] = useState<any>([])

  const createTicketRef = useRef(null);
  const addItemRef = useRef(null);
  
  const getStaff = () => {
    eposRepository.getStaff().then((res: any) => {
      setStaff(res.data.Staffs)
    })
  }

  const getServicesCategory = async () => {
    try {
      await eposRepository.getServicesCategory().then((res: any) => {
        setServicesCategory(res.data.Categories)
      })
    } catch (err) {

    }
  }

  const getFullServices = async (staffID: number, catID: number) => {
    try {
      await eposRepository.getServices(staffID, catID).then((res: any) => {
        setFullServices(res.data.Services)
      })
    } catch (err) {

    }
  }

  const getServices = (CatID: number) => {
    setCategoryHidden(true)
    setServiceHidden(false)
    const sameCat = fullServices.filter((item: any) => item.CategoryID === CatID)
    setServices(sameCat)
  }

  const getListStaffService = async (staffID: number) => {
    try {
      await getServicesCategory()
      await getFullServices(staffID, 0)
    } catch (err) {

    }
  }

  useEffect(() => {
    if (fullServices !== null && servicesCategory !== null) {
      const commonServices = servicesCategory.filter((category: any) =>
      fullServices.some((service: any) => service.CategoryID === category.CategoryID)
    )
      setServicesCategory(commonServices)
    } else {
      setServicesCategory([])
    }
    showListCat()
  }, [fullServices]);

  useEffect(() => {
    const filtered = fullServices.filter((service: any) =>
      service.ProductName.toLowerCase().includes(searchValue.toLowerCase())
    );
  setFullServices(filtered)
  }, [searchValue])

  const showListCat = () => {
    if (servicesCategory.length > 0) {
      setStaffHidden(true)
      setListHidden(false)
      setCategoryHidden(false)
      setServiceHidden(true)
    } else {
      setStaffHidden(false)
      setListHidden(true)
      setCategoryHidden(true)
      setServiceHidden(true)
    }
  }

  const clickStaffButton = () => {
    setStaffHidden(false)
    setListHidden(true)
    setCategoryHidden(true)
    setServiceHidden(true)
  }

  const clickBackButton = () => {
    setCategoryHidden(false)
    setServiceHidden(true)
  }

  useEffect(() => {
    getStaff()
  }, [])
  
  const billDetails = useSelector((state: any) => state.bill.billItems)

  const totalPrice = useSelector((state: any) => state.bill.totalPrice)
  
  const addItem = (data: any) => {
    dispatch(addToBill(data))
  }

  const handleNewOrderClick = (event: React.MouseEvent) => {
    event.preventDefault();
    // setNewOrderModal(true);
    dispatch(clearBill())
  }

  return (
    <>
      <div className="flex flex-col items-center mt-8 intro-y sm:flex-row">
        <h2 className="mr-auto text-lg font-medium">Point of Sale</h2>
        <div className="flex w-full mt-4 sm:w-auto sm:mt-0">
          <Button
            as="a"
            href="#"
            variant="primary"
            onClick={handleNewOrderClick}
            className="mr-2 shadow-md"
          >
            New Order
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-5 mt-5 intro-y">
        {/* BEGIN: Staff List */}       
        <div className="col-span-12 intro-y lg:col-span-8">
        {
          !staffHidden && (
          <div className="grid grid-cols-12 gap-5 mt-5 p-2 overflow-y-auto">
            {staffs.map((staff: any, StaffID: number) => (
            <div  key={StaffID} 
                  onClick={(event) => {
                    event.preventDefault();
                    getListStaffService(staff.StaffID)
                  }}
                  className="col-span-12 p-5 cursor-pointer border-2 border-blue-700/75 hover:bg-blue-700 hover:text-white sm:col-span-4 2xl:col-span-3 box zoom-in">
                <div className="text-base font-medium">{staff.StaffName}</div>
            </div>
            ))}
          </div>
          )
        }
        {/* END: Staff List */} 
        {
          !listHidden && (
            <div className="lg:flex intro-y">
            <div className="relative">
              <FormInput
                type="text"
                className="w-full px-4 py-3 pr-10 lg:w-64 !box"
                placeholder="Search item by code or name..."
                value={searchValue}
                onChange={(e) => {setSearchValue(e.target.value)}}
              />
              <Lucide
                icon="Search"
                className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3 text-slate-500"
              />
            </div>
            {
              !serviceHidden &&  
              <Button 
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault()
                  clickBackButton()
                }}
                className="mx-2 shadow-md"
              >
                Back
              </Button>
            }
           
            <Button 
              onClick={(e: React.MouseEvent) => {
                e.preventDefault()
                clickStaffButton()
              }}
              className="mx-2 shadow-md"
            >
              Staff
            </Button>
            <FormSelect className="w-full px-4 py-3 mt-3 ml-auto !box lg:w-auto lg:mt-0">
              <option>Sort By</option>
              <option>A to Z</option>
              <option>Z to A</option>
              <option>Lowest Price</option>
              <option>Highest Price</option>
            </FormSelect>
          </div>
          )
        }
          {/*BEGIN: Display list Category*/}
          {
            !categoryHidden && (
            <div className="grid grid-cols-12 gap-5 mt-5 p-2 overflow-y-auto">
              {servicesCategory.map((category: any, CategoryID: number) => (
              <div  key={CategoryID} 
                    onClick={(event) => {
                      event.preventDefault();
                      getServices(category.CategoryID)
                    }}
                    className="intro-y col-span-12 p-5 cursor-pointer border-2 border-blue-700/75 hover:bg-blue-700 hover:text-white sm:col-span-4 2xl:col-span-3 box zoom-in">
                  <div className="text-base font-medium truncate">{category.CategoryName}</div>
              </div>
              ))}
            </div>
            )
          }
          {/*END: Display list Category*/}

          {/*BEGIN: Display list Services*/}
          {
            !serviceHidden && 
            <div className="grid grid-cols-12 gap-5 p-4 mt-5 border-t max-h-[70vh] overflow-y-auto">
            {services.map((service: any, ProductID: number) => (
              <a
                key={ProductID}
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  addItem(service)
                }}
                className="block col-span-12 intro-y sm:col-span-4 2xl:col-span-3 "
              >
                <div className="relative p-3 rounded-md box zoom-in border-2 border-blue-700/75 hover:bg-blue-700 hover:text-white">
                  <div className="block font-medium text-center truncate  ">
                    {service.ProductName}
                  </div>
                </div>
              </a>
            ))}
          </div>
          }    
          {/*END: Display list Services*/}
        </div>
        {/* END: Item List */}
        {/* BEGIN: Ticket */}
        <Tab.Group className="col-span-12 lg:col-span-4">
          <div className="pr-1 intro-y">
            <div className="p-2 box">
              <Tab.List variant="pills">
                <Tab>
                  <Tab.Button as="button" className="w-full py-2">
                    Ticket
                  </Tab.Button>
                </Tab>
                <Tab>
                  <Tab.Button as="button" className="w-full py-2">
                    Details
                  </Tab.Button>
                </Tab>
              </Tab.List>
            </div>
          </div>
          <Tab.Panels>
            {/* Show list bill */}
            <Tab.Panel>
              {billDetails.length !== 0 ? (
                <div className="p-2 mt-5 box">
                  {billDetails.map((bill: any, ProductID: number) => (
                    <a
                      key={ProductID}
                      className="flex items-center p-3 transition duration-300 ease-in-out bg-white rounded-md dark:bg-darkmode-600 hover:bg-slate-100 dark:hover:bg-darkmode-400"
                    >
                      <div className="max-w-[50%] truncate mr-1">
                        {bill.ProductName}
                      </div>
                      <div className="text-slate-500">x {bill.quantity}</div>
                      <Lucide
                        icon="Trash2"
                        onClick={(event: React.MouseEvent) => {
                          event.preventDefault();
                          dispatch(clearItem(bill))
                        }}
                        className="w-4 h-4 ml-2 text-slate-500 cursor-pointer"
                      />
                      <div className="ml-auto font-medium">
                        £{bill.quantityPrice}
                      </div>
                    </a>
                  ))}
                </div>
                ) : (
                  <div className="p-2 mt-5 box text-center">Your bill is empty. Add items to your order.</div>
                )
              }
              <div className="flex p-5 mt-5 box">
                <FormInput
                  type="text"
                  className="w-full px-4 py-3 pr-10 bg-slate-100 border-slate-200/60"
                  placeholder="Use coupon code..."
                />
                <Button variant="primary" className="ml-2">
                  Apply
                </Button>
              </div>
              <div className="p-5 mt-5 box">
                <div className="flex">
                  <div className="mr-auto">Subtotal</div>
                  <div className="font-medium">£{totalPrice}</div>
                </div>
                <div className="flex mt-4">
                  <div className="mr-auto">Discount</div>
                  <div className="font-medium text-danger"></div>
                </div>
                <div className="flex mt-4">
                  <div className="mr-auto">Tax</div>
                  <div className="font-medium"></div>
                </div>
                <div className="flex pt-4 mt-4 border-t border-slate-200/60 dark:border-darkmode-400">
                  <div className="mr-auto text-base font-medium">
                    Total Charge
                  </div>
                  <div className="text-base font-medium">£{totalPrice}</div>
                </div>
              </div>
              <div className="flex mt-5">
                <Button className="w-32 border-slate-300 dark:border-darkmode-400 text-slate-500">
                  Clear Items
                </Button>
                <Button variant="primary" className="w-32 ml-auto shadow-md">
                  Charge
                </Button>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="p-5 mt-5 box">
                <div className="flex items-center pb-5 border-b border-slate-200 dark:border-darkmode-400">
                  <div>
                    <div className="text-slate-500">Time</div>
                    <div className="mt-1">02/06/20 02:10 PM</div>
                  </div>
                  <Lucide
                    icon="Clock"
                    className="w-4 h-4 ml-auto text-slate-500"
                  />
                </div>
                <div className="flex items-center py-5 border-b border-slate-200 dark:border-darkmode-400">
                  <div>
                    <div className="text-slate-500">Customer</div>
                    <div className="mt-1">{fakerData[0].users[0].name}</div>
                  </div>
                  <Lucide
                    icon="User"
                    className="w-4 h-4 ml-auto text-slate-500"
                  />
                </div>
                <div className="flex items-center py-5 border-b border-slate-200 dark:border-darkmode-400">
                  <div>
                    <div className="text-slate-500">People</div>
                    <div className="mt-1">3</div>
                  </div>
                  <Lucide
                    icon="Users"
                    className="w-4 h-4 ml-auto text-slate-500"
                  />
                </div>
                <div className="flex items-center pt-5">
                  <div>
                    <div className="text-slate-500">Table</div>
                    <div className="mt-1">21</div>
                  </div>
                  <Lucide
                    icon="Mic"
                    className="w-4 h-4 ml-auto text-slate-500"
                  />
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
        {/* END: Ticket */}
      </div>
      {/* BEGIN: New Order Modal */}
      <Dialog
        open={newOrderModal}
        onClose={() => {
          setNewOrderModal(false);
        }}
        initialFocus={createTicketRef}
      >
        <Dialog.Panel>
          <Dialog.Title>
            <h2 className="mr-auto text-base font-medium">New Order</h2>
          </Dialog.Title>
          <Dialog.Description className="grid grid-cols-12 gap-4 gap-y-3">
            <div className="col-span-12">
              <FormLabel htmlFor="pos-form-1">Name</FormLabel>
              <FormInput
                id="pos-form-1"
                type="text"
                className="flex-1"
                placeholder="Customer name"
              />
            </div>
            <div className="col-span-12">
              <FormLabel htmlFor="pos-form-2">Table</FormLabel>
              <FormInput
                id="pos-form-2"
                type="text"
                className="flex-1"
                placeholder="Customer table"
              />
            </div>
            <div className="col-span-12">
              <FormLabel htmlFor="pos-form-3">Number of People</FormLabel>
              <FormInput
                id="pos-form-3"
                type="text"
                className="flex-1"
                placeholder="People"
              />
            </div>
          </Dialog.Description>
          <Dialog.Footer className="text-right">
            <Button
              variant="outline-secondary"
              type="button"
              onClick={() => {
                setNewOrderModal(false);
              }}
              className="w-32 mr-1"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="button"
              className="w-32"
              ref={createTicketRef}
            >
              Create Ticket
            </Button>
          </Dialog.Footer>
        </Dialog.Panel>
      </Dialog>
      {/* END: New Order Modal */}
      {/* BEGIN: Add Item Modal */}
      <Dialog
        open={addItemModal}
        onClose={() => {
          setAddItemModal(false);
        }}
        initialFocus={addItemRef}
      >
        <Dialog.Panel>
          <Dialog.Title>
            <h2 className="mr-auto text-base font-medium">
              {fakerData[0].foods[0].name}
            </h2>
          </Dialog.Title>
          <Dialog.Description className="grid grid-cols-12 gap-4 gap-y-3">
            <div className="col-span-12">
              <FormLabel htmlFor="pos-form-4" className="form-label">
                Quantity
              </FormLabel>
              <div className="flex flex-1">
                <Button
                  type="button"
                  className="w-12 mr-1 border-slate-200 bg-slate-100 dark:bg-darkmode-700 dark:border-darkmode-500 text-slate-500"
                >
                  -
                </Button>
                <FormInput
                  id="pos-form-4"
                  type="text"
                  className="w-24 text-center"
                  placeholder="Item quantity"
                  value="2"
                  onChange={() => {}}
                />
                <Button
                  type="button"
                  className="w-12 ml-1 border-slate-200 bg-slate-100 dark:bg-darkmode-700 dark:border-darkmode-500 text-slate-500"
                >
                  +
                </Button>
              </div>
            </div>
            <div className="col-span-12">
              <FormLabel htmlFor="pos-form-5">Notes</FormLabel>
              <FormTextarea
                id="pos-form-5"
                placeholder="Item notes"
              ></FormTextarea>
            </div>
          </Dialog.Description>
          <Dialog.Footer className="text-right">
            <Button
              variant="outline-secondary"
              type="button"
              onClick={() => {
                setAddItemModal(false);
              }}
              className="w-24 mr-1"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="button"
              className="w-24"
              ref={addItemRef}
            >
              Add Item
            </Button>
          </Dialog.Footer>
        </Dialog.Panel>
      </Dialog>
      {/* END: Add Item Modal */}
    </>
  );
}

export default Main;
