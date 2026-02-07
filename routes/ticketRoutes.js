const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");
const Show = require("../models/Show");
const { isLoggedIn } = require("../middleware/authMiddleware");

// ==========================
// GET BOOKED SEATS (API)
// ==========================
router.get("/api/booked-seats/:showId", async (req, res) => {
  try {
    const { showId } = req.params;
    const tickets = await Ticket.find({ show: showId });

    // Flatten all seats arrays from all tickets for this show
    const bookedSeats = tickets.reduce((acc, ticket) => {
      return acc.concat(ticket.seats);
    }, []);

    res.json({ success: true, bookedSeats });
  } catch (err) {
    console.error("ERROR FETCHING BOOKED SEATS:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// ==========================
// BOOK TICKET
// ==========================
router.post("/book-ticket", async (req, res) => {
  try {
    if (!req.session.user) {
        return res.json({ success: false, message: "Please login to book tickets", redirect: "/login" });
    }

    console.log(" BOOK TICKET BODY:", req.body);

    const { city, showId, seats, movieId } = req.body;

    //  Validation
    if (!city || !showId || !movieId || !Array.isArray(seats) || seats.length === 0) {
      return res.json({ success: false, message: "Missing booking data" });
    }

    //  Ensure show exists
    const show = await Show.findById(showId);
    if (!show) {
      return res.json({ success: false, message: "Invalid show" });
    }

    // Check if seats are already booked
    const existingTickets = await Ticket.find({ show: showId });
    const allBookedSeats = existingTickets.reduce((acc, ticket) => acc.concat(ticket.seats), []);
    
    const conflict = seats.some(seat => allBookedSeats.includes(seat));
    if (conflict) {
      return res.json({ success: false, message: "Some selected seats are already booked. Please choose others." });
    }

    // Save Ticket
    const ticket = await Ticket.create({
      user: req.session.user._id,
      movie: movieId,
      show: showId,
      city,
      seats
    });

    console.log("TICKET SAVED:", ticket._id);

    res.json({ success: true });
  } catch (err) {
    console.error("BOOK TICKET ERROR:", err);
    res.json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
