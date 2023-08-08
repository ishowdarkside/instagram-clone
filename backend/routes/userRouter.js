const express = require("express");
const path = require("path");
const router = express.Router();
const { protect } = require(path.join(
  __dirname,
  "..",
  "controllers",
  "authController.js"
));
const { followUser, getSpecificUser } = require(path.join(
  __dirname,
  "..",
  "controllers",
  "userController.js"
));

router.patch("/followUser/:userId", protect, followUser);
router.get("/getUser/:userId", protect, getSpecificUser);
module.exports = router;
