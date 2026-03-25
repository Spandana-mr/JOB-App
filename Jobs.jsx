import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../redux/jobSlice";

function Jobs() {

  const dispatch = useDispatch();
  const { jobs, loading } = useSelector((state) => state.jobs);
  const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};
  // 🔹 Fetch jobs from backend
  const getJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/jobs");
      setJobs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 Apply to job
  const applyJob = async (jobId) => {
  try {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const userId = decoded.id;

    await axios.post(
      `http://localhost:5000/api/applications/${jobId}/apply`,
      { userId }
    );

    alert("Applied successfully");
  } catch (err) {
    alert("Error applying");
  }
};

  useEffect(() => {
  dispatch(fetchJobs());
}, []);

  return (
  <div>
    <h2>Jobs</h2>

    {loading ? (
      <p>Loading...</p>
    ) : (
      jobs.map((job) => (
        <div
  key={job._id}
  style={{
    border: "1px solid #ccc",
    padding: "15px",
    margin: "10px",
    borderRadius: "8px"
  }}
>
          <h3>{job.title}</h3>
          <p>{job.company}</p>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={() => applyJob(job._id)}>
            Apply
          </button>
        </div>
      ))
    )}
  </div>
);
}

export default Jobs;