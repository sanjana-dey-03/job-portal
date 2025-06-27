import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import JobList from "../pages/JobList";
import CandidateDashboard from "../pages/CandidateDashboard";
import EmployerDashboard from "../pages/EmployerDashboard";




// import other components...

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/candidates" element={<JobList />} />
      <Route path="/candidate-dashboard" element={<CandidateDashboard />} />
      <Route path="/employer-dashboard" element={<EmployerDashboard />} />

      {/* other routes */}
    </Routes>
  );
};

export default AppRoutes;
