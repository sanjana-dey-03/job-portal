// src/pages/CandidateApplications.js

import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { db } from "../firebase"; // Make sure this path matches your actual file
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const CandidateApplications = ({ jobId, jobTitle }) => {
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeLink, setResumeLink] = useState(""); // Optional
  const [loading, setLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert("You must be logged in to apply.");
      setLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, "applications"), {
        jobId,
        jobTitle,
        candidateId: user.uid,
        candidateEmail: user.email,
        coverLetter,
        resumeLink,
        appliedAt: Timestamp.now(),
      });

      setToastOpen(true);
      setCoverLetter("");
      setResumeLink("");
    } catch (error) {
      console.error("Error applying to job:", error);
      alert("Error submitting application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} p={3}>
      <Typography variant="h6" mb={2}>
        Apply for {jobTitle}
      </Typography>
      <TextField
        label="Cover Letter"
        multiline
        rows={4}
        fullWidth
        required
        value={coverLetter}
        onChange={(e) => setCoverLetter(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Resume Link (optional)"
        fullWidth
        value={resumeLink}
        onChange={(e) => setResumeLink(e.target.value)}
        margin="normal"
      />
      <Button type="submit" variant="contained" disabled={loading}>
        {loading ? "Applying..." : "Submit Application"}
      </Button>

      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={() => setToastOpen(false)}
      >
        <Alert severity="success" variant="filled">
          Application submitted successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CandidateApplications;
