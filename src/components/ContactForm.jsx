import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission here
  };

  return (
    <form
      onSubmit={handleSubmit}
      diaplay="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <TextField
        name="name"
        label="Name"
        fullWidth
        variant="outlined"
        margin="normal"
        value={formData.name}
        onChange={handleInputChange}
      />
      <TextField
        name="email"
        label="Email"
        fullWidth
        variant="outlined"
        margin="normal"
        value={formData.email}
        onChange={handleInputChange}
      />
      <TextField
        name="message"
        label="Message"
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        margin="normal"
        value={formData.message}
        onChange={handleInputChange}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        width="100%"
        sx={{
          // marginTop: "1rem",
          marginBottom: "1rem",
        }}
      >
        Send
      </Button>
    </form>
  );
};

export default ContactForm;
