import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Lucide from "../../base-components/Lucide";
import Button from "../../base-components/Button";
import {
  FormInput,
  FormLabel,
  FormSelect,
  FormTextarea,
} from "../../base-components/Form";
import Toastify from "toastify-js";
import { CheckboxToggle } from "react-rainbow-components";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/dark.css";
import Dropzone, { DropzoneElement } from "../../base-components/Dropzone";
import { logError, logSuccess } from "../../constant/log-error";
import customerRepository from "../../repositories/customerRepository";
import {
  Flip,
  ToastContainer,
  ToastContentProps,
  Zoom,
  toast,
} from "react-toastify";

const AddClient = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "white";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [note, setNote] = useState("");
  const [allowSMS, setAllowSMS] = useState(false);
  const [allowEmail, setAllowEmail] = useState(false);
  const [allowMarketingNotification, setAllowMarketingNotification] =
    useState(false);

  const handleDOBChange = (selectedDates: any[]) => {
    const selectedDate = selectedDates[0];
    setDateOfBirth(selectedDate);
  };

  const navigate = useNavigate();

  const addNewClient = () => {
    if (!mobileNumber) {
      logError("Phone number is required");
      return;
    }

    const requestBody = {
      FirstName: firstName,
      LastName: lastName,
      Mobile: mobileNumber,
      Email: email,
      DateOfBirth: dateOfBirth,
      EmailConsent: allowEmail,
      SMSConsent: allowSMS,
      Gender:
        gender === "male"
          ? 1
          : gender === "female"
          ? 2
          : gender === "other"
          ? 3
          : gender === "none"
          ? 0
          : "",
    };

    customerRepository
      .addCustomer(requestBody)
      .then((response) => {
        logSuccess("Client added successfully");
        setFirstName("");
        setLastName("");
        setEmail("");
        setMobileNumber("");
        setTimeout(() => {
          navigate("/clients");
        }, 2000);
      })
      .catch((error) => {
        logError("Error adding client: " + `${error}`);
      });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <div className="w-full p-4  rounded-lg">
        <div className="flex items-center justify-between">
          <Link to="/clients" className="text-lg font-bold">
            <Lucide icon={"X"} />
          </Link>
          <h1 className="text-xl font-bold ml-20">Add Client</h1>
          <button
            onClick={addNewClient}
            className="hidden sm:block py-2 btn sm:w-32 w-[90px] bg-primary text-white"
          >
            Add
          </button>
        </div>
        <div className="md:flex mt-5 md:border md:rounded-md md:border-slate-500/60">
          <div className="md:w-1/2 p-4">
            <h2 className="text-2xl font-bold mb-4">Basic Information</h2>
            <div className="mb-4">
              <FormLabel htmlFor="firstName">First Name</FormLabel>
              <FormInput
                id="firstName"
                type="text"
                placeholder="Enter First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <FormLabel htmlFor="lastName">Last Name</FormLabel>
              <FormInput
                id="lastName"
                type="text"
                placeholder="Enter Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormInput
                id="email"
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <FormLabel htmlFor="mobileNumber">Phone Number</FormLabel>
              <FormInput
                id="mobileNumber"
                type="text"
                placeholder="Enter Phone Number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <FormLabel htmlFor="gender">Gender</FormLabel>
              <FormSelect
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full"
              >
                <option value="none">None</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </FormSelect>
            </div>
            <div className="mb-4">
              <FormLabel htmlFor="dateOfBirth">Birth Date</FormLabel>
              <Flatpickr
                id="dateOfBirth"
                className="w-full rounded"
                options={{
                  altInput: true,
                  altFormat: "F j, Y",
                  dateFormat: "Y-m-d",
                }}
                placeholder="Choose Birth Date"
                onChange={handleDOBChange}
              />
            </div>
            <div className="mb-4">
              <FormLabel htmlFor="note">Notes</FormLabel>
              <FormTextarea
                id="note"
                placeholder="Type your notes here..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
          <div className="md:w-1/2 p-4">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">Consent Info</h2>
              <div className="flex items-center mb-2">
                <label className="label cursor-pointer">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={allowSMS}
                    onChange={(e) => setAllowSMS(e.target.checked)}
                  />
                  <span className="label-text ml-4 text-black">Allow SMS</span>
                </label>
              </div>
              <div className="flex items-center mb-2">
                <label className="label cursor-pointer">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={allowEmail}
                    onChange={(e) => setAllowEmail(e.target.checked)}
                  />
                  <span className="label-text ml-4 text-black">
                    Allow Email
                  </span>
                </label>
              </div>
              <div className="flex items-center mb-2">
                <label className="label cursor-pointer">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={allowMarketingNotification}
                    onChange={(e) =>
                      setAllowMarketingNotification(e.target.checked)
                    }
                  />
                  <span className="label-text ml-4 text-black">
                    Allow Marketing Notification
                  </span>
                </label>
              </div>
            </div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">Consent Form</h2>
              <Dropzone
                options={{
                  url: "https://httpbin.org/post",
                  thumbnailWidth: 150,
                  maxFilesize: 0.5,
                  maxFiles: 1,
                  headers: { "My-Awesome-Header": "header value" },
                }}
                className="dropzone"
              >
                <div className="text-lg font-medium">
                  Drop files here or click to upload.
                </div>
              </Dropzone>
            </div>
          </div>
        </div>
        <div className="block sm:hidden fixed bottom-0 left-0 w-full bg-white p-4  flex-col space-y-2">
          
          <button
            className="btn btn-primary w-full"
            onClick={addNewClient}
          >
            Add
          </button>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme="colored"
          pauseOnHover
          transition={Flip}
        />
      </div>
    </div>
  );
};

export default AddClient;
