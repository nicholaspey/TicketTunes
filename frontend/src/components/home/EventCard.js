import React, { useState, useEffect, Fragment } from "react";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ImageDisplay from "./ImageDisplay";
import coldplay from "../../assets/coldplay.png";
import twice from "../../assets/twice.png";
import ateez from "../../assets/ateez.png";
import lauv from "../../assets/lauv.png";
import harmony from "../../assets/p1harmony.png";
import hally from "../../assets/hallyupopfest.png";
import roc from "../../assets/roc.png";
import taylorswift from "../../assets/taylorswift.png";
import Vibes from "../../assets/vibes.png";
import CardMedia from "@mui/material/CardMedia";

const images = [
  Vibes,
  coldplay,
  twice,
  ateez,
  lauv,
  harmony,
  hally,
  roc,
  taylorswift,
];

function EventCard() {
  const dateStyle = {
    variant: "body1",
    color: "#5522cc",
    fontSize: "14px",
    fontWeight: "bold",
    textAlign: "left",
    textTransform: "none",
  };

  const eventStyle = {
    gutterBottom: true,
    variant: "h5",
    fontSize: "20px",
    component: "div",
    fontWeight: "bold",
    textAlign: "left",
    textTransform: "none",
  };

  const [eventInfoList, setEventInfoList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/home");
        setEventInfoList(response.data.slice(0, 9)); // This will set only the first event in your state
      } catch (error) {
        // Handle any errors that occurred during the request
        // navigate('/eventinfo/notfound');
      }
    };
    fetchData();
  }, []);

  let formattedData = [];

  const formatData = (eventInfoList, formattedData) => {
    for (let i = 0; i < Math.ceil(eventInfoList.length / 3); i++) {
      const startIndex = i * 3;
      let endIndex = startIndex + 3; // Change 'const' to 'let' here

      if (endIndex > eventInfoList.length) {
        endIndex = eventInfoList.length;
      }
      formattedData.push(eventInfoList.slice(startIndex, endIndex));
    }
  };

  formatData(eventInfoList, formattedData);
  // console.log(eventInfo.imageURL);
  // console.log(eventInfo.ticketPricing);

  return (
    <Fragment>
      {formattedData.map((row, rowIndex) => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "2rem",
            justifyContent: "center",
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
          key={rowIndex}
          className="row"
        >
          {row.map((eventInfo, itemIndex) => {
            const imageIndex = rowIndex * 3 + itemIndex; // Calculate the overall index in the images array
            const eventImage = images[imageIndex % images.length]; // Use modulo to loop over the images if there are more events than images
            return (
              <Link to={`/eventinfo1/${eventInfo.id}`} key={eventInfo.id}>
                <Button>
                  <Card sx={{ width: 400, height: 300 }}>
                    <CardMedia
                      component="img"
                      height="175"
                      image={eventImage}
                      alt={eventInfo.eventName}
                    />
                    <CardContent>
                      <Typography sx={dateStyle}>{eventInfo.date}</Typography>
                      <Typography sx={eventStyle}>
                        {eventInfo.eventName}
                      </Typography>
                    </CardContent>
                  </Card>
                </Button>
              </Link>
            );
          })}
        </div>
      ))}
    </Fragment>
  );
}

export default EventCard;
