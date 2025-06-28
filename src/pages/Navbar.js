import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack
} from "@mui/material";
import LoginModal from "./LoginModal";

const Navbar = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  return (
    <>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight="bold" color="primary">
            JobPortal
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button color="inherit">Browse Jobs</Button>
            <Button color="inherit">Post Jobs</Button>
            <Button variant="outlined" onClick={() => setLoginModalOpen(true)}>
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
