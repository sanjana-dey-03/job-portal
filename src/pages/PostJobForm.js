import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  MenuItem,
  Button,
  Stack,
} from "@mui/material";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";

const jobTypes = ["Full-Time", "Part-Time", "Internship", "Remote"];

const PostJobForm = () => {
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    type: "",
    description: "",
    tags: "",
  });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handlePostJob = async () => {
    const auth = getAuth();
    const employerId = auth.currentUser?.uid;

    if (!employerId) {
      toast.error("User not authenticated");
      return;
    }

    const { title, company, location, type, description, tags } = job;

    if (!title || !company || !location || !type || !description || !tags) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await addDoc(collection(db, "jobs"), {
        ...job,
        employerId,
        tags: tags.split(",").map((tag) => tag.trim()),
        createdAt: Timestamp.now(),
      });
      toast.success("Job posted successfully!");
      setJob({
        title: "",
        company: "",
        location: "",
        type: "",
        description: "",
        tags: "",
      });
    } catch (error) {
      toast.error("Error posting job: " + error.message);
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 700, mx: "auto" }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Post a New Job
      </Typography>

      <Stack spacing={2}>
        <TextField label="Job Title" name="title" value={job.title} onChange={handleChange} fullWidth />
        <TextField label="Company Name" name="company" value={job.company} onChange={handleChange} fullWidth />
        <TextField label="Location" name="location" value={job.location} onChange={handleChange} fullWidth />
        <TextField select label="Job Type" name="type" value={job.type} onChange={handleChange} fullWidth>
          {jobTypes.map((type) => (
            <MenuItem key={type} value={type}>{type}</MenuItem>
          ))}
        </TextField>
        <TextField label="Job Description" name="description" value={job.description} onChange={handleChange} multiline minRows={4} fullWidth />
        <TextField label="Tags (comma separated)" name="tags" value={job.tags} onChange={handleChange} fullWidth />
        <Button variant="contained" onClick={handlePostJob}>Post Job</Button>
      </Stack>
    </Box>
  );
};

export default PostJobForm;