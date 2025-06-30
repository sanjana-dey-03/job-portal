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

const RegisterCandidate = ({ onClose, onOpenLogin }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [projects, setProjects] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!email.match(/^\S+@\S+\.\S+$/)) newErrors.email = "Invalid email format.";
    if (!phone.match(/^\d{10}$/)) newErrors.phone = "Phone must be 10 digits.";
    if (!education.trim()) newErrors.education = "Education details are required.";
    if (!experience.trim()) newErrors.experience = "Experience is required.";
    if (!skills.trim()) newErrors.skills = "Skills are required.";
    if (!projects.trim()) newErrors.projects = "Projects are required.";
    if (
      !password.match(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      )
    ) {
      newErrors.password =
        "Password must be 8+ chars, include letters, numbers & a special character.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;

      const candidatePayload = {
        uid,
        fullName,
        email,
        phone,
        education,
        experience,
        skills,
        projects
      };

      await setDoc(doc(db, "candidates", uid), candidatePayload);

      toast.success("Candidate registered successfully!");

      // Clear form
      setFullName("");
      setEmail("");
      setPhone("");
      setEducation("");
      setExperience("");
      setSkills("");
      setProjects("");
      setPassword("");

      // Close modal and open login modal
      if (onClose) onClose();
      if (onOpenLogin) onOpenLogin();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 2 }}>
      <Typography variant="h5" gutterBottom>
        Candidate Registration
      </Typography>

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
        label="Education*"
        value={education}
        onChange={(e) => setEducation(e.target.value)}
        margin="normal"
        error={Boolean(errors.education)}
        helperText={errors.education}
      />

      <TextField
        fullWidth
        label="Experience*"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        margin="normal"
        error={Boolean(errors.experience)}
        helperText={errors.experience}
      />

      <TextField
        fullWidth
        label="Skills*"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        margin="normal"
        error={Boolean(errors.skills)}
        helperText={errors.skills}
      />

      <TextField
        fullWidth
        label="Projects*"
        value={projects}
        onChange={(e) => setProjects(e.target.value)}
        margin="normal"
        error={Boolean(errors.projects)}
        helperText={errors.projects}
      />

      <TextField
        fullWidth
        label="Password*"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        error={Boolean(errors.password)}
        helperText={
          errors.password ||
          "At least 8 characters, including letters, numbers & a special character"
        }
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
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
