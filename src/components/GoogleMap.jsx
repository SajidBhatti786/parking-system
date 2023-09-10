import React from "react";
import GoogleMapReact from "google-map-react";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function GoogleMap() {
  const location = {
    address: "1600 Amphitheatre Parkway, Mountain View, california.",
    lat: 37.42216,
    lng: -122.08427,
  };
  const LocationPin = ({ text }) => (
    <div>
      <LocationOnIcon color="blue !important" />
      <p className="pin-text">{text}</p>
    </div>
  );
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAMUBhDadTRhOzWjM8jX-pyOWNYa298dHY" }}
        defaultCenter={location}
        defaultZoom="15"
      >
        <LocationPin
          lat={location.lat}
          lng={location.lng}
          text={location.address}
        />
      </GoogleMapReact>
    </div>
  );
}
