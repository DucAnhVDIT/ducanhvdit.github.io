import React, { useEffect, useState } from "react";
import VoucherBlank from "../../../components/BlankPage.tsx/Blank";
import voucherImage from "../../../assets/images/VoucherImage.png";
import { Link } from "react-router-dom";
import Lucide from "../../../base-components/Lucide";
import VoucherList from "./voucherList";
import Blank from "../../../components/BlankPage.tsx/Blank";

function Voucher() {
  useEffect(() => {
    document.body.style.padding = "0";

    document.body.style.backgroundColor = "white";

    return () => {
      document.body.style.padding = "";
      document.body.style.backgroundColor = "";
    };
  }, []);

  const [vouchers, setVouchers] = useState([
    // {
    //   id: 1,
    //   voucherName: "New Year",
    //   numberIssued: 1,
    //   startDate: "04/06/2024",
    //   expireDate: "04/06/2024",
    //   currencyDiscount: "£20.00",
    //   term: "",
    //   activate: true,
    // },
  ]);

  const listItems = [
    "Offer flexible voucher options for clients",
    "Easily track and manage voucher usage",
    "Redeem vouchers both online and in-store",
  ];
  return (
    <div className="min-h-screen opacity-0 translate-x-[50px] animate-[0.4s_ease-in-out_0.1s_intro-menu] animate-fill-mode-forwards animate-delay">
      {vouchers.length === 0 ? (
        <Blank
          title={"Vouchers"}
          description={
            "Seamlessly manage various aspects of your voucher program."
          }
          imageSrc={voucherImage}
          listItems={listItems}
        />
      ) : (
        <>
          <div className="flex items-center justify-between top-0 w-full p-10">
            <Link to="/marketing" className="text-lg font-bold">
              <Lucide icon={"X"} />
            </Link>
            <h1 className="text-xl font-bold ml-20">Voucher List</h1>
            <div></div>
          </div>
          <VoucherList vouchers={vouchers} />
        </>
      )}
    </div>
  );
}

export default Voucher;
