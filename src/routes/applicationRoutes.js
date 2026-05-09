const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");
const applicationController = require("../controllers/applicationController");

const upload = require("../middleware/uploadMiddleware");

router.post(
  "/",
  authenticateToken,
  authorizeRole("JobSeeker"),
  upload.single("resume"),
  applicationController.applyForJob
);
router.get(
  "/my",
  authenticateToken,
  authorizeRole("JobSeeker"),
  applicationController.getMyApplications
);

router.get(
  "/job/:jobId",
  authenticateToken,
  authorizeRole("Employer"),
  applicationController.getApplicantsForJob
);

router.put(
  "/:id/status",
  authenticateToken,
  authorizeRole("Employer"),
  applicationController.updateApplicationStatus
);

module.exports = router;