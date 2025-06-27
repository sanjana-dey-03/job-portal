import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = ({ email = "", password = "" }) => {
  const [loginEmail, setLoginEmail] = useState(email);
  const [loginPassword, setLoginPassword] = useState(password);
  const navigate = useNavigate();

  useEffect(() => {
    setLoginEmail(email);
    setLoginPassword(password);
  }, [email, password]);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      toast.success("Logged in successfully!");
      navigate("/candidate-dashboard"); // Or employer-dashboard
    } catch (err) {
      toast.error("Invalid credentials");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Login
      </Typography>
      <TextField fullWidth label="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} margin="normal" />
      <TextField fullWidth label="Password" type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} margin="normal" />
      <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
};

export default Login;
