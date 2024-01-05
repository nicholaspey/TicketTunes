// StepperComponent.js
import React, { useState } from "react";
import { Stepper, Step, StepLabel, StepConnector } from "@mui/material";

const CustomStepConnector = () => (
  <StepConnector
    style={{
      display: "block",
      marginLeft: "12px", // Adjust this value to control the spacing between steps
      marginRight: "12px", // Adjust this value to control the spacing between steps
    }}
  />
);

const StepperComponent = ({ steps }) => {
  const [activeStep, setActiveStep] = useState(0);


  return (
    <div>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        connector={<CustomStepConnector />}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default StepperComponent;
