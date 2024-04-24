import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";
import Button from "../../base-components/Button";
import Lucide from "../../base-components/Lucide";
import Drawer from "@mui/material/Drawer";
import { useNavigate } from "react-router-dom";

function InputData() {
  return (
    <div>
        <Card className="w-[25%]">
        <CardHeader
          sx={{ display: "flex", alignItems: "center"}}
          title={<Typography variant="h6">Input Data</Typography>}
          avatar={
            <Avatar sx={{ backgroundColor: "#1E40AF" }}>
              <Lucide icon="Database" />
            </Avatar>
          }
        />
        <CardContent>
          <Typography variant="body1" className=" text-gray-500">
            Edit/add pricelist, schedule and staff data 
          </Typography>
        </CardContent>
        {/* Card Actions with setup button */}
        <CardActions sx={{ justifyContent: "flex-end", flex: "0 0 auto" }}>
          <Button variant="primary" className="w-32" >
            Set Up
          </Button>
        </CardActions>
      </Card>

    </div>
  )
}

export default InputData