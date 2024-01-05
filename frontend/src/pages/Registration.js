import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Home from './Home';
import { useState } from 'react';
import { Container, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material'


function Registration() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    address: '',
    phone_num: '',
    allowExtraEmails: false,
  });
  const [errors, setErrors] = useState({});

  const phoneRegex = /^[89]\d{7}$/;

  const validateForm = () => {
    const newErrors = {};

    // Password length check
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 7 characters long';
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Phone number format check
    if (!phoneRegex.test(formData.phone_num)) {
      newErrors.phone_num = 'Invalid phone number format';
    }

    setErrors(newErrors);

    // Form is valid if there are no errors
    return Object.keys(newErrors).length === 0;
  };

   const [open, setOpen] = useState(false); // State to control the Dialog

  // Function to handle closing the Dialog
  const handleClose = () => {
    setOpen(false);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const isFormValid = validateForm();

    if (!isFormValid) {
      // Form is not valid, do not submit
      console.error('Validation errors:', errors);
      return;
    }

    // Form is valid, submit the data
    try {
      const response = await axios.post("http://localhost:8080/register", formData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log('User created successfully:', response.data);
      localStorage.setItem("user", JSON.stringify(response.data));

      navigate('/home'); // Navigate to home page or dashboard after registration
    } catch (error) {
      setOpen(true); // Open the Dialog upon error
      console.error('Failed to create user:', error);
    }
  };

  return (
    
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="username"
                required
                fullWidth
                id="username"
                label="User Name"
                autoFocus
                value={formData.username}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    username: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              error={!!errors.password}
              helperText={errors.password}
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirm-password"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  confirmPassword: e.target.value,
                })
              }
            />
          </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: e.target.value,
                  })
                }
              />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="phone-number"
              label="Phone Number"
              name="phone_num"
              error={!!errors.phone_num}
              helperText={errors.phone_num}
              value={formData.phone_num}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone_num: e.target.value,
                })
              }
            />
          </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions, and updates via email."
                checked={formData.allowExtraEmails}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    allowExtraEmails: e.target.checked,
                  })
                }
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
        {/* Dialog for error message */}
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Failed to create user. Please try again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Registration;
