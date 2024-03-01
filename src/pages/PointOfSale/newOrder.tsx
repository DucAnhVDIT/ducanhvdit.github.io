import {
  FormInput,
  FormLabel,
} from "../../base-components/Form";
import Button from "../../base-components/Button";
import {  Dialog } from "../../base-components/Headless";
import { useState, useEffect } from "react";
import { customerData } from "../../types/user";

interface INewOrder {
  openModal: boolean;
  onClose: () => void;
}

export default function newOrder ({openModal, onClose} : INewOrder) {

const [customerInput, setCustomerInput] = useState(customerData)

const handleInput = (e: any) => {
  console.log(e.target)
  const { name, value } = e.target
  setCustomerInput((data) => ({ ...data, [name]: value}))
}

const createNewOrder = () => {
}
useEffect(() => {}, [])
return (
  <>
    {/* BEGIN: New Order Modal */}
   <Dialog
      open={openModal}
      onClose={() => {
        onClose();
      }}
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
              name="customerName"
              value={customerInput.CustomerName}
              onChange={handleInput}
            />
          </div>
          <div className="col-span-12">
            <FormLabel htmlFor="pos-form-2">Mobile</FormLabel>
            <FormInput
              id="pos-form-2"
              type="text"
              className="flex-1"
              placeholder="Mobile"
              name="mobile"
              value={customerInput.Mobile}
              onChange={handleInput}
            />
          </div>
          <div className="col-span-12">
            <FormLabel htmlFor="pos-form-3">Email</FormLabel>
            <FormInput
              id="pos-form-3"
              type="text"
              className="flex-1"
              placeholder="Email"
              name="email"
              value={customerInput.Email}
              onChange={handleInput}
            />
          </div>
        </Dialog.Description>
        <Dialog.Footer className="text-right">
          <Button
            variant="outline-secondary"
            type="button"
            onClick={() => {
              onClose();
            }}
            className="w-32 mr-1"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="button"
            className="w-32"
            onClick={createNewOrder}
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