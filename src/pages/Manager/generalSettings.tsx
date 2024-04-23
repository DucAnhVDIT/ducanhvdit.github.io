import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { Divider, Typography } from "@mui/material";
import { MdCake } from "react-icons/md";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Button from "../../base-components/Button";
import Lucide from "../../base-components/Lucide";

function GeneralSettings() {
  return (
    // <Card sx={{ width: "20%", height:"20%", padding:"0"}}>
    //   <CardHeader
    //     sx={{ display: "flex", alignItems: "center" }}
    //     title={<Typography variant="body1">General Settings</Typography>}
    //     action={
    //         <IconButton aria-label="expand" size="small">
    //             <ArrowForwardIosIcon />
    //         </IconButton>
    //     }
    //   />

    // </Card>
    <>
      {/* <Button className="flex flex-col items-start bg-white border-none w-40 h-24">
        <Lucide icon="Building2" className="mb-3" />
        <h1>General Settings</h1>
      </Button> */}
      <div className="col-span-12 p-5 cursor-pointer sm:col-span-4 2xl:col-span-3 box zoom-in w-60 flex justify-between">
        <div className="flex">
          <Lucide icon="Building2" className="mr-2"/>
          <h1 className="font-bold text-lg">Settings</h1>
        </div>
        <Lucide icon="ChevronRight"/>
      </div>
    </>
  );
}

export default GeneralSettings;
