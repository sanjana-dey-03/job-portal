import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  Box
} from "@mui/material";
import Login from "./Login";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Navbar = () => {
  const [openLogin, setOpenLogin] = useState(false);

  const handleLoginOpen = () => setOpenLogin(true);
  const handleLoginClose = () => setOpenLogin(false);

  return (
    <>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: "space-between", px: 4, py: 1.5 }}>
          {/* Left: Back + Logo */}
          <Stack direction="row" alignItems="center" spacing={3}>
            <Button
              component={Link}
              to="/"
              startIcon={<ArrowBackIcon />}
              sx={{ textTransform: "none", color: "inherit" }}
            >
              Home
            </Button>

            <Stack direction="row" alignItems="center" spacing={1}>
              <PersonIcon color="primary" />
              <Typography
                component={Link}
                to="/"
                sx={{
                  fontWeight: "bold",
                  fontSize: 20,
                  textDecoration: "none",
                  color: "#0b132b",
                }}
              >
                JobPortal
              </Typography>
            </Stack>
          </Stack>

          {/* Right: Sign In & Get Started */}
          <Stack direction="row" spacing={2}>
            <Button
              variant="text"
              onClick={handleLoginOpen}
              sx={{
                textTransform: "none",
                color: "hsl(222, 47%, 11%)",
              }}
            >
              Sign In
            </Button>
            <Button
              variant="contained"
              component={Link}
              to="/register"
              sx={{
                bgcolor: "#0b132b",
                borderRadius: 2,
                textTransform: "none",
                color: "#fff",
                px: 3,
                py: 1,
                fontWeight: 600,
                "&:hover": {
                  bgcolor: "#1c1f2e",
                },
              }}
            >
              Get Started
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Login Dialog */}
      <Dialog open={openLogin} onClose={handleLoginClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <Login />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;

