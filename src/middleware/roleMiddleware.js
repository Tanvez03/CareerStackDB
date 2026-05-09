function authorizeRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const role = req.user.role || req.user.Role;

    if (role === "Admin") {
      return next();
    }

    if (!allowedRoles.includes(role)) {
      return res.status(403).json({
        message: "Forbidden: insufficient permissions"
      });
    }

    next();
  };
}

module.exports = authorizeRole;