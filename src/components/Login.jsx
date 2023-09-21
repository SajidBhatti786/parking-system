import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Link,
  Grid,
  Alert,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
// import { useAuth } from "../AuthContext";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const { login } = useAuth();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const auth = useAuth();
  const handleSubmit = async (e) => {
    // Add login logic here
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/user/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // withCredentials: true,
        },

        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        const accessToken = responseData.access;
        console.log(responseData);
        const { username, email } = responseData;
        // Use the login function to set the user as authenticated and store the token
        console.log("token", accessToken);
        console.log("login", accessToken);
        login(
          responseData.token,
          responseData.email,
          responseData.refresh_token,
          responseData.username
        );
      } else {
        // Handle authentication error (e.g., display an error message)
        console.error("Authentication failed");
        setError("Username and/or password is incorrect");
      }
    } catch (error) {
      console.log("catch error");
      console.error("Error occurred during authentication:", error);
      setError("Cannot connect to server!");
    }
    console.log("handling submit");
  };

  return auth.isLoggedIn ? (
    <Navigate to="/" />
  ) : (
    <Box sx={{ bgcolor: "#f5f5f5", py: 6 }}>
      <Container maxWidth="xs">
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          {error && (
            // Display the error message if an error occurred
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            margin="normal"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            type="submit"
          >
            Login
          </Button>
        </form>
        <Grid container mt={2} justifyContent="space-between">
          <Grid item>
            <Link href="#" variant="body2">
              Forgot Password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="/signup" variant="body2">
              Don't have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Login;
