import React, { useEffect, useState } from "react";
import Lucide from "../../../base-components/Lucide";
import { Link } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Checkbox from "@mui/material/Checkbox";
// import { ClassicEditor } from "../../../base-components/Ckeditor";
// import Ckeditor from "../../../base-components/Ckeditor/ClassicEditor";
import "./styles.css";
import Button from "../../../base-components/Button";
import Ckeditor from "../../../base-components/Ckeditor/ClassicEditor";
import ClassicEditor from "../../../base-components/Ckeditor/ClassicEditor";

function ReviewSettings() {
  useEffect(() => {
    document.body.style.backgroundColor = "white";
    return () => {
      document.body.style.backgroundColor = ""; // Reset background color when component unmounts
    };
  }, []);

  const [emailContent, setEmailContent] = useState(`
  <p>Dear {First Name},</p>

  <p>Thank you for your recent service. We really appreciate your business, support, and feedback, and truly value you as a customer.</p>

  <p>Our goal is to provide the very best service and we are always looking for ways to improve. We are looking to gain feedback on our service so that we can enhance your experience and make our customers happy.</p>

  <p>We would love to hear your feedback, and I would be incredibly grateful if you could take a couple of minutes to write a quick Google review for us. This will allow us to improve our service and let others recognize the value we provide.</p>

  <p>To submit your review, simply click the link below and let us know what you think.</p>

  <p>Thank you so much for taking the time to leave a review. Your feedback is highly appreciated and important to us and I look forward to reading your comments.</p>

  <p>Many thanks,</p>

  `);

  const [textContent, setTextContent] =
    useState(`<p>Thank you for your recent service. We really appreciate your business, support and feedback, and truly value you as a customer.
  Please review us on:
  </p>`);

  return (
    <div>
      <div
        className="mt-3 bg-white opacity-0 translate-x-[50px] animate-[0.4s_ease-in-out_0.1s_intro-menu] animate-fill-mode-forwards animate-delay rounded-lg"
        style={{ height: "" }}
      >
        <div className="flex flex-col justify-between p-4">
          {/* Header */}
          <div className="flex items-center justify-between top-0 w-full p-4 bg-white">
            <Link to="/marketing" className="text-lg font-bold">
              <Lucide icon={"X"}></Lucide>
            </Link>
            <h1 className="text-md font-bold ml-10 sm:text-xl ">
              Review Settings
            </h1>
            <Button
              onClick={() => {}}
              className="sm:w-32 w-[90px] px-6 bg-primary text text-white mr-3 mt-2"
            >
              Save
            </Button>
          </div>
          {/* Header */}

          {/* Selection Group */}
          <div className="flex flex-col sm:flex-row justify-center w-full border rounded-md border-slate-300/60 mb-5">
            <div className="m-5">
              <FormControl size="small" className="sm:text-sm">
                <FormLabel className="sm:text-sm">Select Payment</FormLabel>
                <RadioGroup name="controlled-radio-buttons-group">
                  <FormControlLabel
                    value="Card Payment Only"
                    control={<Radio />}
                    label="Card Payment Only"
                  />
                  <FormControlLabel
                    value="All Payment"
                    control={<Radio />}
                    label="All Payment"
                  />
                </RadioGroup>
              </FormControl>
            </div>

            <div className="m-5">
              <FormControl size="small" className="sm:text-sm">
                <FormLabel className="sm:text-sm">Methods</FormLabel>
                <RadioGroup name="controlled-radio-buttons-group">
                  <div className="flex flex-col sm:flex-row">
                    <FormControlLabel
                      value="Auto"
                      control={<Radio />}
                      label="Auto"
                    />
                    <FormControlLabel
                      value="Asking Send"
                      control={<Radio />}
                      label="Asking Send"
                    />
                  </div>
                  <FormControlLabel
                    value="Do Not Send"
                    control={<Radio />}
                    label="Do Not Send"
                  />
                </RadioGroup>
              </FormControl>
            </div>

            <div className="mt-7 ml-5">
              <FormControl size="small" className="sm:text-sm">
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Send Email"
                />
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Send EMS"
                />
              </FormControl>
            </div>
          </div>
          {/* Selection Group */}

          {/* CK editor Text */}
          <div className="p-5 border rounded-md border-slate-300/60 dark:border-darkmode-400 ">
            <div className="flex items-center pb-5 font-medium border-b border-slate-300/60 dark:border-darkmode-400">
              <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Email
            </div>
            <div className="mt-5">
              <ClassicEditor value={emailContent} />
            </div>
          </div>
          <div className="p-5 border rounded-md border-slate-300/60 dark:border-darkmode-400 mt-5">
            <div className="flex items-center pb-5 font-medium border-b border-slate-300/60 dark:border-darkmode-400">
              <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Text
            </div>
            <div className="mt-5">
              <ClassicEditor value={textContent} />
            </div>
          </div>
          {/* <Ckeditor
            
          />
          <Ckeditor /> */}

          {/* <RichEditor /> */}

          {/* CK editor Text */}
        </div>
      </div>
    </div>
  );
}

export default ReviewSettings;
