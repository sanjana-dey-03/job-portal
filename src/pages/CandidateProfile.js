import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Avatar,
  Divider,
  Button,
  LinearProgress,
  Paper,
} from "@mui/material";

const CandidateProfile = () => {
  const [resume, setResume] = useState(null);
  const [score, setScore] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResume(file);

    // Simulate ATS scoring delay
    setTimeout(() => {
      const mockScore = Math.floor(Math.random() * 40) + 60; // random 60–100
      setScore(mockScore);
    }, 1500);
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Avatar sx={{ width: 64, height: 64, mr: 2 }}>JD</Avatar>
        <Box>
          <Typography variant="h5">Jane Doe</Typography>
          <Typography color="text.secondary">jane.doe@example.com</Typography>
          <Typography color="text.secondary">+91 9876543210</Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Resume Upload & ATS Score
      </Typography>

      <Button variant="outlined" component="label" sx={{ mb: 2 }}>
        Upload Resume
        <input type="file" hidden onChange={handleFileChange} />
      </Button>

      {resume && (
        <Typography variant="body2" sx={{ mb: 1 }}>
          File selected: {resume.name}
        </Typography>
      )}

      {score !== null && (
        <Paper sx={{ mt: 2, p: 2 }}>
          <Typography variant="subtitle1">ATS Match Score</Typography>
          <LinearProgress variant="determinate" value={score} sx={{ height: 10, borderRadius: 5 }} />
          <Typography variant="body2" sx={{ mt: 1 }}>
            Your resume scored <strong>{score}%</strong> match. Improve keywords for better visibility.
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default CandidateProfile;