const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");
const jobController = require("../controllers/jobController");

router.get("/", jobController.getAllJobs);

router.post(
  "/",
  authenticateToken,
  authorizeRole("Employer"),
  jobController.createJob
);

router.get(
  "/my-jobs",
  authenticateToken,
  authorizeRole("Employer"),
  jobController.getEmployerJobs
);

router.delete(
  "/:id",
  authenticateToken,
  authorizeRole("Employer"),
  jobController.deleteJob
);

router.put(
  "/:id",
  authenticateToken,
  authorizeRole("Employer"),
  jobController.updateJob
);

module.exports = router;