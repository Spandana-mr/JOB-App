import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔹 Fetch jobs
export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
  const res = await axios.get("http://localhost:5000/api/jobs");
  return res.data;
});

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    loading: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.jobs = action.payload;
        state.loading = false;
      });
  }
});

export default jobSlice.reducer;