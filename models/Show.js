const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie"
  },
  screen: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Screen"
  },
  time: String,
  price: Number
});

module.exports = mongoose.model("Show", showSchema);
