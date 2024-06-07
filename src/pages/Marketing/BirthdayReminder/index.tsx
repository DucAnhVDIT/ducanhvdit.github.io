import React, { useEffect, useState } from "react";
import Blank from "../../../components/BlankPage.tsx/Blank";
import birthDayImage from "../../../assets/images/BirthdayImage.png";
import BirthdayCalendar from "./birthdayCalendar";
import { Link } from "react-router-dom";
import Lucide from "../../../base-components/Lucide";
import Button from "../../../base-components/Button";
import SideBarHelper from "./sideBar";


function BirthdayReminder() {
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
  // return (
  //   <div className="min-h-screen opacity-0 translate-x-[50px] animate-[0.4s_ease-in-out_0.1s_intro-menu] animate-fill-mode-forwards animate-delay">
  //     {/* <Blank
  //         title={"Birthday Reminder"}
  //         description={
  //           "Sends automatic birthday wishes to clients when their special day is near."
  //         }
  //         imageSrc={birthDayImage}
  //         listItems={listItems}
  //       /> */}
  //     <div className="flex items-center justify-between top-0 w-full p-4 bg-white">
  //       <Link to="/marketing" className="text-lg font-bold">
  //         <Lucide icon={"X"}></Lucide>
  //       </Link>
  //       <h1 className="text-md font-bold ml-10 sm:text-xl ">Birthday Reminder</h1>
  //       <div></div>
  //     </div>
  //     <BirthdayCalendar />
  //   </div>
  // );
  return (
    <div className="min-h-screen flex flex-col items-center opacity-0 translate-x-[50px] animate-[0.4s_ease-in-out_0.1s_intro-menu] animate-fill-mode-forwards animate-delay">
    <div className="flex items-center justify-between w-full max-w-4xl p-2 mb-10 rounded-lg ">
      <Link to="/marketing" className="text-lg font-bold">
        <Lucide icon="X" className="w-6 h-6" />
      </Link>
      <h1 className="font-bold ml-2 text-xl">Birthday Reminder</h1>
      <div></div>
    </div>
    <div className="flex flex-col md:flex-row w-full max-w-4xl p-4 md:border md:rounded-md md:border-slate-500/60 rounded-lg">
      <div className="w-full md:w-1/3 md:pr-4 hidden md:block">
        <SideBarHelper />
      </div>
      <div className="w-full md:w-2/3">
        <BirthdayCalendar />
      </div>
    </div>
  </div>
  );
}

export default BirthdayReminder;
