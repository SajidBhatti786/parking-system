import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  IconButton,
  Button,
  Grid,
  Divider,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

function ReserveParking() {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [error, setError] = useState("");

  const handleCheckInChange = (e) => {
    setCheckInDate(e.target.value);
    validateDateTime(e.target.value, checkInTime, checkOutDate, checkOutTime);
  };

  const handleCheckInTimeChange = (e) => {
    setCheckInTime(e.target.value);
    validateDateTime(checkInDate, e.target.value, checkOutDate, checkOutTime);
  };

  const handleCheckOutChange = (e) => {
    setCheckOutDate(e.target.value);
    validateDateTime(checkInDate, checkInTime, e.target.value, checkOutTime);
  };

  const handleCheckOutTimeChange = (e) => {
    setCheckOutTime(e.target.value);
    validateDateTime(checkInDate, checkInTime, checkOutDate, e.target.value);
  };

  const validateDateTime = (
    checkInDate,
    checkInTime,
    checkOutDate,
    checkOutTime
  ) => {
    const checkInDateTime = new Date(`${checkInDate} ${checkInTime}`);
    const checkOutDateTime = new Date(`${checkOutDate} ${checkOutTime}`);

    if (checkInDate === checkOutDate && checkInDateTime >= checkOutDateTime) {
      setError("Check-out must be after Check-in");
    } else if (checkInDateTime >= checkOutDateTime) {
      setError("Check-out date and time must be after Check-in");
    } else {
      setError("");
    }
  };

  const handleBookNow = () => {
    // Add logic to book the parking spot
    console.log("Booking now...");
  };

  return (
    <Box sx={{ bgcolor: "#f5f5f5", py: 6 }}>
      <Container>
        <Typography variant="h4" gutterBottom>
          Reserve Your Parking Spot
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Check-in Date"
              type="date"
              value={checkInDate}
              onChange={handleCheckInChange}
              InputProps={{
                startAdornment: (
                  <IconButton size="small">
                    <EventIcon />
                  </IconButton>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Check-in Time"
              type="time"
              value={checkInTime}
              onChange={handleCheckInTimeChange}
              InputProps={{
                startAdornment: (
                  <IconButton size="small">
                    <AccessTimeIcon />
                  </IconButton>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Check-out Date"
              type="date"
              value={checkOutDate}
              onChange={handleCheckOutChange}
              InputProps={{
                startAdornment: (
                  <IconButton size="small">
                    <EventAvailableIcon />
                  </IconButton>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Check-out Time"
              type="time"
              value={checkOutTime}
              onChange={handleCheckOutTimeChange}
              InputProps={{
                startAdornment: (
                  <IconButton size="small">
                    <AccessTimeIcon />
                  </IconButton>
                ),
              }}
            />
          </Grid>
        </Grid>
        {error && (
          <Box mt={2} display="flex" alignItems="center">
            <ErrorOutlineIcon color="error" />
            <Typography color="error" variant="body2" ml={1}>
              {error}
            </Typography>
          </Box>
        )}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          sx={{ mt: 2 }}
          onClick={handleBookNow}
          disabled={error !== ""}
        >
          Book Now
        </Button>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2" color="textSecondary">
          Please select your preferred check-in and check-out dates and times to
          reserve your parking spot. Make sure your check-out time is after your
          check-in time.
        </Typography>
      </Container>
    </Box>
  );
}

export default ReserveParking;
