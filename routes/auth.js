const express = require("express");
const passport = require("passport");
const router = express.Router();

/**
 * @desc Auth with google
 * @route GET /auth/google
 */
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

/**
 * @desc Google Callback
 * @route GET /auth/google/callback
 */
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  function (req, res) {
    res.redirect("/dashboard");
  }
);

module.exports = router;
