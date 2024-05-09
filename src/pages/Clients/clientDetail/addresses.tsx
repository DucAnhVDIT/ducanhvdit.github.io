import React, { useState } from "react";
import FormLabel from "../../../base-components/Form/FormLabel";
import FormInput from "../../../base-components/Form/FormInput";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import SlideOverPanel from "../../../components/SlideOver";
import Slideover from "../../../base-components/Headless/Slideover";
import Button from "../../../base-components/Button";
import Lucide from "../../../base-components/Lucide";

function Addresses() {
  const [editAddressSlide, setEditAddressSlide] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  return (
    <div>
      <div
        className="border-2 border-black  p-5 pr-10 m-5 rounded-2xl bo"
        style={{ height: "400px", width: "450px" }}
      >
        <div className="flex justify-between">
          <h1 className="text-2xl mb-2 font-bold">Addresses</h1>
          <IconButton
            size="large"
            onClick={() => {
              setEditAddressSlide(true);
            }}
          >
            <EditIcon className="text-black" />
          </IconButton>
        </div>
        <form className="validate-form">
          <div className="input-form flex flex-row w-full">
            <div className="flex flex-col justify-between w-full mr-4">
              <FormLabel
                htmlFor="validation-form-1"
                className="flex flex-col w-full sm:flex-row"
              >
                Address
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
            <div className="flex flex-col w-full">
              <FormLabel
                htmlFor="validation-form-1"
                className="flex flex-col w-full sm:flex-row"
              >
                Apt./Suite
              </FormLabel>
              <FormInput
                id="validation-form-1"
                type="text"
                name="name"
                placeholder=""
                className="w-full"
                readOnly
                // value={lastName}
                // onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="input-form flex flex-col w-full mt-3">
            <div className="flex flex-row">
              <div className="flex flex-col justify-between w-full mr-4">
                <FormLabel
                  htmlFor="validation-form-1"
                  className="flex flex-col w-full sm:flex-row"
                >
                  District
                </FormLabel>
                <FormInput
                  id="validation-form-1"
                  type="email"
                  name="name"
                  placeholder=""
                  className="w-full"
                  readOnly
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full">
                <FormLabel
                  htmlFor="validation-form-1"
                  className="flex flex-col w-full sm:flex-row"
                >
                  City
                </FormLabel>
                <FormInput
                  id="validation-form-1"
                  type="text"
                  name="name"
                  placeholder=""
                  className="w-full"
                  readOnly
                  // value={mobileNumber}
                  // onChange={(e) => setMobileNumber(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-row mt-3">
              <div className="flex flex-col w-full">
                <FormLabel
                  htmlFor="validation-form-1"
                  className="flex flex-col w-full sm:flex-row"
                >
                  County
                </FormLabel>
                <FormInput
                  id="validation-form-1"
                  type="text"
                  name="name"
                  placeholder=""
                  className="w-full"
                  readOnly
                  // value={mobileNumber}
                  // onChange={(e) => setMobileNumber(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full ml-3">
                <FormLabel
                  htmlFor="validation-form-1"
                  className="flex flex-col w-full sm:flex-row"
                >
                  State
                </FormLabel>
                <FormInput
                  id="validation-form-1"
                  type="text"
                  name="name"
                  placeholder=""
                  className="w-full"
                  readOnly
                  // value={mobileNumber}
                  // onChange={(e) => setMobileNumber(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-row mt-3">
              <div className="flex flex-col w-full">
                <FormLabel
                  htmlFor="validation-form-1"
                  className="flex flex-col w-full sm:flex-row"
                >
                  Postcode
                </FormLabel>
                <FormInput
                  id="validation-form-1"
                  type="text"
                  name="name"
                  placeholder=""
                  className="w-full"
                  readOnly
                  // value={mobileNumber}
                  // onChange={(e) => setMobileNumber(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full ml-3">
                <FormLabel
                  htmlFor="validation-form-1"
                  className="flex flex-col w-full sm:flex-row"
                >
                  Country
                </FormLabel>
                <FormInput
                  id="validation-form-1"
                  type="text"
                  name="name"
                  placeholder=""
                  className="w-full"
                  readOnly
                  // value={mobileNumber}
                  // onChange={(e) => setMobileNumber(e.target.value)}
                />
              </div>
            </div>
          </div>
        </form>
        {/* End Addresses */}

        {editAddressSlide && (
          <Slideover
            onClose={() => {
              setEditAddressSlide(false);
            }}
            open={editAddressSlide}
          >
            <Slideover.Panel>
              <Slideover.Title className="font-bold text-2xl p-5 flex justify-between">
                <h1>Edit addresses</h1>
                <Button
                  className="border-none shadow-none"
                  onClick={() => {
                    setEditAddressSlide(false);
                  }}
                >
                  <Lucide icon="ArrowLeft" />
                </Button>
              </Slideover.Title>
              <Slideover.Description className="text-center">
                <form className="validate-form">
                  <div className="input-form flex flex-row w-full">
                    <div className="flex flex-col justify-between w-full mr-4">
                      <FormLabel
                        htmlFor="validation-form-1"
                        className="flex flex-col w-full sm:flex-row"
                      >
                        Address
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
                    <div className="flex flex-col w-full">
                      <FormLabel
                        htmlFor="validation-form-1"
                        className="flex flex-col w-full sm:flex-row"
                      >
                        Apt./Suite
                      </FormLabel>
                      <FormInput
                        id="validation-form-1"
                        type="text"
                        name="name"
                        placeholder=""
                        className="w-full"

                        // value={lastName}
                        // onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="input-form flex flex-col w-full mt-3">
                    <div className="flex flex-row">
                      <div className="flex flex-col justify-between w-full mr-4">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          District
                        </FormLabel>
                        <FormInput
                          id="validation-form-1"
                          type="email"
                          name="name"
                          placeholder=""
                          className="w-full"

                          // value={email}
                          // onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col w-full">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          City
                        </FormLabel>
                        <FormInput
                          id="validation-form-1"
                          type="text"
                          name="name"
                          placeholder=""
                          className="w-full"

                          // value={mobileNumber}
                          // onChange={(e) => setMobileNumber(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-row mt-3">
                      <div className="flex flex-col w-full">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          County
                        </FormLabel>
                        <FormInput
                          id="validation-form-1"
                          type="text"
                          name="name"
                          placeholder=""
                          className="w-full"

                          // value={mobileNumber}
                          // onChange={(e) => setMobileNumber(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col w-full ml-3">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          State
                        </FormLabel>
                        <FormInput
                          id="validation-form-1"
                          type="text"
                          name="name"
                          placeholder=""
                          className="w-full"

                          // value={mobileNumber}
                          // onChange={(e) => setMobileNumber(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-row mt-3">
                      <div className="flex flex-col w-full">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Postcode
                        </FormLabel>
                        <FormInput
                          id="validation-form-1"
                          type="text"
                          name="name"
                          placeholder=""
                          className="w-full"

                          // value={mobileNumber}
                          // onChange={(e) => setMobileNumber(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col w-full ml-3">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Country
                        </FormLabel>
                        <FormInput
                          id="validation-form-1"
                          type="text"
                          name="name"
                          placeholder=""
                          className="w-full"

                          // value={mobileNumber}
                          // onChange={(e) => setMobileNumber(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </Slideover.Description>
              <Slideover.Footer>
              <Button
                variant="outline-secondary"
                type="button"
                onClick={() => {
                    setEditAddressSlide(false);
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
    </div>
  );
}

export default Addresses;
