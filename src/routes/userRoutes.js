const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

router.get("/me", authenticateToken, (req, res) => {
  res.json({
    message: "Protected profile route works",
    user: req.user
  });
});

router.get(
  "/jobseeker-dashboard",
  authenticateToken,
  authorizeRole("JobSeeker"),
  (req, res) => {
    res.json({
      message: "Welcome Job Seeker",
      user: req.user
    });
  }
);

router.get(
  "/employer-dashboard",
  authenticateToken,
  authorizeRole("Employer"),
  (req, res) => {
    res.json({
      message: "Welcome Employer",
      user: req.user
    });
  }
);

router.get(
  "/admin-dashboard",
  authenticateToken,
  authorizeRole("Admin"),
  (req, res) => {
    res.json({
      message: "Welcome Admin",
      user: req.user
    });
  }
);

module.exports = router;