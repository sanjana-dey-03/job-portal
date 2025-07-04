// src/pages/PostJobForm.js
import React, { useState, useEffect } from "react";
import {
  Box,
    Button,
  TextField,
  Typography,
    Chip,
    Stack,
    MenuItem,
} from "@mui/material";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";

const jobTypes = ["Full-time", "Part-time", "Internship", "Contract", "Remote"];

const PostJobForm = ({ jobToEdit: jobProp, onSave }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const jobToEdit = jobProp || location.state?.jobToEdit || null;

    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [locationText, setLocationText] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState("");

    useEffect(() => {
        if (jobToEdit) {
            setTitle(jobToEdit.title || "");
            setCompany(jobToEdit.company || "");
            setLocationText(jobToEdit.location || "");
            setType(jobToEdit.type || "");
            setDescription(jobToEdit.description || "");
            setTags(jobToEdit.tags || []);
        }
    }, [jobToEdit]);

    const handleAddTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput.trim())) {
            setTags(prev => [...prev, tagInput.trim()]);
            setTagInput("");
        }
  };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    const auth = getAuth();
    const employerId = auth.currentUser?.uid;
      if (!employerId) return;

      const jobData = {
          title,
          company,
          location: locationText,
          type,
          description,
          tags,
          employerId,
          postedAt: new Date(),
      };

      try {
          if (jobToEdit?.id) {
              const jobRef = doc(db, "jobs", jobToEdit.id);
              await updateDoc(jobRef, jobData);
          } else {
              await addDoc(collection(db, "jobs"), jobData);
          }

        if (onSave) {
            onSave(); // for inline edit in EmployerDashboard
        } else {
            navigate("/employer-dashboard");
        }
    } catch (err) {
        console.error("Error saving job:", err);
    }
  };

  return (
      <Box maxWidth="600px" mx="auto" mt={4}>
          <Typography variant="h5" mb={3}>
              {jobToEdit ? "Edit Job" : "Post a New Job"}
      </Typography>
          <form onSubmit={handleSubmit}>
              <TextField
                  label="Job Title"
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  margin="normal"
                  required
              />
              <TextField
                  label="Company"
                  fullWidth
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  margin="normal"
                  required
              />
              <TextField
                  label="Location"
                  fullWidth
                  value={locationText}
                  onChange={(e) => setLocationText(e.target.value)}
                  margin="normal"
                  required
              />
              <TextField
                  select
                  label="Job Type"
                  fullWidth
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  margin="normal"
                  required
              >
                  {jobTypes.map((option) => (
                      <MenuItem key={option} value={option}>
                          {option}
                      </MenuItem>
          ))}
        </TextField>
              <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  margin="normal"
                  required
              />
              <Stack direction="row" spacing={1} alignItems="center" mt={2}>
                  <TextField
                      label="Add Tag"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                          if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddTag();
                          }
                      }}
                  />
                  <Button onClick={handleAddTag}>Add</Button>
              </Stack>
              <Box mt={1}>
                  {tags.map((tag) => (
                      <Chip
                          key={tag}
                          label={tag}
                          onDelete={() => handleRemoveTag(tag)}
                          sx={{ mr: 1, mt: 1 }}
                      />
                  ))}
              </Box>
              <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3 }}
              >
                  {jobToEdit ? "Update Job" : "Post Job"}
              </Button>
          </form>
    </Box>
  );
};

export default PostJobForm;
