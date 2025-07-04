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
import PostJobForm from "../pages/PostJobForm";
import JobDetail from "../pages/JobDetail";
import ApplyToJob from "../pages/ApplyToJob";
import RequireRole from "../pages/RequiredRole"; 

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
          <Route
              path="/candidate-dashboard"
              element={
                  <RequireRole allowedRole="Candidate">
                      <CandidateDashboard />
                  </RequireRole>
              }
          />
          <Route
              path="/employer-dashboard"
              element={
                  <RequireRole allowedRole="Employer">
                      <EmployerDashboard />
                  </RequireRole>
              }
          />
      <Route path="/joblist" element={<JobList />} />
      <Route path="/register/candidate" element={<RegisterCandidate />} />
          <Route path="/register/employer" element={<RegisterEmployer />} />
          
          <Route
              path="/post-job"
              element={
                  <RequireRole allowedRole="Employer">
                      <PostJobForm />
                  </RequireRole>
              }
          />
          <Route path="/job/:id" element={<JobDetail />} />
          <Route
              path="/apply/:id"
              element={
                  <RequireRole allowedRole="Candidate">
                      <ApplyToJob />
                  </RequireRole>
              }
          />
    </Routes>
  );
};

export default AppRoutes;
