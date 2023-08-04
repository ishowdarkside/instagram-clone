const path = require("path");
const sharp = require("sharp");
const catchAsync = require(path.join(
  __dirname,
  "..",
  "utilities",
  "catchAsync"
));
const AppError = require(path.join(__dirname, "..", "utilities", "AppError"));
const User = require(path.join(__dirname, "..", "models", "User"));
const Post = require(path.join(__dirname, "..", "models", "Post"));
const mongoose = require("mongoose");

exports.createPost = catchAsync(async (req, res, next) => {
  if (!req.files) return next(new AppError(400, "Provide image"));
  if (req.files.some((el) => !el.mimetype.startsWith("image")))
    return next(new AppError(400, "Provide valid images"));
  const user = await User.findById(req.user.id);
  const post = new Post({
    description: req.body.description,
    images: [],
    creator: req.user.id,
  });

  req.files.forEach((f) => {
    const filename = req.user.id + Date.now() + f.originalname;
    // save buffer to file
    sharp(f.buffer)
      .jpeg(90)
      .toFile("public/" + filename);
    //store images filename to db
    post.images.push(filename);
  });

  user.posts.push(post.id);
  await user.save({ validateBeforeSave: false });
  await post.save();
  res.status(201).json({
    status: "success",
    message: "Posted successfully!",
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.postId);

  if (
    post.creator.toString() !==
    new mongoose.Types.ObjectId(req.user.id).toString()
  )
    return next(
      new AppError(401, "You don't have permission to perform this operation`")
    );
  await Post.findByIdAndDelete(req.params.postId);
  return res.status(204).json({});
});
