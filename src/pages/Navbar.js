import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack
} from "@mui/material";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LoginModal from "./LoginModal";

const Navbar = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  return (
    <>
      <AppBar
        position="static"
        color="transparent"
        elevation={4}
        sx={{ bgcolor: "#fff" }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            px: 6, // More horizontal padding (space left & right)
            py: 2
          }}
        >
          {/* Left side: Logo with extra left space */}
          <Stack direction="row" spacing={1} alignItems="center">
            <BusinessCenterIcon sx={{ color: "#3f51b5", fontSize: 32 }} />
            <Typography variant="h6" fontWeight="bold" color="black">
              JobPortal
            </Typography>
          </Stack>

          {/* Right side: Navigation + Sign In */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Button color="inherit" sx={{ textTransform: "none" }}>
              Browse Jobs
            </Button>
            <Button color="inherit" sx={{ textTransform: "none" }}>
              Post Jobs
            </Button>
            <Button
              variant="outlined"
              onClick={() => setLoginModalOpen(true)}
              sx={{ textTransform: "none" }}
            >
              Sign In
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <LoginModal open={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </>
  );
};

export default Navbar;
