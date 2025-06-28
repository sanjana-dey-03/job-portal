// src/routes/AppRoutes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import CandidateDashboard from "../pages/CandidateDashboard";
import EmployerDashboard from "../pages/EmployerDashboard";
import JobList from "../pages/JobList";
import RegisterCandidate from "../pages/RegisterCandidate";
import RegisterEmployer from "../pages/RegisterEmployer";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/candidate-dashboard" element={<CandidateDashboard />} />
      <Route path="/employer-dashboard" element={<EmployerDashboard />} />
      <Route path="/candidates" element={<JobList />} />
      <Route path="/register/candidate" element={<RegisterCandidate />} />
<Route path="/register/employer" element={<RegisterEmployer />} />

    </Routes>
  );
};

export default AppRoutes;
