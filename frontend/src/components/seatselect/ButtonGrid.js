import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import axios from "axios";

// export selectedSeats;

function ButtonGrid({ onButtonClick }) {
  const [buttons, setButtons] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    // Fetch ticket data from the server
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

  const handleUpdateClick = (rowIndex, colIndex) => {
    const updatedButtons = [...buttons]; // Create a copy of the buttons array
    const updatedSeat = updatedButtons[rowIndex][colIndex];

    // Toggle the 'available' property for the selected seat
    updatedSeat.available = !updatedSeat.available;

    // Send a PUT request to update the seat's 'available' property in the database
    axios
      .put(
        `http://localhost:8080/tickets/updateAvailability/${updatedSeat.id}`,
        updatedSeat.available,
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

  const updateSelectedSeats = () => {
    // Loop through selected seats and trigger handleUpdateClick for each
    selectedSeats.forEach((seat) => {
      handleUpdateClick(seat.row, seat.col);
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
  };
  const selectedSeatsCount = selectedSeats.length;
  return (
    <div>
      <Grid>
        {buttons.map((row, rowIndex) => (
          <Grid container item key={rowIndex} justifyContent="center">
            {row.map((seat, colIndex) => (
              <Grid item key={colIndex} style={{ margin: "5px" }}>
                <Button
                  variant="contained"
                  style={{
                    ...buttonStyle, // Apply the buttonStyle here
                    backgroundColor: isSeatSelected(rowIndex, colIndex)
                      ? "green"
                      : "#626262",
                  }}
                  onClick={() => handleButtonClick(rowIndex, colIndex)}
                  disabled={!seat.available}
                >
                  {seat.seat_number}
                </Button>
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>

      {/* Display selected tickets */}
      <div
        style={{
          border: "1px solid #000",
          padding: "10px",
          borderRadius: "5px",
          backgroundColor: "#f0f0f0",
          margin: "10px",
        }}
      >
        <h3>Selected Seats:</h3>
        <p>Number of Seats Selected: {selectedSeatsCount}</p>
      </div>

      {/* Create a button to update the seat availability for selected seats */}
      <Button
        variant="contained"
        color="primary"
        onClick={updateSelectedSeats} // Call the updateSelectedSeats function
      >
        Update Selected Seats
      </Button>
    </div>
  );
}

// export {selectedSeats};
export default ButtonGrid;
