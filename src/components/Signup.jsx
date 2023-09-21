import React from "react";
import { Box, Container, Typography, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    userName: Yup.string()
      .required("User Name is required")
      .min(6, "username must be at least 6 characters"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",

      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // Handle form submission here
      // e.preventDefault();
      try {
        const response = await fetch(
          "http://localhost:8000/user/api/register/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // withCredentials: true,
            },

            body: JSON.stringify({
              username: values.userName,
              email: values.email,
              password: values.password,
              first_name: values.firstName,
              last_name: values.lastName,
            }),
          }
        );

        if (response.ok) {
          console.log("response", response);
          navigate("/login");
          // Use the login function to set the user as authenticated and store the token
        } else {
          // Handle authentication error (e.g., display an error message)
          console.error("Error signup");
          setError("Username and/or password is incorrect");
        }
      } catch (error) {
        console.log("catch error");
        console.error("Error occurred during authentication:", error);
        setError("Cannot connect to server!");
      }
      console.log("Form submitted with values:", values.firstName);
    },
  });

  return (
    <Box sx={{ bgcolor: "#f5f5f5", py: 6 }}>
      <Container maxWidth="xs">
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="First Name"
            variant="outlined"
            margin="normal"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            fullWidth
            label="Last Name"
            variant="outlined"
            margin="normal"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <TextField
            fullWidth
            label="userName"
            variant="outlined"
            margin="normal"
            name="userName"
            value={formik.values.userName}
            onChange={formik.handleChange}
            error={formik.touched.userName && Boolean(formik.errors.userName)}
            helperText={formik.touched.userName && formik.errors.userName}
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            type="submit"
          >
            Sign Up
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default Signup;
