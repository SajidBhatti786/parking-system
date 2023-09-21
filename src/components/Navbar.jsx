import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const pages = [
  { name: "Home", url: "/" },
  { name: "Parking slots", url: "/parking-slots" },
  { name: "About", url: "/about" },
  { name: "Contact", url: "/contact" },
];
const settings = [
  { name: "Profile", url: "/profile" }, // Change the URL for Profile
  { name: "My Reservation", url: "/myreservation" }, // Change the URL for Account
  { name: "Dashboard", url: "/dashboard" }, // Change the URL for Dashboard
  { name: "Logout", action: "logout" },
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(null); // Default to not logged in
  const [error, setError] = React.useState(null);
  const navigate = useNavigate(); // Access the history object to navigate

  const auth = useAuth();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const token = auth.token; // Use the token from the auth object

      console.log("token", token);
      const response = await fetch("http://localhost:8000/user/api/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log("Logout successful");
        auth.logout(); // Call the logout function from the AuthContext
        navigate("/login"); // Navigate to the login page
      } else {
        console.log("token", token);
        console.error("Authentication failed");
        setError("Username and/or password is incorrect");
      }
    } catch (error) {
      console.error("Error occurred during authentication:", error);
      setError("Cannot connect to the server!");
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            IBM Parking
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <NavLink
                    to={page.url}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography textAlign="center">{page.name}</Typography>
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            eParking
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <NavLink
                key={page.name}
                onClick={handleCloseNavMenu}
                to={page.url}
                style={{
                  margin: "0.5rem 1rem",
                  color: "white",
                  display: "block",
                  textDecoration: "none",
                  transition: "color 0.3s", // Add a smooth transition effect
                  ":hover": {
                    color: "lightblue", // Change the color on hover
                  },
                }}
              >
                {page.name}
              </NavLink>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {auth.isLoggedIn ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={auth.username.toUpperCase()}
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting.name}
                      onClick={
                        setting.action === "logout"
                          ? handleLogout
                          : handleCloseUserMenu // Use a function to close the menu for other options
                      }
                    >
                      <NavLink
                        to={setting.url} // Use the URL for navigation
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <Typography textAlign="center">
                          {setting.name}
                        </Typography>
                      </NavLink>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <Button
                variant="filled"
                color="success"
                // onClick={handleLogin}
                href="/login"
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
