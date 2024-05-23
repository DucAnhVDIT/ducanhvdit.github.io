import React, { useEffect, useRef, useState } from "react";
import customerRepository from "../../repositories/customerRepository";
import { Box, CircularProgress, Typography } from "@mui/material";
import "./styles.css";
import Button from "../../base-components/Button";
import { useNavigate } from "react-router-dom";
import FormInput from "../../base-components/Form/FormInput";
import Lucide from "../../base-components/Lucide";
import {
  Flip,
  ToastContainer,
  ToastContentProps,
  Zoom,
  toast,
} from "react-toastify";
import { useDispatch } from "react-redux";
import { setSelectedCustomer } from "../../stores/customerSlide";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function ClientsMainPage() {
  const [customersList, setCustomersList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchValueClient, setSearchValueClient] = useState("");
  const [selectedRows, setSelectedRows] = React.useState<number[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    fetchCustomerData();
    if (searchInputRef.current && !isMobile) {
      searchInputRef.current.focus();
    }
  }, []);

  const handleSelectionChange = (customerId: number) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(customerId)) {
        return prevSelectedRows.filter((id) => id !== customerId);
      } else {
        return [...prevSelectedRows, customerId];
      }
    });
  };

  const fetchCustomerData = async () => {
    setTimeout(async () => {
      try {
        const res = await customerRepository.getCustomer();
        if (res.data.Customers && Array.isArray(res.data.Customers)) {
          setCustomersList(res.data.Customers);
        } else {
          console.error("No customer data found in response:", res.data);
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  const getSingleCustomer = async (customerId: any) => {
    try {
      const res = await customerRepository.getSingleCustomer(customerId);
      return res;
    } catch (error) {
      throw error;
    }
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) {
      return ""; // Handle null or undefined case
    }

    const names = name.split(" ");
    return names.map((name: string) => name[0]).join("");
  };

  const navigate = useNavigate();

  const handleAddBtn = () => {
    navigate("/clients/add");
  };

  const handleEditBtn = async () => {
    if (selectedRows.length === 1) {
      const customerId = selectedRows[0];
      setLoading(true);
      try {
        const res = await getSingleCustomer(customerId);
        dispatch(setSelectedCustomer(res.data));
        navigate(`/clients/${customerId}/edit`);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const filteredRows = customersList
    ? customersList.filter(
        (customer) =>
          (customer.FirstName || "")
            .toLowerCase()
            .includes(searchValueClient.toLowerCase()) ||
          (customer.LastName || "")
            .toLowerCase()
            .includes(searchValueClient.toLowerCase()) ||
          (customer.Email || "")
            .toLowerCase()
            .includes(searchValueClient.toLowerCase()) ||
          (customer.Mobile || "")
            .toLowerCase()
            .includes(searchValueClient.toLowerCase()) ||
          (customer.CustomerCardID || "")
            .toLowerCase()
            .includes(searchValueClient.toLowerCase())
      )
    : [];

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
        className="opacity-0 translate-x-[50px] animate-[0.4s_ease-in-out_0.1s_intro-menu] animate-fill-mode-forwards animate-delay"
      >
        <div className="flex flex-wrap justify-end gap-2 mt-2">
          <Button
            className="sm:w-32 w-24 px-4 py-2 bg-primary text-white rounded-md"
            onClick={handleAddBtn}
          >
            Add
          </Button>
          {selectedRows.length === 1 && (
            <Button
              className="sm:w-32 w-24 px-4 py-2 bg-primary text-white rounded-md"
              onClick={handleEditBtn}
            >
              Edit
            </Button>
          )}
          {selectedRows.length > 0 && (
            <Button
              className="sm:w-32 w-24 px-4 py-2 bg-red-500 text-white rounded-md"
              onClick={() => {}}
            >
              Delete
            </Button>
          )}
        </div>
        <div className="relative text-slate-500 mt-4 w-full max-w-md">
          <FormInput
            type="text"
            className="w-full h-12 bg-gray-200 rounded-md pl-4 pr-10 focus:ring-primary focus:border-primary"
            placeholder="Search client"
            value={searchValueClient}
            onChange={(e) => setSearchValueClient(e.target.value)}
            ref={searchInputRef}
          />
          {searchValueClient ? (
            <Lucide
              icon="XCircle"
              className="absolute inset-y-0 right-0 w-6 h-6 my-auto mr-3 cursor-pointer"
              onClick={() => setSearchValueClient("")}
            />
          ) : (
            <Lucide
              icon="Search"
              className="absolute inset-y-0 right-0 w-6 h-6 my-auto mr-3"
            />
          )}
        </div>
      </div>

      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={400}
        >
          <span className="loading loading-ring loading-lg"></span>
        </Box>
      ) : (
        <div className="overflow-x-auto max-h-[700px] overflow-y-auto">
          <table className="table w-full mt-3">
            <thead className="text-black">
              <tr>
                <th>Avatar</th>
                <th className="hidden sm:table-cell">Customer ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Point Award</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((customer) => (
                <tr
                  key={customer.CustomerID}
                  className={
                    selectedRows.includes(customer.CustomerID)
                      ? "bg-blue-100"
                      : ""
                  }
                  onClick={() => handleSelectionChange(customer.CustomerID)}
                >
                  <td>
                    {customer.picture ? (
                      <img
                        src={customer.picture}
                        alt="Avatar"
                        className="w-14 h-14 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full p-2 bg-primary text-white flex items-center justify-center">
                        <span className="text-lg">
                          {getInitials(customer.FirstName)}
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="hidden sm:table-cell">
                    {customer.CustomerCardID}
                  </td>
                  <td>{customer.FirstName}</td>
                  <td>{customer.LastName}</td>
                  <td>{customer.Mobile}</td>
                  <td>{customer.Email}</td>
                  <td>{customer.PointAward}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default ClientsMainPage;
