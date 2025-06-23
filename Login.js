import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const Login = () => {
  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 5 }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <TextField fullWidth label="Email or Phone" margin="normal" />
      <TextField fullWidth label="Password" type="password" margin="normal" />
      <Button fullWidth variant="contained" sx={{ mt: 2 }}>Login</Button>
    </Box>
  );
};

export default Login;
