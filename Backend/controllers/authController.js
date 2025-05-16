const bcrypt = require("bcryptjs");
const { users, User } = require("../models/userModel");
const generateToken = require("../utils/generateToken");

// Register
async function register(req, res) {
  const { email, password, mobile } = req.body;
  if (!email || !password || !mobile) {
    return res
      .status(400)
      .json({ message: "Email, password and mobile are required" });
  }
  const userExists = users.find((u) => u.email === email);
  if (userExists) {
    return res.status(400).json({ message: "Email already registered" });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({ email, mobile, passwordHash });
  users.push(user);
  const token = generateToken(user);
  return res.status(201).json({ token });
}

// Login
async function login(req, res) {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return res.status(400).json({ message: "Invalid password" });
  }
  if (!user.approved && user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Profile not approved by admin yet" });
  }
  const token = generateToken(user);
  return res.json({ token, profile: user.profile });
}

module.exports = {
  register,
  login,
};
