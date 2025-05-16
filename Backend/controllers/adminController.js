const bcrypt = require("bcryptjs");
const { users, admins } = require("../models/userModel");
const generateToken = require("../utils/generateToken");

// Admin login
async function adminLogin(req, res) {
  const { username, password } = req.body;
  const admin = admins.find((a) => a.username === username);
  if (!admin) {
    return res.status(400).json({ message: "Admin not found" });
  }
  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) return res.status(400).json({ message: "Invalid password" });
  const token = generateToken({ id: admin.id, role: "admin" });
  res.json({ token });
}

// Get all users
function getAllUsers(req, res) {
  res.json(users);
}

// Approve user profile
function approveUser(req, res) {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });
  user.approved = true;
  res.json({ message: "User approved" });
}

// Reject user profile
function rejectUser(req, res) {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });
  user.approved = false;
  res.json({ message: "User rejected" });
}

module.exports = {
  adminLogin,
  getAllUsers,
  approveUser,
  rejectUser,
};
