const express = require("express");
const router = express.Router();

// Welcome page
router.get("/", (req, res) => res.status(200).send("welcome"));

module.exports = router;
