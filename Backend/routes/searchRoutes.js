const express = require("express");
const router = express.Router();
const { searchProfiles } = require("../controllers/searchController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.use(authMiddleware);

router.get("/", searchProfiles);

module.exports = router;
