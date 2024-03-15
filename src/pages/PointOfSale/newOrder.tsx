import {
  FormInput,
  FormLabel,
} from "../../base-components/Form";
import Button from "../../base-components/Button";
import {  Dialog } from "../../base-components/Headless";
import { useState, useEffect } from "react";
import customerRepository from "../../repositories/customerRepository";

interface INewOrder {
  customer: any
  openModal: boolean;
  handleClose: any;
}

export default function newOrder ({customer, openModal, handleClose} : INewOrder) {

const [searchList, setSearchList] = useState(false) 
const [customerInput, setCustomerInput] = useState(customer)
const [customers, setCustomers] = useState<any>([])
const [filterName, setFilterName] = useState<any>([])
const [filterMobile, setFilterMobile] = useState<any>([])

const handleInput = (e: any) => {
  const { name, value } = e.target
  setCustomerInput((data: any) => ({ ...data, [name]: value}))
  setSearchList(true)
}

const getCustomers = () => {
  customerRepository.getCustomer().then((res: any) => {
    setCustomers(res.data.Customers)
  })
}

useEffect(() => {
  getCustomers()
}, [])

useEffect(() => {
// Filter customers based on input values
  const filtered = customers.filter((customer: any) => {
    if (customer.FirstName !== null && customer.LastName !== null && customer.Mobile !== null) {
      if (customerInput.CustomerName !== '') {
        const nameMatch = `${customer.FirstName} ${customer.LastName}`.toLowerCase().includes(customerInput.CustomerName.toLowerCase());
        return nameMatch
      } if (customerInput.Mobile !== 0) {
        const mobileMatch = customer.Mobile.toLowerCase().includes(customerInput.Mobile);
        // return mobileMatch
        setFilterMobile(mobileMatch)
      }
    // Check if either the name or the mobile number matches
    }
  });
  setFilterName(filtered)
},[customerInput.CustomerName, customerInput.Mobile])

const handleSelectedCustomer = (customer: any) => {
  setSearchList(false)
  setCustomerInput({ ...customer, CustomerName: `${customer.FirstName} ${customer.LastName}` })
}

const handleCloseModal = (action: string) => {
  if (action === 'close') {
    handleClose('')
  } else {
    handleClose(customerInput)
  }
}

useEffect(() => {}, [])
return (
  <>
    {/* BEGIN: New Order Modal */}
   <Dialog
      open={openModal}
      onClose={() => handleCloseModal('close')}
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
              name="CustomerName"
              value={customerInput.CustomerName}
              onChange={handleInput}
            />
          </div>
          {searchList && (
            <ul className="dropdown-menu col-span-12 max-h-40 overflow-y-auto w-full">
              {filterName.map((customer: any) => (
                <li key={customer.CustomerID} 
                className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelectedCustomer(customer)}>
                  {`${customer.FirstName} ${customer.LastName}`} - {customer.Mobile}
                </li>
              ))}
            </ul>
            )
          }
          <div className="col-span-12">
            <FormLabel htmlFor="pos-form-2">Mobile</FormLabel>
            <FormInput
              id="pos-form-2"
              type="text"
              className="flex-1"
              placeholder="Mobile"
              name="Mobile"
              value={customerInput.Mobile}
              onChange={handleInput}
            />
          </div>
          {/* {filterMobile !== '' && (
            <ul className="dropdown-menu col-span-12 max-h-40 overflow-y-auto w-full">
              {filterMobile.map((customer: any) => (
                <li key={customer.id} 
                className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelectedCustomer(customer)}>
                  {`${customer.FirstName} ${customer.LastName}`} - {customer.Mobile}
                </li>
              ))}
            </ul>
          )} */}
          
          <div className="col-span-12">
            <FormLabel htmlFor="pos-form-3">Email</FormLabel>
            <FormInput
              id="pos-form-3"
              type="text"
              className="flex-1"
              placeholder="Email"
              name="Email"
              value={customerInput.Email}
              onChange={handleInput}
            />
          </div>
        </Dialog.Description>
        <Dialog.Footer className="text-right">
          <Button
            variant="outline-secondary"
            type="button"
            onClick={() => handleCloseModal('close')}
            className="w-32 mr-1"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="button"
            className="w-32"
            onClick={() => handleCloseModal('save')}
          >
            Create Order
          </Button>
        </Dialog.Footer>
      </Dialog.Panel>
    </Dialog>
 {/* END: New Order Modal */}
  </>
  )
}