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
const {
  createPost,
  deletePost,
  likePost,
  commentPost,
  deleteComment,
  getPost,
  getPostsFromFollowings,
} = require(path.join(__dirname, "..", "controllers", "postController"));

const upload = multer({ storage: multer.memoryStorage() });

router.post("/create-post", protect, upload.array("photos", 3), createPost);
router.delete("/delete-post/:postId", protect, deletePost);
router.patch("/like-post/:postId", protect, likePost);
router.post("/comment-post/:postId", protect, commentPost);
router.delete("/delete-comment/:postId", protect, deleteComment);
router.get("/post/:postId", protect, getPost);
router.get("/feed", protect, getPostsFromFollowings);
module.exports = router;
