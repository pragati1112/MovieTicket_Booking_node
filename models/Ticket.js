const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true
  },
  show: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Show",
    required: true
  },
  city: String,
  seats: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Ticket", ticketSchema);
