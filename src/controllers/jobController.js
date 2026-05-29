const pool = require("../config/db");

exports.createJob = async (req, res) => {
  try {
    const {
      title,
      job_description,
      location,
      salary_min,
      salary_max,
      employment_type,
      deadline
    } = req.body;

    const userId = req.user.userId;

    const [employerRows] = await pool.query(
      "SELECT EmployerID FROM Employer WHERE UserID = ?",
      [userId]
    );

    if (employerRows.length === 0) {
      return res.status(404).json({ message: "Employer profile not found" });
    }

    const employerId = employerRows[0].EmployerID;

    const [result] = await pool.query(
      `INSERT INTO JobListing
      (Job_ID, EmployerID, Title, Job_Description, Location, Salary_Min, Salary_Max, Employment_Type, Status, Deadline, Posted_Date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Open', ?, CURDATE())`,
      [
        Math.floor(10000 + Math.random() * 90000),
        employerId,
        title,
        job_description,
        location,
        salary_min,
        salary_max,
        employment_type,
        deadline
      ]
    );

    res.status(201).json({
      message: "Job created successfully",
      result
    });
  } catch (error) {
    console.error("CREATE JOB ERROR:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getEmployerJobs = async (req, res) => {
  try {
    const userId = req.user.userId;

    const [employerRows] = await pool.query(
      "SELECT EmployerID FROM Employer WHERE UserID = ?",
      [userId]
    );

    if (employerRows.length === 0) {
      return res.status(404).json({ message: "Employer profile not found" });
    }

    const employerId = employerRows[0].EmployerID;

    const [jobs] = await pool.query(
      "SELECT * FROM JobListing WHERE EmployerID = ?",
      [employerId]
    );

    res.json(jobs);
  } catch (error) {
    console.error("GET EMPLOYER JOBS ERROR:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const {
      title,
      job_description,
      location,
      salary_min,
      salary_max,
      employment_type,
      status,
      deadline
    } = req.body;

    const [employerRows] = await pool.query(
      "SELECT EmployerID FROM Employer WHERE UserID = ?",
      [userId]
    );

    if (employerRows.length === 0) {
      return res.status(404).json({ message: "Employer profile not found" });
    }

    const employerId = employerRows[0].EmployerID;

    const [result] = await pool.query(
      `UPDATE JobListing
       SET Title = ?, Job_Description = ?, Location = ?, Salary_Min = ?, Salary_Max = ?,
           Employment_Type = ?, Status = ?, Deadline = ?
       WHERE Job_ID = ? AND EmployerID = ?`,
      [
        title,
        job_description,
        location,
        salary_min,
        salary_max,
        employment_type,
        status,
        deadline,
        id,
        employerId
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Job not found or unauthorized" });
    }

    res.json({ message: "Job updated successfully" });
  } catch (error) {
    console.error("UPDATE JOB ERROR:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    let result;

    if (req.user.role === "Admin") {
      [result] = await pool.query(
        "DELETE FROM JobListing WHERE Job_ID = ?",
        [id]
      );
    } else {
      const userId = req.user.userId;

      const [employerRows] = await pool.query(
        "SELECT EmployerID FROM Employer WHERE UserID = ?",
        [userId]
      );

      if (employerRows.length === 0) {
        return res.status(404).json({ message: "Employer profile not found" });
      }

      const employerId = employerRows[0].EmployerID;

      [result] = await pool.query(
        "DELETE FROM JobListing WHERE Job_ID = ? AND EmployerID = ?",
        [id, employerId]
      );
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const [jobs] = await pool.query(
      "SELECT * FROM JobListing WHERE Status = 'Open'"
    );

    res.json(jobs);
  } catch (error) {
    console.error("GET ALL JOBS ERROR:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};