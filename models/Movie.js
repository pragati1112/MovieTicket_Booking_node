const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    duration: { type: Number },
    releaseDate: { type: Date },
    image: { type: String, default: "/images/p-1.avif" }
});

module.exports = mongoose.model("Movie", movieSchema);