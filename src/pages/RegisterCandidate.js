import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const RegisterCandidate = () => {
  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>Candidate Registration</Typography>
      <TextField fullWidth label="Full Name*" margin="normal" />
      <TextField fullWidth label="Email*" margin="normal" />
      <TextField fullWidth label="Phone Number*" margin="normal" />
      <TextField fullWidth label="Resume Link*" margin="normal" />
      <TextField fullWidth label="Password*" type="password" margin="normal" />
      <Button variant="contained" fullWidth sx={{ mt: 2 }}>Register</Button>
    </Box>
  );
};

export default RegisterCandidate;
