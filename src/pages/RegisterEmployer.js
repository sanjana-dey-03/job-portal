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
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const RegisterEmployer = ({ onClose, onOpenLogin }) => {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [industry, setIndustry] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!companyName.trim()) newErrors.companyName = "Company name is required.";
    if (!email.match(/^\S+@\S+\.\S+$/)) newErrors.email = "Invalid email format.";
    if (!location.trim()) newErrors.location = "Location is required.";
    if (!industry.trim()) newErrors.industry = "Industry is required.";
    if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/)) {
      newErrors.password =
        "Password must be 8+ characters, include letters, numbers & a special character.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      await setDoc(doc(db, "employers", uid), {
        uid,
        companyName,
        email,
        location,
        industry
      });

      toast.success("Employer registered successfully!");

      if (onClose) onClose();
      if (onOpenLogin) onOpenLogin();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 2 }}>
      <Typography variant="h5" gutterBottom>
        Employer Registration
      </Typography>

      <TextField
        fullWidth
        label="Company Name*"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        margin="normal"
        error={!!errors.companyName}
        helperText={errors.companyName}
      />
      <TextField
        fullWidth
        label="Email*"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        fullWidth
        label="Location*"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        margin="normal"
        error={!!errors.location}
        helperText={errors.location}
      />
      <TextField
        fullWidth
        label="Industry*"
        value={industry}
        onChange={(e) => setIndustry(e.target.value)}
        margin="normal"
        error={!!errors.industry}
        helperText={errors.industry}
      />
      <TextField
        fullWidth
        label="Password*"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        error={!!errors.password}
        helperText={
          errors.password ||
          "At least 8 characters, including letters, numbers & a special character"
        }
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

export default RegisterEmployer;



