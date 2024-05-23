import React, { useEffect, useState } from "react";
import { FormInput, FormLabel } from "../../../../base-components/Form";
import managerRepository from "../../../../repositories/managerRepository";

import { toast, ToastContainer } from "react-toastify";
import { BusinessInfo } from "../../../../types/businessInfo";
import { logError, logSuccess } from "../../../../constant/log-error";

const formFields = [
  {
    id: "company-name",
    label: "Company name",
    placeholder: "VDIT Solutions",
    readOnly: true,
    key: "CompanyName",
  },
  { id: "address-1", label: "Address 1", placeholder: "", key: "Address1" },
  { id: "address-2", label: "Address 2", placeholder: "", key: "Address2" },
  { id: "city", label: "City", placeholder: "", key: "City" },
  { id: "postcode", label: "Postcode", placeholder: "", key: "Postcode" },
  { id: "country", label: "Country", placeholder: "", key: "Country" },
  { id: "telephone", label: "Telephone", placeholder: "", key: "Telephone" },
  { id: "fax", label: "Fax", placeholder: "", key: "Fax" },
  { id: "website", label: "Website", placeholder: "", key: "Website" },
  { id: "email", label: "Email", placeholder: "", key: "Email" },
  { id: "company-no", label: "Company No", placeholder: "", key: "CompanyNo" },
  { id: "vat-no", label: "VAT No", placeholder: "", key: "VatNo" },
  { id: "vat", label: "VAT", placeholder: "", key: "Vat" },
];

function CompanyInfo() {
  const [initialData, setInitialData] = useState<BusinessInfo | null>(null);
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo | null>(null);
  const [formData, setFormData] = useState<BusinessInfo>({} as BusinessInfo);

  useEffect(() => {
    getBusinessInfo();
  }, []);

  const getBusinessInfo = async () => {
    try {
      const res = await managerRepository.getBusinessInfo();
      setInitialData(res.data);
      setBusinessInfo(res.data);
      setFormData(res.data);
      console.log("Get info success");
    } catch (error: any) {
      console.error("Error fetching the API:", error.message);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (JSON.stringify(formData) === JSON.stringify(initialData)) {
      logError("No changes detected");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    try {
      await managerRepository.updateBusinessInfo(formData);
      logSuccess("Updated company information");
    } catch (error: any) {
      logError("Error updating the API: " + error.message);
    } finally {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="validate-form flex flex-col w-full max-w-5xl mx-auto m-3"
    >
      <div className="input-form grid w-full gap-4 md:grid-cols-2">
        {formFields.map((field) => (
          <div key={field.id} className="flex flex-col">
            <FormLabel htmlFor={field.id}>{field.label}</FormLabel>
            <FormInput
              id={field.id}
              type="text"
              name={field.key}
              placeholder={field.placeholder}
              className="w-full"
              readOnly={field.readOnly || false}
              value={formData[field.key as keyof BusinessInfo] || ""}
              onChange={handleChange}
            />
          </div>
        ))}
        <div className="flex flex-col md:col-span-2">
          <FormLabel htmlFor="vat-included">VAT Included</FormLabel>
          <div className="form-control">
            <label className="label cursor-pointer">
              <input
                id="vat-included"
                type="checkbox"
                // checked={formData.VatIncluded}
                // onChange={(e) =>
                //   setFormData({ ...formData, VatIncluded: e.target.checked })
                // }
                className="checkbox checkbox-primary"
              />
            </label>
          </div>
        </div>
        <div className="flex flex-col md:col-span-2">
          <FormLabel htmlFor="note">Note</FormLabel>
          <textarea
            id="note"
            name="Note"
            className="w-full h-32 px-4 py-2 border rounded focus:border-primary outline-none"
            placeholder="Thank you"
            // value={formData.Note || ""}
            // onChange={handleChange}
          />
        </div>
      </div>
      <button
        type="submit"
        className="btn sm:w-32 w-[90px] px-6 bg-primary text-white mt-3 self-end"
      >
        Save
      </button>
      <ToastContainer />
    </form>
  );
}

export default CompanyInfo;
