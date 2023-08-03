const express = require("express");
const router = express.Router();
const path = require("path");
const { signup, login, protect, changeData } = require(path.join(
  __dirname,
  "..",
  "controllers",
  "authController"
));

router.post("/signup", signup);
router.post("/login", login);
router.patch("/changeData", protect, changeData);
module.exports = router;
