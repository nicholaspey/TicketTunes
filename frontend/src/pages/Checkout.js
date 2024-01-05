import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddressForm from "./checkoutforms/AddressForm";
import Review from "./checkoutforms/ReviewOrder";
import NavBar from "../components/navigation/NavBar";
import Footer from "../components/footer/Footer";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import Verification from "./checkoutforms/Verification";
import { useParams } from "react-router-dom";
import SeatSelection from "./checkoutforms/SeatSelection";
import CountdownTimer from "../components/checkout/CountdownTimer";
import axios from 'axios';

const steps = ["Verification", "Payment Details", "Order Summary"];

function getStepContent(step, transactionId, onVerificationSuccess) {
  switch (step) {
    case 0:
      return <Verification onVerificationSuccess={onVerificationSuccess} />;
    case 1:
      return <AddressForm />;
    case 2:
      return <Review transactionId={transactionId} />;
    default:
      throw new Error("Unknown step");
  }
}

// breadcrumbs
function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

function TimerComponent({ transaction }) {
  return (
    <div>
      {/* Your JSX goes here */}
      {/* <p>This is a subcomponent!</p> */}
      <CountdownTimer initialCount={30} currTransaction={transaction}></CountdownTimer>
    </div>
  );
}


function MySubComponent() {
  // You can use hooks and other logic here
  return (
    <div>
      {/* Your JSX goes here */}
      This is a subcomponent!
    </div>
  );
}
const breadcrumbs = [
  <Link underline="hover" key="1" color="inherit" onClick={handleClick}>
    <Link to="/">Home</Link>
  </Link>,
  <Link
    underline="hover"
    key="2"
    color="inherit"
    href="/material-ui/getting-started/installation/"
    onClick={handleClick}
  >
    <Link to="/">Events</Link>
  </Link>,
  <Link
    underline="hover"
    key="3"
    color="inherit"
    href="/material-ui/getting-started/installation/"
    onClick={handleClick}
  >
    <Link to="/eventinfo1/1">Event Info</Link>
  </Link>,
  <Typography key="4" color="text.primary">
    Checkout
  </Typography>,
];



export default function Checkout() {
  // Other state and hooks
  let { transactionId } = useParams();
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [isVerified, setIsVerified] = useState(false); // State to track if verification was successful

  const handleNext = async () => {
    if (activeStep === steps.length - 1 && isVerified) {
      // If it's the last step and the user is verified, place the order
      try {
        // Perform your API call here
        const response = await axios.put(`http://localhost:8080/successfulTransaction/${transactionId}`, {
          transactionId: transactionId,
        });
        

        // Log the response or handle success
        console.log(response.data);

        // If successful, proceed to the next step
        setActiveStep(activeStep + 1);
      } catch (error) {
        // Handle any errors here
        console.error('Order placement failed:', error);
      }
    } else {
      // If it's not the last step, just go to the next step
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  // Verification success handler
  const handleVerificationSuccess = (status) => {
    setIsVerified(status);
  };

  // Function to confirm and mark the transaction as completed
  const confirmOrder = async () => {
    try {
      // Make an API call to confirm and mark the transaction as completed
      const response = await axios.put(
        `http://localhost:8080/Transactions/${transactionId}`
      );

      // Handle the API response, e.g., show a success message
      console.log("Transaction confirmed:", response.data);

      // localStorage.clear();
      localStorage.removeItem('countdownCount');
      // Set the orderConfirmed state to true
      setOrderConfirmed(true);
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error('Error confirming transaction:', error);
    }
  };

  return (
    <React.Fragment>
      {/* Display the order confirmation page if orderConfirmed is true */}
      {orderConfirmed ? (
        <React.Fragment>
          <Typography variant="h5" gutterBottom>
            Thank you for your order.
          </Typography>
          <Typography variant="subtitle1">
            Your order number is #2001539. We have emailed your order
            confirmation, and will send you an update when your order has
            shipped.
          </Typography>
          <React.Fragment>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button variant="contained" href="/home" sx={{ mt: 3, ml: 1 }}>
                Back to Home
              </Button>
            </Box>
          </React.Fragment>
        </React.Fragment>
      ) : (
        <div>
          <CssBaseline />
      <NavBar></NavBar>
      <TimerComponent transaction={transactionId}></TimerComponent>

      {/* breadcrumbs  */}
      <div
        style={{
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <Container>
          <Stack spacing={2}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
              {breadcrumbs}
            </Breadcrumbs>
          </Stack>
        </Container>
      </div>

      <Container>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          {/* <Typography component="h1" variant="h4" align="center">
                Checkout
              </Typography> */}
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <NavBar></NavBar>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>

              <React.Fragment>
                {/* {getStepContent(activeStep)} */}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button variant="contained" href="../" sx={{ mt: 3, ml: 1 }}>
                    Back to Home
                  </Button>
                </Box>
              </React.Fragment>
              <Footer></Footer>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(
                activeStep,
                transactionId,
                handleVerificationSuccess
              )}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={() => {
                    if (activeStep === steps.length - 1) {
                      confirmOrder(); // Call the confirmOrder function on the last step
                    } else {
                      handleNext(); // Continue to the next step
                    }
                  }}
                  sx={{ mt: 3, ml: 1 }}
                  disabled={activeStep === 0 && !isVerified} // Keep your existing disabled condition
                >
                  {activeStep === steps.length - 1 ? "Place order" : "Next"}


                </Button>
              </Box>
            </React.Fragment>
            )}
            </Paper>
          </Container>
          <Footer></Footer>
        </div>
        )}
      </React.Fragment>
  );
  
}