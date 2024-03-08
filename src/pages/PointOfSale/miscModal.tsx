import {
  FormInput,
  FormLabel,
} from "../../base-components/Form";
import Button from "../../base-components/Button";
import {  Dialog } from "../../base-components/Headless";
import { useState, useEffect } from "react";

interface IMiscModal {
  miscData: any
  priceModal: boolean
  handleClose: any
}

export default function miscModal ({miscData, priceModal, handleClose} : IMiscModal) {
  const [modalPriceData, setModalPriceData] = useState(miscData)

  const handleChangePrice = (e: any) => {
    const { name, value } = e.target
    const trimmedValue = value.replace(/^£0*(?=\d)|^£/, '£')
    const validatedValue = trimmedValue.replace(/[^0-9.]/g, '');
    if (!isNaN(validatedValue)) {
    setModalPriceData((data: any) => ({ ...data, [name]: validatedValue}))
    }
  }

  const handleCloseModal = (action: string) => {
    if (action === 'close') {
      handleClose('')
    } else {
      handleClose(modalPriceData)
    }
  }

  return (
    <>
      <Dialog
        open={priceModal}
        onClose={() => handleCloseModal('close')}
      >
        <Dialog.Panel>
          <Dialog.Title>
            <h2 className="mr-auto text-base font-medium">
              {modalPriceData.ProductName}
            </h2>
          </Dialog.Title>
          <Dialog.Description className="grid grid-cols-12 gap-4 gap-y-3">
            <div className="col-span-12">
              <FormLabel htmlFor="pos-form-4" className="form-label">
                Price
              </FormLabel>
              <div className="flex flex-1">
                <FormInput
                  id="pos-form-4"
                  type="text"
                  className="w-24 text-center"
                  placeholder="Item Price"
                  name='Price'
                  value={`£${modalPriceData.Price}`}
                  onChange={handleChangePrice}
                />
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
              Add Item
            </Button>
          </Dialog.Footer>
        </Dialog.Panel>
      </Dialog>
    </>
  )
}