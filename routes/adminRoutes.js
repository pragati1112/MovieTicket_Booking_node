const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");
const Screen = require("../models/Screen");
const Show = require("../models/Show");
const { isAdmin } = require("../middleware/authMiddleware");

// Protect all admin routes
router.use(isAdmin);

// Admin Dashboard
router.get("/dashboard", async (req, res) => {
  const movies = await Movie.find();
  const screens = await Screen.find();
  const shows = await Show.find().populate('movie').populate('screen');
  res.render("admin/dashboard", { movies, screens, shows });
});

// Add movie form
router.get("/add-movie", (req, res) => {
  res.render("admin/add-movie");
});

// Save movie
router.post("/add-movie", async (req, res) => {
  const { title, description, duration, language, releaseDate, image } = req.body;

  await Movie.create({
    title,
    description,
    duration,
    language,
    releaseDate,
    image: image || "/images/p-1.avif"
  });

  res.redirect("/admin/dashboard");
});

// ADD SCREEN PAGE
router.get("/add-screen", (req, res) => {
  res.render("admin/add-screen");
});

// ADD SCREEN POST
router.post("/add-screen", async (req, res) => {
  const { name, totalSeats } = req.body;

  await Screen.create({
    name,
    totalSeats
  });

  res.redirect("/admin/dashboard");
});

// ADD SHOW PAGE - render form with movies and screens
router.get("/add-show", async (req, res) => {
  const movies = await Movie.find();
  const screens = await Screen.find();
  res.render("admin/add-show", { movies, screens });
});

// ADD SHOW POST - create show linked to movie and screen
router.post("/add-show", async (req, res) => {
  try {
    const { movieId, screenId, time, price } = req.body;
    await Show.create({
      movie: movieId,
      screen: screenId,
      time,
      price: price || 0
    });
    res.redirect("/admin/dashboard");
  } catch (err) {
    console.error(err);
    res.send("Error creating show");
  }
});

module.exports = router;
