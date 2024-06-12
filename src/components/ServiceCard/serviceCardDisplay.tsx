import React, { useState } from "react";
import Button from "../../base-components/Button";
import Lucide from "../../base-components/Lucide";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import {
  addService,
  deleteService,
  resetSelectedServices,
} from "../../stores/serviceListSlice";
import { RootState } from "../../stores/store";

interface ServiceCardDisplayProps {
  service: any;
  deleteService: (selectedService: any) => void
}

const ServiceCardDisplay = ({ service, deleteService }: ServiceCardDisplayProps) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    deleteService(service)
  }


  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div>
      <div
        className="mt-3 p-0 border-none bg-transparent w-full shadow-none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="col-span-12 sm:col-span-6 xl:col-span-3 rounded-lg w-full">
          <div
            className={`col-span-12 p-1 cursor-pointer sm:col-span-4 2xl:col-span-3 box border-2 border-gray-400 ${
              hovered ? "hovered" : ""
            }`}
            style={{ borderRight: "7px solid #1E40AF" }}
          >
            <div className="p-1 flex justify-between items-start">
              <div className="flex flex-start">
                <div className="p-1 flex flex-col">
                  <h1 className="text-lg leading-tight text-left w-60">{`${
                    service.ProductName || service.ServiceName
                  }`}</h1>
                  <h1 className="text-md item text-left text-silver">{`${
                    service.Duration || "Loading..."
                  } mins`}</h1>
                  <h1 className="text-md item text-left text-silver">{`${
                    service.Description || ""
                  } `}</h1>
                </div>
              </div>
              <div className="p-2">
                {hovered ? (
                  <>
                    <IconButton size="small" onClick={() => {}}>
                      <EditIcon
                        style={{ fontSize: 20 }}
                        className="text-blue-500"
                      />
                    </IconButton>
                    <IconButton size="small" onClick={handleDelete}>
                      <DeleteIcon
                        style={{ fontSize: 20 }}
                        className="text-red-500"
                      />
                    </IconButton>
                  </>
                ) : (
                  <h1 className="text-lg">{`£${
                    service.Price !== undefined ? service.Price : "Loading..."
                  }`}</h1>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCardDisplay;
