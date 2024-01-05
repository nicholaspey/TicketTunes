import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Typography from "@mui/material/Typography";
import NavBar from "../components/navigation/NavBar";
import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Vibes from '../assets/vibes.png';
import { Link } from 'react-router-dom';
import React, { useRef, useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Footer from '../components/footer/Footer';
import Container from '@mui/material/Container';
import Seatmap from '../assets/seatmap.png';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import TicketService from '../services/TicketService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

const breadcrumbs = [

    <Link
        underline="hover"
        key="1"
        color="inherit"
        onClick={handleClick}
    >
        <Link to="/">
            Home
        </Link>
    </Link>,
    <Link
        underline="hover"
        key="2"
        color="inherit"
        href="/material-ui/getting-started/installation/"
        onClick={handleClick}
    >
        <Link to="/">
            Events
        </Link>
    </Link>,
    <Typography key="3" color="text.primary">
        Event Info
    </Typography>,
];

// scroll to top 
function ScrollTop(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector(
            '#back-to-top-anchor',
        );

        if (anchor) {
            anchor.scrollIntoView({
                block: 'center',
            });
        }
    };
    return (
        <Fade in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
            >
                {children}
            </Box>
        </Fade>
    );
}

ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};

const EventInfo1 = (props) => {

    const { id } = useParams();
    console.log('ID from URL:', id);

    const navigate = useNavigate();

    const [eventInfo, setEventInfo] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Use the `id` parameter from the URL to fetch event information
                const response = await axios.get(`http://localhost:8080/eventInfo/${id}`);
                console.log('Response from server:', response);

                setEventInfo(response.data);
            } catch (error) {
                // Handle any errors that occurred during the request
                console.error("Error fetching event information:", error);
                navigate('/eventinfo/notfound');
            }
        };

        fetchData();
    }, [id]);



    const [tickets, setTickets] = useState([]);
    useEffect(() => {
        TicketService.getTickets()
            .then((res) => {
                setTickets(res.data);
            })
            .catch(() => {
                navigate('/error');
            });
    }, []);

    const [value, setValue] = React.useState('one');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const section1Ref = useRef(null);
    const section2Ref = useRef(null);
    const section3Ref = useRef(null);
    const section4Ref = useRef(null);
    const section5Ref = useRef(null);
    const section6Ref = useRef(null);

    function scrollToSection(ref) {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    }

    console.log(eventInfo.title);
    return (
        <React.Fragment>
            <div id="back-to-top-anchor" />

            <CssBaseline />
            <NavBar />
            {/* breadcrumbs */}
            <div
                style={{
                    marginTop: "10px",
                    marginBottom: "10px",
                }}
            >
                <Container>
                    <Stack spacing={2}>
                        <Breadcrumbs
                            separator={<NavigateNextIcon fontSize="small" />}
                        >
                            {breadcrumbs}
                        </Breadcrumbs>
                    </Stack>
                </Container>
            </div>

            {/* image */}
            <Box sx={{ backgroundColor: "#000" }}>
            <Container sx={{ backgroundColor: "000" }}>
                <img src={Vibes} alt="Vibes" width="100%" />

                <Typography variant="h4" gutterBottom sx={{ color: "#fff" }}>
                    {eventInfo.date} / {eventInfo.location}
                </Typography>

                <Typography variant="h3" sx={{ fontWeight: "bold", color: "#fff" }}>
                    {eventInfo.eventName}
                </Typography>
            </Container>
            </Box>

            {/* tabs */}
            <AppBar
                position="sticky"
                color="secondary"
                sx={{
                    minHeight: "50px",
                    height: "50px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Container>
                    <Toolbar disableGutters>

                        <Tabs value={value} onChange={handleChange} centered>
                            <Tab
                                label="Event Details"
                                onClick={() => scrollToSection(section1Ref)}
                            />
                            <Tab
                                label="Ticket Pricing"
                                onClick={() => scrollToSection(section2Ref)}
                            />
                            <Tab
                                label="Seat Map"
                                onClick={() => scrollToSection(section3Ref)}
                            />
                            <Tab
                                label="Exchange & Refund Policy"
                                onClick={() => scrollToSection(section4Ref)}
                            />
                            <Tab
                                label="Admissions Policy"
                                onClick={() => scrollToSection(section5Ref)}
                            />
                            <Tab
                                label="Ways To Buy Tickets"
                                onClick={() => scrollToSection(section6Ref)}
                            />
                        </Tabs>
                        <Link to="/seatSelection">
                            <Button variant="contained" size="large">Buy Tickets</Button>
                        </Link>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* event details */}
            <Box sx={{ width: 'flex', height: 'flex', backgroundColor: '#ececec' }}>
                <Box sx={{ width: 'flex', height: '20px', backgroundColor: '#ececec' }}></Box>
                <Container sx={{ width: 'flex', height: 'flex', backgroundColor: '#ececec' }}>
                    <Typography variant="h3" gutterBottom a ref={section1Ref}>Event Details</Typography>
                    {eventInfo.eventDetail && (
                        eventInfo.eventDetail.map((paragraph, index) => (
                            <Typography key={index} variant="body1" gutterBottom paragraph>
                                {paragraph}
                            </Typography>
                        ))
                    )}
                </Container>
                <Box sx={{ width: 'flex', height: '20px', backgroundColor: '#ececec' }}></Box>
            </Box>

            {/* ticket pricing */}
            <Box sx={{ width: "flex", height: "20px", backgroundColor: "#fff" }}></Box>
            <Box sx={{ width: "flex", height: "flex", backgroundColor: "#fff" }}>
                <Container sx={{ width: "flex", height: "flex", backgroundColor: "#fff" }}>
                    <Typography variant="h3" gutterBottom a ref={section2Ref}>Ticket Pricing</Typography>
                    <Typography variant="body1" gutterBottom paragraph>
                        {eventInfo.ticketPricing || "Ticket pricing information not available."}
                    </Typography>
                </Container>
                <Box sx={{ width: "flex", height: "20px", backgroundColor: "#fff" }}></Box>
            </Box>


            {/* seat map */}
            <Box sx={{ width: "flex", height: "flex", backgroundColor: "#ececec" }}>
                <Box sx={{ width: "flex", height: "20px", backgroundColor: "#ececec" }}></Box>
                <Container sx={{ width: "flex", height: "flex", backgroundColor: "#ececec" }}>
                    <Typography variant="h3" gutterBottom a ref={section3Ref}>Seat Map</Typography>
                    <img src={Seatmap} alt="Seatmap" width="100%" />
                </Container>
                <Box sx={{ width: "flex", height: "20px", backgroundColor: "#ececec" }}></Box>
            </Box>

            {/* exchange and refund policy */}
            <Box sx={{ width: "flex", height: "flex", backgroundColor: "#fff" }} >
                <Box sx={{ width: "flex", height: "20px", backgroundColor: "#fff" }}></Box>
                <Container sx={{ width: "flex", height: "flex", backgroundColor: "#fff" }}>
                    <Typography variant="h3" gutterBottom a ref={section4Ref}>Exchange & Refund Policy</Typography>
                    <Typography variant="body1" gutterBottom>
                        <ol type="1">
                            <li>The Organiser/Venue Owner reserves the right without refund or compensation to refuse admission/evict any person(s) whose
                                conduct is disorderly or inappropriate or who poses a threat to security, or to the enjoyment of the Event by others.</li>
                            <li>Ticket holders assume all risk of injury and all responsibility for property loss, destruction or theft and release the
                                promoters, performers, sponsors, ticket outlets, venues, and their employees from any liability thereafter.</li>
                            <li>The resale of ticket(s) at the same or any price in excess of the initial purchase price is prohibited.</li>
                            <li>There is no refund, exchange, upgrade, or cancellation once ticket(s) are sold.</li>
                            <li>We would like to caution members of the public against purchasing tickets from unauthorized sellers or 3rd party websites.
                                By purchasing tickets through these non-authorized points of sale, buyers take on the risk that the validity of the tickets
                                cannot be guaranteed, with no refunds possible.⁠</li>
                        </ol>
                    </Typography>
                </Container>
                <Box sx={{ width: "flex", height: "20px", backgroundColor: "#fff" }}></Box>
            </Box>

            {/* admission policy */}
            <Box sx={{ width: "flex", height: "flex", backgroundColor: "#ececec" }}>
                <Box sx={{ width: "flex", height: "20px", backgroundColor: "#ececec" }}></Box>
                <Container sx={{ width: "flex", height: "flex", backgroundColor: "#ececec" }}>
                    <Typography variant="h3" gutterBottom a ref={section5Ref}>Admission Policy</Typography>
                    <Typography variant="body1" gutterBottom>
                    <b>Admission Rules:</b><br />
                        <ol type="1">
                            <li>The seats on the third floor are relatively high. Please choose carefully if you are under 12 years old, over 60 years old,
                                or those with high blood pressure, heart disease, fear of heights, or vertigo. Ticket holders assume all risk of injury and all
                                responsibility for property loss, destruction or theft and release the promoters, performers, sponsors, ticket outlets, venues,
                                and their employees from any liability thereafter.</li>
                            <li>Admission to show/venue by full ticket only. Printed/electronic tickets must be produced for admission.</li>
                            <li>Admission will not be allowed for infants in arms and children aged 3 years old and below.</li>
                            <li>Children above 3 years old and under 6 years old may be admitted free of charge provided that they do not occupy a seat.
                                They must be seated on the lap of a parent / guardian.</li>
                            <li>Individuals aged 6 years old and above will be required to purchase a ticket for admission.</li>
                            <li>No flash photography and videography allowed.</li>
                            <li>No outside food and beverage are allowed into the venue.</li>
                        </ol>
                    </Typography>
                </Container>
                <Box sx={{ width: "flex", height: "20px", backgroundColor: "#ececec" }}></Box>
            </Box>

            {/* ways to buy tickets */}
            <Box sx={{ width: "flex", height: "flex", backgroundColor: "#fff" }} >
                <Box sx={{ width: "flex", height: "20px", backgroundColor: "#fff" }}></Box>
                <Container sx={{ width: "flex", height: "flex", backgroundColor: "#fff" }}>
                    <Typography variant="h3" gutterBottom a ref={section6Ref}>Ways To Buy Tickets</Typography>
                    <Typography variant="body1" gutterBottom>
                        <b>► ONLINE & MOBILE:</b><br />
                        24 x 7 x 365 days of the year! Visit us on our website at ticketmaster.sg to purchase tickets.<br />

                        <b>► HOTLINE:</b>
                        +65 3158 8588

                        Operating Hours:<br />
                        Monday to Saturday (10am - 6pm)<br />
                        Sunday and Public Holidays (Closed)<br />

                        <b>► OUTLETS:</b><br />

                        ♦ SINGPOST<br />
                        The sale of tickets will be available at All SingPost outlets.<br />
                        Click here to check for available branches and operating hours.<br />
                    </Typography>
                </Container>
                <Box sx={{ width: "flex", height: "20px", backgroundColor: "#fff" }}></Box>
            </Box>

            <Footer />

            <ScrollTop {...props}>
                <Fab size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </React.Fragment>
    );
};

export default EventInfo1;