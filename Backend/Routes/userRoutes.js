const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../Models/userModel"); // Import the model we just made

// REGISTER
router.post("/register", async (req, res) => {
  const { username, fname, emailid, password } = req.body;
  try {
    const result = await User.create({
      username,
      fname,
      emailid,
      password,
    });
    console.log("New user registered: ", result);
    res.status(201).json({ msg: "Success.", fname: result.fname });
  } catch (err) {
    res.status(500).json({ msg: "Error occured!", err });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(400).json({ msg: "Invalid username" });
    } else {
      const isMatched = await bcrypt.compare(password, user.password);
      if (isMatched) {
        res.status(200).json({ msg: "Success", fname: user.fname });
      } else {
        res.status(403).json({ msg: "Incorrect password" });
      }
    }
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;