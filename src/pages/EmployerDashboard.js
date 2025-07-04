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
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import PostJobForm from "./PostJobForm";

const EmployerDashboard = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [applications, setApplications] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [searchSkill, setSearchSkill] = useState("");
    const [allCandidates, setAllCandidates] = useState([]);
    const [filteredCandidates, setFilteredCandidates] = useState([]);
    const [editJob, setEditJob] = useState(null);
    const [viewJob, setViewJob] = useState(null);

    const navigate = useNavigate();

    const handleTabChange = (_, newValue) => {
        setTabIndex(newValue);
        setEditJob(null);
        setViewJob(null);
    };

    const handleLogout = async () => {
        try {
            await signOut(getAuth());
            localStorage.removeItem("authToken");
            localStorage.removeItem("tokenExpiry");
            navigate("/");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const auth = getAuth();
                const employerId = auth.currentUser?.uid;
                if (!employerId) return;

                const q = query(
                    collection(db, "jobs"),
                    where("employerId", "==", employerId)
                );
                const querySnapshot = await getDocs(q);
                const jobPosts = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setJobs(jobPosts);
            } catch (err) {
                console.error("Failed to fetch jobs:", err);
            }
        };
        fetchJobs();
    }, []);

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
                const apps = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    const relatedJob = jobs.find(job => job.id === data.jobId);
                    return {
                        id: doc.id,
                        ...data,
                        jobTitle: relatedJob?.title || "[Deleted Job]",
                    };
                });
                setApplications(apps);
            } catch (err) {
                console.error("Failed to fetch applications:", err);
            }
        };

        if (tabIndex === 1 && jobs.length > 0) fetchApplications();
    }, [tabIndex, jobs]);

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const q = collection(db, "applications");
                const querySnapshot = await getDocs(q);
                const candidates = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    const relatedJob = jobs.find(job => job.id === data.jobId);
                    return {
                        id: doc.id,
                        ...data,
                        jobTitle: relatedJob?.title || "[Deleted Job]",
                    };
                });
                setAllCandidates(candidates);
                setFilteredCandidates(candidates);
            } catch (err) {
                console.error("Failed to fetch candidates:", err);
            }
        };

        if (tabIndex === 2 && jobs.length > 0) fetchCandidates();
    }, [tabIndex, jobs]);

    useEffect(() => {
        const filtered = allCandidates.filter(candidate => {
            const skills = Array.isArray(candidate.candidateSkills)
                ? candidate.candidateSkills.join(" ").toLowerCase()
                : String(candidate.candidateSkills || "").toLowerCase();
            return skills.includes(searchSkill.toLowerCase());
        });
        setFilteredCandidates(filtered);
    }, [searchSkill, allCandidates]);

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
                        <Button variant="contained" onClick={handleLogout}>
                            Sign Out
                        </Button>
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
                                        <Typography variant="h6">{jobs.length}</Typography>
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
                                        <Typography variant="h6">{applications.length}</Typography>
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

                {tabIndex === 0 && (
                    <Box mt={3}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="h6">My Job Postings</Typography>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={() => navigate("/post-job")}
                            >
                                Post New Job
                            </Button>
                        </Stack>

                        {jobs.map((job) => (
                            <Card key={job.id} sx={{ mt: 2 }}>
                                <CardContent>
                                    <Stack direction="row" justifyContent="space-between">
                                        <Box>
                                            <Typography fontWeight="bold">
                                                {job.title} <Chip label="Active" size="small" color="success" />
                                            </Typography>
                                            <Typography color="text.secondary" fontSize={14}>
                                                {job.tags?.join(" • ")} • {job.type}
                                            </Typography>
                                            <Typography color="text.secondary" fontSize={14}>
                                                {job.location} • Posted
                                            </Typography>
                                        </Box>
                                        <Stack spacing={1} direction="row">
                                            <Button startIcon={<VisibilityIcon />} variant="outlined">
                                                View
                                            </Button>
                                            <Button
                                                startIcon={<EditIcon />}
                                                variant="outlined"
                                                onClick={() => navigate("/post-job", { state: { jobToEdit: job } })}
                                            >
                                                Edit
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                )}

                {tabIndex === 1 && (
                    <Box mt={3}>
                        <Typography variant="h6" mb={2}>Candidate Applications</Typography>
                        {applications.length === 0 ? (
                            <Typography>No applications found.</Typography>
                        ) : (
                            applications.map((app) => (
                                <Card key={app.id} sx={{ mb: 2 }}>
                                    <CardContent>
                                        <Typography variant="h6" fontWeight="bold">
                                            {app.candidateName}
                                        </Typography>
                                        <Typography>Email: {app.candidateEmail}</Typography>
                                        <Typography>Applied for: <strong>{app.jobTitle}</strong></Typography>
                                        <Typography>
                                            Skills:{" "}
                                            {Array.isArray(app.candidateSkills)
                                                ? app.candidateSkills.join(", ")
                                                : app.candidateSkills}
                                        </Typography>
                                        <Typography>
                                            Applied:{" "}
                                            {app.appliedAt?.toDate
                                                ? app.appliedAt.toDate().toLocaleString()
                                                : "N/A"}
                                        </Typography>
                                        {app.candidateResumeURL && (
                                            <Typography mt={1}>
                                                <a
                                                    href={app.candidateResumeURL}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    View Resume
                                                </a>
                                            </Typography>
                                        )}
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </Box>
                )}

                {tabIndex === 2 && (
                    <Box mt={3}>
                        <Typography variant="h6" mb={2}>Search Candidates by Skill</Typography>
                        <input
                            type="text"
                            placeholder="Enter skill (e.g. React, Node)"
                            value={searchSkill}
                            onChange={(e) => setSearchSkill(e.target.value)}
                            style={{
                                padding: "10px",
                                width: "100%",
                                maxWidth: "400px",
                                marginBottom: "20px",
                                borderRadius: "4px",
                                border: "1px solid #ccc"
                            }}
                        />

                        {filteredCandidates.length === 0 ? (
                            <Typography>No matching candidates found.</Typography>
                        ) : (
                            filteredCandidates.map(candidate => (
                                <Card key={candidate.id} sx={{ mb: 2 }}>
                                    <CardContent>
                                        <Typography variant="h6" fontWeight="bold">
                                            {candidate.candidateName}
                                        </Typography>
                                        <Typography>Email: {candidate.candidateEmail}</Typography>
                                        <Typography>Applied for: <strong>{candidate.jobTitle}</strong></Typography>
                                        <Typography>
                                            Skills: {Array.isArray(candidate.candidateSkills) ? candidate.candidateSkills.join(", ") : candidate.candidateSkills}
                                        </Typography>
                                        <Typography>
                                            Applied: {candidate.appliedAt?.toDate ? candidate.appliedAt.toDate().toLocaleString() : "N/A"}
                                        </Typography>
                                        {candidate.candidateResumeURL && (
                                            <Typography mt={1}>
                                                <a href={candidate.candidateResumeURL} target="_blank" rel="noopener noreferrer">View Resume</a>
                                            </Typography>
                                        )}
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
