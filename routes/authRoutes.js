const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// ================= REGISTER =================

// Register page
router.get("/register", (req, res) => {
  res.render("register");
});

// Register form submit
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, cpassword } = req.body;

    if (password !== cpassword) {
        return res.render("register", { error: "Passwords do not match" });
    }

    // email already exist check
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("register", { error: "Email already registered" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // new user save
    await User.create({ name, email, password: hashedPassword });

    // register ke baad login page
    return res.redirect("/login");
  } catch (error) {
    console.log(error);
    res.render("register", { error: "Registration failed" });
  }
});

// ================= LOGIN =================

// Login page
router.get("/login", (req, res) => {
  res.render("login");
});

// Login form submit
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.render("login", { error: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("login", { error: "Invalid email or password" });
    }

    // session save
    req.session.user = user;

    // Redirect based on role
    if (user.role === 'admin') {
        return res.redirect("/admin/dashboard");
    }

    // login ke baad profile
    return res.redirect("/profile");
  } catch (error) {
    console.log(error);
    res.render("login", { error: "Something went wrong" });
  }
});

// Logout
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

module.exports = router;
