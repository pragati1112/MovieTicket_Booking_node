require("dotenv").config();
const express = require("express");
const session = require("express-session");
const path = require("path");
const connectDB = require("./config/db");

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Session Config
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to true if using HTTPS
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  })
);

// Global Variables (for views)
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Routes
app.use(require("./routes/authRoutes"));
app.use(require("./routes/movieRoutes"));
app.use(require("./routes/ticketRoutes")); // Handles booking
app.use("/admin", require("./routes/adminRoutes")); // Admin routes prefixed
app.use("/profile", require("./routes/profileRoutes"));

// Default Route
app.get("/", (req, res) => {
  res.redirect("/home");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});