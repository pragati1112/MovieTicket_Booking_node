const express = require("express");
const router = express.Router();
const Show = require("../models/Show");

// Show page - Seat selection
router.get("/show/:id", async (req, res) => {
  try {
    const show = await Show.findById(req.params.id).populate("movie");
    res.render("show", { show });
  } catch (err) {
    console.log(err);
    res.send("Error fetching show");
  }
});

module.exports = router;
