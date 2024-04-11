import { FormInput, FormLabel } from "../../base-components/Form";
import Button from "../../base-components/Button";
import { Dialog } from "../../base-components/Headless";
import { useEffect, useState } from "react";
import Lucide from "../../base-components/Lucide";
import "./pos.css";
import CurrencyInput from "react-currency-input-field";

interface IPaymentModal {
  paymentData: any;
  paymentModal: boolean;
  paymentMethod: string;
  handleClose: any;
}

export default function paymentModal({
  paymentData,
  paymentModal,
  paymentMethod,
  handleClose,
}: IPaymentModal) {
  const [priceData, setPriceData] = useState(paymentData);
  const [priceValue, setPriceValue] = useState("");

  const handleChangePrice = (e: any) => {
    const { value } = e.target;
    if (!isNaN(value)) {
      // Check if the value contains a dot
      const dotIndex = value.indexOf(".");
      if (dotIndex !== -1) {
        // If a dot is present, check if there are more than two digits after the dot
        const decimalDigits = value.substring(dotIndex + 1);
        if (decimalDigits.length <= 2) {
          // Update the state with the value
          setPriceData(value);
        }
      } else {
        // If there is no dot, update the state with the value
        setPriceData(value);
      }
    }
  };

  const handleCloseModal = (action: string) => {
    if (action === "close") {
      handleClose("");
    } else {
      handleClose(priceData);
    }
  };

  const handleFocus = (e: any) => {
    // Automatically select the text in the input field when it receives focus
    e.target.select();
  };

  const handleKeyPress = (key: any) => {
    if (key === "backspace") {
      setPriceData(priceData.slice(0, -1));
    } else {
      let updatedPriceData = priceData + key;
      // Perform validation
      const dotIndex = updatedPriceData.indexOf(".");
      if (dotIndex !== -1) {
        // If a dot is present, check if there are more than two digits after the dot
        const decimalDigits = updatedPriceData.substring(dotIndex + 1);
        if (decimalDigits.length <= 2) {
          // Update the state with the value
          setPriceData(updatedPriceData);
        }
      } else {
        // If there is no dot, update the state with the value
        setPriceData(updatedPriceData);
      }
    }
  };

  return (
    <>
      <Dialog open={paymentModal} onClose={() => handleCloseModal("close")}>
        <Dialog.Panel>
          <Dialog.Title>
            <h2 className="mr-auto text-base font-medium">
              Add {paymentMethod} amount
            </h2>
          </Dialog.Title>
          <Dialog.Description className="grid grid-cols-12 gap-4 gap-y-3">
            <div className="col-span-12">
              <div className="flex justify-center pb-4 font-bold text-[40px]">
                {/* <span className="mr-1">£</span> */}
                <CurrencyInput
                  id="input-example"
                  name="input-name"
                  placeholder="Please enter a number"
                  value={priceData}
                  decimalsLimit={2}
                  prefix="£"
                  onValueChange={handleChangePrice}
                  className="border-none rounded-lg text-gray-800 focus:outline-none focus:shadow-none text-3xl"
                  style={{ width: "30%" }}
                />

                {/* <input
                  id="pos-form-4"
                  type="text"
                  className="border-none p-0 outline-none font-bold text-[40px] m-0 w-full"
                  onFocus={handleFocus}
                  placeholder="Item Price"
                  name="Price"
                  value={priceData}
                  onChange={handleChangePrice}
                /> */}
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  className="numpad-button"
                  onClick={() => handleKeyPress("1")}
                >
                  1
                </button>
                <button
                  className="numpad-button"
                  onClick={() => handleKeyPress("2")}
                >
                  2
                </button>
                <button
                  className="numpad-button"
                  onClick={() => handleKeyPress("3")}
                >
                  3
                </button>
                <button
                  className="numpad-button"
                  onClick={() => handleKeyPress("4")}
                >
                  4
                </button>
                <button
                  className="numpad-button"
                  onClick={() => handleKeyPress("5")}
                >
                  5
                </button>
                <button
                  className="numpad-button"
                  onClick={() => handleKeyPress("6")}
                >
                  6
                </button>
                <button
                  className="numpad-button"
                  onClick={() => handleKeyPress("7")}
                >
                  7
                </button>
                <button
                  className="numpad-button"
                  onClick={() => handleKeyPress("8")}
                >
                  8
                </button>
                <button
                  className="numpad-button"
                  onClick={() => handleKeyPress("9")}
                >
                  9
                </button>
                <button
                  className="numpad-button"
                  onClick={() => handleKeyPress(".")}
                >
                  .
                </button>
                <button
                  className="numpad-button"
                  onClick={() => handleKeyPress("0")}
                >
                  0
                </button>
                <button
                  className="numpad-button flex justify-center items-center"
                  onClick={() => handleKeyPress("backspace")}
                >
                  <Lucide icon="Delete" className="w-6 h-6 cursor-pointer" />
                </button>
              </div>
            </div>
          </Dialog.Description>
          <Dialog.Footer className="text-right">
            <Button
              variant="outline-secondary"
              type="button"
              onClick={() => handleCloseModal("close")}
              className="w-24 mr-1"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="button"
              onClick={() => handleCloseModal("save")}
              className="w-24"
            >
              Pay
            </Button>
          </Dialog.Footer>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
