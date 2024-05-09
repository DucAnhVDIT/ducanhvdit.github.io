import Card from "@mui/material/Card/Card";
import CardActions from "@mui/material/CardActions/CardActions";
import CardContent from "@mui/material/CardContent/CardContent";
import React from "react";
import Button from "../../base-components/Button";
import { Grid } from "@mui/material";
import Data from "./marketingData.json";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";
import Lucide from "../../base-components/Lucide";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();

  const handleSetUpClick = (title: string) => {
    // Use the title to construct the route path
    const routePath = `/marketing/${title.replace(/\s+/g, "").toLowerCase()}`; 

    navigate(routePath);
  };

  return (
    // <div className='p-7 flex flex-col opacity-0 translate-x-[50px] animate-[0.4s_ease-in-out_0.1s_intro-menu] animate-fill-mode-forwards animate-delay'>
    //     <div className='flex justify-between'>
    //         <BirthdayReminder />
    //         <Voucher />
    //         <ReviewSettings />
    //     </div>

    //     <div className='flex justify-between mt-10'>
    //         <ReturnCustomer />
    //         <Campaigns />
    //         <Templates />
    //     </div>
    // </div>
    <div className="opacity-0 translate-x-[50px] animate-[0.4s_ease-in-out_0.1s_intro-menu] animate-fill-mode-forwards animate-delay">
      <Grid container spacing={3} style={{ margin: "20px" }}>
        {Data.map((res: any, index: any) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card className="w-[80%] mt-3">
              <CardHeader
                sx={{ display: "flex", alignItems: "center" }}
                title={<Typography variant="h6">{res.title}</Typography>}
                // avatar={
                //   <Avatar sx={{ backgroundColor: "#1E40AF" }}>
                //     <Lucide icon={res.icon} />
                //   </Avatar>
                // }
              />
              <CardContent sx={{ flex: "1 0 auto", minHeight: "100px" }}>
                <Typography variant="body1" className="text-gray-500">
                  {res.description}
                </Typography>
              </CardContent>

              <CardActions
                sx={{ justifyContent: "flex-end", flex: "0 0 auto" }}
              >
                <Button variant="primary" className="w-32" onClick={() => handleSetUpClick(res.title)}>
                  Set Up
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default MainPage;
