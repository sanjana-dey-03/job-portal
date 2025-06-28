// src/components/LoginModal.js
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Stack
} from "@mui/material";
import Login from "./Login";

const LoginModal = ({ open, onClose }) => {
  const [userType, setUserType] = useState(""); // "Candidate" or "Employer"

  const handleSelectType = (type) => {
    setUserType(type);
  };

  const handleCloseModal = () => {
    setUserType(""); // Reset user type
    onClose();       // Close the modal
  };

  return (
    <Dialog open={open} onClose={handleCloseModal} maxWidth="sm" fullWidth>
      <DialogTitle>Sign In</DialogTitle>

      <DialogContent>
        {!userType ? (
          <Box textAlign="center">
            <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
              <Button variant="contained" onClick={() => handleSelectType("Candidate")}>
                Login as Candidate
              </Button>
              <Button variant="outlined" onClick={() => handleSelectType("Employer")}>
                Login as Employer
              </Button>
            </Stack>
          </Box>
        ) : (
          <Login userType={userType} onClose={handleCloseModal} />
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCloseModal}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginModal;

