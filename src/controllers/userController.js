module.exports = {
  getProfile: (req, res) => {
    res.status(200).json({
      message: "Protected profile route works",
      user: req.user
    });
  },

  getEmployerDashboard: (req, res) => {
    res.status(200).json({
      message: "Welcome Employer",
      user: req.user
    });
  },

  getJobSeekerDashboard: (req, res) => {
    res.status(200).json({
      message: "Welcome Job Seeker",
      user: req.user
    });
  },

  getAdminDashboard: (req, res) => {
    res.status(200).json({
      message: "Welcome Admin",
      user: req.user
    });
  }
};