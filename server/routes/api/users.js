const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

// User Model
const User = require("../../models/User");

// @route   POST api/user
// @desc    Register new user
// @access  Public
router.post("/", (req, res) => {
  const { name, email, password, google } = req.body;

  if (!password && !google) {
    return res.status(400).json({ msg: "Please enter all fields" });
  } else if (!email || !email) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: "User already exists" });

    const newUser = new User({
      name,
      email,
      password,
    });

    if (password) {
      // Create salt & hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then((user) => {
            jwt.sign(
              { id: user.id },
              config.get("jwtSecret"),
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;
                res.json({
                  token,
                  user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    complete: user.complete,
                    welcomemsg: user.welcomemsg,
                  },
                });
              }
            );
          });
        });
      });
    } else {
      newUser
        .save()
        .then((user) => {
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  complete: user.complete,
                  welcomemsg: user.welcomemsg,
                },
              });
            }
          );
        })
        .catch((err) => res.status(400).json({ msg: err }));
    }
  });
});

// @route   POST api/user/update
// @desc    Update user
// @access  Public

module.exports = router;
