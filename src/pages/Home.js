import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Stack,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import SearchIcon from "@mui/icons-material/Search";
import Navbar from "./Navbar";
import RegisterCandidate from "./RegisterCandidate";
import RegisterEmployee from "./RegisterEmployer";
import { Link } from "react-router-dom";


const HeroSection = () => {
  const [open, setOpen] = useState(false);
  const [userType, setUserType] = useState("");

  const handleOpen = (type) => {
    setUserType(type);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <Navbar />

      <Box textAlign="center" py={10} bgcolor="#f5f9ff">
        <Container>
          <Typography variant="h3" fontWeight="bold">
            Find Your Dream Job or <span style={{ color: "#1a73e8" }}>Perfect Candidate</span>
          </Typography>
          <Typography variant="subtitle1" mt={2} mb={5} color="text.secondary">
            Connect talented professionals with amazing companies.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center" mb={3}>
            <Button variant="contained" size="large" startIcon={<PersonIcon />} onClick={() => handleOpen("Candidate")}>
              Register as Candidate
            </Button>
            <Button variant="outlined" size="large" onClick={() => handleOpen("Employer")}>
              Register as Employer
            </Button>
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
  <Button
    component={Link}
    to="/candidates"
    variant="outlined"
    startIcon={<SearchIcon />}
  >
    Browse Jobs Without Registration
  </Button>
  <Button variant="outlined" startIcon={<BusinessCenterIcon />}>
    View Employer Features
  </Button>
</Stack>


          {/* 🔐 Register Dialog */}
          <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Register as {userType}</DialogTitle>
            <DialogContent>
              {userType === "Candidate" && <RegisterCandidate />}
              {userType === "Employer" && <RegisterEmployee />}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </>
  );
};

export default HeroSection;
