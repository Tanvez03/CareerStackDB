const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

console.log("REAL authRoutes loaded");

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;