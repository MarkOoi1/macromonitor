"use strict";

var express = require("express");

var router = express.Router();

var bcrypt = require("bcryptjs");

var config = require("config");

var jwt = require("jsonwebtoken"); // User Model


var User = require("../../models/User"); // @route   POST api/user
// @desc    Register new user
// @access  Public


router.post("/", function (req, res) {
  var _req$body = req.body,
      name = _req$body.name,
      email = _req$body.email,
      password = _req$body.password,
      google = _req$body.google;

  if (!password && !google) {
    return res.status(400).json({
      msg: "Please enter all fields"
    });
  } else if (!email || !email) {
    return res.status(400).json({
      msg: "Please enter all fields"
    });
  }

  User.findOne({
    email: email
  }).then(function (user) {
    if (user) return res.status(400).json({
      msg: "User already exists"
    });
    var newUser = new User({
      name: name,
      email: email,
      password: password
    });

    if (password) {
      // Create salt & hash
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then(function (user) {
            jwt.sign({
              id: user.id
            }, config.get("jwtSecret"), {
              expiresIn: 3600
            }, function (err, token) {
              if (err) throw err;
              res.json({
                token: token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  complete: user.complete,
                  welcomemsg: user.welcomemsg
                }
              });
            });
          });
        });
      });
    } else {
      newUser.save().then(function (user) {
        jwt.sign({
          id: user.id
        }, config.get("jwtSecret"), {
          expiresIn: 3600
        }, function (err, token) {
          if (err) throw err;
          res.json({
            token: token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              complete: user.complete,
              welcomemsg: user.welcomemsg
            }
          });
        });
      })["catch"](function (err) {
        return res.status(400).json({
          msg: err
        });
      });
    }
  });
}); // @route   POST api/user/update
// @desc    Update user
// @access  Public

module.exports = router;
//# sourceMappingURL=users.js.map