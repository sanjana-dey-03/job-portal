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
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const CandidateApplications = ({ jobId, jobTitle }) => {
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeLink, setResumeLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      setToast({ open: true, message: "Please log in to apply.", severity: "error" });
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
        resumeLink: resumeLink || null,
        appliedAt: Timestamp.now(),
      });

      setToast({ open: true, message: "Application submitted successfully!", severity: "success" });
      setCoverLetter("");
      setResumeLink("");
    } catch (error) {
      console.error("Error applying to job:", error);
      setToast({ open: true, message: "Failed to submit application.", severity: "error" });
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

      <Button
        type="submit"
        variant="contained"
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? "Submitting..." : "Submit Application"}
      </Button>

      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() => setToast({ ...toast, open: false })}
      >
        <Alert severity={toast.severity} variant="filled">
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CandidateApplications;

 