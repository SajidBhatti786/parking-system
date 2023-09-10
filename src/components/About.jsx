import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import SecurityIcon from "@mui/icons-material/Security";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Divider from "@mui/material/Divider";
const styles = {
  decoratedHeading: {
    display: "inline-block",
    padding: "4px 16px",
    background: "linear-gradient(to right, #007bff, #3f51b5)",
    color: "white",
    borderRadius: "4px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.3)",
    marginBottom: "20px",
  },
};

const About = () => {
  return (
    <Container
      sx={{
        marginTop: "1rem",
      }}
    >
      <Typography variant="h4" style={styles.decoratedHeading} gutterBottom>
        eParking System
      </Typography>
      <Grid container spacing={4}>
        {/* Objective 1 */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <DriveEtaIcon fontSize="large" color="primary" />
              <Typography variant="h5">Efficient Space Utilization</Typography>
              <Divider />
              <ul>
                <li>Allocates parking spaces based on availability.</li>
                <li>Prevents overbooking of parking spots.</li>
                <li>Provides a visual representation of available spots.</li>
              </ul>
            </CardContent>
          </Card>
        </Grid>

        {/* Objective 2 */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <AccessTimeIcon fontSize="large" color="primary" />
              <Typography variant="h5">Streamlined Entry and Exit</Typography>
              <Divider />
              <ul>
                <li>Simple user interface for entering and exiting.</li>
                <li>Generates a virtual ticket upon entry.</li>
                <li>
                  Provides clear instructions for smooth vehicle movement.
                </li>
              </ul>
            </CardContent>
          </Card>
        </Grid>

        {/* Objective 3 */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <SecurityIcon fontSize="large" color="primary" />
              <Typography variant="h5">Enhanced Security</Typography>
              <Divider />
              <ul>
                <li>User login for authorized access.</li>
                <li>Tracks entry and exit times for each vehicle.</li>
                <li>Security guards have access for monitoring.</li>
              </ul>
            </CardContent>
          </Card>
        </Grid>

        {/* Objective 4 */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <LocalParkingIcon fontSize="large" color="primary" />
              <Typography variant="h5">
                Real-time Availability Information
              </Typography>
              <Divider />
              <ul>
                <li>
                  Displays the number of available parking spots on the main
                  page.
                </li>
                <li>
                  Updates availability count when a vehicle enters or exits.
                </li>
              </ul>
            </CardContent>
          </Card>
        </Grid>

        {/* Objective 5 */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <ConfirmationNumberIcon fontSize="large" color="primary" />
              <Typography variant="h5">Reserved Parking</Typography>
              <Divider />
              <ul>
                <li>Allows users to reserve spots in advance.</li>
                <li>Reserved spots are clearly marked with signs.</li>
              </ul>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
