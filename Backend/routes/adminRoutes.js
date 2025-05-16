const express = require("express");
const router = express.Router();
const {
  adminLogin,
  getAllUsers,
  approveUser,
  rejectUser,
} = require("../controllers/adminController");
const { authMiddleware, adminOnly } = require("../middleware/authMiddleware");

router.post("/login", adminLogin);
router.use(authMiddleware, adminOnly);

router.get("/users", getAllUsers);
router.post("/users/:id/approve", approveUser);
router.post("/users/:id/reject", rejectUser);

module.exports = router;
