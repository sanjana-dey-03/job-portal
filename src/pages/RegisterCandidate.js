import React, { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  MenuItem,
  Button,
  AppBar,
  Toolbar,
  Stack
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

const CandidateDashboard = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [jobType, setJobType] = useState("");
  const navigate = useNavigate();

  const handleTabChange = (_, newValue) => {
    setTabIndex(newValue);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("authToken");
      localStorage.removeItem("tokenExpiry");
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <Box>
      {/* Navbar */}
      <AppBar position="static" color="inherit" elevation={1}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <img src="/logo.svg" alt="Logo" height={24} />
            <Typography variant="h6" fontWeight="bold" color="primary">
              JobPortal
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              variant="outlined"
              color="error"
              onClick={handleLogout}
              sx={{ borderRadius: 2 }}
            >
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Tabs */}
      <Box sx={{ bgcolor: "#f9fafb", borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          aria-label="Candidate dashboard tabs"
          sx={{ pl: 2 }}
        >
          <Tab label="Browse Jobs" />
          <Tab label="My Profile" />
          <Tab label="Applications" />
        </Tabs>
      </Box>

      {/* Search Section */}
      {tabIndex === 0 && (
        <Box sx={{ p: 4 }}>
          <Typography variant="h5" fontWeight="bold" mb={1}>
            Find Your Next Opportunity
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Search through thousands of job opportunities
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems="center"
          >
            <TextField
              placeholder="Job title, company, or skills"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              placeholder="Location"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              placeholder="Job Type"
              fullWidth
            >
              <MenuItem value="">All Types</MenuItem>
              <MenuItem value="full-time">Full-Time</MenuItem>
              <MenuItem value="part-time">Part-Time</MenuItem>
              <MenuItem value="internship">Internship</MenuItem>
              <MenuItem value="remote">Remote</MenuItem>
            </TextField>
            <Button
              variant="contained"
              startIcon={<FilterListIcon />}
              sx={{ height: 56 }}
            >
              Search Jobs
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default CandidateDashboard;
