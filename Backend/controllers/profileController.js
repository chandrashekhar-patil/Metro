const { users } = require("../models/userModel");

// Get profile
function getProfile(req, res) {
  const user = users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ profile: user.profile });
}

// Update profile
function updateProfile(req, res) {
  const user = users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  const { name, age, gender, location, religion, bio, photoUrl } = req.body;
  user.profile = { name, age, gender, location, religion, bio, photoUrl };
  user.approved = false; // Needs re-approval
  res.json({ message: "Profile updated, waiting for admin approval" });
}

module.exports = {
  getProfile,
  updateProfile,
};
