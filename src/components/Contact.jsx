import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ContactForm from "./ContactForm"; // Create this component separately
import parking1 from "../assets/images/parking1.jpg";
import GoogleMapReact from "google-map-react";
import { Marker } from "@react-google-maps/api";
// Styles for the header section
const headerStyle = {
  background: `url(${parking1}) no-repeat center center`,
  backgroundSize: "cover",
  position: "relative",
  height: "300px",
};

const overlayStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0, 0, 0, 0.6)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
};

// Component for rendering the Contact section
const Contact = () => {
  return (
    <div>
      <header style={headerStyle}>
        <div style={overlayStyle}>
          <Typography variant="h4">Contact Us</Typography>
          <Typography variant="subtitle1">
            <EmailIcon /> saad_patel123@outlook.com
          </Typography>
          <Typography variant="subtitle1">
            <LocationOnIcon /> IBM 20-40 New Walk
          </Typography>
        </div>
      </header>
      <section>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={6}>
            <div style={{ height: "300px", width: "100%" }}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyAMUBhDadTRhOzWjM8jX-pyOWNYa298dHY",
                }}
                defaultCenter={{ lat: 52.629757, lng: -1.128456 }} // Ghotki, Pakistan coordinates
                defaultZoom={14}
              >
                {/* <Marker
                  // onClick={this.onMarkerClick}
                  name={"Current location"}
                /> */}
                {/* You can add custom markers or other map components here */}
              </GoogleMapReact>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <ContactForm />
          </Grid>
        </Grid>
      </section>
    </div>
  );
};

export default Contact;
