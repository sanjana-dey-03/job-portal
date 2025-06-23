import React from 'react';
import {
  Card,
  Typography,
  Box,
  Chip,
  Container,
  Stack,
  Button
} from '@mui/material';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BusinessIcon from '@mui/icons-material/Business';
import Navbar from "./Navbar";

const JobList = () => {
  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120k - $160k",
      tags: ["React", "TypeScript", "Node.js"],
      posted: "2 days ago",
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Innovation Labs",
      location: "Remote",
      type: "Full-time",
      salary: "$130k - $170k",
      tags: ["Product Strategy", "Agile", "Analytics"],
      posted: "1 week ago",
    },
    {
      id: 3,
      title: "UX Designer",
      company: "Design Studio",
      location: "New York, NY",
      type: "Contract",
      salary: "$80k - $110k",
      tags: ["Figma", "User Research", "Prototyping"],
      posted: "3 days ago",
    },
    {
      id: 4,
      title: "Full Stack Developer",
      company: "StartupXYZ",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$100k - $140k",
      tags: ["React", "Python", "AWS"],
      posted: "5 days ago",
    },
  ];

  return (
    <Box sx={{ bgcolor: 'rgb(249, 250, 251)', minHeight: '100vh' }}>
      <Navbar />

      <Container sx={{ py: 5 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Find Your Next Opportunity
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" mb={4}>
          Search through thousands of job opportunities
        </Typography>

        <Box display="flex" flexDirection="column" gap={3}>
          {jobs.map((job, index) => {
            const isEven = index % 2 === 0;

            return (
              <Card
                key={job.id}
                elevation={0}
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                  px: 3,
                  py: 2,
                  bgcolor: isEven ? "#f7fbff" : "#ffffff",
                  '&:hover': {
                    boxShadow: 3
                  }
                }}
              >
                {/* Top Row: Title & Right-Aligned Posted + Apply Button */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  {/* Left: Title */}
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0, lineHeight: 1 }}>
                      {job.title}
                    </Typography>
                  </Box>

                  {/* Right: Posted above Apply Now */}
                  <Box textAlign="right">
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: 'block', mb: 1 }}
                    >
                      {job.posted}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: "#0b132b",
                        px: 3,
                        py: 1,
                        borderRadius: 2,
                        textTransform: "none"
                      }}
                    >
                      Apply Now
                    </Button>
                  </Box>
                </Stack>

                {/* Job details */}
                <Box>
                  <Stack direction="row" alignItems="center" spacing={1.5} mt={0} mb={0} flexWrap="wrap">
                    {/* Company Name with icon */}
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <BusinessIcon fontSize="small" color="action" />
                      <Typography variant="body2">{job.company}</Typography>
                    </Stack>

                    {/* Location */}
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <LocationOnIcon fontSize="small" color="action" />
                      <Typography variant="body2">{job.location}</Typography>
                    </Stack>

                    {/* Type */}
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <AccessTimeIcon fontSize="small" color="action" />
                      <Typography variant="body2">{job.type}</Typography>
                    </Stack>
                  </Stack>

                  <Typography
                    variant="body2"
                    sx={{
                      mt: 1,
                      fontWeight: 500,
                      color: 'rgba(22, 163, 74, 1)'
                    }}
                  >
                    {job.salary}
                  </Typography>

                  {job.tags && job.tags.length > 0 && (
                    <Stack direction="row" spacing={1} flexWrap="wrap" mt={1}>
                      {job.tags.map((tag, idx) => (
                        <Chip
                          key={idx}
                          label={tag}
                          size="small"
                          variant="outlined"
                          sx={{
                            fontWeight: 600,
                            color: 'hsl(215, 20%, 25%)',
                            borderColor: 'hsl(215, 20%, 60%)'
                          }}
                        />
                      ))}
                    </Stack>
                  )}
                </Box>

                {/* Bottom: View Details */}
                <Box mt={3} textAlign="right">
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{
                      px: 3,
                      py: 1,
                      borderRadius: 2,
                      textTransform: "none"
                    }}
                  >
                    View Details
                  </Button>
                </Box>
              </Card>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default JobList;





