const pool = require("../config/db");

exports.getAllUsers = async (req, res) => {
  try {
    const [users] = await pool.query(
      "SELECT UserID, FullName, Email, Role, Created_At FROM `User`"
    );

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (Number(id) === req.user.userId) {
      return res.status(400).json({
        message: "Admin cannot delete their own account"
      });
    }

    const [result] = await pool.query(
      "DELETE FROM `User` WHERE UserID = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};