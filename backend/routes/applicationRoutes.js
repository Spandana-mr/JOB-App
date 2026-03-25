const express = require("express");
const router = express.Router();
const Application = require("../models/Application");

// APPLY JOB
router.post("/:jobId/apply", async (req, res) => {
  const { userId } = req.body;

  // 🔴 check if already applied
  const exists = await Application.findOne({
    userId,
    jobId: req.params.jobId
  });

  if (exists) {
    return res.json({ msg: "Already applied" });
  }

  const application = await Application.create({
    userId,
    jobId: req.params.jobId
  });

  res.json(application);
});

// GET ALL APPLICATIONS
router.get("/", async (req, res) => {
  const apps = await Application.find()
    .populate("userId")
    .populate("jobId");

  res.json(apps);
});

module.exports = router;