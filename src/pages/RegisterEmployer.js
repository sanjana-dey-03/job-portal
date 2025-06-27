import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const RegisterEmployer = ({ onClose, onRegistered }) => {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePhone = (phone) => /^\d{10}$/.test(phone);
  const validateWebsite = (url) => /^https?:\/\/[\w.-]+\.[a-z]{2,}/i.test(url);
  const validatePassword = (pwd) =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(pwd);

  const handleRegister = async () => {
    if (!companyName || !email || !phone || !website || !password) {
      toast.info("Please fill all fields");
      return;
    }

    if (!validateEmail(email)) return toast.error("Invalid email format");
    if (!validatePhone(phone)) return toast.error("Phone must be 10 digits");
    if (!validateWebsite(website)) return toast.error("Invalid website URL");
    if (!validatePassword(password)) {
      return toast.error("Password must include letters, numbers & symbols");
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      await addDoc(collection(db, "employers"), {
        uid,
        companyName,
        email,
        phone,
        website,
        registeredAt: new Date()
      });

      toast.success("Employer registered!");

      // Reset
      setCompanyName("");
      setEmail("");
      setPhone("");
      setWebsite("");
      setPassword("");

      if (onClose) onClose();
      if (onRegistered) onRegistered(email, password);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 2 }}>
      <Typography variant="h5" gutterBottom>
        Employer Registration
      </Typography>

      <TextField fullWidth label="Company Name*" value={companyName} onChange={(e) => setCompanyName(e.target.value)} margin="normal" />
      <TextField fullWidth label="Email*" value={email} onChange={(e) => setEmail(e.target.value)} margin="normal" />
      <TextField fullWidth label="Company Website*" value={website} onChange={(e) => setWebsite(e.target.value)} margin="normal" />
      <TextField fullWidth label="Phone Number*" value={phone} onChange={(e) => setPhone(e.target.value)} margin="normal" />
      <TextField fullWidth label="Password*" type="password" value={password} onChange={(e) => setPassword(e.target.value)} margin="normal" />

      <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleRegister}>
        Register
      </Button>
    </Box>
  );
};

export default RegisterEmployer;


