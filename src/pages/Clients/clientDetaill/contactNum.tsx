import React, { useState } from "react";
import FormLabel from "../../../base-components/Form/FormLabel";
import FormInput from "../../../base-components/Form/FormInput";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Slideover from "../../../base-components/Headless/Slideover";
import Button from "../../../base-components/Button";
import Lucide from "../../../base-components/Lucide";

interface ContactProps {
  selectedCustomer: any;
}

function ContactNum({ selectedCustomer }: ContactProps) {
  const [editContactSlide, setEditContactSlide] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  return (
    <div className="md:flex h-full items-start justify-center">
      <div
        className="border-2 border-black p-5 pr-10 m-5 rounded-2xl"
        style={{ height: "400px", width: "450px" }}
      >
        <div className="flex justify-between">
          <h1 className="text-2xl mb-2 font-bold">Contact</h1>
          <IconButton
            size="large"
            onClick={() => {
              setEditContactSlide(true);
            }}
          >
            <EditIcon className="text-black" />
          </IconButton>
        </div>
        <form className="validate-form">
          <div className="input-form w-full">
            <div className="flex flex-col justify-between w-full mr-4">
              <FormLabel
                htmlFor="validation-form-1"
                className="flex flex-col w-full sm:flex-row"
              >
                Home Phone
              </FormLabel>
              <FormInput
                id="validation-form-1"
                type="text"
                name="name"
                placeholder=""
                className="w-full"
                readOnly
                // value={firstName}
                // onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full mt-2">
              <FormLabel
                htmlFor="validation-form-1"
                className="flex flex-col w-full sm:flex-row"
              >
                Work Phone
              </FormLabel>
              <FormInput
                id="validation-form-1"
                type="text"
                name="name"
                placeholder=""
                className="w-full"
                readOnly
                // value={lastName}
                onChange={() => {}}
              />
            </div>
          </div>
          <div className="input-form w-full mt-3">
            <div className="flex flex-col justify-between w-full mr-4">
              <FormLabel
                htmlFor="validation-form-1"
                className="flex flex-col w-full sm:flex-row"
              >
                Emergency Contact Number
              </FormLabel>
              <FormInput
                id="validation-form-1"
                type="email"
                name="name"
                placeholder=""
                className="w-full"
                // value={email}
                onChange={() => {}}
                readOnly
              />
            </div>
            <div className="flex flex-col w-full mt-2">
              <FormLabel
                htmlFor="validation-form-1"
                className="flex flex-col w-full sm:flex-row"
              >
                Phone Number
              </FormLabel>
              <FormInput
                id="validation-form-1"
                type="text"
                name="name"
                placeholder=""
                className="w-full"
                defaultValue={selectedCustomer.Customer.Mobile}
                onChange={() => {}}
                readOnly
              />
            </div>
          </div>
        </form>
      </div>

      {editContactSlide && (
        <Slideover
          onClose={() => {
            setEditContactSlide(false);
          }}
          open={editContactSlide}
        >
          <Slideover.Panel>
            <Slideover.Title className="font-bold text-2xl p-5 flex justify-between">
              <h1>Edit contact</h1>
              <Button
                className="border-none shadow-none"
                onClick={() => {
                  setEditContactSlide(false);
                }}
              >
                <Lucide icon="ArrowLeft" />
              </Button>
            </Slideover.Title>
            <Slideover.Description className="text-center">
              <form className="validate-form">
                <div className="input-form w-full">
                  <div className="flex flex-col justify-between w-full mr-4">
                    <FormLabel
                      htmlFor="validation-form-1"
                      className="flex flex-col w-full sm:flex-row"
                    >
                      Home Phone
                    </FormLabel>
                    <FormInput
                      id="validation-form-1"
                      type="text"
                      name="name"
                      placeholder=""
                      className="w-full"
                      
                      // value={firstName}
                      // onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col w-full mt-2">
                    <FormLabel
                      htmlFor="validation-form-1"
                      className="flex flex-col w-full sm:flex-row"
                    >
                      Work Phone
                    </FormLabel>
                    <FormInput
                      id="validation-form-1"
                      type="text"
                      name="name"
                      placeholder=""
                      className="w-full"
                      
                      // value={lastName}
                      onChange={() => {}}
                    />
                  </div>
                </div>
                <div className="input-form w-full mt-3">
                  <div className="flex flex-col justify-between w-full mr-4">
                    <FormLabel
                      htmlFor="validation-form-1"
                      className="flex flex-col w-full sm:flex-row"
                    >
                      Emergency Contact Number
                    </FormLabel>
                    <FormInput
                      id="validation-form-1"
                      type="email"
                      name="name"
                      placeholder=""
                      className="w-full"
                      // value={email}
                      onChange={() => {}}
                      
                    />
                  </div>
                  <div className="flex flex-col w-ful mt-2">
                    <FormLabel
                      htmlFor="validation-form-1"
                      className="flex flex-col w-full sm:flex-row"
                    >
                      Phone Number
                    </FormLabel>
                    <FormInput
                      id="validation-form-1"
                      type="text"
                      name="name"
                      placeholder=""
                      className="w-full"
                      defaultValue={selectedCustomer.Customer.Mobile}
                      onChange={() => {}}
                      
                    />
                  </div>
                </div>
              </form>
            </Slideover.Description>
            <Slideover.Footer>
              <Button
                variant="outline-secondary"
                type="button"
                onClick={() => {
                  setEditContactSlide(false);
                }}
                className="w-32 mr-3"
              >
                Cancel
              </Button>
              {isDirty && (
                <Button
                  variant="primary"
                  type="button"
                  className="w-32"
                  onClick={() => {}}
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

export default ContactNum;
