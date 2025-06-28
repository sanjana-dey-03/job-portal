import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { signInWithEmailAndPassword, onIdTokenChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = ({ userType = "Candidate", onClose }) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const isPhoneNumber = (text) => /^\d{10}$/.test(text);

  const handleLogin = async () => {
    try {
      let emailToLogin = identifier;

      if (isPhoneNumber(identifier)) {
        const collectionName = userType === "Candidate" ? "candidates" : "employers";
        const q = query(collection(db, collectionName), where("phone", "==", identifier));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          toast.error("No user found with that phone number.");
          return;
        }

        emailToLogin = snapshot.docs[0].data().email;
      }

      // Login with email and password
      const userCredential = await signInWithEmailAndPassword(auth, emailToLogin, password);
      const user = userCredential.user;

      if (!user) throw new Error("User not found");

      // Get ID token and expiry
      const idTokenResult = await user.getIdTokenResult();
      const authToken = idTokenResult.token;
      const expiresIn = idTokenResult.expirationTime;

      // Save token and expiry
      localStorage.setItem("authToken", authToken);
      localStorage.setItem("tokenExpiry", expiresIn);
      localStorage.setItem("userRole", userType);

      toast.success("Login successful!");

      // Close modal
      if (onClose) onClose();

      // Redirect after a short delay
      setTimeout(() => {
        if (userType === "Candidate") {
          navigate("/candidate-dashboard");
        } else {
          navigate("/employer-dashboard");
        }
      }, 500);

    } catch (err) {
      console.error(err);
      toast.error("Invalid credentials. Try again.");
    }
  };

  // 🔁 Auto-refresh token
  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        localStorage.setItem("authToken", idTokenResult.token);
        localStorage.setItem("tokenExpiry", idTokenResult.expirationTime);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Login as {userType}
      </Typography>

      <TextField
        fullWidth
        label="Email or Phone"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
      />
      <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
};

export default Login;

