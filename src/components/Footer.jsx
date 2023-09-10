import React from "react";
import { Box, Container, Typography, Link } from "@mui/material";

function Footer() {
  return (
    <Box
      bgcolor="#333"
      color="white"
      py={3}
      textAlign="center"
      borderTop="4px solid #007BFF"
    >
      <Container>
        <Typography variant="body1" gutterBottom>
          &copy; {new Date().getFullYear()} eParking. All rights reserved.
        </Typography>
        <Typography variant="body2">
          Designed and developed with ❤️ by Your Name
        </Typography>
        <Box mt={2}>
          <Link
            href="/privacy-policy"
            color="inherit"
            style={{ marginRight: "1rem" }}
          >
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" color="inherit">
            Terms of Service
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
