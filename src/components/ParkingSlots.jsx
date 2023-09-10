import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { LocalParking, LocalParkingOutlined } from "@mui/icons-material";
import parkingSlotsData from "../data"; // Adjust the import path as needed
import parking1 from "../assets/images/parking1.jpg";
import ReserveParking from "./ReserveParking"; // Import your ReserveParking component here

const headerStyle = {
  position: "relative",
  backgroundColor: "transparent",
  color: "white",
  padding: "4rem 0",
  textAlign: "center",
  borderBottom: "4px solid #0056b3",
  backgroundImage: `url(${parking1})`,
  backgroundSize: "cover",
};

const overlayStyle = {
  content: '""',
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  pointerEvents: "none",
};

const imageFilter = {
  filter: "brightness(90%)",
};

const ParkingSlot = ({ slotNumber, isReserved, onReserveClick }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        border="1px solid #ccc"
        borderRadius="8px"
        p={2}
        mb={2}
      >
        {isReserved ? (
          <LocalParking fontSize="large" color="primary" />
        ) : (
          <LocalParkingOutlined fontSize="large" color="primary" />
        )}
        <Typography variant="h6">{isReserved ? "Reserved" : "Free"}</Typography>
        <Typography variant="body2">Slot {slotNumber}</Typography>
        {!isReserved ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => onReserveClick(slotNumber)}
          >
            Reserve
          </Button>
        ) : (
          <Button disabled variant="contained" color="success">
            Reserved
          </Button>
        )}
      </Box>
    </Grid>
  );
};

const ParkingSlots = () => {
  const [parkingData, setParkingData] = useState(parkingSlotsData);
  const [openReserveModal, setOpenReserveModal] = useState(false);

  const handleReserveClick = (slotNumber) => {
    setParkingData((prevData) =>
      prevData.map((slot) =>
        slot.id === slotNumber ? { ...slot, isReserved: true } : slot
      )
    );
    setOpenReserveModal(true);
  };

  const handleCloseReserveModal = () => {
    setOpenReserveModal(false);
  };

  return (
    <>
      <Box sx={headerStyle}>
        <div style={overlayStyle}></div>
        <div style={imageFilter}>
          <Box>
            <Typography variant="h3" component="h1" gutterBottom>
              Welcome to eParking
            </Typography>
            <Typography variant="h5" gutterBottom>
              Reserve your parking spot now!
            </Typography>
            <Typography variant="body1">
              We provide secure and convenient parking solutions for you.
            </Typography>
          </Box>
        </div>
      </Box>
      <Grid
        container
        spacing={2}
        sx={{
          padding: "2rem 0",
          maxWidth: "100%",
          margin: "0 auto",
        }}
      >
        {parkingData.map((slot) => (
          <ParkingSlot
            key={slot.id}
            slotNumber={slot.id}
            isReserved={slot.isReserved}
            onReserveClick={handleReserveClick}
          />
        ))}
      </Grid>

      {/* Reserve Parking Modal */}
      <Dialog
        open={openReserveModal}
        onClose={handleCloseReserveModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Reserve Parking</DialogTitle>
        <DialogContent>
          {/* Display the ReserveParking component inside the modal */}
          <ReserveParking />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReserveModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseReserveModal} color="primary">
            Reserve
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ParkingSlots;
