import React, { useEffect, useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    InputAdornment,
    IconButton
} from "@mui/material";
import {
    signInWithEmailAndPassword,
    onIdTokenChanged
} from "firebase/auth";
import {
    collection,
    query,
    where,
    getDocs
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = ({ userType = "Candidate", onClose }) => {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const isPhoneNumber = (text) => /^\d{10}$/.test(text);

    const handleLogin = async () => {
        setLoading(true);
        try {
            let emailToLogin = identifier;

            if (isPhoneNumber(identifier)) {
                const collectionName =
                    userType === "Candidate" ? "candidates" : "employers";
                const q = query(
                    collection(db, collectionName),
                    where("phone", "==", identifier)
                );
                const snapshot = await getDocs(q);

                if (snapshot.empty) {
                    toast.error("No user found with that phone number.");
                    return;
                }

                emailToLogin = snapshot.docs[0].data().email;
            }

            const userCredential = await signInWithEmailAndPassword(
                auth,
                emailToLogin,
                password
            );
            const user = userCredential.user;

            if (!user) throw new Error("User not found");

            // 🔒 Ensure the logged-in user is actually in the correct role collection
            const roleCollection = userType === "Candidate" ? "candidates" : "employers";
            const roleQuery = query(
                collection(db, roleCollection),
                where("email", "==", user.email)
            );
            const roleSnapshot = await getDocs(roleQuery);

            if (roleSnapshot.empty) {
                // ❌ User logged in but not in correct role collection
                await auth.signOut();
                toast.error(`This user is not registered as a ${userType}.`);
                return;
            }

            // ✅ Save auth info only if role is correct
            const idTokenResult = await user.getIdTokenResult();
            const authToken = idTokenResult.token;
            const expiresIn = idTokenResult.expirationTime;

            localStorage.setItem("authToken", authToken);
            localStorage.setItem("tokenExpiry", expiresIn);
            localStorage.setItem("userRole", userType);

            toast.success("Login successful!");

            if (onClose) onClose();

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
        } finally {
            setLoading(false);
        }
    };


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
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
            <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                onClick={handleLogin}
                disabled={loading}
            >
                {loading ? "Logging in..." : "Login"}
            </Button>
        </Box>
    );
};

export default Login;

