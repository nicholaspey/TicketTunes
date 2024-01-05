import React, { useState, useEffect } from 'react';
import { Typography, Box, CircularProgress, Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from 'axios';

const CountdownTimer = ({ initialCount, currTransaction }) => {
  const storedCount = parseInt(localStorage.getItem('countdownCount'), 10) || initialCount;
  const [count, setCount] = useState(storedCount);
  const [timerEnded, setTimerEnded] = useState(false);

  useEffect(() => {
    if (count <= 0) {
        setTimerEnded(true);
        axios.delete(`http://localhost:8080/Transactions/${currTransaction}`)
            .then((response) => {
                // Handle the successful deletion
                console.log('Transaction deleted:', response.data);
                // Redirect to the home page
                window.location.href = '/home'; // You can also use React Router for this
            })
            .catch((error) => {
                 // Handle errors
                console.error('Error deleting transaction:', error);
            });
        // localStorage.clear();
        localStorage.removeItem('countdownCount');
        setTimeout(() => {
            setTimerEnded(false); // Hide the alert after a delay
          }, 5000); // Adjust the duration (in milliseconds) as needed
        // clearInterval(intervalId);

        return;
    }

    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
      localStorage.setItem('countdownCount', count.toString());
    };
  }, [count]);

  const progress = (count / initialCount) * 100;

  const handleCloseAndRedirect = () => {
    setTimerEnded(false); // Close the Snackbar
    window.location.href = '/home'; // Redirect to the home page
  };

  return (
    
    <Box display="flex" flexDirection="column" alignItems="center">
      <CircularProgress variant="determinate" value={progress} size={80} />
      <Typography variant="h5" sx={{ marginTop: 2 }}>
        {count} seconds
      </Typography>

      {/* Alert for timer ended notification */}
      {timerEnded && (
        <Alert severity="info" onClose={() => setTimerEnded(false)}>
          Timer has ended. You will be redirected to the home page.
        </Alert>
      )}

    {/* TODO: add snackbar if time */}
      {/* Snackbar for timer ended notification */}
      {/* <Snackbar
        open={timerEnded}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Adjust position as needed
      >
        <Alert severity="info">
          Timer has ended. You will be redirected to the home page.
          <Button color="secondary" size="small" onClick={handleCloseAndRedirect}>
            Close
          </Button>
        </Alert>
      </Snackbar> */}
    </Box>
  );
};

export default CountdownTimer;