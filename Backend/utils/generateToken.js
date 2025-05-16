const jwt = require("jsonwebtoken");

const JWT_SECRET = "your_jwt_secret_here_change_this";

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

module.exports = generateToken;
