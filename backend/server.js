const express = require("express");
const User = require("../models/User");

const router = express.Router();

// POST - Save user
router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - Fetch all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Optional: test route
router.get("/test", (req, res) => {
  res.send("✅ User API working");
});

module.exports = router;
