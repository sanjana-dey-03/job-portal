import React, { useState, useEffect } from "react";
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
  Stack,
  Card,
  CardContent,
  Chip,
  Divider,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FilterListIcon from "@mui/icons-material/FilterList";
import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { collection, getDocs } from "firebase/firestore";

const CandidateDashboard = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const snapshot = await getDocs(collection(db, "jobs"));
        const jobsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJobs(jobsData);
      } catch (error) {
        toast.error("Failed to load jobs.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      job.title?.toLowerCase().includes(search) ||
      job.company?.toLowerCase().includes(search) ||
      job.location?.toLowerCase().includes(search);

    const matchesType =
      jobTypeFilter === "" || job.type?.toLowerCase() === jobTypeFilter.toLowerCase();

    return matchesSearch && matchesType;
  });

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

      {/* Browse Jobs */}
      {tabIndex === 0 && (
        <Box sx={{ p: 4 }}>
          <Typography variant="h5" fontWeight="bold" mb={1}>
            Find Your Next Opportunity
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Search through thousands of job opportunities
          </Typography>

          {/* Search & Filter */}
          <Stack spacing={2} direction={{ xs: "column", md: "row" }} mb={3}>
            <TextField
              fullWidth
              placeholder="Job title, company, or location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              select
              fullWidth
              label="Job Type"
              value={jobTypeFilter}
              onChange={(e) => setJobTypeFilter(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <WorkIcon />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="">All Types</MenuItem>
              <MenuItem value="Full-Time">Full-Time</MenuItem>
              <MenuItem value="Part-Time">Part-Time</MenuItem>
              <MenuItem value="Internship">Internship</MenuItem>
              <MenuItem value="Remote">Remote</MenuItem>
            </TextField>
            <Button
              variant="contained"
              startIcon={<FilterListIcon />}
              sx={{ height: 56 }}
            >
              Search Jobs
            </Button>
          </Stack>

          {/* Job List */}
          {loading ? (
            <CircularProgress />
          ) : filteredJobs.length === 0 ? (
            <Typography>No jobs found.</Typography>
          ) : (
            filteredJobs.map((job) => (
              <Card
                key={job.id}
                variant="outlined"
                sx={{ mb: 2, backgroundColor: "#f9fbff" }}
              >
                <CardContent>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    spacing={2}
                  >
                    <Box>
                      <Typography variant="h6" fontWeight="bold">
                        {job.title}
                      </Typography>
                      <Stack direction="row" spacing={1} mt={0.5}>
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                          <BusinessIcon fontSize="small" />
                          <Typography variant="body2">{job.company}</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                          <LocationOnIcon fontSize="small" />
                          <Typography variant="body2">{job.location}</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                          <AccessTimeIcon fontSize="small" />
                          <Typography variant="body2">{job.type}</Typography>
                        </Stack>
                      </Stack>
                      <Typography sx={{ mt: 1 }}>
                        {job.description?.slice(0, 100)}...
                      </Typography>
                      <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
                        {(job.tags || []).map((tag, i) => (
                          <Chip key={i} label={tag} variant="outlined" size="small" />
                        ))}
                      </Stack>
                    </Box>

                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ alignSelf: "center" }}
                      onClick={() => navigate(`/job/${job.id}`)}
                    >
                      Apply Now
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            ))
          )}
        </Box>
      )}
    </Box>
  );
};

export default CandidateDashboard;

