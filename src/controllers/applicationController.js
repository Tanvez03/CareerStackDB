const pool = require("../config/db");

exports.applyForJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const userId = req.user.userId;

    if (!req.file) {
      return res.status(400).json({
        message: "Resume PDF is required"
      });
    }

    const [seekers] = await pool.query(
      "SELECT SeekerID FROM JobSeeker WHERE UserID = ?",
      [userId]
    );

    if (seekers.length === 0) {
      return res.status(404).json({
        message: "Job seeker profile not found"
      });
    }

    const seekerId = seekers[0].SeekerID;
    const applicationId = Math.floor(10000 + Math.random() * 90000);
    const resumePath = req.file.path;

    await pool.query(
      `INSERT INTO Application 
      (ApplicationID, SeekerID, Job_ID, Submitted_At, Status, Resume_File)
      VALUES (?, ?, ?, NOW(), 'Pending', ?)`,
      [applicationId, seekerId, jobId, resumePath]
    );

    res.status(201).json({
      message: "Application submitted successfully",
      applicationId,
      resume: resumePath
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

exports.getMyApplications = async (req, res) => {
  try {
    const userId = req.user.userId;

    const [seekers] = await pool.query(
      "SELECT SeekerID FROM JobSeeker WHERE UserID = ?",
      [userId]
    );

    if (seekers.length === 0) {
      return res.status(404).json({ message: "Job seeker profile not found" });
    }

    const seekerId = seekers[0].SeekerID;

    const [applications] = await pool.query(
      `SELECT a.ApplicationID, a.Status, a.Submitted_At,
              j.Job_ID, j.Title, j.Location, j.Employment_Type
       FROM Application a
       JOIN JobListing j ON a.Job_ID = j.Job_ID
       WHERE a.SeekerID = ?`,
      [seekerId]
    );

    res.json(applications);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


exports.getApplicantsForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user.userId;

    const [employerRows] = await pool.query(
      "SELECT EmployerID FROM Employer WHERE UserID = ?",
      [userId]
    );

    if (employerRows.length === 0) {
      return res.status(404).json({ message: "Employer profile not found" });
    }

    const employerId = employerRows[0].EmployerID;

    const [jobRows] = await pool.query(
      "SELECT * FROM JobListing WHERE Job_ID = ? AND EmployerID = ?",
      [jobId, employerId]
    );

    if (jobRows.length === 0) {
      return res.status(404).json({ message: "Job not found or unauthorized" });
    }

  const [applicants] = await pool.query(
  `SELECT 
      a.ApplicationID,
      a.Status,
      a.Submitted_At,
      a.Resume_File,
      u.FullName,
      u.Email,
      js.Phone,
      js.Location,
      j.Title AS JobTitle,
      j.Employment_Type,
      j.Salary_Min,
      j.Salary_Max
   FROM Application a
   JOIN JobSeeker js ON a.SeekerID = js.SeekerID
   JOIN \`User\` u ON js.UserID = u.UserID
   JOIN JobListing j ON a.Job_ID = j.Job_ID
   WHERE a.Job_ID = ?`,
  [jobId]
);

    res.json(applicants);
  } catch (error) {
    console.error("GET APPLICANTS ERROR:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user.userId;

    const [employerRows] = await pool.query(
      "SELECT EmployerID FROM Employer WHERE UserID = ?",
      [userId]
    );

    if (employerRows.length === 0) {
      return res.status(404).json({ message: "Employer profile not found" });
    }

    const employerId = employerRows[0].EmployerID;

    const [rows] = await pool.query(
      `SELECT a.ApplicationID
       FROM Application a
       JOIN JobListing j ON a.Job_ID = j.Job_ID
       WHERE a.ApplicationID = ? AND j.EmployerID = ?`,
      [id, employerId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Application not found or unauthorized" });
    }

    await pool.query(
      "UPDATE Application SET Status = ? WHERE ApplicationID = ?",
      [status, id]
    );

    res.json({ message: "Application status updated successfully" });
  } catch (error) {
    console.error("UPDATE STATUS ERROR:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};