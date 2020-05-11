const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Event Model
const User = require("../../models/User");

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});

module.exports = router;
