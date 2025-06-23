import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const RegisterEmployer = () => {
  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>Employer Registration</Typography>
      <TextField fullWidth label="Company Name*" margin="normal" />
      <TextField fullWidth label="Email*" margin="normal" />
      <TextField fullWidth label="Phone Number*" margin="normal" />
      <TextField fullWidth label="Company Website*" margin="normal" />
      <TextField fullWidth label="Password" type="password" margin="normal" />
      <Button variant="contained" fullWidth sx={{ mt: 2 }}>Register</Button>
    </Box>
  );
};

export default RegisterEmployer;
