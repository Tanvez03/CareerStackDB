const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");
const adminController = require("../controllers/adminController");

router.get(
  "/users",
  authenticateToken,
  authorizeRole("Admin"),
  adminController.getAllUsers
);

router.delete(
  "/users/:id",
  authenticateToken,
  authorizeRole("Admin"),
  adminController.deleteUser
);

module.exports = router;