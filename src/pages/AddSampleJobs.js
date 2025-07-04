import React from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Button, Box, Typography } from "@mui/material";
import { toast } from "react-toastify";

const sampleJobs = [
  {
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "Full-Time",
    description: "We're hiring a frontend dev to work with React and TypeScript...",
    tags: ["React", "TypeScript", "Node.js"]
  },
  {
    title: "Backend Engineer",
    company: "DevSolutions",
    location: "Remote",
    type: "Remote",
    description: "Join our backend team building scalable Node.js services.",
    tags: ["Node.js", "MongoDB", "AWS"]
  },
  {
    title: "Product Designer",
    company: "Designify",
    location: "New York, NY",
    type: "Full-Time",
    description: "Looking for a creative designer with Figma experience.",
    tags: ["Figma", "UI/UX", "Prototyping"]
  },
  {
    title: "Marketing Intern",
    company: "BrandBoost",
    location: "Bangalore, India",
    type: "Internship",
    description: "Marketing interns needed for digital outreach and analytics.",
    tags: ["Marketing", "Internship", "Social Media"]
  }
];

const AddSampleJobs = () => {
  const handleAddJobs = async () => {
    try {
      const jobsRef = collection(db, "jobs");
      for (const job of sampleJobs) {
        await addDoc(jobsRef, job);
      }
      toast.success("Sample jobs added successfully!");
    } catch (error) {
      toast.error("Error adding jobs: " + error.message);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Add Sample Jobs to Firestore
      </Typography>
      <Button variant="contained" onClick={handleAddJobs}>
        Add Jobs
      </Button>
    </Box>
  );
};

export default AddSampleJobs;
