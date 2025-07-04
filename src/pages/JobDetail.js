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
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // adjust path as needed
import { useNavigate } from "react-router-dom";

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleApply = () => {
    navigate(`/apply/${id}`);
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