import React, { useState, useEffect } from "react";
import vibes from "../../assets/vibes.png";
import { Container } from "@mui/system";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navigation/NavBar";
import Footer from "../../components/footer/Footer";
import CssBaseline from "@mui/material/CssBaseline";

export default function SeatSelection() {
  const [buttons, setButtons] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/tickets")
      .then((res) => {
        const data = res.data;
        // Ensure that data is correctly structured as a 2D array with 6 rows
        const formattedData = [];
        for (let i = 0; i < 6; i++) {
          formattedData.push(data.slice(i * 6, (i + 1) * 6));
        }
        setButtons(formattedData);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleUpdateClick = (rowIndex, colIndex, transactionId) => {
    const updatedButtons = [...buttons]; // Create a copy of the buttons array
    const updatedSeat = updatedButtons[rowIndex][colIndex];

    // Toggle the 'available' property for the selected seat
    updatedSeat.available = !updatedSeat.available;

    const updatedTicketData = {
      IsAvailable: false,
      transaction_id: transactionId,
    };

    //console.log(updatedTicketData.transaction_Id);
    // Send a PUT request to update the seat's 'available' property in the database
    axios
      .put(
        `http://localhost:8080/tickets/updateAvailability/${buttons[rowIndex][colIndex].id}`,
        updatedTicketData,

        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        // If the update is successful, update the state with the new button data
        setButtons(updatedButtons);
      })
      .catch((err) => console.log(err));
  };

  const [totalPrice, setTotalPrice] = useState(0);

  const updateSelectedSeats = async () => {
    // Check if no seats are selected
  if (selectedSeats.length === 0) {
    alert("Please select at least one seat before continuing.");
    return; // Exit the function early if no seats are selected
  }

    let totalPrice = 0; // Temporary variable to hold the calculation
    let transactionId = 0;
    // Loop through selected seats to calculate the total price
    selectedSeats.forEach((seat) => {
      const ticket = buttons[seat.row][seat.col]; // Get the full seat object

      totalPrice += ticket.unit_price; // Add the price of each seat to the local total

      // console.log(totalPrice);
    });

    /// Assuming `selectedSeats` is an array that contains the selected seat details
    // and `currentUser` is an object that contains the ID of the currently logged in user.

const userString = localStorage.getItem("user");
const user = userString ? JSON.parse(userString) : null;

if (user) {
  // You can now use `user` object
  console.log(user.id); // Example
}

    // Create a transaction object
    const transactionData = {
      total_price: totalPrice,
      user_id: 3,
    };


    // console.log(transactionData);
    try {
      // Send a POST request to the backend to add the transaction
      const response = await axios.post(
        "http://localhost:8080/Transactions",
        transactionData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // Check if the transaction was created successfully
      if (response.status === 201) {
        // Set the transactionId with the one from the response
         transactionId = response.data.id;
         localStorage.setItem("transaction", JSON.stringify(response.data));

        // Now update each selected seat with the created transaction ID
        selectedSeats.forEach((seat) => {
          handleUpdateClick(seat.row, seat.col, transactionId);
        });
        navigate(`/checkout/${transactionId}`);
      } else {
        console.error("Transaction creation failed:", response);
      }
    } catch (error) {
      console.error(
        "Error creating transaction:",
        error.response || error.message
      );
    }

    selectedSeats.forEach((seat) => {
      handleUpdateClick(seat.row, seat.col, transactionId);
    });
  };

  const handleButtonClick = (rowIndex, colIndex) => {
    toggleSeatSelection(rowIndex, colIndex);
  };

  const isSeatSelected = (rowIndex, colIndex) => {
    return selectedSeats.some(
      (seat) => seat.row === rowIndex && seat.col === colIndex
    );
  };

  const toggleSeatSelection = (rowIndex, colIndex) => {
    if (isSeatSelected(rowIndex, colIndex)) {
      setSelectedSeats((prevSelectedSeats) =>
        prevSelectedSeats.filter(
          (seat) => seat.row !== rowIndex || seat.col !== colIndex
        )
      );
    } else {
      setSelectedSeats((prevSelectedSeats) => [
        ...prevSelectedSeats,
        { row: rowIndex, col: colIndex },
      ]);
    }

    //Calculate total price of seat selected
    function calculateTotalPrice(selectedSeats) {}
  };

  return (
    <React.Fragment>
    <div id="back-to-top-anchor" />

    <CssBaseline />
    <NavBar></NavBar>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Image on the left */}
        <div style={{ marginRight: "20px",marginTop: "20px" }}>
          {/* <FieldsColumn> */}
          <img src={vibes} alt="img" width="flex" height="110" />
          {/* </FieldsColumn> */}
        </div>

        <div>
          {/* Text box */}
          <p>
            <Typography variant="h4">
              <b>Vibes</b>
            </Typography>
          </p>
          <p>
            <div>Date: 4/10/20</div>
          </p>
        </div>
      </div>

      <div
        className="divider"
        style={{
          width: "100%",
          backgroundColor: "#5522CC", // Background color (gold)
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          margin: "20px 0",
          display: "flex",
          alignItems: "center",
          height: "40px", // Height of the rectangular background
          borderRadius: "4px", // Rounded corners for the rectangle
        }}
      >
        <Container>
          <p
            style={{
              fontWeight: "bold",
              textTransform: "uppercase",
              color: "#FFF",
              textAlign: "center",
            }}
          >
            Choose Your Seat
          </p>
        </Container>
      </div>

      {/*Seat Select component*/}
      <div
        className="SeatSelect-Component"
        style={{
          backgroundColor: "#222222",
          display: "flex",
        
          justifyContent: "center",
          alignItems: "center",
          minHeight: "10vh", // Use minHeight to cover the entire viewport height
          flexDirection: "column",
        }}
      >
        <div
          className="Stage"
          style={{
            backgroundColor: "#fff",
            height: "100px",
            width: "600px",
            margin: "5px 0",
            transform: "rotateX(-30deg) scale(1.1)",
            boxShadow: "0 3px 10px rgba(255, 255, 255, 0.75)",
            display: "flex", // Use Flexbox
            alignItems: "center", // Center vertically
            justifyContent: "center", // Center horizontally
            borderRadius: "0 0 50% 50%", // This creates a semi-circle
          }}
        >
          <Typography variant="h4">STAGE</Typography>
        </div>
      </div>

      {/*Button Grid*/}
      <div style={{ backgroundColor: "#222222" }}>
        <Grid container>
          {buttons.map((row, rowIndex) => (
            <Grid container item key={rowIndex} justifyContent="center">
              {row.map((seat, colIndex) => (
                <Grid item key={colIndex} style={{ margin: "5px" }}>
                  <Button
                    variant="contained"
                    style={{
                      width: "60px",
                      height: "60px",
                      backgroundColor: isSeatSelected(rowIndex, colIndex)
                        ? "green" // Change the background color when selected
                        : "#5522CC", // Default background color
                      borderRadius: "20px 20px 0 0", // Half-circle on top
                    }}
                    onClick={() => handleButtonClick(rowIndex, colIndex)}
                    disabled={!seat.available} // Adjust based on your logic
                  >
                    {seat.seat_number}
                  </Button>
                </Grid>
              ))}
            </Grid>
          ))}
        </Grid>
        {/*  <div>
          <ul>
            {selectedSeats.map((seat, index) => (
              <li key={index}>
                Row: {seat.row + 1}, Col: {seat.col + 1}
              </li>
            ))}
          </ul>
        </div> */}
      </div>

      {/* Legend */}
      <div
        className="legend"
        style={{
          marginTop: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", marginRight: "20px" }}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: "#5522CC",
              marginRight: "5px",
            }}
          ></div>
          <span>Available</span>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginRight: "20px" }}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: "#5522CC",
              marginRight: "5px",
            }}
          ></div>
          <span>Occupied</span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: "#7bc47f",
              marginRight: "5px",
            }}
          ></div>
          <span>Selected</span>
        </div>
      </div>

      <div className="Add-Info">
        <Container>
          <div>
            <p>
              <Typography variant="h5" fontWeight="bold">
                Additional Information
              </Typography>
              <li>Seat plan is not drawn to scale</li>
              {/* <li>Colour indicates price category</li> */}
              <li>Ticket prices exclude booking fees</li>
              <li>Seating layout subject to change</li>
            </p>
          </div>
        </Container>

        {/* Create a button to update the seat availability for selected seats */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={updateSelectedSeats} // Call the updateSelectedSeats function
          >
            Update Selected Seats
          </Button>
        </div>
        <Footer/>
      </div> 
   
      </React.Fragment>
  );
}
