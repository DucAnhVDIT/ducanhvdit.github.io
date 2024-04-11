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
import ServiceCard from "../../components/ServiceCard";
import CustomerCard from "./CustomerCard";
import Lucide from "../../base-components/Lucide";
import { Menu, Tab, Dialog } from "../../base-components/Headless";
import eposRepository from "../../repositories/eposRepository";
import { useDispatch, useSelector } from "react-redux";
import { addToBill, clearBill, clearItem } from "../../stores/billSlice";
import Breadcrumb from "../../base-components/Breadcrumb";
import { ICustomerData } from "../../types/user";
import NewOrder from "./newOrder";
import MiscModal from "./miscModal";
import PaymentModal from "./paymentModal"

import ReceiptSVG from "../../assets/images/receipt.svg"
import Cash from '../../assets/images/cash.png'
import Card from '../../assets/images/payment.png'
import GiftCard from '../../assets/images/gift-card.png'
import "./pos.css"
import { useLocation } from "react-router-dom";

function Main() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { appointment } = location.state || {};

  const [newOrderModal, setNewOrderModal] = useState(false);
  const [priceModal, setPriceModal] = useState(false)
  const [paymentPage, setPaymentPage] = useState(false)
  const [paymentModal, setPaymentModal] = useState(false)

  const [buttonDiscount, setButtonDiscount] = useState('')
  const [discountNumber, setDiscountNumber] = useState<any>('')
  const [discountAmount, setDiscountAmount] = useState<number>(0)
  const [finalPrice, setFinalPrice] = useState<any>('')
  const [staffName, setStaffName] = useState('')
  const [categoryName, setCategoryName] = useState('')

  const [showComponent, setShowComponent] = useState('')
  const [searchValue, setSearchValue] = useState("");
  const [paymentMethod, setPaymentMethod] = useState('')
  
  const [staffs, setStaff] = useState<any>([])
  const [servicesCategory, setServicesCategory] = useState<any>([])
  const [services, setServices] = useState<any>([])
  const [fullServices, setFullServices] = useState<any>([])

  const [customerData, setCustomerData] = useState(ICustomerData)
  const [modalPriceData, setModalPrice] = useState<any>([])
  
  
  // open page, show list of Staffs
  useEffect(() => {
    if (!appointment) {
      // If appointment data does not exist, clear the bill
      dispatch(clearBill());

    }
    getFullServices(0,0)
  }, [])



  const getStaff = () => {
    eposRepository.getStaff().then((res: any) => {
      if(res.data.Staffs !== null) {
        setStaff(res.data.Staffs)
      } 
    })
  }

  const handleGetStaff = () => {
    getStaff()
    setShowComponent('staff')
  }

  // call API list what Staff can do and show them
  const getListStaffService = async (staffID: number) => {
    try {
      await getServicesCategory()
      await getFullServices(staffID, 0)
    } catch (err) {}
  }

  //**HANDLE HOLD & RECALL */
  const handleHold = () => {
    console.log('click Hold')
    console.log(billDetails)
  }

  const handleRecall = () => {
    console.log('click Recall')
  }
  //**END HANLDE HOLD & RECALL */

  //**HANDLE SHOW CATEGORIES & SERVICES */
  const handleGetServices = async () => {
    try {
      //if doesnt have staff name
      if (staffName === '') {
        // get full service and full category
        await getServicesCategory()
        await getFullServices(0, 0)
        setShowComponent('categories')
      } else {
        setShowComponent('categories')
      }
    } catch (er) {}
  }

  // filter category have in service list, map and display when fullService being called
  useEffect(() => {
    if (showComponent !== 'misc'){
      if (fullServices !== null && servicesCategory !== null) {
        const commonServices = servicesCategory.filter((category: any) =>
        fullServices.some((service: any) => service.CategoryID === category.CategoryID)
      )
        setServicesCategory(commonServices)
      } else {
        setServicesCategory([])
      }
      setShowComponent('categories')
    } else {
    
    }
    //
  }, [fullServices]);

  //get list Category
  const getServicesCategory = async () => {
    try {
      await eposRepository.getServicesCategory().then((res: any) => {
        setServicesCategory(res.data.Categories)
      })
    } catch (err) {}
  }
  // get list Full service
  const getFullServices = async (staffID: number, catID: number) => {
    try {
      await eposRepository.getServices(staffID, catID).then((res: any) => {
        if (res.data.Services !== null) {
          let misc = [{
            CategoryID: -1,
            CategoryName: 'Misc',
            CompanyID: "20160908110055249272",
            Description: "",
            Price: 0,
            ProductID: 77777,
            ProductName: "Extra Services"
          },{
            CategoryID: -1,
            CategoryName: 'Misc',
            CompanyID: "20160908110055249272",
            Description: "",
            Price: 0,
            ProductID: 77778,
            ProductName: "Design"
          }]
          let fulldata = res.data.Services.concat(misc)
          setFullServices(fulldata)
        }
      })
    } catch (err) {}
  }
  // get service from Category without need to call API
  const getServicesList = (CatID: number) => {
    const sameCat = fullServices.filter((item: any) => item.CategoryID === CatID)
    setServices(sameCat)
    setShowComponent('services')
  }
  //**END HANDLE CATEGORIES & SERVICES */
  
  //* HANDLE MISC ITEM */
  const handleMisc = async () => {
    try {
      await getFullServices(0, 0)
      const miscData = fullServices.filter((item: any) => item.CategoryID === -1)
      setServices(miscData)
      setShowComponent('misc')
    } catch {}  
  }

  const closeModalPrice = (data: any) => {
    if (data !== '') {
      const pushdata = {...data, staffName}
      dispatch(addToBill(pushdata))
    }
    setPriceModal(false)
  }
  //**END HANDLE MISC ITEM */

  // display search value when typing in search box
  useEffect(() => {
    // if there word in search box
    if (searchValue.length > 0) {
      const filtered = fullServices.filter((service: any) =>
        service.ProductName.toLowerCase().includes(searchValue.toLowerCase()) 
      );
      setServices(filtered)
      setCategoryName('Search')
      setShowComponent('services')
      // else display Category again
    } else {
      const commonServices = servicesCategory.filter((category: any) =>
        fullServices.some((service: any) => service.CategoryID === category.CategoryID)
      )
      setServicesCategory(commonServices)
      setShowComponent('categories')
    }
  }, [searchValue])
  
  // display ticket bill details using redux
  const billDetails = useSelector((state: any) => state.bill.billItems)
  const totalPrice = useSelector((state: any) => state.bill.totalPrice)

  // add item to bill with redux
  const addItem = (data: any) => {
    if (data.CategoryID !== -1) {
      const pushdata = { ...data, staffName} 
      dispatch(addToBill(pushdata))
    } else {
      setPriceModal(true)
      setModalPrice(data)
    }
  }

  const handleNewOrderClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setCustomerData(ICustomerData)
    setNewOrderModal(true)
  }

  const selectCustomer = () => {
    setNewOrderModal(true)
  }

  const handleDiscount = (data: any) => {
    setButtonDiscount((prev) => (prev === data ? '0' : data))
  }

  const handleNumberDiscount = (e: any) => {
    let value = e.target.value;
    //validate with number and 1 dots only
    let newValue = value.replace(/[^0-9,.]/g, '').replace(/,/g, '.').replace(/^0+/, "0");
    // Replace any additional dots with an empty string
    const dotIndex = newValue.indexOf('.');
    if (dotIndex !== -1 && newValue.indexOf('.', dotIndex + 1) !== -1) {
      newValue = newValue.replace(/\./g, (match: any, index: any) => {
        return index === dotIndex ? '.' : '';
      });
    }
    setDiscountNumber(newValue)
  }

  //change and recalculate discount base on change in varius field
  useEffect(() => {
    //check have bill in it
    if (billDetails.length !== 0) {
      let totalPriceAfterDiscount = totalPrice;
      //check discount by £
      if (buttonDiscount === '£') {
        //minus direct to total bill
        totalPriceAfterDiscount -= discountNumber;
        setDiscountAmount(discountNumber)
        //else discount by %
      } else if (buttonDiscount === '%') {
        //calculate amount and discount from price
        const discountAmount = (totalPrice * discountNumber) / 100;
        setDiscountAmount(discountAmount)
        totalPriceAfterDiscount -= discountAmount;
      } else {
        //else change bill but no discount detect
        setDiscountAmount(0)
      }
      //set final price after discount
      setFinalPrice(totalPriceAfterDiscount);
    } else {
      //else there no bill detect set everything = 0
      setDiscountAmount(0)
      setFinalPrice(0)
    }
    //watch/check what field change affect this function
  }, [discountNumber, buttonDiscount, billDetails, totalPrice]);

  const handleClearItems = () => {
    dispatch(clearBill())
  }
  const handleCloseOrder = (data: any) => {
    if (data !== '') {
      setCustomerData(data)
    } else {
      setCustomerData(ICustomerData)
    }
    setNewOrderModal(false)
  }

  //**OPEN PAYMENT PAGE */
  const openPaymentPage = () => {
    // scroll to top for mobile screen to payment options
    window.scrollTo(0, 0)
    setPaymentPage(!paymentPage)
  }

  const handlePayment = (options: string) => {
    if (options === 'cash'){
      setPaymentMethod('Cash')
      setPaymentModal(true)
    } else if (options === 'card'){
      setPaymentMethod('Card')
      setPaymentModal(true)
    } else {
      setPaymentMethod('Gift Card')
      setPaymentModal(true)
    }
  }

  const handleClosePayment = (data: any) => {
    console.log('close payment')
    console.log(data)
    setPaymentModal(false)
  }
  //**END PAYMENT PAGE */
  return (
    <>
      {/* <div className="flex flex-col items-center mt-4 intro-y sm:flex-row">
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
      </div> */}
      <div className="grid grid-cols-12 gap-4 mt-4 intro-y">
        {
          !paymentPage && (
          <div className="col-span-12 intro-y lg:col-span-8">
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
              <Breadcrumb className="hidden mr-auto -intro-x sm:flex p-3">
                <Breadcrumb.Link active>{staffName}</Breadcrumb.Link>
                <Breadcrumb.Link active className={`${showComponent === 'services'? '' : 'hidden'}`}>{categoryName}</Breadcrumb.Link>
                <Breadcrumb.Link active className={`${showComponent === 'misc'? '' : 'hidden'}`}>Misc</Breadcrumb.Link>
              </Breadcrumb>
            </div>
            <div className="grid grid-cols-12 gap-5 mt-5">
              <div className="col-span-12 p-5 cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in hover:border-blue-700">
                <div className="text-base font-medium"
                      onClick={handleHold}>Hold</div>
              </div>
              <div className="col-span-12 p-5 cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in">
                <div className="text-base font-medium"
                      onClick={handleRecall}>Recall Order</div>
              </div>
              <div className="col-span-12 p-5 cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in">
                <div className="text-base font-medium">Product</div>
              </div>
              <div className="col-span-12 p-5 cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in">
                <div className="text-base font-medium"
                      onClick={handleGetStaff}>Staff</div>
              </div>
              <div className="col-span-12 p-5 cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in">
                <div className="text-base font-medium"
                      onClick={handleGetServices}>Service</div>
              </div>
              <div className="col-span-12 p-5 cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in">
                <div className="text-base font-medium"
                      onClick={handleMisc}>Misc</div>
              </div>
            </div>
            <div className={`grid grid-cols-12 gap-5 mt-5 p-2 overflow-y-auto border-t ${showComponent === 'staff'? '' : 'hidden'}`}>
              {staffs.map((staff: any, StaffID: number) => (
              <div  key={StaffID} 
                    onClick={(event) => {
                      event.preventDefault();
                      getListStaffService(staff.StaffID)
                      setStaffName(staff.StaffName)
                    }}
                    className="intro-y col-span-12 p-5 cursor-pointer border-2 border-blue-700/75 hover:bg-blue-700 hover:text-white sm:col-span-4 2xl:col-span-3 box zoom-in">

                  <div className="text-base font-medium">{staff.StaffName}</div>
              </div>
              ))}
            </div>
            {/*BEGIN: Display list Category*/}
            <div className={`grid grid-cols-12 gap-5 mt-5 p-2 overflow-y-auto border-t ${showComponent === 'categories'? '' : 'hidden'}`}>
              {servicesCategory.map((category: any, CategoryID: number) => (
              <div  key={CategoryID} 
                    onClick={(event) => {
                      event.preventDefault();
                      getServicesList(category.CategoryID)
                      setCategoryName(category.CategoryName)
                    }}
                    className="intro-y col-span-12 p-5 cursor-pointer border-2 border-blue-700/75 hover:bg-blue-700 hover:text-white sm:col-span-4 2xl:col-span-3 box zoom-in">
                  <div className="text-base font-medium truncate">{category.CategoryName}</div>
              </div>
              ))}
            </div>
            {/*END: Display list Category*/}
            {/*BEGIN: Display list Services*/}
            <div className={`grid grid-cols-12 gap-5 p-4 mt-5 border-t max-h-[70vh] overflow-y-auto ${showComponent === 'services' || showComponent === 'misc' ? '' : 'hidden'}`}>
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
            {/*END: Display list Services*/}
          </div>
          )
        }    
        
        {/* END: Item List */}
        {/*Start Page Payment */}
        {
          paymentPage && (
            <div className="col-span-12 intro-x ml-5 lg:col-span-8">
              <h3 className="mr-auto text-lg font-medium">Select Payment</h3>
              <div>
              <div className="flex justify-center gap-4 mt-5">
                <button className="flex-1 items-center justify-center py-4 rounded-lg text-lg font-medium h-40 box zoom-in"
                        onClick={() => handlePayment('cash')}>
                  <img
                    alt="VDIT Solutions"
                    className="block mx-auto mb-1 w-10 h-10"
                    src={Cash}
                  />
                  Cash
                </button>
                <button className="flex-1 items-center justify-center py-4 rounded-lg text-lg font-medium h-40 box zoom-in"
                        onClick={() => handlePayment('card')}>
                  <img
                    alt="VDIT Solutions"
                    className="block mx-auto mb-1 w-10 h-10"
                    src={Card}
                  />
                  Card
                </button>
                <button className="flex-1 items-center justify-center py-4 rounded-lg text-lg font-medium h-40 box zoom-in"
                        onClick={() => handlePayment('gift')}>
                  <img
                    alt="VDIT Solutions"
                    className="block mx-auto mb-1 w-10 h-10"
                    src={GiftCard}
                  />
                  Gift Card
                </button>
              </div>
              </div>
              
            </div>
          )
        }
        {/*END Page Payment */}
        {/* BEGIN: Ticket */}
        <Tab.Group className="col-span-12 lg:col-span-4">
          <CustomerCard key={customerData.CustomerID} customer={customerData} onClick={() => selectCustomer()}></CustomerCard>
          <Tab.Panels>
            {/* Show list bill */}
            <Tab.Panel>
              {billDetails.length !== 0 ? (
                <div className="p-2 mt-1 box h-[30vh] overflow-auto">
                  {billDetails.map((bill: any, ProductID: number) => (
                    <a
                      key={ProductID}
                      className="flex items-center p-2 transition duration-300 ease-in-out bg-white rounded-md dark:bg-darkmode-600 hover:bg-slate-100 dark:hover:bg-darkmode-400"
                    >
                      <div className="text-slate-500">{bill.quantity} x </div>
                      <div className="max-w-[50%] truncate mr-1">
                      &nbsp; {bill.ProductName ? bill.ProductName : appointment?.ServiceName}
                      </div>
                      <div className={`text-slate-500 ${bill.staffName !== '' ? '' : 'hidden' }`}>- {bill.staffName}</div>
                      <div className="ml-auto font-medium">
                        £{bill.quantityPrice}
                      </div>
                      <Lucide
                        icon="Trash2"
                        onClick={(event: React.MouseEvent) => {
                          event.preventDefault();
                          dispatch(clearItem(bill))
                        }}
                        className="w-4 h-4 ml-2 text-slate-500 cursor-pointer"
                      />
                    </a>
                  ))}
                </div>
                ) : (
                  <div className="p-2 mt-3 box flex items-center justify-center h-[30vh]">
                    <div className="-intro-x">
                      <img
                        alt="VDIT Solutions"
                        className="w-10 h-10"
                        src={ReceiptSVG}
                      />
                    </div>
                    Your bill is empty. Add items to your order.
                  </div>
                )
              }
              <div className="p-5 mt-5 box">
                <div className="flex">
                  <FormInput
                    type="text"
                    className="w-full px-4 py-3 pr-10 bg-slate-100 border-slate-200/60"
                    placeholder="Use coupon code..."
                  />
                  <Button variant="primary" className="ml-2">
                    Apply
                  </Button>
                </div>
                <div className="flex mt-4">
                  <div className="mt-4 box text-center">
                    Discount
                  </div>
                  <Button data-tw-merge data-placement="top" 
                          title="Discount by amount" 
                          className={`ml-2 hover:bg-blue-700 hover:text-white  ${buttonDiscount === '£' ? 'bg-blue-700 text-white' : ''}`} 
                          onClick={() => handleDiscount('£')}>
                    £
                  </Button>
                  <Button data-tw-merge data-placement="top" 
                          title="Discount by percentage" 
                          className={`mx-2 hover:bg-blue-700 hover:text-white  ${buttonDiscount === '%' ? 'bg-blue-700 text-white' : ''}`} 
                          onClick={() => handleDiscount('%')}>
                    %
                  </Button>
                  <FormInput
                    type="text"
                    className="w-full px-4 py-3 bg-slate-100 border-slate-200/60"
                    placeholder="Discount bill"
                    value={discountNumber}
                    onChange={(e) => {handleNumberDiscount(e)}}
                  />
                </div>                
              </div>
              <div className="p-5 mt-5 box">
                <div className="flex">
                  <div className="mr-auto">Subtotal</div>
                  <div className="font-medium">£{totalPrice}</div>
                </div>
                <div className="flex mt-4">
                  <div className="mr-auto">Discount</div>
                  <div className={`font-medium text-danger ${discountAmount !== 0  ? '':'hidden'}`}>-£{discountAmount}</div>
                </div>
                <div className="flex pt-4 mt-4 border-t border-slate-200/60 dark:border-darkmode-400">
                  <div className="mr-auto font-medium">
                    Cash
                  </div>
                  <div className=" font-medium">£{finalPrice}</div>
                </div>
                <div className="flex pt-4 mt-4 border-t border-slate-200/60 dark:border-darkmode-400">
                  <div className="mr-auto text-base font-medium">
                    Total Charge
                  </div>
                  <div className="text-base font-medium">£{finalPrice}</div>
                </div>
              </div>
              <div className="flex mt-5">
                <Button className="w-32 border-slate-300 dark:border-darkmode-400 text-slate-500" 
                        onClick={handleClearItems}>
                  Clear Bills
                </Button>
                <Button variant="primary" className="w-32 ml-auto shadow-md"
                        onClick={openPaymentPage}>
                  Pay
                </Button>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
        {/* END: Ticket */}
      </div>

      {priceModal && (<MiscModal miscData={modalPriceData} priceModal={priceModal} handleClose={closeModalPrice} />)}
      {/* BEGIN: New Order Modal */}
      {newOrderModal && (<NewOrder customer={customerData} openModal={newOrderModal} handleClose={handleCloseOrder}/> )}
      {/* END: New Order Modal */}
      {paymentModal && (<PaymentModal paymentData={totalPrice} paymentModal={paymentModal} paymentMethod={paymentMethod} handleClose={handleClosePayment} />)}
    </>
  );
}

export default Main;