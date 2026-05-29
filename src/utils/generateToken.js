const jwt = require("jsonwebtoken");

function generateToken(user) {
  return jwt.sign(
    {
      userId: user.UserID,
      role: user.Role,
      email: user.Email
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
}

module.exports = generateToken;