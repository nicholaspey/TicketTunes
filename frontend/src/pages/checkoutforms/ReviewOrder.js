import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";

// import {selectedSeats} from '../../components/seatselect/ButtonGrid';

// console.log(selectedSeats);

// TODO: change all hardcoded text into the tickets selected in the transaction
const products = [
  {
    name: "Product 1",
    desc: "A nice thing",
    price: "$9.99",
  },
  {
    name: "Product 2",
    desc: "Another thing",
    price: "$3.45",
  },
  {
    name: "Product 3",
    desc: "Something else",
    price: "$6.51",
  },
  {
    name: "Product 4",
    desc: "Best thing of all",
    price: "$14.11",
  },
  { name: "Shipping", desc: "", price: "Free" },
];

const addresses = ["Random St 1", " #01-123", "", "521123", "Singapore"];
const payments = [
  { name: "Card type", detail: "Visa" },
  { name: "Card holder", detail: "Mr John Doe" },
  { name: "Card number", detail: "xxxx-xxxx-xxxx-1256" },
  { name: "Expiry date", detail: "12/2023" },
];

export default function Review({ transactionId }) {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/getTickets/${transactionId}`)
         .then((response) => {
             // assuming your state is named `tickets`
             setTickets(response.data);
             console.log(response.data)
         })
         .catch((error) => {
             console.error("Error fetching tickets:", error);
         });
}, [transactionId]);

// Calculate the sum of all unit_numbers
const totalPrice = tickets.reduce((total, ticket) => {
  return total + (ticket.unit_price || 0);
}, 0);

const handlePlaceOrder = async () => {
  try {
    const response = await axios.post('http://localhost:8080/placeOrder', {
      transactionId: transactionId,
      tickets: tickets,
      // Include other data as necessary
    });
    // Handle the response if the order was successful
    console.log('Order placed successfully:', response.data);
    // Redirect or update UI as necessary
  } catch (error) {
    console.error('Error placing order:', error);
    // Handle errors, e.g. show a notification to the user
  }
};
  

  return (
    <React.Fragment>
    <Typography variant="h6" gutterBottom>
      Order summary
    </Typography>
    <List disablePadding>
      {tickets.map((ticket, index) => (
        <ListItem key={index} sx={{ py: 1, px: 0 }}>
          <ListItemText
            primary={`Ticket ${ticket.ticket_number}`}
            secondary={`Seat Number: ${ticket.seat_number}`}
          />
          <ListItemSecondaryAction>
            <Typography variant="body2">{`Price: $${ticket.unit_price}`}</Typography>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
       
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
           ${totalPrice}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>John Doe</Typography>
          <Typography gutterBottom>{addresses.join(", ")}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
