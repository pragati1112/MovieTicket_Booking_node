const mongoose = require("mongoose");

const theaterSchema = new mongoose.Schema({
  name: String,
  location: String,
  theaterSeats: Number
});

module.exports = mongoose.model("Theater", theaterSchema);
