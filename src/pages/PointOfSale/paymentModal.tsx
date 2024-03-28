import {
  FormInput,
  FormLabel,
} from "../../base-components/Form";
import Button from "../../base-components/Button";
import {  Dialog } from "../../base-components/Headless";
import { useState } from "react";
import Lucide from "../../base-components/Lucide";
import "./pos.css"

interface IPaymentModal {
  paymentData: any
  paymentModal: boolean
  paymentMethod: string
  handleClose: any
}

export default function paymentModal ({paymentData, paymentModal, paymentMethod, handleClose} : IPaymentModal) {
  const [priceData, setPriceData] = useState(paymentData)
  const [value, setValue] = useState('10');

  const handleChangePrice = (e: any) => {
    const { name, value } = e.target
    const trimmedValue = value.replace(/^£0*(?=\d)|^£/, '£')
    const validatedValue = parseFloat(trimmedValue.replace(/[^0-9.]/g, ''))
    if (!isNaN(validatedValue)) {
      setPriceData((data: any) => ({ ...data, [name]: validatedValue}))
    }
  }

  const handleCloseModal = (action: string) => {
    if (action === 'close') {
      handleClose('')
    } else {
      handleClose(priceData)
    }
  }

  const handleFocus = (e: any) => {
    // Automatically select the text in the input field when it receives focus
    e.target.select();
  };

  const handleKeyPress = (key: any) => {
    if (key === 'backspace') {
      setPriceData(value.slice(0, -1));
    } else if (key === 'enter') {
      // Handle enter key press
      // For example, pass the value to the parent component
      // onKeyPress(value);
    } else {
      setPriceData(value + key);
    }
  };

  return (
    <>
      <Dialog
        open={paymentModal}
        onClose={() => handleCloseModal('close')}
      >
        <Dialog.Panel>
          <Dialog.Title>
            <h2 className="mr-auto text-base font-medium">
              Add {paymentMethod} amount
            </h2>
          </Dialog.Title>
          <Dialog.Description className="grid grid-cols-12 gap-4 gap-y-3">
            <div className="col-span-12">
              <div className="flex justify-center pb-4 font-bold text-[40px]">
                <span className="mr-1">£</span>
                <input
                  id="pos-form-4"
                  type="text"
                  className="border-none p-0 outline-none"
                  onFocus={handleFocus}
                  placeholder="Item Price"
                  name="Price"
                  value={priceData}
                  onChange={handleChangePrice}
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                  <button className="numpad-button" onClick={() => handleKeyPress('1')}>1</button>
                  <button className="numpad-button" onClick={() => handleKeyPress('2')}>2</button>
                  <button className="numpad-button" onClick={() => handleKeyPress('3')}>3</button>
                  <button className="numpad-button" onClick={() => handleKeyPress('4')}>4</button>
                  <button className="numpad-button" onClick={() => handleKeyPress('5')}>5</button>
                  <button className="numpad-button" onClick={() => handleKeyPress('6')}>6</button>
                  <button className="numpad-button" onClick={() => handleKeyPress('7')}>7</button>
                  <button className="numpad-button" onClick={() => handleKeyPress('8')}>8</button>
                  <button className="numpad-button" onClick={() => handleKeyPress('9')}>9</button>
                  <button className="numpad-button" onClick={() => handleKeyPress('.')}>.</button>
                  <button className="numpad-button" onClick={() => handleKeyPress('0')}>0</button>
                  <button className="numpad-button flex justify-center items-center" onClick={() => handleKeyPress('backspace')}>
                    <Lucide
                      icon="Delete"
                      className="w-6 h-6 cursor-pointer"
                    />
                  </button>
              </div>
            </div>
          </Dialog.Description>
          <Dialog.Footer className="text-right">
            <Button
              variant="outline-secondary"
              type="button"
              onClick={() => handleCloseModal('close')}
              className="w-24 mr-1"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="button"
              onClick={() => handleCloseModal('save')}
              className="w-24"
            >
              Pay
            </Button>
          </Dialog.Footer>
        </Dialog.Panel>
      </Dialog>
    </>
  )
}