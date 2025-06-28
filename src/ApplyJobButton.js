// src/components/ApplyJobButton.js
import React from "react";
import axiosInstance from "./utils/axiosInstance";
import { toast } from "react-toastify";
import { Button } from "@mui/material";

const ApplyJobButton = ({ jobId }) => {
  const handleApply = async () => {
    try {
      const res = await axiosInstance.post("/api/apply-job", { jobId });
      toast.success(res.data.message || "Applied successfully!");
    } catch (err) {
      toast.error(err.response?.data?.error || "Application failed");
    }
  };

  return (
    <Button variant="contained" onClick={handleApply}>
      Apply Now
    </Button>
  );
};

export default ApplyJobButton;
