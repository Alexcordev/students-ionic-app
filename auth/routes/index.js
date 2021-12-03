const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");

router.post("/register", (req, res) => {
  console.log("user from req.body >>>", user);

  var user = new User({
    email: req.body.email,
    password: req.body.password,
  });
  user.save((err) => {
    if (err) {
      res.send(err.message);
    } else res.status(201).json(user);
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/auth/success",
    failureRedirect: "/auth/failure",
  })
);

router.get("/success", (req, res) => {
  res.status(200).json({ msg: "logged in", user: req.user });
});

router.get("/failure", (req, res) => {
  res.status(401).json({ msg: "NOT logged in" });
});

router.get("/logout", (req, res) => {
  req.logOut();
  res.status(200).json({ msg: "logged out successfully" });
});

module.exports = router;

