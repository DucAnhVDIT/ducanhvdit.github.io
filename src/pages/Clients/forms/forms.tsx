import React from 'react'
import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";
import { SurveyCreator, SurveyCreatorComponent } from "survey-creator-react";

// ...


function Forms() {
    const creatorOptions = {
        // showLogicTab: true,
        isAutoSave: true
      };
      
    const creator = new SurveyCreator(creatorOptions);


  return (
    <div>
         <SurveyCreatorComponent creator={creator} />
    </div>
  )
}

export default Forms