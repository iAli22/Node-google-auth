const express = require("express");
const dotenv = require("dotenv");
const morgen = require("morgan");
const connectDB = require("./config/db");
const exphbs = require("express-handlebars");
const path = require("path");
const passport = require("passport");
const session = require("express-session");

// Load My Config file
dotenv.config({ path: "./config/config.env" });

// Passport Config
require("./config/passport")(passport);

// connect DB
connectDB();

// inti app
const app = express();

/**
 * middleware
 */
if (process.env.NODE_ENV === "development") {
  app.use(morgen("dev"));
}
// session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));

// handelbars
app.engine(".hbs", exphbs({ extname: ".hbs", defaultLayout: "main" }));
app.set("view engine", ".hbs");

// init port
let PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`app runinng in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
