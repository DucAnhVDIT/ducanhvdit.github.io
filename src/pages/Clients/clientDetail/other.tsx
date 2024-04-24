import React, { useState, useEffect } from "react";
import { CheckboxToggle } from "react-rainbow-components";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Slideover from "../../../base-components/Headless/Slideover";
import Lucide from "../../../base-components/Lucide";
import Button from "../../../base-components/Button";
import customerRepository from "../../../repositories/customerRepository";
import { logError, logSuccess } from "../../../constant/log-error";


interface OtherProps {
  selectedCustomer: any;
}

function Other({ selectedCustomer }: OtherProps) {
  const [editOtherSlide, setEditOtherSlide] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [blockOnline, setBlockOnline] = useState(
    selectedCustomer?.Customer.BlockOnlineBooking
  );
  const [VIP, setVIP] = useState(selectedCustomer?.Customer.IsVIP)

  const handleCloseOtherSlide = () => {
    setEditOtherSlide(false);
  };

  const requestBody = {
    CustomerID:selectedCustomer?.Customer.CustomerID,
    CustomerCardID:selectedCustomer?.Customer.CustomerCardID,
    FirstName: selectedCustomer?.Customer.FirstName,
    LastName: selectedCustomer?.Customer.LastName,
    Email: selectedCustomer?.Customer.Email,
    Mobile: selectedCustomer?.Customer.Mobile,
    SMSConsent: selectedCustomer?.Customer.SMSConsent,
    EmailConsent:selectedCustomer?.Customer.EmailConsent,
    PointAward: selectedCustomer?.Customer.PointAward,
    business_id: selectedCustomer?.Customer.business_id,
    BlockOnlineBooking: blockOnline,
    IsVIP:VIP
  };

  
  const handleSaveChange = () => {
    customerRepository.updateCustomer(requestBody).then(res => {
        logSuccess('Edited client successfully');
        setEditOtherSlide(false)
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      .catch(error => {
        logError('Error adding client: ' + `${error}`);
      });
  };

  useEffect(() => {
    setIsDirty(false);
  }, [editOtherSlide]);

  return (
    <div>
      <div
        className="p-4 flex flex-col border-2 border-black rounded-2xl mt-10 ml-5 "
        style={{ width: "450px" }}
      >
        <div className="flex justify-between">
          <h1 className="text-2xl mb-2 font-bold">Other</h1>
          <IconButton
            size="large"
            onClick={() => {
              setEditOtherSlide(true);
            }}
          >
            <EditIcon className="text-black" />
          </IconButton>
        </div>
        <CheckboxToggle
          label="VIP"
          value={VIP}
          className="mb-2"
          // onChange={(event) => setAllowSMS(event.target.checked)}
        />
        <CheckboxToggle
          label="Block Online"
          value={blockOnline}
          className="mb-2"
          // onChange={(event) => setAllowEmail(event.target.checked)}
        />
        <CheckboxToggle
          label="Allow Marketing Notification"
          // value={allowMarketingNotification}
          className="mb-2"
          // onChange={(event) => setAllowMarketingNotification(event.target.checked)}
        />
      </div>

      {editOtherSlide && (
        <Slideover onClose={handleCloseOtherSlide} open={editOtherSlide}>
          <Slideover.Panel>
            <Slideover.Title className="font-bold text-2xl p-5 flex justify-between">
              <h1>Edit notification settings</h1>
              <Button
                className="border-none shadow-none"
                onClick={handleCloseOtherSlide}
              >
                <Lucide icon="ArrowLeft" />
              </Button>
            </Slideover.Title>
            <Slideover.Description className="text-center">
              <div
                className="p-4 flex flex-col flex-colrounded-2xl mt-5 ml-5"
                style={{ width: "450px" }}
              >
                <CheckboxToggle
                  label="VIP"
                  value={VIP}
                  className="mb-2"
                  onChange={(e) => {
                    setIsDirty(true);
                    setVIP(e.target.checked)
                  }}
                />
                <CheckboxToggle
                  label="Block Online"
                  value={blockOnline}
                  className="mb-2"
                  onChange={(e) => {
                    setIsDirty(true);
                    setBlockOnline(e.target.checked);
                  }}
                />
                <CheckboxToggle
                  label="Allow Marketing Notification"
                  // value={allowMarketingNotification}
                  className="mb-2"
                  // onChange={(event) => setAllowMarketingNotification(event.target.checked)}
                />
              </div>
            </Slideover.Description>
            <Slideover.Footer>
              <Button
                variant="outline-secondary"
                type="button"
                onClick={handleCloseOtherSlide}
                className="w-32 mr-3"
              >
                Cancel
              </Button>
              {isDirty && (
                <Button
                  variant="primary"
                  type="button"
                  className="w-32"
                  onClick={handleSaveChange}
                >
                  Save
                </Button>
              )}
            </Slideover.Footer>
          </Slideover.Panel>
        </Slideover>
      )}
    </div>
  );
}

export default Other;
