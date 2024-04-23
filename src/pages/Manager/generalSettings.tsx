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
    <>
      <Card className="w-[25%]">
        <CardHeader
          sx={{ display: "flex", alignItems: "center"}}
          title={<Typography variant="h6">Settings</Typography>}
          avatar={
            <Avatar sx={{ backgroundColor: "#1E40AF" }}>
              <Lucide icon="Wrench" />
            </Avatar>
          }
        />
        <CardContent>
          <Typography variant="body1" className=" text-gray-500">
            The management of various business preferences and critical information
          </Typography>
        </CardContent>
        {/* Card Actions with setup button */}
        <CardActions sx={{ justifyContent: "flex-end", flex: "0 0 auto" }}>
          <Button variant="primary" className="w-32">
            Set Up
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default GeneralSettings;
