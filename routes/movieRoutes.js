const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");
const Show = require("../models/Show");
const Screen = require("../models/Screen");

// Home page: list all movies
router.get("/home", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.render("home", { movies });
  } catch (err) {
    console.log(err);
    res.send("Error fetching movies");
  }
});

// Movie details + show timings
router.get("/movie/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    // Find shows for this movie and log for debugging
    const shows = await Show.find({ movie: movie._id });
    console.log(`DEBUG: movie id=${movie._id} - found shows: ${shows.length}`);
    shows.forEach(s => console.log(`  show id=${s._id} movie=${s.movie} time=${s.time}`));

    res.render("movieDetails", { movie, shows });
  } catch (err) {
    console.log(err);
    res.send("Error fetching movie details");
  }
});

// DEBUG: list all shows (helps verify DB contents)
router.get("/debug/shows", async (req, res) => {
  try {
    const shows = await Show.find().populate('movie');
    res.json(shows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching shows');
  }
});

router.get('/debug/add-sample-show', async (req, res) => {
  try {
    const movie = await Movie.findOne();
    if (!movie) return res.status(400).send('No movies found to attach a show');

    const screen = await Screen.findOne();

    const show = await Show.create({
      movie: movie._id,
      screen: screen ? screen._id : null,
      time: '10:00 AM',
      price: 100
    });

    res.json({ message: 'Sample show created', show });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating sample show');
  }
});


module.exports = router;
