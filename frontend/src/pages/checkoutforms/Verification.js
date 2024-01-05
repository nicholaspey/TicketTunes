import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Zalgo } from "@h.yoshida/react-zalgo";
import Button from "@mui/material/Button";

function Verification({ onVerificationSuccess }) {
  const [verificationText, setVerificationText] = useState("");
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    generateVerificationText(); // Call the function when the component loads
  }, []); // The empty array ensures it's called only once when the component mounts

  const generateVerificationText = () => {
    // Generate a random 4-character alphanumeric string
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let generatedText = "";

    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedText += charset.charAt(randomIndex);
    }
    setVerificationText(generatedText);
  };

  const verifyInput = () => {
    // Get the input value directly from the DOM
    const inputValue = document.getElementById(
      "outlined-verification-code"
    ).value;

    // Check if the verification text matches the input value
    if (verificationText === inputValue) {
      onVerificationSuccess(true);
      // ... any other actions on success
    } else {
      onVerificationSuccess(false);
      alert("Verification failed. Please check the code and try again.");
    }
  };

  const handleInputChange = (event) => {
    const text = event.target.value;
    setUserInput(text);
  };

  const param = {
    topGlitchAmount: () => Math.ceil(2 * Math.random()),
    midGlitchAmount: () => Math.ceil(2 * Math.random()),
    btmGlitchAmount: () => Math.ceil(2 * Math.random()),
  };

  function YourComponent() {
    // const [userInput, setUserInput] = useState("");
    return (
      <Box
        sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
        autoComplete="off"
      >
        <TextField
          id="outlined-verification-code" // Give the TextField an ID to reference it
          label="Verification Code"
          defaultValue={userInput} // Use defaultValue instead of value
        />
      </Box>
    );
  }

  return (
    <div>
      <div>
        <div className="centered-container">
          <p align="center">
            <span style={{ fontSize: "50px", userSelect: "none" }}>
              <Zalgo
                className="verification"
                textData={verificationText}
                glitchParams={param}
                style={{ userSelect: "none" }}
              />
            </span>
          </p>

          <p align="center">
            Please enter the verification code
            <Box
              sx={{
                display: "flex", // Use flexbox to layout children inline
                justifyContent:"center",
                alignItems: "center", // Align items vertically
                gap: 1, // Add some space between children
                mt: 3, // Margin top for spacing from the elements above
              }}
            >
              <YourComponent
                userInput={userInput}
                handleInputChange={handleInputChange}
              />
              <Button variant="contained" onClick={verifyInput} sx={{ ml: 1 }}>
                Verify
              </Button>
            </Box>
          </p>
          <p align="center">
            The verification code consists of only alphabetic letters and can be
            refreshed by clicking the on its image
            <br />
            Please do not operate on more than one window and submit this page
            as soon as possible to avoid verification failure
          </p>
        </div>

        <Divider />

        <p classname="terms-and-conditions">
          If you are already opted-in you will receive updates by electronic
          means (email, SMS, etc.) about events, activities, news, products and
          special offers from the organisers, sponsors, and/or venue of this
          event.
          <br />
          If you want to receive updates or manage your preference, go to My
          Profile. You can unsubscribe at any time by contacting the event
          partner.
        </p>
        <Typography sx={{ fontWeight: "bold" }}>
          I hereby acknowledge that I have read and agreed to Purchase Policy
          and the terms and conditions of this event (including the Exchange and
          Refund Policy, Admission Policy and Conditions of Entry for the
          event), and authorize Ticketmaster to collect, process, utilize and
          internationally transmit my personal data in accordance with the
          Privacy Policy and within the scope of specific purposes set forth
          therein.
        </Typography>
      </div>
    </div>
  );
}

export default Verification;
