import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import CandidateProfile from "../pages/CandidateProfile";
import JobList from "../pages/JobList";



// import other components...

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/candidates/profile" element={<CandidateProfile />} />
      <Route path="/candidates" element={<JobList />} />
      {/* other routes */}
    </Routes>
  );
};

export default AppRoutes;
