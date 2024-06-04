import React, { useEffect, useState } from "react";
import Blank from "../../../components/BlankPage.tsx/Blank";
import returnImage from "../../../assets/images/ReturnCustomerImage.png";

function ReturnCustomer() {
  useEffect(() => {
    document.body.style.padding = "0";

    document.body.style.backgroundColor = "white";

    return () => {
      document.body.style.padding = "";
      document.body.style.backgroundColor = "";
    };
  }, []);


  const listItems = [
    "Offer flexible voucher options for clients",
    "Easily track and manage voucher usage",
    "Redeem vouchers both online and in-store",
  ];
  return (
    <div className="min-h-screen opacity-0 translate-x-[50px] animate-[0.4s_ease-in-out_0.1s_intro-menu] animate-fill-mode-forwards animate-delay">
        <Blank
          title={"Return Customer"}
          description={
            "Attract inactive customers by offering them a special deal to encourage their return."
          }
          imageSrc={returnImage}
          listItems={listItems}
        />
    </div>
  );
}

export default ReturnCustomer;
