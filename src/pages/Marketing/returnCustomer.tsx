import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { Divider, Typography } from "@mui/material";
import { MdCake } from "react-icons/md";
import Button from "../../base-components/Button";
import AddReactionIcon from "@mui/icons-material/AddReaction";

function ReturnCustomer() {
  return (
    <Card sx={{ width: "25%", display: "flex", flexDirection: "column" }}>
      <CardHeader
        sx={{ display: "flex", alignItems: "center" }}
        title={<Typography variant="h6">Return Customer</Typography>}
        avatar={
          <Avatar sx={{ backgroundColor: "#1E40AF" }}>
            <AddReactionIcon />
          </Avatar>
        }
      />
      <CardContent sx={{ flex: "1 0 auto", marginBottom: "5px" }}>
        <Typography variant="body1" className=" text-gray-500">
          Attract inactive customers by offering them a special deal to
          encourage their return
        </Typography>
      </CardContent>
      {/* Card Actions with setup button */}
      <CardActions sx={{ justifyContent: "flex-end", flex: "0 0 auto" }}>
        <Button variant="primary" className="w-32">
          Set Up
        </Button>
      </CardActions>
    </Card>
  );
}

export default ReturnCustomer;
