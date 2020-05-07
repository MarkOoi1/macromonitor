"use strict";

var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  complete: {
    type: Boolean,
    "default": false,
    required: true
  },
  welcomemsg: {
    type: Boolean,
    "default": true,
    required: true
  },
  date: {
    type: Date,
    "default": Date.now
  }
});
var User = mongoose.model("User", UserSchema);
module.exports = User;
//# sourceMappingURL=User.js.map