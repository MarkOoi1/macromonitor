const express = require("express");
const router = express.Router();

// Welcome page
router.get("/", (req, res) =>
  res.send("welcome", {
    req: req,
  })
);

module.exports = router;
