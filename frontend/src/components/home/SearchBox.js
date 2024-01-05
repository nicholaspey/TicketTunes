import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import PlaceIcon from '@mui/icons-material/Place';
import Button from "@mui/material/Button";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/material/styles';

export default function SearchBox() {
    return (
        <Box
        sx={{
            width: "1000px",
            height: "flex",
            borderRadius: "20px", 
            backgroundColor: "#ececec",
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.25)",

            }}
        >
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                gap: "2rem",
                justifyContent: "center",
                marginTop: "2rem",
                marginBottom: "2rem",
            }}
        >
            {/* search event */}
            <TextField label="Search Event" id="custom-css-outlined-input"                     
                InputProps={{
                    startAdornment: <SearchIcon/>
                }}
            />
            
            {/* location */}
            <TextField label="Location" id="custom-css-outlined-input"                     
                InputProps={{
                    startAdornment: <PlaceIcon/>
                }}
            />

            {/* search date */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker id="standard-basic" label="Select Date" variant="standard"/>
            </LocalizationProvider>

        </div>

        <div
            style={{
                display: "flex",
                flexDirection: "row",
                gap: "2rem",
                justifyContent: "center",
                marginTop: "2rem",
                marginBottom: "2rem",
            }}
        >
            <Button variant="contained" size="large">
                Search
            </Button>
        </div>

        </Box>
    );
}