import React, { useState, useEffect } from "react";
import { CheckboxToggle } from "react-rainbow-components";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Slideover from "../../../base-components/Headless/Slideover";
import Lucide from "../../../base-components/Lucide";
import Button from "../../../base-components/Button";
import customerRepository from "../../../repositories/customerRepository";
import { logError, logSuccess } from "../../../constant/log-error";
import { useNavigate } from "react-router-dom";

interface NotiConsentProps {
  selectedCustomer: any;
}

function NotiConsent({ selectedCustomer }: NotiConsentProps) {
  const navigate = useNavigate();
  const [editNotiSlide, setEditNotiSlide] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  
  const [allowSMS, setAllowSMS] = useState(
    selectedCustomer?.Customer.SMSConsent
  );
  const [allowEmail, setAllowEmail] = useState(
    selectedCustomer?.Customer.EmailConsent
  );

  const requestBody = {
    CustomerID:selectedCustomer?.Customer.CustomerID,
    CustomerCardID:selectedCustomer?.Customer.CustomerCardID,
    FirstName: selectedCustomer?.Customer.FirstName,
    LastName: selectedCustomer?.Customer.LastName,
    Email: selectedCustomer?.Customer.Email,
    Mobile: selectedCustomer?.Customer.Mobile,
    SMSConsent: allowSMS,
    EmailConsent:allowEmail,
    PointAward: selectedCustomer?.Customer.PointAward,
    business_id: selectedCustomer?.Customer.business_id
  };

  
  const handleSaveChange = () => {
    customerRepository.updateCustomer(requestBody).then(res => {
        logSuccess('Edited client successfully');
        setEditNotiSlide(false)
      })
      .catch(error => {
        logError('Error adding client: ' + `${error}`);
      });
  };

  const handleCloseEditSlide = () => {
    setEditNotiSlide(false);
    // Reset state variables
    setAllowSMS(selectedCustomer?.Customer.SMSConsent);
    setAllowEmail(selectedCustomer?.Customer.EmailConsent);
  };

  useEffect(() => {
    setIsDirty(false);
  }, [editNotiSlide]);

  return (
    <div>
      <div
        className="p-4 flex flex-col border-2 border-black rounded-2xl mt-5 ml-5"
        style={{ width: "450px" }}
      >
        <div className="flex justify-between">
          <h1 className="text-2xl mb-2 font-bold">Consent Info</h1>
          <IconButton
            size="large"
            onClick={() => {
              setEditNotiSlide(true);
            }}
          >
            <EditIcon className="text-black" />
          </IconButton>
        </div>
        <CheckboxToggle
          label="Allow SMS"
          value={selectedCustomer?.Customer.SMSConsent}
          className="mb-2"
          // onChange={(event) => setAllowSMS(event.target.checked)}
        />
        <CheckboxToggle
          label="Allow Email"
          value={selectedCustomer?.Customer.EmailConsent}
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
      {editNotiSlide && (
        <Slideover onClose={handleCloseEditSlide} open={editNotiSlide}>
          <Slideover.Panel>
            <Slideover.Title className="font-bold text-2xl p-5 flex justify-between">
              <h1>Edit notification settings</h1>
              <Button
                className="border-none shadow-none"
                onClick={handleCloseEditSlide}
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
                  label="Allow SMS"
                  value={allowSMS}
                  className="mb-2"
                  onChange={(e) => {
                    setIsDirty(true);
                    setAllowSMS(e.target.checked);
                  }}
                />
                <CheckboxToggle
                  label="Allow Email"
                  value={allowEmail}
                  className="mb-2"
                  onChange={(e) => {
                    setIsDirty(true);
                    setAllowEmail(e.target.checked);
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
                onClick={handleCloseEditSlide}
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

export default NotiConsent;
