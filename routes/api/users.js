const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const secretKey = require("../../config/keys").secretOrKey;

const User = require("../../models/User");
const passport = require("passport");
const { session } = require("passport");
//@route GET api/users/test
//@desc TESTS users route
//@access Public
router.get("/test", (req, res) => {
  res.json({
    msg: "User works",
  });
});

//@route POST api/users/register
//@desc Register Users
//@access Public
router.post("/register", (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (user) {
        res.status(400).json({ email: "Email already Exists" });
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: "200",
          r: "pg",
          d: "mm",
        });
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password,
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => res.json(user))
              .catch((err) => console.log(err));
          });
        });
      }
    })
    .catch((err) => console.log(err));
});

//@route POST api/users/login
//@desc Login Users
//@access Public
router.post("/login", (req, res) => {
  User.findOne({
    email: req.body.email,
  }).then((user) => {
    if (!user) {
      res.status(404).json({ email: "User not found" });
    } else {
      bcrypt.compare(req.body.password, user.password).then((matched) => {
        if (matched) {
          const payload = {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
          };

          jwt.sign(payload, secretKey, { expiresIn: 7200 }, (err, token) => {
            res.json({
              success: "true",
              token: "Bearer " + token,
            });
          });
        } else {
          res.status(400).json({ password: "Password Incorrect" });
        }
      });
    }
  });
});

//@route GET api/users/current
//@desc Get current user information
//@access Public
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar,
    });
  }
);

module.exports = router;
