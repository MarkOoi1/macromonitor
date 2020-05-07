"use strict";

var config = require('config');

var jwt = require('jsonwebtoken');

function auth(req, res, next) {
  var token = req.header('x-auth-token');
  if (!token) return res.status(401).json({
    msg: 'No token, authorisation denied'
  });

  try {
    // Verify token
    var decoded = jwt.verify(token, config.get('jwtSecret')); // Add user from payload

    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({
      msg: 'Token is not valid'
    });
  }
}

module.exports = auth;
//# sourceMappingURL=auth.js.map