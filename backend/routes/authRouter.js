const express = require("express");
const router = express.Router();
const path = require("path");
const { signup } = require(path.join(
  __dirname,
  "..",
  "controllers",
  "authController"
));

router.post("/signup", signup);

module.exports = router;
