// src/pages/apply/[id].js (or /ApplyToJob.js with React Router)

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Alert
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, addDoc, collection, Timestamp } from "firebase/firestore";
import { db, storage, auth } from "../firebase"; // adjust path if needed
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";

const ApplyToJob = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [candidateName, setCandidateName] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      const jobRef = doc(db, "jobs", id);
      const jobSnap = await getDoc(jobRef);
      if (jobSnap.exists()) setJob(jobSnap.data());
      setLoading(false);
    };

    fetchJob();
  }, [id]);

  const handleApply = async () => {
    if (!candidateName || !email) {
      return setSnackbar({
        open: true,
        message: "All fields are required",
        severity: "error"
      });
    }

    if (!resume) {
      return setSnackbar({
        open: true,
        message: "Please upload a resume",
        severity: "error"
      });
    }

    if (resume.size > 5 * 1024 * 1024) {
      return setSnackbar({
        open: true,
        message: "Resume must be under 5MB",
        severity: "warning"
      });
    }

    setSubmitting(true);
    try {
      const authUser = getAuth().currentUser;
      const resumeRef = ref(
        storage,
        `resumes/${authUser.uid}/${Date.now()}_${resume.name}`
      );
      await uploadBytes(resumeRef, resume);
      const resumeUrl = await getDownloadURL(resumeRef);

      await addDoc(collection(db, "applications"), {
        jobId: id,
        employerId: job.employerId,
        candidateId: authUser.uid,
        candidateName,
        email,
        resumeUrl,
        appliedAt: Timestamp.now()
      });

      setSnackbar({
        open: true,
        message: "Application submitted successfully!",
        severity: "success"
      });

      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      console.error("Application error:", error);
      setSnackbar({
        open: true,
        message: "Failed to apply. Try again.",
        severity: "error"
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box p={4} textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={4} maxWidth={600} mx="auto">
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Apply to: {job.title} @ {job.company}
      </Typography>

      <TextField
        label="Full Name"
        fullWidth
        margin="normal"
        value={candidateName}
        onChange={(e) => setCandidateName(e.target.value)}
      />
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button variant="contained" component="label" sx={{ mt: 2 }}>
        Upload Resume
        <input
          type="file"
          hidden
          accept="application/pdf"
          onChange={(e) => setResume(e.target.files[0])}
        />
      </Button>
      {resume && (
        <Typography variant="body2" mt={1}>
          Selected File: {resume.name}
        </Typography>
      )}

      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 4 }}
        onClick={handleApply}
        disabled={submitting}
      >
        {submitting ? "Submitting..." : "Submit Application"}
      </Button>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ApplyToJob;
