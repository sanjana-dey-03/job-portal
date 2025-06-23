import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <Box sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4" gutterBottom>Register as:</Typography>
      <Button variant="contained" component={Link} to="/register/candidate" sx={{ m: 1 }}>
        Candidate
      </Button>
      <Button variant="outlined" component={Link} to="/register/employer" sx={{ m: 1 }}>
        Employer
      </Button>
    </Box>
  );
};

export default Register;
