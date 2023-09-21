import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
  Button,
  Link,
} from "@mui/material";

function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const auth = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/reservation/api/reservations/${auth.username}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        if (!response.ok) {
          console.log("error in fetching");
          setIsLoading(false);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setIsLoading(false);
        const data = await response.json();
        setReservations(data);
        console.log(data);
        // setParkingData(data);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching or parsing data:", error);
      }
    };
    fetchData();
  });
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Reservations
      </Typography>

      {isLoading ? (
        <Typography variant="body1">Loading reservations...</Typography>
      ) : reservations.length === 0 ? (
        <div>
          <Typography variant="body1">
            No reservations found.{" "}
            <Link href="/parking-slots">Reserve now</Link>.
          </Typography>
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Parking Space</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>End Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservations.map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell>{reservation.id}</TableCell>
                  <TableCell>{reservation.user}</TableCell>
                  <TableCell>{reservation.parkingSpace}</TableCell>
                  <TableCell>{reservation.startTime}</TableCell>
                  <TableCell>{reservation.endTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default MyReservations;
