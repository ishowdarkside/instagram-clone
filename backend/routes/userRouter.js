const express = require("express");
const path = require("path");
const router = express.Router();
const { protect } = require(path.join(
  __dirname,
  "..",
  "controllers",
  "authController.js"
));
const { followUser } = require(path.join(
  __dirname,
  "..",
  "controllers",
  "userController.js"
));

router.patch("/followUser/:userId", protect, followUser);

module.exports = router;
