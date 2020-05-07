"use strict";

var express = require("express");

var router = express.Router();

var bcrypt = require("bcryptjs");

var config = require("config");

var jwt = require("jsonwebtoken");

var auth = require("../../middleware/auth"); // Event Model


var User = require("../../models/User"); // @route   POST api/auth
// @desc    Authenticate user
// @access  Public


router.post("/", function (req, res) {
  var _req$body = req.body,
      email = _req$body.email,
      password = _req$body.password,
      google = _req$body.google;

  if (!password && !google) {
    return res.status(400).json({
      msg: "Please enter all fields"
    });
  } else if (!email) {
    return res.status(400).json({
      msg: "Please enter all fields"
    });
  }

  User.findOne({
    email: email
  }).then(function (user) {
    if (!user) return res.status(400).json({
      msg: "User does not exist"
    }); // Validate password

    if (password) {
      bcrypt.compare(password, user.password).then(function (isMatch) {
        if (!isMatch) return res.status(400).json({
          msg: "Invalid credentials"
        });
        jwt.sign({
          id: user.id
        }, config.get("jwtSecret"), {
          expiresIn: 86400
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
    } else {
      jwt.sign({
        id: user.id
      }, config.get("jwtSecret"), {
        expiresIn: 86400
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
    }
  });
}); // @route   GET api/auth/user
// @desc    Get user data
// @access  Private

router.get("/user", auth, function (req, res) {
  User.findById(req.user.id).select("-password").then(function (user) {
    return res.json(user);
  });
});
module.exports = router;
//# sourceMappingURL=auth.js.map