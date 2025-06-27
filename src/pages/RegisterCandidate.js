import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputLabel,
  FormHelperText
} from "@mui/material";
import { auth, storage, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const RegisterCandidate = ({ onClose, onRegistered }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [password, setPassword] = useState("");

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePhone = (phone) => /^\d{10}$/.test(phone);
  const validatePassword = (pwd) =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(pwd);

  const handleRegister = async () => {
    if (!fullName || !email || !phone || !resumeFile || !password) {
      toast.info("Please fill all fields");
      return;
    }

    if (!validateEmail(email)) return toast.error("Invalid email format");
    if (!validatePhone(phone)) return toast.error("Phone must be 10 digits");
    if (!validatePassword(password)) {
      return toast.error("Password must include letters, numbers & symbols");
    }

    try {
      const resumeRef = ref(storage, `resumes/${Date.now()}_${resumeFile.name}`);
      await uploadBytes(resumeRef, resumeFile);
      const resumeURL = await getDownloadURL(resumeRef);

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      await addDoc(collection(db, "candidates"), {
        uid,
        fullName,
        email,
        phone,
        resumeURL,
        registeredAt: new Date()
      });

      toast.success("Candidate registered!");

      // Reset form
      setFullName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setResumeFile(null);

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
        Candidate Registration
      </Typography>

      <TextField fullWidth label="Full Name*" value={fullName} onChange={(e) => setFullName(e.target.value)} margin="normal" />
      <TextField fullWidth label="Email*" value={email} onChange={(e) => setEmail(e.target.value)} margin="normal" />
      <TextField fullWidth label="Phone Number*" value={phone} onChange={(e) => setPhone(e.target.value)} margin="normal" />

      <Box sx={{ mt: 2 }}>
        <InputLabel>Upload Resume (PDF/DOC)*</InputLabel>
        <Typography variant="caption" color="text.secondary">Max size: 2 MB</Typography>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file && file.size > 2 * 1024 * 1024) {
              toast.error("File size should not exceed 2 MB");
              e.target.value = null;
              return;
            }
            setResumeFile(file);
          }}
          style={{ marginTop: 8 }}
        />
        {!resumeFile && (
          <FormHelperText error>Please upload your resume</FormHelperText>
        )}
      </Box>

      <TextField fullWidth label="Password*" type="password" value={password} onChange={(e) => setPassword(e.target.value)} margin="normal" />

      <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleRegister}>
        Register
      </Button>
    </Box>
  );
};

export default RegisterCandidate;

