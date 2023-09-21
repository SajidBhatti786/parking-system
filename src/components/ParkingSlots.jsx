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
import { useAuth } from "../AuthContext";
import { useEffect } from "react";
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
  const [parkingData, setParkingData] = useState([]);
  const [openReserveModal, setOpenReserveModal] = useState(false);
  const [selectedSlotId, setSelectedSlotId] = useState(null); // Store the selected slot ID
  const [selectedSpaceNumber, setSelectedSpaceNumber] = useState(null); // Store the selected space number
  const auth = useAuth();

  useEffect(() => {
    const fetchParkingData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/parking/api/parking-spaces/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setParkingData(data);
      } catch (error) {
        console.error("Error fetching or parsing data:", error);
      }
    };
    fetchParkingData();
  }, [auth.token]);

  const handleReserveClick = (slotNumber, spaceNumber) => {
    setSelectedSlotId(slotNumber);
    setSelectedSpaceNumber(spaceNumber);
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
            isReserved={slot.is_reserved}
            onReserveClick={() =>
              handleReserveClick(slot.id, slot.space_number)
            }
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
          {/* Pass the selected slot ID and space number to the ReserveParking component */}
          <ReserveParking
            slotId={selectedSlotId}
            spaceNumber={selectedSpaceNumber}
          />
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
