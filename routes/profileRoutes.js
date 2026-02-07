const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");
const { isLoggedIn } = require("../middleware/authMiddleware");

// PROFILE PAGE
router.get("/", isLoggedIn, (req, res) => {
  res.render("profile", {
    user: req.session.user
  });
});

// MY TICKETS PAGE
router.get("/ticket", isLoggedIn, async (req, res) => {
  try {
    const userId = req.session.user._id;

    const tickets = await Ticket.find({ user: userId })
      .populate("movie")
      .populate({
        path: "show",
        populate: { path: "screen" }
      })
      .sort({ createdAt: -1 });

    res.render("ticket", {
      user: req.session.user,
      tickets: tickets || []
    });

  } catch (error) {
    console.error("MY TICKETS ERROR:", error);
    res.send("Error loading tickets");
  }
});

module.exports = router;