const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const { protect } = require(path.join(
  __dirname,
  "..",
  "controllers",
  "authController"
));
const { createPost, deletePost } = require(path.join(
  __dirname,
  "..",
  "controllers",
  "postController"
));

const upload = multer({ storage: multer.memoryStorage() });

router.post("/create-post", protect, upload.array("photos", 3), createPost);
router.delete("/delete-post/:postId", protect, deletePost);
module.exports = router;
