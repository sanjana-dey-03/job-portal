// src/pages/EmployerDashboard.js
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Stack,
  Button,
  Tabs,
  Tab,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import GroupIcon from "@mui/icons-material/Group";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { db } from "../firebase"; // Make sure this points to your firebase.js file
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const EmployerDashboard = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [applications, setApplications] = useState([]);

  const handleTabChange = (_, newValue) => {
    setTabIndex(newValue);
  };

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const auth = getAuth();
        const employerId = auth.currentUser?.uid;
        if (!employerId) return;

        const q = query(
          collection(db, "applications"),
          where("employerId", "==", employerId)
        );
        const querySnapshot = await getDocs(q);
        const apps = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setApplications(apps);
      } catch (err) {
        console.error("Failed to fetch applications:", err);
      }
    };

    if (tabIndex === 1) fetchApplications();
  }, [tabIndex]);

  return (
    <Box>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" fontWeight="bold" color="primary">
              JobPortal
            </Typography>
            <Chip label="Employer" color="primary" size="small" />
          </Stack>
          <Stack direction="row" spacing={3} alignItems="center">
            <Typography>Company Profile</Typography>
            <Typography>Settings</Typography>
            <Button variant="contained">Sign Out</Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box p={4}>
        <Typography variant="h5" fontWeight="bold">
          Employer Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" mb={4}>
          Manage your jobs and find the perfect candidates
        </Typography>

        <Grid container spacing={2} mb={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2 }}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between">
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Active Jobs
                    </Typography>
                    <Typography variant="h6">12</Typography>
                  </Box>
                  <WorkOutlineIcon color="primary" />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2 }}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between">
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Total Applications
                    </Typography>
                    <Typography variant="h6">287</Typography>
                  </Box>
                  <GroupIcon color="success" />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2 }}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between">
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Interviews Scheduled
                    </Typography>
                    <Typography variant="h6">23</Typography>
                  </Box>
                  <CalendarMonthIcon color="secondary" />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2 }}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between">
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Hires This Month
                    </Typography>
                    <Typography variant="h6">8</Typography>
                  </Box>
                  <PersonAddIcon color="warning" />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="My Jobs" />
          <Tab label="Applications" />
          <Tab label="Search Candidates" />
          <Tab label="Analytics" />
        </Tabs>

        {/* My Jobs */}
        {tabIndex === 0 && (
          <Box mt={3}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">My Job Postings</Typography>
              <Button variant="contained" startIcon={<AddIcon />}>
                Post New Job
              </Button>
            </Stack>

            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between">
                  <Box>
                    <Typography fontWeight="bold">
                      Senior Frontend Developer <Chip label="Active" size="small" color="success" />
                    </Typography>
                    <Typography color="text.secondary" fontSize={14}>
                      Engineering • Full-time
                    </Typography>
                    <Typography color="text.secondary" fontSize={14}>
                      San Francisco, CA • 24 applications • Posted 3 days ago
                    </Typography>
                    <Typography color="text.secondary" fontSize={12}>
                      Expires in 30 days
                    </Typography>
                  </Box>
                  <Stack spacing={1} direction="row">
                    <Button startIcon={<VisibilityIcon />} variant="outlined">
                      View
                    </Button>
                    <Button startIcon={<EditIcon />} variant="outlined">
                      Edit
                    </Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        )}

        {/* Applications */}
        {tabIndex === 1 && (
          <Box mt={3}>
            <Typography variant="h6" mb={2}>Candidate Applications</Typography>
            {applications.length === 0 ? (
              <Typography>No applications found.</Typography>
            ) : (
              applications.map((app) => (
                <Card key={app.id} sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography fontWeight="bold">{app.candidateName}</Typography>
                    <Typography>Email: {app.email}</Typography>
                    <Typography>Applied: {app.appliedAt?.toDate().toLocaleString()}</Typography>
                    <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer">
                      View Resume
                    </a>
                  </CardContent>
                </Card>
              ))
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default EmployerDashboard;

