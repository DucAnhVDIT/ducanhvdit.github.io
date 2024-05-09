import React, { useEffect } from "react";
import Lucide from "../../../base-components/Lucide";
import { Link } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Checkbox from "@mui/material/Checkbox";
import { ClassicEditor } from "../../../base-components/Ckeditor";
import Ckeditor from "../../../base-components/Ckeditor/ClassicEditor";
import "./styles.css";
import Button from "../../../base-components/Button";
import config from "tailwind-config";

function ReviewSettings() {
  useEffect(() => {
    document.body.style.backgroundColor = "white";
    return () => {
      document.body.style.backgroundColor = ""; // Reset background color when component unmounts
    };
  }, []);

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
          <div className="flex flex-col sm:flex-row justify-center w-full">
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
                  <div className="flex">
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

          {/* <div className="flex flex-col justify-center items-center mx-auto max-w-screen-lg">
            <div className="">
              <h1 className="text-left mb-4 text-xl font-bold">Email</h1>
              <Ckeditor className="" />
            </div>
            <div className="mt-4">
              <h1 className="text-left mb-4 text-xl font-bold">Text</h1>
              <Ckeditor className="" />
            </div>
          </div> */}

          {/* <Ckeditor
            
          />
          <Ckeditor /> */}

          {/* CK editor Text */}
        </div>
      </div>
    </div>
  );
}

export default ReviewSettings;
