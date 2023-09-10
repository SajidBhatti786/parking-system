import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import ReserveParking from "./ReserveParking";
function HeroSection() {
  return (
    <>
      <Container
        maxWidth="xl"
        sx={{ paddingTop: "2rem", paddingBottom: "4rem" }}
      >
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            md={6}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h2" gutterBottom>
              Secure Parking Spots
            </Typography>
            <Typography variant="h5" paragraph>
              Discover, Reserve, Park
            </Typography>
            <Box>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginRight: "1rem" }}
              >
                Find Parking
              </Button>
              <Button variant="outlined" color="primary">
                Learn More
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            {/* Replace 'imageUrl' with your actual image URL */}
            <img
              src="https://images.pexels.com/photos/753876/pexels-photo-753876.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Parking Lot"
              style={{ width: "100%", borderRadius: "8px" }}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default HeroSection;
