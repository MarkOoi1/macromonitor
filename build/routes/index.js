"use strict";

var express = require("express");

var router = express.Router(); // Welcome page

router.get("/", function (req, res) {
  return res.status(200).send("welcome");
});
module.exports = router;
//# sourceMappingURL=index.js.map