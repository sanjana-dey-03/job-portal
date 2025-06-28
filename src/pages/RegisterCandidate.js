import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton
} from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const RegisterCandidate = ({ onClose }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [resumeLink, setResumeLink] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!email.match(/^\S+@\S+\.\S+$/)) newErrors.email = "Invalid email format.";
    if (!phone.match(/^\d{10}$/)) newErrors.phone = "Phone must be 10 digits.";
    if (!resumeLink.trim()) newErrors.resumeLink = "Resume link is required.";
    if (password.length < 6) newErrors.password = "Password must be at least 6 characters.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      const candidatePayload = {
        fullName,
        email,
        phone,
        resumeUrl: resumeLink,
        uid
      };

      await setDoc(doc(db, "candidates", uid), candidatePayload);

      toast.success("Candidate registered successfully!");

      setFullName("");
      setEmail("");
      setPhone("");
      setResumeLink("");
      setPassword("");

      if (onClose) onClose();
      setTimeout(() => navigate("/login"), 300);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>Candidate Registration</Typography>

      <TextField
        fullWidth
        label="Full Name*"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        margin="normal"
        error={Boolean(errors.fullName)}
        helperText={errors.fullName}
      />

      <TextField
        fullWidth
        label="Email*"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        error={Boolean(errors.email)}
        helperText={errors.email}
      />

      <TextField
        fullWidth
        label="Phone Number*"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        margin="normal"
        error={Boolean(errors.phone)}
        helperText={errors.phone}
      />

      <TextField
        fullWidth
        label="Resume Link*"
        value={resumeLink}
        onChange={(e) => setResumeLink(e.target.value)}
        margin="normal"
        error={!!errors.resumeLink}
        helperText={errors.resumeLink}
      />

      <TextField
        fullWidth
        label="Password*"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        error={!!errors.password}
        helperText={errors.password || "At least 8 chars, letters, numbers & a special character"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />

      <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleRegister}>
        Register
      </Button>
    </Box>
  );
};

export default RegisterCandidate;


