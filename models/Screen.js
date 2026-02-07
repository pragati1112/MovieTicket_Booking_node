const mongoose = require("mongoose");

const screenSchema = new mongoose.Schema({
  name: String,
  totalSeats: Number
});

module.exports = mongoose.model("Screen", screenSchema);
