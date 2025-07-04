// src/pages/job/[id].js (if using Next.js routing) or src/pages/JobDetail.js (for React Router)

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Stack
} from "@mui/material";
import { doc, getDoc, collection, addDoc, Timestamp } from "firebase/firestore";
import { db, auth } from "../firebase"; // Make sure auth is imported
import { toast } from "react-toastify";

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const jobRef = doc(db, "jobs", id);
        const jobSnap = await getDoc(jobRef);
        if (jobSnap.exists()) {
          setJob(jobSnap.data());
        } else {
          console.error("Job not found");
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleApply = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        toast.error("You must be logged in to apply.");
        return;
      }
  
      // Fetch candidate details from Firestore
      const candidateRef = doc(db, "candidates", user.uid);
      const candidateSnap = await getDoc(candidateRef);
  
      if (!candidateSnap.exists()) {
        toast.error("Candidate profile not found.");
        return;
      }
  
      const candidateData = candidateSnap.data();
  
      const applicationData = {
        jobId: id,
        jobTitle: job.title || "",
        employerId: job.employerId || "",
        appliedAt: Timestamp.now(),
  
        // Full candidate details
        candidateId: user.uid,
        candidateEmail: candidateData.email || "",
        candidateName: candidateData.name || "",
        candidateSkills: candidateData.skills || [],
        candidatePhone: candidateData.phone || "",
        candidateResumeURL: candidateData.resumeURL || ""
      };
  
      await addDoc(collection(db, "applications"), applicationData);
  
      toast.success("Application submitted successfully!");
    } catch (error) {
      console.error("Error applying:", error);
      toast.error("Failed to apply. Try again.");
    }
  };
  

  if (loading) {
    return (
      <Box p={4} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (!job) {
    return (
      <Box p={4}>
        <Typography variant="h6">Job not found</Typography>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Card>
        <CardContent>
          <Typography variant="h4" fontWeight="bold">
            {job.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {job.company} • {job.location}
          </Typography>

          <Stack direction="row" spacing={1} mt={2}>
            <Chip label={job.type} color="primary" />
            {job.tags?.map((tag, index) => (
              <Chip key={index} label={tag} variant="outlined" />
            ))}
          </Stack>

          <Box mt={3}>
            <Typography variant="h6">Job Description</Typography>
            <Typography variant="body1" mt={1}>{job.description}</Typography>
          </Box>

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={handleApply}
          >
            Apply Now
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default JobDetail;
