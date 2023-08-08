const express = require("express");
const path = require("path");
const router = express.Router();
const { protect } = require(path.join(
  __dirname,
  "..",
  "controllers",
  "authController.js"
));
const {
  followUser,
  getSpecificUser,
  acceptRequest,
  declineRequest,
} = require(path.join(__dirname, "..", "controllers", "userController.js"));

router.patch("/followUser/:userId", protect, followUser);
router.get("/getUser/:userId", protect, getSpecificUser);
router.patch("/acceptRequest/:profileId", protect, acceptRequest);
router.patch("/declineRequest/:profileId", protect, declineRequest);
module.exports = router;
