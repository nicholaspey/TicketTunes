import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';

export default function AddressForm() {
  const [fieldValidations, setFieldValidations] = React.useState({
    cardName: true,
    cardNumber: true,
    expDate: true,
    cvv: true,
    firstName: true,
    lastName: true,
    address1: true,
    city: true,
    zip: true,
    country: true,
  });

  // Validation function
  const validateField = (field, value) => {
    // You can add your validation logic here
    // For example, check if the value is empty or not
    const isValid = value.trim() !== '';
    setFieldValidations((prevValidations) => ({
      ...prevValidations,
      [field]: isValid,
    }));
  };

  return (
    <React.Fragment>
        <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            error={!fieldValidations.cardName}
            value="John Doe" // The hardcoded value
            InputLabelProps={{ shrink: true }} // Ensures the label moves up
            onBlur={(e) => validateField('cardName', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            value="4212 1215 1215 1256" // The hardcoded value
            InputLabelProps={{ shrink: true }} // Ensures the label moves up
            error={!fieldValidations.cardNumber}
            onBlur={(e) => validateField('cardNumber', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            value="12/23" // The hardcoded value
            InputLabelProps={{ shrink: true }} // Ensures the label moves up
            error={!fieldValidations.expDate}
            onBlur={(e) => validateField('expDate', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            value="123" // The hardcoded value
            InputLabelProps={{ shrink: true }} // Ensures the label moves up
            error={!fieldValidations.cvv}
            onBlur={(e) => validateField('cvv', e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>

      <Divider variant="middle" />
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            error={!fieldValidations.firstName}
            value="John" // The hardcoded value
            InputLabelProps={{ shrink: true }} // Ensures the label moves up
            onBlur={(e) => validateField('firstName', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value="Doe" // The hardcoded value
            InputLabelProps={{ shrink: true }} // Ensures the label moves up
            error={!fieldValidations.lastName}
            onBlur={(e) => validateField('lastName', e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            value="Random St 1 #01-123" // The hardcoded value
            InputLabelProps={{ shrink: true }} // Ensures the label moves up
            error={!fieldValidations.address1}
            onBlur={(e) => validateField('address1', e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            value="Singapore" // The hardcoded value
            InputLabelProps={{ shrink: true }} // Ensures the label moves up
            error={!fieldValidations.city}
            onBlur={(e) => validateField('city', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            value="521123" // The hardcoded value
            InputLabelProps={{ shrink: true }} // Ensures the label moves up
            variant="standard"
            error={!fieldValidations.zip}
            onBlur={(e) => validateField('zip', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            value="Singapore" // The hardcoded value
            InputLabelProps={{ shrink: true }} // Ensures the label moves up
            error={!fieldValidations.country}
            onBlur={(e) => validateField('country', e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}