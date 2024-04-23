import Box from "@mui/material/Box/Box";
import React from "react";
import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";
import { SurveyCreator, SurveyCreatorComponent } from "survey-creator-react";

// ...

function Forms() {
  return (
    <div className="flex justify-center">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "16px",
          marginBottom: "16px",
          width: "800px",
          height: "200px",
        }}
      >
        <div>No forms</div>
      </Box>
    </div>
  );
}

export default Forms;
