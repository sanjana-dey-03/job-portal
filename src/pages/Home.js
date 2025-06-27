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
import RegisterEmployer from "./RegisterEmployer";
import Login from "./Login";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [openRegister, setOpenRegister] = useState(false);
  const [userType, setUserType] = useState("");

  const [openLogin, setOpenLogin] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleRegisterOpen = (type) => {
    setUserType(type);
    setOpenRegister(true);
  };

  const handleRegisterClose = () => {
    setOpenRegister(false);
  };

  const handleShowLogin = (email, password) => {
    setLoginEmail(email);
    setLoginPassword(password);
    setOpenLogin(true);
  };

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
            <Button variant="contained" size="large" startIcon={<PersonIcon />} onClick={() => handleRegisterOpen("Candidate")}>
              Register as Candidate
            </Button>
            <Button variant="outlined" size="large" onClick={() => handleRegisterOpen("Employer")}>
              Register as Employer
            </Button>
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
            <Button component={Link} to="/candidates" variant="outlined" startIcon={<SearchIcon />}>
              Browse Jobs Without Registration
            </Button>
            <Button variant="outlined" startIcon={<BusinessCenterIcon />}>
              View Employer Features
            </Button>
          </Stack>

          {/* 🔐 Register Dialog */}
          <Dialog open={openRegister} onClose={handleRegisterClose} maxWidth="sm" fullWidth>
            <DialogTitle>Register as {userType}</DialogTitle>
            <DialogContent>
              {userType === "Candidate" && (
                <RegisterCandidate
                  onClose={handleRegisterClose}
                  onRegistered={handleShowLogin}
                />
              )}
              {userType === "Employer" && (
                <RegisterEmployer
                  onClose={handleRegisterClose}
                  onRegistered={handleShowLogin}
                />
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleRegisterClose}>Cancel</Button>
            </DialogActions>
          </Dialog>

          {/* 🔐 Login Dialog */}
         <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
  <DialogTitle>Register as {userType}</DialogTitle>
  <DialogContent>
    {userType === "Candidate" && (
      <RegisterCandidate onClose={handleClose} />
    )}
    {userType === "Employer" && (
      <RegisterEmployer onClose={handleClose} />
    )}
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose}>Cancel</Button>
  </DialogActions>
</Dialog>


export default HeroSection;

