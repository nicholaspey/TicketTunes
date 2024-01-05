import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import React from "react";
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";
import Logo from "../../assets/applogo.svg";

const NavBar = ({ authenticated = false }) => {
    return (
        <AppBar
            sx={{
                backgroundColor: "#5522CC",
                minHeight: "50px",
                height: "50px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
            }}
            position="sticky"
        >
            <Container>
            <Toolbar disableGutters>

            <Link to="/">
            <img src={Logo} alt="Logo"/>
            </Link>

            <Link to="/login">
            <Button 
                size="large"
                color="secondary"
                startIcon={<LoginIcon/>}
            >
                Login
            </Button>
            </Link>

            <Link to="/registration">
            <Button
                size="large"
                color="secondary"
                startIcon={<AppRegistrationIcon/>}
            >
                Registration
            </Button>
            </Link>

            <Link to="/logout">
            <Button 
                size="large"
                color="secondary"
                startIcon={<LogoutIcon/>}
            >
                Logout
            </Button>
            </Link>
            </Toolbar>
            </Container>
        </AppBar>
    );
};

export default NavBar;