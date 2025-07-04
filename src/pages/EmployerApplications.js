import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Link
} from "@mui/material";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";

const EmployerApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const authUser = getAuth().currentUser;

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const q = query(
          collection(db, "applications"),
          where("employerId", "==", authUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const appData = [];

        for (const docSnap of querySnapshot.docs) {
          const app = docSnap.data();
          const jobRef = doc(db, "jobs", app.jobId);
          const jobSnap = await getDoc(jobRef);
          const jobDetails = jobSnap.exists() ? jobSnap.data() : {};

          appData.push({ ...app, jobDetails });
        }

        setApplications(appData);
      } catch (error) {
        console.error("Error loading employer applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [authUser]);

  if (loading) {
    return (
      <Box p={4} textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Applications for Your Jobs
      </Typography>
      {applications.length === 0 ? (
        <Typography>No applications yet.</Typography>
      ) : (
        <Stack spacing={2}>
          {applications.map((app, index) => (
            <Card key={index}>
              <CardContent>
                <Typography variant="h6">
                  {app.candidateName} ({app.email})
                </Typography>
                <Typography variant="body2">
                  Applied for: {app.jobDetails.title} @ {app.jobDetails.company}
                </Typography>
                <Typography variant="body2" mt={1}>
                  Resume:{" "}
                  <Link href={app.resumeUrl} target="_blank" rel="noopener">
                    View PDF
                  </Link>
                </Typography>
                <Typography variant="body2" mt={1}>
                  Applied on: {app.appliedAt.toDate().toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default EmployerApplications;
