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
import LoginModal from "./LoginModal";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [openRegister, setOpenRegister] = useState(false);
  const [userType, setUserType] = useState("");
  const [openLogin, setOpenLogin] = useState(false);

  const handleRegisterOpen = (type) => {
    setUserType(type);
    setOpenRegister(true);
  };

  const handleRegisterClose = () => {
    setOpenRegister(false);
  };

  const handleOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  const outlinedButtonStyle = {
    fontWeight: "bold",
    borderColor: "#1565c0",
    color: "#1565c0",
    '&:hover': {
      borderColor: "#0d47a1",
      backgroundColor: "rgba(21, 101, 192, 0.05)"
    }
  };

  return (
    <>
      <Navbar />

      <Box textAlign="center" py={10} bgcolor="#f5f9ff">
        <Container>
          <Typography variant="h3" fontWeight="bold">
            Find Your Dream Job or{" "}
            <span style={{ color: "#1a73e8" }}>Perfect Candidate</span>
          </Typography>
          <Typography variant="subtitle1" mt={2} mb={5} color="text.secondary">
            Connect talented professionals with amazing companies. Whether you're looking for your next career move or searching for top talent, we've got you covered.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
            mb={3}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<PersonIcon />}
              onClick={() => handleRegisterOpen("Candidate")}
              sx={{ fontWeight: "bold" }}
            >
              Register as Candidate
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => handleRegisterOpen("Employer")}
              sx={outlinedButtonStyle}
            >
              Register as Employer
            </Button>
          </Stack>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              component={Link}
              to="/candidates"
              variant="outlined"
              startIcon={<SearchIcon />}
              sx={outlinedButtonStyle}
            >
              Browse Jobs Without Registration
            </Button>
            <Button
              variant="outlined"
              startIcon={<BusinessCenterIcon />}
              sx={outlinedButtonStyle}
            >
              View Employer Features
            </Button>
          </Stack>

          {/* 🔐 Registration Modal */}
          <Dialog
            open={openRegister}
            onClose={handleRegisterClose}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>Register as {userType}</DialogTitle>
            <DialogContent>
              {userType === "Candidate" && (
                <RegisterCandidate
                  onClose={handleRegisterClose}
                  onOpenLogin={handleOpenLogin}
                />
              )}
              {userType === "Employer" && (
                <RegisterEmployer
                  onClose={handleRegisterClose}
                  onOpenLogin={handleOpenLogin}
                />
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleRegisterClose}>Cancel</Button>
            </DialogActions>
          </Dialog>

          {/* 🔐 Login Modal */}
          <LoginModal open={openLogin} onClose={handleCloseLogin} />
        </Container>
      </Box>
    </>
  );
};

export default HeroSection;
