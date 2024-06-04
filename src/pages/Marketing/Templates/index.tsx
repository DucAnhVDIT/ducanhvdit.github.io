import React, { useEffect, useState } from "react";
import Blank from "../../../components/BlankPage.tsx/Blank";
import templateImage from "../../../assets/images/TemplateImage.png";

function Templates() {
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
          title={"Templates"}
          description={
            "Creating reusable templates for various purposes."
          }
          imageSrc={templateImage}
          listItems={listItems}
        />
    </div>
  );
}

export default Templates;
