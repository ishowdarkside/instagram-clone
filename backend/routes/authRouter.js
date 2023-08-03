const express = require("express");
const router = express.Router();
const path = require("path");
const { signup, login } = require(path.join(
  __dirname,
  "..",
  "controllers",
  "authController"
));

router.post("/signup", signup);
router.post("/login", login);
module.exports = router;
