import React, { useEffect } from "react";
import VoucherBlank from "../../../components/BlankPage.tsx/VoucherBlank";
import voucherImage from '../../../assets/images/VoucherImage.png';

function Voucher() {
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
    <div className="min-h-screen">
      <VoucherBlank
        title={"Vouchers"}
        description={
          "Seamlessly manage various aspects of your voucher program."
        }
        imageSrc={voucherImage}
        listItems={listItems}
      />
    </div>
  );
}

export default Voucher;
