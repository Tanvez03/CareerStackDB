const bcrypt = require("bcrypt");
const pool = require("../config/db");
const generateToken = require("../utils/generateToken");

exports.register = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    if (!fullName || !email || !password || !role) {
      return res.status(400).json({
        message: "Full name, email, password, and role are required"
      });
    }

    const allowedRoles = ["Employer", "JobSeeker", "Admin"];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        message: "Invalid role"
      });
    }

    const [existingUsers] = await pool.query(
      "SELECT UserID FROM `User` WHERE Email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        message: "Email already exists"
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "INSERT INTO `User` (FullName, Email, PasswordHash, Role) VALUES (?, ?, ?, ?)",
      [fullName, email, passwordHash, role]
    );

    const userId = result.insertId;

    if (role === "Employer") {
      await pool.query(
        "INSERT INTO Employer (UserID, Company_Name, Company_Description, Website) VALUES (?, ?, ?, ?)",
        [userId, "", "", ""]
      );
    } else if (role === "JobSeeker") {
      await pool.query(
        "INSERT INTO JobSeeker (UserID, Resume, Phone, Location) VALUES (?, ?, ?, ?)",
        [userId, "", "", ""]
      );
    } else if (role === "Admin") {
      const adminId = Math.floor(10000 + Math.random() * 90000);

      await pool.query(
        "INSERT INTO Admin (AdminID, UserID) VALUES (?, ?)",
        [adminId, userId]
      );
    }

    const user = {
      UserID: userId,
      FullName: fullName,
      Email: email,
      Role: role
    };

    const token = generateToken(user);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message || String(error)
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const [rows] = await pool.query(
      "SELECT * FROM `User` WHERE Email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.PasswordHash);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        userId: user.UserID,
        fullName: user.FullName,
        email: user.Email,
        role: user.Role
      }
    });
      } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message || String(error)
    });
  }
};