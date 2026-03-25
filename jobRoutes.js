const auth = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

// GET all jobs
router.get("/", async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

// CREATE job
router.post("/", auth, async (req, res) => {
  const job = await Job.create(req.body);
  res.json(job);
});

// UPDATE job
router.put("/:id", async (req, res) => {
  const job = await Job.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(job);
});

// DELETE job
router.delete("/:id", async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

module.exports = router;