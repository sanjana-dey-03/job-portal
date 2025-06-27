import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Link } from "@mui/material";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";

const CandidateDashboard = () => {
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out");
      navigate("/login");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const q = query(
          collection(db, "candidates"),
          where("email", "==", auth.currentUser.email)
        );
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          setCandidate(snapshot.docs[0].data());
        }
      } catch (err) {
        toast.error("Failed to load profile");
      }
    };

    fetchCandidate();
  }, []);

  return (
    <Box sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Candidate Dashboard
      </Typography>

      {candidate && (
        <>
          <Typography>Name: {candidate.fullName}</Typography>
          <Typography>Email: {candidate.email}</Typography>
          <Typography>Phone: {candidate.phone}</Typography>
          <Typography sx={{ mt: 2 }}>
            Resume:{" "}
            <Link href={candidate.resumeURL} target="_blank" rel="noopener">
              View Resume
            </Link>
          </Typography>
        </>
      )}

      <Button
        onClick={handleLogout}
        variant="outlined"
        color="error"
        sx={{ mt: 4 }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default CandidateDashboard;

